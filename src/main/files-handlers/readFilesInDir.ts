import { existsSync, readdirSync } from 'fs'
import { join } from 'path'

const imageTypes = ['jpeg', 'jpg', 'png']

export function readFilesInDir(dir: string, onlyImages = false): string[] {
  const files = existsSync(dir) ? readdirSync(dir) : []

  if (onlyImages) {
    return files
      .filter((file) => imageTypes.includes(file.split('.').pop() || ''))
      .map((file) => join(dir, file))
  }

  return files.map((file) => join(dir, file))
}
