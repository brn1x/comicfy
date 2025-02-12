export function splitFilePath(): string {
  const platform = process.platform
  if (platform === 'darwin') {
    return '/'
  } else if (platform === 'linux') {
    return '/'
  } else if (platform === 'win32') {
    return '\\'
  }

  return '/'
}
