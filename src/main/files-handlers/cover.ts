import { readdirSync, existsSync, mkdirSync, writeFileSync } from 'fs'
import { join, resolve } from 'path'
import { shell } from 'electron'
import { File } from '../interfaces/file'
import { unzipFile } from '../utils/unzip'
import { splitFilePath } from '../utils/splitFilePath'
import { ArcFiles } from 'node-unrar-js'

const SPLIT_PATH = splitFilePath()

export async function getCover(file: File): Promise<void> {
  const outputDir = `${resolve(__dirname, '..', 'renderer', 'assets', 'covers') + SPLIT_PATH + file.name}`

  const response = await unzipFile(file.dir)

  if (response.success === false || !response.data) {
    throw new Error(response.error)
  }

  createCoversDir(response.data, outputDir)

  const allImgFiles = await verifyCoverFile(outputDir)

  const singleCover = await removeNoCoverFiles(allImgFiles as string[])

  file.cover = singleCover
  console.log('Agora vai', file.cover)
}

export function createCoversDir(
  extracted: ArcFiles<Uint8Array<ArrayBufferLike>>,
  outputDir: string
): void {
  extracted.files.toArray().forEach((file) => {
    const fileName = file.fileHeader.name.split('/').pop()
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

export function verifyCoverFile(path: string): string[] {
  const covers = readdirSync(path, { withFileTypes: true })

  const allImgFiles: string[] = []
  for (let i = 0; i < covers.length; i++) {
    const response = resolve(path as string, covers[i].name)
    if (covers[i].isDirectory()) {
      return verifyCoverFile(response)
    } else if (
      covers[i].name.indexOf('.jpg') !== -1 ||
      covers[i].name.indexOf('.png') !== -1 ||
      covers[i].name.indexOf('.jpeg') !== -1
    ) {
      allImgFiles.push(response)
    } else {
      allImgFiles.push(response + 'NOT IMAGE')
    }
  }
  return Array.prototype.concat(...allImgFiles)
}

/**
 * @description Remove all the files that are not the cover of the comic book
 * @param {Object[]} fileDirs
 * @returns {String} Directory of the cover
 */
export function removeNoCoverFiles(fileDirs: string[]): string {
  // Delete everything thats not an image
  fileDirs.forEach((fileDir, i) => {
    if (fileDir.indexOf('NOT IMAGE') !== -1) {
      const fullPath = fileDir.split('NOT IMAGE')[0]
      shell.trashItem(fullPath)
      fileDirs.splice(i, 1)
    }
  })

  // Delete all imgs except the first one
  fileDirs.forEach((fileDir, index) => {
    if (index !== 0) {
      shell.trashItem(fileDir)
    }
  })

  return fileDirs[0].split(SPLIT_PATH).pop()!
}
