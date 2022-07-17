import React from 'react'
import styles from './styles.module.sass'

const Loading = ({ language }: { language?: string }) => {
  return (
    <div className={styles['loading-container']}>
      <div className={styles.loader}></div>
      <p className={styles['loading-font']}>Loading, please wait</p>
      <p className={styles['loading-font']}>Accordingly to Comic Books quantity, it must take longer</p>
    </div>
  )
}

export default Loading
