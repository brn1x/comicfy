import React, { MouseEventHandler } from 'react';
import ComicFile from '../../@types/ComicFile';
import folderImg from '../../assets/folder-comics.png'
import styles from './styles.module.sass'

const ComicFolder = ({ openFolder, title, comics }: { openFolder: MouseEventHandler<HTMLDivElement>, title: string, comics: ComicFile[] }) => {
  return (
    <div className={styles['comic-folder']}>
      <div className={styles['folder-img']} onClick={openFolder}>
        <img src={folderImg} alt="folder-logo"></img>
        <div className={styles['title-div']}>
          <h1 className={styles.title}>{ title }</h1>
        </div>
      </div>
    </div>
  )
}

export default ComicFolder
