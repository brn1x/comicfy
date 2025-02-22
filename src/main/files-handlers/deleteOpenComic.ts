import { resolve } from 'path'
import { readFilesInDir } from './readFilesInDir'
import { shell } from 'electron'

export function deleteOpenComic(): boolean {
  const outputDir = `${resolve(__dirname, '..', 'renderer', 'assets', 'opened-comic')}`

  const files = readFilesInDir(outputDir)

  files.forEach((fileDir, index) => {
    if (index !== 0) {
      shell.trashItem(fileDir)
    }
  })

  return true
}
