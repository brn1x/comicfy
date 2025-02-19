import { Dialog, BrowserWindow } from 'electron'
import { getAllFiles } from './getAllFiles'
import { File } from '../interfaces/file'
import { getCover } from './cover'
import { SPLIT_FILE_PATH } from '../utils/splitFilePath'
import { createSerie, findSerie } from '../repositories/serieRepository'
import { Serie } from '../entities/Serie'
import { createManyComics, findManyComics } from '../repositories/comicRepository'
import { Comic } from '../entities/Comic'
import { eraseDb } from '../repositories/utilsRepository'

interface OpenDialogRequest {
  window: BrowserWindow
  dialog: Dialog
}

interface GetSerieProps {
  hq: File
  path: string
}

export async function openDialog({ window, dialog }: OpenDialogRequest): Promise<void> {
  window.webContents.send('loading')

  await eraseDb()

  const path = dialog.showOpenDialogSync({ properties: ['openDirectory'] })

  if (!path?.length) {
    window.webContents.send('loading')
    return
  }

  const allFiles = await getAllFiles(path[0])
  const cbrFiles = allFiles.filter((file) => file.includes('.cbr'))

  const hqs = cbrFiles.map((cbrFile) => {
    const splited = cbrFile.split(SPLIT_FILE_PATH)

    const file: File = {
      name: splited[splited.length - 1].replace('.cbr', ''),
      folder: splited[splited.length - 2],
      dir: cbrFile,
      cover: 'common.jpg'
    }

    return file
  })
  try {
    const files = await Promise.all(
      hqs.map(async (hq) => {
        return await getCover(hq)
      })
    )

    if (!files?.length) {
      window.webContents.send('loading')
      return
    }

    const seriePath = files[0].dir.split(files[0].name)[0]

    const serie = await getSerie({ hq: files[0], path: seriePath })

    const findComics = await findManyComics({ serieId: serie.id })

    const filteredFiles = files.filter((files) => {
      return !findComics.some((comic) => comic.title === files.name)
    })

    const teste = Array.from({ length: 5 }, () => filteredFiles).flat()

    const createdComics = teste.map((file) => {
      return Comic.create({
        title: file.name,
        filePath: file.dir,
        coverPath: file.cover,
        serieId: serie.id
      })
    })
    const comics = await createManyComics(createdComics)
    console.log('[Comics Created]', comics)
  } catch (error) {
    console.log(error)
  }

  // await storeFiles(hq)
  window.webContents.send('loading')
}

async function getSerie({ hq, path }: GetSerieProps): Promise<Serie> {
  const seriesExists = await findSerie({ title: hq.folder })
  if (!seriesExists) {
    const createdSerie = Serie.create({ title: hq.folder, filePath: path })
    return await createSerie(createdSerie)
  }

  return seriesExists
}
