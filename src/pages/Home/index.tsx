import React, { useEffect, useState } from 'react'

import ComicCard from '../../components/ComicCard'
import ComicFolder from '../../components/ComicFolder'
import Loading from '../../components/Loading'
import Menu from '../../components/Menu'
import { ArrowLeft } from 'react-feather'

import styles from './styles.module.sass'
import ComicFile from '../../@types/ComicFile'
import ComicFolderType from '../../@types/ComicFolderType'

function Home() {
  function showFiles () {
    setComics([])
    // electron.ipcRenderer.send('toggle-files')
  }

  function openFolder (comics: ComicFile[]) {
    setComics(comics)
  }

  function openFile (path: string) {
    // electron.ipcRenderer.send('open-file', path)
  }

  const comicsMock = [
    {
      cover: "A Poderosa Thor v2 01 (2016) - Jason Aaron.cbr/A Poderosa Thor v2 01 (2016)/The Mighty Thor 001-000.jpg",
      dir: "C:\Users\bruno\Documents\HQ's\Thor\A Poderosa Thor V2\A Poderosa Thor v2 01 (2016) - Jason Aaron.cbr",
      folder: "A Poderosa Thor V2",
      name: "A Poderosa Thor v2 01 (2016) - Jason Aaron",
    },
    {
      cover: "A Poderosa Thor v2 01 (2016) - Jason Aaron.cbr/A Poderosa Thor v2 01 (2016)/The Mighty Thor 001-000.jpg",
      dir: "C:\Users\bruno\Documents\HQ's\Thor\A Poderosa Thor V2\A Poderosa Thor v2 01 (2016) - Jason Aaron.cbr",
      folder: "A Poderosa Thor V2",
      name: "A Poderosa Thor v2 01 (2016) - Jason Aaron",
    },
    {
      cover: "A Poderosa Thor v2 01 (2016) - Jason Aaron.cbr/A Poderosa Thor v2 01 (2016)/The Mighty Thor 001-000.jpg",
      dir: "C:\Users\bruno\Documents\HQ's\Thor\A Poderosa Thor V2\A Poderosa Thor v2 01 (2016) - Jason Aaron.cbr",
      folder: "A Poderosa Thor V2",
      name: "A Poderosa Thor v2 01 (2016) - Jason Aaron",
    },
    {
      cover: "A Poderosa Thor v2 01 (2016) - Jason Aaron.cbr/A Poderosa Thor v2 01 (2016)/The Mighty Thor 001-000.jpg",
      dir: "C:\Users\bruno\Documents\HQ's\Thor\A Poderosa Thor V2\A Poderosa Thor v2 01 (2016) - Jason Aaron.cbr",
      folder: "A Poderosa Thor V2",
      name: "A Poderosa Thor v2 01 (2016) - Jason Aaron",
    },
    {
      cover: "A Poderosa Thor v2 01 (2016) - Jason Aaron.cbr/A Poderosa Thor v2 01 (2016)/The Mighty Thor 001-000.jpg",
      dir: "C:\Users\bruno\Documents\HQ's\Thor\A Poderosa Thor V2\A Poderosa Thor v2 01 (2016) - Jason Aaron.cbr",
      folder: "A Poderosa Thor V2",
      name: "A Poderosa Thor v2 01 (2016) - Jason Aaron",
    },
    {
      cover: "A Poderosa Thor v2 01 (2016) - Jason Aaron.cbr/A Poderosa Thor v2 01 (2016)/The Mighty Thor 001-000.jpg",
      dir: "C:\Users\bruno\Documents\HQ's\Thor\A Poderosa Thor V2\A Poderosa Thor v2 01 (2016) - Jason Aaron.cbr",
      folder: "A Poderosa Thor V2",
      name: "A Poderosa Thor v2 01 (2016) - Jason Aaron",
    },
    {
      cover: "A Poderosa Thor v2 01 (2016) - Jason Aaron.cbr/A Poderosa Thor v2 01 (2016)/The Mighty Thor 001-000.jpg",
      dir: "C:\Users\bruno\Documents\HQ's\Thor\A Poderosa Thor V2\A Poderosa Thor v2 01 (2016) - Jason Aaron.cbr",
      folder: "A Poderosa Thor V2",
      name: "A Poderosa Thor v2 01 (2016) - Jason Aaron",
    },
    {
      cover: "A Poderosa Thor v2 01 (2016) - Jason Aaron.cbr/A Poderosa Thor v2 01 (2016)/The Mighty Thor 001-000.jpg",
      dir: "C:\Users\bruno\Documents\HQ's\Thor\A Poderosa Thor V2\A Poderosa Thor v2 01 (2016) - Jason Aaron.cbr",
      folder: "A Poderosa Thor V2",
      name: "A Poderosa Thor v2 01 (2016) - Jason Aaron",
    },
    {
      cover: "A Poderosa Thor v2 01 (2016) - Jason Aaron.cbr/A Poderosa Thor v2 01 (2016)/The Mighty Thor 001-000.jpg",
      dir: "C:\Users\bruno\Documents\HQ's\Thor\A Poderosa Thor V2\A Poderosa Thor v2 01 (2016) - Jason Aaron.cbr",
      folder: "A Poderosa Thor V2",
      name: "A Poderosa Thor v2 01 (2016) - Jason Aaron",
    },
    {
      cover: "A Poderosa Thor v2 01 (2016) - Jason Aaron.cbr/A Poderosa Thor v2 01 (2016)/The Mighty Thor 001-000.jpg",
      dir: "C:\Users\bruno\Documents\HQ's\Thor\A Poderosa Thor V2\A Poderosa Thor v2 01 (2016) - Jason Aaron.cbr",
      folder: "A Poderosa Thor V2",
      name: "A Poderosa Thor v2 01 (2016) - Jason Aaron",
    },
    {
      cover: "A Poderosa Thor v2 01 (2016) - Jason Aaron.cbr/A Poderosa Thor v2 01 (2016)/The Mighty Thor 001-000.jpg",
      dir: "C:\Users\bruno\Documents\HQ's\Thor\A Poderosa Thor V2\A Poderosa Thor v2 01 (2016) - Jason Aaron.cbr",
      folder: "A Poderosa Thor V2",
      name: "A Poderosa Thor v2 01 (2016) - Jason Aaron",
    },
  ]
  const [comics, setComics] = useState<ComicFile[]>(comicsMock)
  const [folders, setFolders] = useState<ComicFolderType[]>([
    {
      folder: 'Teste',
      comics: comicsMock
    }
  ])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    showFiles()

    // electron.ipcRenderer.on('loading', (event, arg) => {
    //   setIsLoading(true)
    // })

    // electron.ipcRenderer.on('not-loading', (event, arg) => {
    //   setIsLoading(false)
    // })

    // electron.ipcRenderer.on('cbr-files', (event, arg) => {
    //   const folders = Object.keys(arg)
    //   let onlyComics = []
    //   let newFolders = []
    //   folders.forEach(folder => {
    //     let aux = {
    //       folder: folder,
    //       comics: arg[folder]
    //     }
    //     newFolders.push(aux)
    //     onlyComics.push(...arg[folder])
    //   })

    //   setFolders(newFolders)
    // })
  }, [])

  if (isLoading) {
    return (
      <Loading />
    )
  } else {
    return (
      <div className={styles['content-container']}>
        <div className={styles['comics-container']}>
        { comics.length > 0 ? (
          <>
            <ArrowLeft onClick={showFiles} className={styles['arrow-left-icon']} />
            <div className={styles['comic-list']}>
              { comics.map(comic => (
                <ComicCard key={comic.name} name={comic.name} folder={comic.folder} dir={comic.dir} cover={comic.cover} openFile={openFile} />
              ))}
            </div>
          </>
        ) : (
          <div className={styles['comic-list']}>
            { folders.map(folder => (
                <ComicFolder key={folder.folder} title={folder.folder} comics={folder.comics} openFolder={() => openFolder(folder.comics)} />
            ))}
          </div>
        ) }
        </div>
      </div> 
    )
  }
}

export default Home
