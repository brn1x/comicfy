import React, { useEffect, useState } from 'react';

import ComicCard from '../../components/ComicCard';
import ComicFolder from '../../components/ComicFolder';
import Loading from '../../components/Loading';
import Menu from '../../components/Menu';
import { ArrowLeft } from 'react-feather'

import '../../global.css';
import './styles.css';

const electron = window.require('electron');

function Home() {
  function openDialog () {
    electron.ipcRenderer.send('toggle-dialog');
  }
  
  function showFiles () {
    setComics([])
    electron.ipcRenderer.send('toggle-files');
  }

  function openFolder (comics) {
    setComics(comics)
  }

  function openFile (path) {
    electron.ipcRenderer.send('open-file', path);
  }

  const [comics, setComics] = useState([]);
  const [folders, setFolders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    showFiles()

    electron.ipcRenderer.on('loading', (event, arg) => {
      setIsLoading(true)
    });

    electron.ipcRenderer.on('not-loading', (event, arg) => {
      setIsLoading(false)
    });

    electron.ipcRenderer.on('cbr-files', (event, arg) => {
      const folders = Object.keys(arg);
      let onlyComics = [];
      let newFolders = []
      folders.forEach(folder => {
        let aux = {
          folder: folder,
          comics: arg[folder]
        };
        newFolders.push(aux);
        onlyComics.push(...arg[folder]);
      });

      setFolders(newFolders);
    })
  }, []);

  return (
    <div>
      <Menu handleAddComic={openDialog} />
      { isLoading ? 
      ( 
        <Loading />
      ) : 
      ( 
        <>
          { comics.length > 0 ? (
            <div className="comics-container">
              <ArrowLeft onClick={showFiles} className="arrow-left-icon" />
              <div className="comic-list">
                { comics.map(comic => (
                  <ComicCard key={comic.name} name={comic.name} folder={comic.folder} dir={comic.dir} cover={comic.cover} openFile={openFile} />
                ))}
              </div>
            </div>
          ) : (
            <div className="comic-list">
              { folders.map(folder => (
                  <ComicFolder key={folder.folder} title={folder.folder} comics={folder.comics} openFolder={() => openFolder(folder.comics)} />
              ))}
            </div>
          ) }
        </> 
      ) }
      
    </div>
  );
}

export default Home;
