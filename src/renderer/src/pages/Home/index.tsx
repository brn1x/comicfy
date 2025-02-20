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

const Home: React.FC = () => {
  const { setSelected } = useMenu()
  const { comics, getComics } = useComic()
  const { series, getSeries, setSelectedSerie, selectedSerie } = useSerie()

  const [loading, setLoading] = useState(false)

  const openDialog = (): void => window.electron.ipcRenderer.send('open-dialog')

  window?.electron?.ipcRenderer?.on('loading', () => setLoading(!loading))

  function handleSelecSerie(serie: Serie): void {
    console.log('Clicou!')
    setSelectedSerie(serie)
    getComics({ serieId: serie.id })
  }

  function functionHandleUnSelecSerie(): void {
    setSelectedSerie(null)
  }

  const renderSeriesList = (): JSX.Element => {
    return (
      <List>
        {loading
          ? Array.from({ length: 12 }).map((_, index) => (
              <SerieCard isLoading={loading} key={index} serieTitle="" />
            ))
          : series.map((serie) => {
              const handleClick = (): void => handleSelecSerie(serie)
              return (
                <SerieCard
                  onClick={handleClick}
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

  useEffect(() => {
    setSelected('Home')
    getSeries()
  }, [loading])

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
      {selectedSerie ? renderComicsList() : renderSeriesList()}
      <Example />
      <button onClick={openDialog}>OpenDialog</button>
    </Layout>
  )
}

export default Home
