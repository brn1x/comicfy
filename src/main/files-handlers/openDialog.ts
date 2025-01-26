import { Dialog, BrowserWindow } from 'electron'
import { getAllFiles } from './getAllFiles'

interface OpenDialogRequest {
  window: BrowserWindow
  dialog: Dialog
}

export async function openDialog({ window, dialog }: OpenDialogRequest): Promise<void> {
  console.log('Salve!', window, dialog)
  window.webContents.send('loading')
  const path = dialog.showOpenDialogSync({ properties: ['openDirectory'] })

  if (!path) {
    window.webContents.send('loading')
    return
  }

  const allFiles = await getAllFiles(path[0])
  const cbrFiles = allFiles.filter((file) => file.includes('.cbr'))

  const hq = cbrFiles.map((cbrFile) => {
    const splited = cbrFile.split('\\')

    const file = {
      name: splited[splited.length - 1].replace('.cbr', ''),
      folder: splited[splited.length - 2],
      dir: cbrFile,
      cover: 'common.jpg'
    }

    return file
  })
  console.log(hq)

  // await storeFiles(hq)
  window.webContents.send('loading')
}
