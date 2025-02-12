import * as fs from 'fs'
import unrar, { ArcFiles } from 'node-unrar-js'

interface UnzipFileResponse {
  success: boolean
  error?: string
  data?: ArcFiles<Uint8Array<ArrayBufferLike>>
}

export async function unzipFile(filePath: string): Promise<UnzipFileResponse> {
  try {
    const buf = Uint8Array.from(fs.readFileSync(filePath)).buffer
    const extractor = await unrar.createExtractorFromData({ data: buf })

    const list = extractor.getFileList()
    const fileHeaders = [...list.fileHeaders]

    if (fileHeaders.length === 0) {
      return { success: false, error: 'No files found inside the archive!' }
    }

    const extracted = extractor.extract({ files: fileHeaders.map((f) => f.name) })

    return { success: true, data: extracted }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message }
    }
    console.error('Unknown error:', error)
    return { success: false, error: `Internal error - ${error}` }
  }
}
