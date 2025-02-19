import React from 'react'
import { ComicContainer, ComicCover, ComicTitle } from './style'

interface ComicCardProps {
  coverPath: string
  comicTitle: string
  isLoading: boolean
}

const ComicCard: React.FC<ComicCardProps> = ({ comicTitle, coverPath, isLoading }) => {
  return (
    <ComicContainer loading={isLoading}>
      <ComicCover loading={isLoading}>
        {!isLoading && <img src={coverPath} alt="Comic cover image" />}
      </ComicCover>
      <ComicTitle loading={isLoading}>{!isLoading ? comicTitle : ''}</ComicTitle>
    </ComicContainer>
  )
}

export default ComicCard
