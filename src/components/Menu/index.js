import React from 'react';
import { useHistory } from 'react-router-dom';

import MenuTools from '../MenuTools';
import { PlusCircle } from 'react-feather'

import './styles.css';

const electron = window.require('electron');

const Menu = (props) => {
  const history = useHistory();

  function handleSetup () {
    history.push('/config')
  }

  function handleHome () {
    history.push('/')
  }

  function handleAddComic () {
    electron.ipcRenderer.send('toggle-dialog');
  }

  return (
    <div className="menu-container">
      <MenuTools />
      <ul>
        <li className={props.selected === 'Home' ? 'border-menu-item' : ''} onClick={handleHome}>Home</li>
        <li className={props.selected === 'Setup' ? 'border-menu-item' : ''} onClick={handleSetup}>Setup</li>
        <li className=""><PlusCircle onClick={handleAddComic} size={24} /></li>
      </ul>
    </div>
  )
};

export default Menu;