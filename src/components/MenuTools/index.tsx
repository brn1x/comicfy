import React from 'react'
import { Minimize2, Maximize2, X } from 'react-feather'

import styles from './styles.module.sass'

const MenuTools = () => {
  function maximizeWindow () {
  }
  
  function minizeWindow () {
  }
  
  function closeApp () {
  }

  return (
    <div className={styles['menu-tools-container']}>
      <Minimize2 onClick={minizeWindow} className={styles.icon} size={20} />
      <Maximize2 onClick={maximizeWindow} className={styles.icon} size={20} />
      <X onClick={closeApp} className={styles.icon} size={20} />
    </div>
  )
}

export default MenuTools
