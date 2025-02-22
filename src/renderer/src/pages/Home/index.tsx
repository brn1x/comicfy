import React, { useEffect, useState } from 'react'

import Example from '@components/Example'
import { useMenu } from '@context/MenuContext'
import { useComic } from '@context/ComicContext'
import Layout from '@renderer/Layout'
import ComicCard from '@renderer/components/ComicCard'
import { List } from '@renderer/components/List'
import { useSerie } from '@renderer/context/SerieContext'
import SerieCard from '@renderer/components/SerieCard'
import { Serie } from '@main/entities/Serie'
import { FaArrowAltCircleLeft as ArrowLeft } from 'react-icons/fa'

/******  a68a7767-353c-459f-b1ab-d325779f5850  *******/
const Home: React.FC = () => {
  const { setSelected } = useMenu()
  const { comics, getComics } = useComic()
  const { series, getSeries, setSelectedSerie, selectedSerie } = useSerie()
  const [comicfiles, setComicfiles] = useState<string[]>([])

  const [loading, setLoading] = useState(false)

  const openDialog = (): void => window.electron.ipcRenderer.send('open-dialog')

  window?.electron?.ipcRenderer?.on('loading', () => setLoading(!loading))

  function handleSelecSerie(serie: Serie): void {
    setSelectedSerie(serie)
    getComics({ serieId: serie.id })
  }

  async function functionHandleUnSelecSerie(): Promise<void> {
    if (comicfiles.length) {
      const deleteOpenedComic = (): Promise<boolean> =>
        window.electron.ipcRenderer.invoke('delete-opened-comic')

      const response = await deleteOpenedComic()
      if (response) {
        setComicfiles([])
      }
    }
    setSelectedSerie(null)
  }

  async function handleComicCardClick(filePath: string): Promise<void> {
    const openComic = (): Promise<string[]> =>
      window.electron.ipcRenderer.invoke('open-comic', filePath)
    const filesFromIpc = await openComic()

    setComicfiles(filesFromIpc)
  }

  const renderSeriesList = (): JSX.Element => {
    return (
      <List>
        {loading
          ? Array.from({ length: 12 }).map((_, index) => (
              <SerieCard isLoading={loading} key={index} serieTitle="" />
            ))
          : series.map((serie) => {
              return (
                <SerieCard
                  onClick={() => handleSelecSerie(serie)}
                  isLoading={loading}
                  key={serie.id}
                  serieTitle={serie.title}
                />
              )
            })}
      </List>
    )
  }

  const renderComicsList = (): JSX.Element => {
    return (
      <List>
        {loading
          ? Array.from({ length: 12 }).map((_, index) => (
              <ComicCard isLoading={loading} key={index} coverPath="" comicTitle="" />
            ))
          : comics.map((comic) => {
              const coverPath = `file://${comic.coverPath}`
              return (
                <ComicCard
                  onClick={() => handleComicCardClick(comic.filePath)}
                  isLoading={loading}
                  key={comic.id}
                  coverPath={coverPath}
                  comicTitle={comic.title}
                />
              )
            })}
      </List>
    )
  }

  const renderImages = (): JSX.Element => {
    return (
      <div>
        {comicfiles.map((file, index) => (
          <img src={file} key={index} />
        ))}
      </div>
    )
  }

  useEffect(() => {
    setSelected('Home')
    getSeries()
  }, [loading, comicfiles.length])

  return (
    <Layout>
      {selectedSerie && (
        <ArrowLeft
          onClick={functionHandleUnSelecSerie}
          size={36}
          color={'#808099'}
          style={{ marginLeft: '20px', cursor: 'pointer' }}
        />
      )}
      {comicfiles.length ? renderImages() : selectedSerie ? renderComicsList() : renderSeriesList()}
      <Example />
      <button onClick={openDialog}>OpenDialog</button>
    </Layout>
  )
}

export default Home
