import { contextBridge, app } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { mkdirSync, existsSync, readdirSync, statSync } from 'fs'
import path, { resolve } from 'path'

// Custom APIs for renderer
const api = {}

const getImages = (): string[] => {
  const coversPath = path.join(__dirname, '..', 'renderer', 'assets', 'covers')
  if (!existsSync(coversPath)) {
    return []
  }

  const subfolders = readdirSync(coversPath).filter((folder) =>
    statSync(path.join(coversPath, folder)).isDirectory()
  )

  const imagePaths = subfolders.flatMap((subfolder) => {
    const subfolderPath = path.join(coversPath, subfolder)
    return readdirSync(subfolderPath)
      .filter((file) => file.match(/\.(png|jpg|jpeg|gif)$/i)) // Only images
      .map((file) => `file://${path.join(subfolderPath, file)}`)
  })

  return imagePaths
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)

    contextBridge.exposeInMainWorld('electronAPI', {
      getAssetsPath: (): string => path.join(app.getAppPath(), 'assets')
    })

    contextBridge.exposeInMainWorld('electronAPI', {
      getImages
    })
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
  // @ts-ignore (define in dts)
  window.electronAPI = {
    getImages
  }
}

if (!existsSync(resolve(__dirname, '..', 'renderer', 'assets', 'covers'))) {
  mkdirSync(resolve(__dirname, '..', 'renderer', 'assets', 'covers'), { recursive: true })
}
