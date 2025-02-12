import { Dialog, BrowserWindow } from 'electron'
import { getAllFiles } from './getAllFiles'
import { File } from '../interfaces/file'
import { getCover } from './cover'
import { splitFilePath } from '../utils/splitFilePath'

interface OpenDialogRequest {
  window: BrowserWindow
  dialog: Dialog
}

const SPLIT_PATH = splitFilePath()

export async function openDialog({ window, dialog }: OpenDialogRequest): Promise<void> {
  window.webContents.send('loading')
  const path = dialog.showOpenDialogSync({ properties: ['openDirectory'] })

  if (!path?.length) {
    window.webContents.send('loading')
    return
  }

  const allFiles = await getAllFiles(path[0])
  const cbrFiles = allFiles.filter((file) => file.includes('.cbr'))

  const hqs = cbrFiles.map((cbrFile) => {
    const splited = cbrFile.split(SPLIT_PATH)

    const file: File = {
      name: splited[splited.length - 1].replace('.cbr', ''),
      folder: splited[splited.length - 2],
      dir: cbrFile,
      cover: 'common.jpg'
    }

    return file
  })
  try {
    Promise.all(
      hqs.map(async (hq) => {
        await getCover(hq)
      })
    )
  } catch (error) {
    console.log(error)
  }

  // await storeFiles(hq)
  window.webContents.send('loading')
}
