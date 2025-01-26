const Example: React.FC = () => {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <div className="action">
      <button onClick={ipcHandle}>Send IPC</button>
    </div>
  )
}

export default Example
