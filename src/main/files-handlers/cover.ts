import { readdirSync, existsSync, mkdirSync, writeFileSync } from 'fs'
import { join, resolve } from 'path'
import { shell } from 'electron'
import { File } from '../interfaces/file'
import { unzipFile } from '../utils/unzip'
import { ArcFiles } from 'node-unrar-js'
import { SPLIT_FILE_PATH } from '../utils/splitFilePath'

export async function getCover(file: File): Promise<File> {
  const outputDir = `${resolve(__dirname, '..', 'renderer', 'assets', 'covers') + SPLIT_FILE_PATH + file.name}`

  const response = await unzipFile(file.dir)

  if (response.success === false || !response.data) {
    throw new Error(response.error)
  }

  createCoversDir(response.data, outputDir)

  const allImgFiles = verifyCoverFile(outputDir)

  const singleCover = removeNoCoverFiles(allImgFiles as string[])

  file.cover = singleCover

  return file
}

export function createCoversDir(
  extracted: ArcFiles<Uint8Array<ArrayBufferLike>>,
  outputDir: string
): void {
  extracted.files.toArray().forEach((file, index) => {
    const fileMimeType = file.fileHeader.name.split('.').pop()
    const fileName = `${index}-cover.${fileMimeType}` //file.fileHeader.name.split('/').pop()
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
  for (const cover of covers) {
    const response = resolve(path as string, cover.name)
    if (cover.isDirectory()) {
      return verifyCoverFile(response)
    } else if (
      cover.name.includes('.jpg') ||
      cover.name.includes('.png') ||
      cover.name.includes('.jpeg')
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

  return fileDirs[0].split(SPLIT_FILE_PATH).pop()!
}
