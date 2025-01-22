const Example: React.FC = () => {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <div className="action">
      <a target="_blank" rel="noreferrer" onClick={ipcHandle}>
        Send IPC
      </a>
    </div>
  )
}

export default Example
