import { useEffect, useState } from 'react'

import Example from '@components/Example'
import { useMenu } from '@context/MenuContext'
import { useComic } from '@context/ComicContext'
import Layout from '@renderer/Layout'

const Home: React.FC = () => {
  const { setSelected } = useMenu()
  const { comics, getComics } = useComic()

  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState<string[]>([])

  const openDialog = (): void => window.electron.ipcRenderer.send('open-dialog')

  window?.electron?.ipcRenderer?.on('loading', () => setLoading(!loading))

  useEffect(() => {
    setSelected('Home')
    getComics({ serieId: '' })

    const loadImages = (): void => {
      const imgPaths = window.electronAPI.getImages()
      setImages(imgPaths)
    }

    loadImages()
  }, [])

  return (
    <Layout>
      <Example />
      <button onClick={openDialog}>OpenDialog</button>
      {loading ? (
        <div>Loading...</div>
      ) : (
        comics.map((comic, index) => {
          console.log('[Found Images]', images)

          return (
            <div key={comic.id}>
              <h1>{comic.title}</h1>
              <img src={images[index]} />
            </div>
          )
        })
      )}
    </Layout>
  )
}

export default Home
