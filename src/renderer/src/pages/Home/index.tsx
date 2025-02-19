import { useEffect, useState } from 'react'

import Example from '@components/Example'
import { useMenu } from '@context/MenuContext'
import { useComic } from '@context/ComicContext'
import Layout from '@renderer/Layout'
import ComicCard from '@renderer/components/ComicCard'
import { List } from '@renderer/components/List'

const Home: React.FC = () => {
  const { setSelected } = useMenu()
  const { comics, getComics } = useComic()

  const [loading, setLoading] = useState(false)

  const openDialog = (): void => window.electron.ipcRenderer.send('open-dialog')

  window?.electron?.ipcRenderer?.on('loading', () => setLoading(!loading))

  useEffect(() => {
    setSelected('Home')
    getComics({ serieId: '' })
  }, [loading])

  return (
    <Layout>
      <Example />
      <button onClick={openDialog}>OpenDialog</button>

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
    </Layout>
  )
}

export default Home
