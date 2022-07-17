import React from 'react'
import styles from './styles.module.sass'

import image from '../../assets/covers/common.jpg'

const ComicCard = ({ dir, name, openFile, folder, cover }: { dir: string, name: string, openFile: Function, folder?: string, cover?: string }) => {
  const coverDir = image.split('common.jpg')[0]
  
  const updatedCover = `${coverDir}${cover}`

  return (
    <div className={styles.container} onClick={() => {openFile(dir)}}>
      <div className={styles.cover}>
        <img 
          src={updatedCover}
          alt="Comic Cover"
          onError={(e)=>{ (e.target as HTMLImageElement).src=image }}
        />
      </div>
      <div className={styles['title-div']}>
        <h1 className={styles.title}>{name}</h1>
      </div>
    </div>
  )
}

export default ComicCard
