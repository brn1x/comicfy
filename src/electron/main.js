const { app, BrowserWindow, dialog, shell, ipcMain } = require('electron')
const isDev = require('electron-is-dev');   
const { resolve, join } = require('path');
const { readdir } = require('fs').promises
const Shell = require('node-powershell')
const Store = require('electron-store')
const { readdirSync } = require('fs')
const _ = require('lodash')

let window

const config = {
  width: 900,
  height: 600,
  defaultEncoding: 'utf8',
  transparent: true,
  frame: false,
  webPreferences: {
    webSecurity: false,
    nodeIntegration: true
  }
}

const schema = {
  files: {
    type: 'string'
  }
}

const store = new Store({ schema })

const ps = new Shell({
  executionPolicy: 'Bypass',
  noProfile: true,
})

const createWindow = async () => {
  // store.delete('files')

  window = new BrowserWindow(config)

  const startURL = isDev ? 'http://localhost:3000' : `file://${join(__dirname, '../build/index.html')}`

  window.loadURL(startURL)
  window.webContents.openDevTools()
  window.removeMenu()

  // const tray = new Tray(resolve(__dirname, '..', 'assets', 'iconTemplate.png'))
}

app.on('ready', () => {
  createWindow()
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (window === null) {
    createWindow()
  }
})

ipcMain.on('close-app', async (event, arg) => {
  app.quit()
})

ipcMain.on('maximize-window', async (event, arg) => {
  console.log(window.isFullScreen())
  window.isFullScreen() ? window.setFullScreen(false) : window.setFullScreen(true)
})

ipcMain.on('minimize-window', async (event, arg) => {
  window.minimize()
})


/**
 * Open the dialog to select the dir from comics
 */
ipcMain.on('toggle-dialog', async (event, arg) => {
  try {
    await openDialog()
    window.send('not-loading', getStoreFiles())
    window.send('cbr-files', getStoreFiles())
  } catch (error) {
    window.send('not-loading', getStoreFiles())
  }
})

/**
 * Show up the files
 */
ipcMain.on('toggle-files', (event, arg) => {
  window.send('cbr-files', getStoreFiles())
})


/**
 * Open up the selected comic
 */
ipcMain.on('open-file', (event, arg) => {
  openFile(arg)
})


/**
 * @description Receive a directory to scan and return all the files on it
 * @param {String} path Initial directory to scan
 * @returns {Array} Directory from all files found in this path
 */
async function getAllFiles (path) {
  const dirs = await readdir(path, { withFileTypes: true })
  const files = await Promise.all(dirs.map(dir => {
    const response = resolve(path, dir.name)
    if (dir.isDirectory()) {
      return getAllFiles(response)
    } else {
      return response
    }
  }))
  return Array.prototype.concat(...files)
}

/**
 * @description Open up the dialog to select a directory
 * @returns {void}
 */
async function openDialog () {
  const path = dialog.showOpenDialogSync({ properties: ['openDirectory'] })

  window.send('loading')

  const allFiles = await getAllFiles(path[0])
  const cbrFiles = allFiles.filter(file => file.includes('.cbr'))

  const hq = cbrFiles.map(cbrFile => {
    const splited = cbrFile.split('\\')
    
    const file = {
      name: splited[splited.length - 1].replace('.cbr', ''),
      folder: splited[splited.length - 2],
      dir: cbrFile,
      cover: 'common.jpg'
    }

    return file
  })

  
  await storeFiles(hq)
}

/**
 * @description Receive an array of Files to store on database
 * @param {Object[]} files Files objects array
 * @returns {void}
 */
async function storeFiles (files) {
  const verifiedFiles = verifyDb(files)
  const storedFiles = store.get('files')
  const dbFiles = storedFiles ? JSON.parse(storedFiles) : []
  store.set('files', JSON.stringify([...dbFiles, ...verifiedFiles]))

  await getCover(verifiedFiles)
}

/**
 * @description Get all the files from database and return it grouped by folder
 * @returns {Object[]} Files objects array
 */
function getStoreFiles () {
  const storedFiles = store.get('files')
  const files = storedFiles ? JSON.parse(storedFiles) : []

  const folderFiles = _.groupBy(files, (file) => {
    return file.folder
  })

  return folderFiles
}

/**
 * 
 * @param {Object[]} files Files objects array
 */
function verifyDb (files) {
  const dbFile = store.get('files')
  const storedFiles = dbFile ? JSON.parse(dbFile) : []
  
  const diff = files.reduce((unique, current) => {
		const x = storedFiles.find(item => item.name === current.name)
		if (!x) {
			return unique.concat([current])
		} else {
			return unique
		}
	}, [])

  return diff
}

async function openFile (path) {
  await shell.openPath(path)
}

async function getCover (files) {
  const newFiles = await Promise.all(files.map(async file => {
    const splited = file.dir.split('\\')
    ps.addCommand(`Expand-7Zip "${file.dir}" "${resolve(__dirname, '..', 'assets', 'covers') + '\\' + splited[splited.length - 1]}"`)
    return file
  }))
  await ps.invoke()

  const updatedFiles = await Promise.all(newFiles.map(async file => {
    const splited = file.dir.split('\\')
    const allImgFiles = await verifyCoverFile(`${resolve(__dirname, '..', 'assets', 'covers') + '\\' + splited[splited.length - 1]}`)
  
    const singleCover = await removeNoCoverFiles(allImgFiles)

    file.cover = singleCover
  
    return file
  }))
  updateCover(updatedFiles)
  await ps.invoke()
}

async function verifyCoverFile (dirFile) {
  const covers = readdirSync(dirFile, { withFileTypes: true })
  
  const allImgFiles = await Promise.all(covers.map(coverName => {
    const response = resolve(dirFile, coverName.name)
    if (coverName.isDirectory()) {
      return verifyCoverFile(response)
    } else if (coverName.name.indexOf('.jpg') !== -1 ||
      coverName.name.indexOf('.png') !== -1 ||
      coverName.name.indexOf('.jpeg') !== -1) {
        return response
    } else {
      return response + 'NOT IMAGE'
    }
  }))
  
  return Array.prototype.concat(...allImgFiles)
}

/**
 * @description Remove all the files that are not the cover of the comic book
 * @param {Object[]} fileDirs 
 * @returns {String} Directory of the cover
 */
async function removeNoCoverFiles (fileDirs) {
  // Delete everything thats not an image
  fileDirs.forEach((fileDir, index) => {
    if (fileDir.indexOf('NOT IMAGE') !== -1){
      const fullPath = fileDir.split('NOT IMAGE')[0]
      shell.moveItemToTrash(fullPath, true)
      fileDirs.splice(index, 1)
    }
  })
  // Delete all imgs expect the first one
  fileDirs.forEach((fileDir, index) => {
    if (index !== 0) {
      shell.moveItemToTrash(fileDir, true)
    }
  })
  return fileDirs[0].split('\\covers\\')[1].replace(/\\/g, "/")
}

function updateCover (files) {
  const dbFile = store.get('files')
  const storedFiles = dbFile ? JSON.parse(dbFile) : []
  
  storedFiles.map(x => {
    return files.filter(y => {
      if (x.name === y.name)
        x.cover = y.cover
        return x
    })
    })

  store.set('files', JSON.stringify([...storedFiles]))
}