import { createContext, useState, useContext, ReactNode } from 'react'
import { Serie } from '@main/entities/Serie'

interface SerieContextProps {
  series: Serie[]
  setSeries: (series: Serie[]) => void
  selectedSerie: Serie | null
  setSelectedSerie: (serie: Serie | null) => void
  getSeries: () => Promise<void>
}

const SerieContext = createContext<SerieContextProps>({} as SerieContextProps)

// eslint-disable-next-line react/prop-types
export const SerieProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [series, setSeries] = useState<Serie[]>([])
  const [selectedSerie, setSelectedSerie] = useState<Serie | null>(null)

  async function getSeriesInContext(): Promise<void> {
    const getSeries = (): Promise<Serie[]> => window.electron.ipcRenderer.invoke('get-series')

    const series = await getSeries()
    setSeries(series)
  }

  return (
    <SerieContext.Provider
      value={{
        getSeries: getSeriesInContext,
        series,
        setSeries,
        selectedSerie,
        setSelectedSerie
      }}
    >
      {children}
    </SerieContext.Provider>
  )
}

export const useSerie = (): SerieContextProps => {
  const context = useContext(SerieContext)

  if (!context) {
    throw new Error('useSerie must be used within a SerieProvider')
  }

  return context
}
