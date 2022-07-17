import React from 'react'
import { useNavigate } from 'react-router-dom'

import MenuTools from '../MenuTools'
import { PlusCircle } from 'react-feather'
import styles from './styles.module.sass'

// const electron = window.require('electron');

const Menu = ({ selected }: { selected: string }) => {
  const navigate = useNavigate();

  function handleSetup () {
    navigate('/config')
  }

  function handleHome () {
    navigate('/')
  }

  function handleAddComic () {
    // electron.ipcRenderer.send('toggle-dialog')
  }

  return (
    <div className={styles['menu-container']} style={{ backgroundColor: 'rgba(85,85,85,0.5)' }}>
      <MenuTools />
      <ul data-tauri-drag-region>
        <li className={selected === 'Home' ? styles['border-menu-item'] : ''} onClick={handleHome}>Home</li>
        <li className={selected === 'Setup' ? styles['border-menu-item'] : ''} onClick={handleSetup}>Setup</li>
        <li className=""><PlusCircle onClick={handleAddComic} size={24} /></li>
      </ul>
    </div>
  )
}

export default Menu
