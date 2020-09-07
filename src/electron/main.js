const { app, BrowserWindow, dialog, shell, ipcMain } = require('electron')
const isDev = require('electron-is-dev');   
const { resolve, join } = require('path');
const { readdir } = require('fs').promises
const Store = require('electron-store')

let window

const config = {
  width: 900,
  height: 600,
  frame: true,
  defaultEncoding: 'utf8',
  webPreferences: {
    nodeIntegration: true
  }
}

const schema = {
  files: {
    type: 'string'
  }
}

const store = new Store({ schema })

const createWindow = async () => {
  store.delete('files')

  window = new BrowserWindow(config)

  const startURL = isDev ? 'http://localhost:3000' : `file://${join(__dirname, '../build/index.html')}`

  window.loadURL(startURL)
  window.webContents.openDevTools()

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

/**
 * Renderer listeners
 */
ipcMain.on('toggle-dialog', async (event, arg) => {
  await openDialog()
})

ipcMain.on('toggle-files', (event, arg) => {
  console.log('CBR', getStoreFiles())
  window.send('cbr-files', getStoreFiles())
})

ipcMain.on('open-file', (event, arg) => {
  openFile(arg)
})


/**
 * Functions [UTILS]
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

async function openDialog () {
  const path = dialog.showOpenDialogSync({ properties: ['openDirectory'] })

  const allFiles = await getAllFiles(path[0])
  const cbrFiles = allFiles.filter(file => file.includes('.cbr'))

  const hq = cbrFiles.map(cbrFile => {
    const splited = cbrFile.split('\\')
    const file = {
      name: splited[splited.length - 1],
      folder: splited[splited.length - 2],
      dir: cbrFile
    }
    return file
  })

  storeFiles(hq)
}

function storeFiles (files) {
  store.set('files', JSON.stringify([...files]))
}

function getStoreFiles () {
  const storedFiles = store.get('files')
  const files = storeFiles ? JSON.parse(storedFiles) : []

  return files
}

async function openFile (path) {
  await shell.openPath(path)
}