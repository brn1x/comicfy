const { app, BrowserWindow, Tray, dialog, shell } = require('electron')
const isDev = require('electron-is-dev');   
const { resolve, join } = require('path')
const { readdir } = require('fs').promises

let window

const config = {
  width: 800,
  height: 600,
  frame: true,
  defaultEncoding: 'utf8',
  webPreferences: {
    nodeIntegration: true
  }
}

const createWindow = async () => {
  window = new BrowserWindow(config)

  const startURL = isDev ? 'http://localhost:3000' : `file://${join(__dirname, '../build/index.html')}`

  window.loadURL(startURL)
  // window.webContents.openDevTools()

  const tray = new Tray(resolve(__dirname, '..', 'assets', 'iconTemplate.png'))
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

  const a = await shell.openPath(hq[0].dir)
  console.log('CBR', hq)
  console.log(a)
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
