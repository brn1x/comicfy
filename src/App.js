import React, { useEffect, useState } from 'react'

import ComicCard from '../src/components/ComicCard'

import './global.css'

const electron = window.require('electron')

function App() {
  function openDialog () {
    electron.ipcRenderer.send('toggle-dialog')
  }
  
  function showFiles () {
    electron.ipcRenderer.send('toggle-files')
  }

  function openFile (path) {
    console.log(path)
    electron.ipcRenderer.send('open-file', path)
  }

  const [comics, setComics] = useState([])

  useEffect(() => {
    electron.ipcRenderer.on('cbr-files', (event, arg) => {
      setComics(arg)
    })
  }, [])

  return (
    <div className="App">
      <button onClick={openDialog}>Add new directory</button>
      <button onClick={showFiles}>Log stored files</button>
      <div className="comic-list">
        { comics.map(comic => (
          <ComicCard key={comic.name} name={comic.name} folder={comic.folder} dir={comic.dir} openFile={openFile} />
        )) }
      </div>
    </div>
  );
}

export default App;
