import React from 'react'

import DefaultCover from '@assets/folder-comics.png'

import { SerieContainer, SerieCover, SerieTitle } from './style'

interface SerieCardProps extends React.HTMLAttributes<HTMLDivElement> {
  coverPaths?: string[]
  serieTitle: string
  isLoading: boolean
  onClick?: () => void
}

const SerieCard: React.FC<SerieCardProps> = ({ isLoading, serieTitle, onClick }) => {
  return (
    <SerieContainer loading={isLoading} onClick={onClick}>
      <SerieCover loading={isLoading}>
        {!isLoading && <img src={DefaultCover} alt="Comic cover image" />}
      </SerieCover>
      <SerieTitle loading={isLoading}>{!isLoading ? serieTitle : ''}</SerieTitle>
    </SerieContainer>
  )
}

export default SerieCard
