import React from 'react';
import { Minimize2, Maximize2, X } from 'react-feather'

import './styles.css';

const electron = window.require('electron');

const MenuTools = (props) => {
  function maximizeWindow () {
    electron.ipcRenderer.send('maximize-window');
  }
  
  function minizeWindow () {
    electron.ipcRenderer.send('minimize-window');
  }
  
  function closeApp () {
    electron.ipcRenderer.send('close-app');
  }

  return (
    <>
      <div className="draggable-area"></div>
      <div className="menu-tools-container">
        <Minimize2 onClick={minizeWindow} className="icon" size={20} />
        <Maximize2 onClick={maximizeWindow} className="icon" size={20} />
        <X onClick={closeApp} className="icon" size={20} />
      </div>
    </>
  );
};

export default MenuTools;