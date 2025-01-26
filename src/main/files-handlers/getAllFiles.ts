import { PathLike } from 'fs'
import { readdir } from 'fs/promises'
import { resolve } from 'path'

export async function getAllFiles(path: PathLike): Promise<string[]> {
  const dirs = await readdir(path, { withFileTypes: true })
  const files = await Promise.all(
    dirs.map((dir) => {
      const response = resolve(path as string, dir.name)
      if (dir.isDirectory()) {
        return getAllFiles(response)
      } else {
        return response
      }
    })
  )
  return Array.prototype.concat(...files)
}
