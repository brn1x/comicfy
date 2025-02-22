import { BrowserWindow } from 'electron'
import { unzipFile } from '../utils/unzip'
import { ArcFiles } from 'node-unrar-js'
import { join, resolve } from 'path'
import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { readFilesInDir } from './readFilesInDir'

interface OpenComicRquest {
  window: BrowserWindow
  comicPath: string
}

const imageTypes = ['jpeg', 'jpg', 'png']

export async function openComic({ window, comicPath }: OpenComicRquest): Promise<string[]> {
  window.webContents.send('loading')

  try {
    const response = await unzipFile(comicPath)

    if (response.success === false || !response.data) {
      window.webContents.send('loading')
      throw new Error(`not working ${response.error} | ${response.success}`)
    }

    const outputDir = `${resolve(__dirname, '..', 'renderer', 'assets', 'opened-comic')}`

    createComicImages(response.data, outputDir)

    const files = readFilesInDir(outputDir, true)

    window.webContents.send('loading')
    return files
  } catch (error) {
    console.log('[Error trying to open comic]', error)
    window.webContents.send('loading')
    throw new Error('not working')
  }
}

function createComicImages(
  extracted: ArcFiles<Uint8Array<ArrayBufferLike>>,
  outputDir: string
): void {
  extracted.files.toArray().forEach((file, index) => {
    const fileType = file.fileHeader.name.split('.').pop()

    if (!imageTypes.includes(fileType || '')) {
      return
    }

    const fileName = `${index}-comic.${fileType}` //file.fileHeader.name.split('/').pop()
    const outputFilePath = join(outputDir, fileName!)

    if (!existsSync(resolve(outputDir))) {
      mkdirSync(resolve(outputDir), {
        recursive: true
      })
    }

    if (!file?.extraction) {
      return
    }

    writeFileSync(outputFilePath, Buffer.from(file.extraction))
  })
}
