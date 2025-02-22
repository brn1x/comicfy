import { createContext, useState, useContext, ReactNode } from 'react'
import { Comic } from '@main/entities/Comic'

interface ComicContextProps {
  comics: Comic[]
  setComics: (comics: Comic[]) => void
  selectedComic: Comic | null
  setSelectedComic: (comic: Comic | null) => void
  getComics: (payload: GetComicsInContextRequest) => Promise<void>
}

const ComicContext = createContext<ComicContextProps>({} as ComicContextProps)

interface GetComicsInContextRequest {
  serieId: string
}

// eslint-disable-next-line react/prop-types
export const ComicProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [comics, setComics] = useState<Comic[]>([])
  const [selectedComic, setSelectedComic] = useState<Comic | null>(null)

  async function getComicsInContext({ serieId }: GetComicsInContextRequest): Promise<void> {
    const getComics = (): Promise<Comic[]> =>
      window.electron.ipcRenderer.invoke('get-comics', serieId)

    const comics = await getComics()
    setComics(comics)
  }

  return (
    <ComicContext.Provider
      value={{
        comics,
        setComics,
        selectedComic,
        setSelectedComic,
        getComics: getComicsInContext
      }}
    >
      {children}
    </ComicContext.Provider>
  )
}

export const useComic = (): ComicContextProps => {
  const context = useContext(ComicContext)

  if (!context) {
    throw new Error('useComic must be used within a ComicProvider')
  }

  return context
}
