import React from 'react';
import MenuTools from '../MenuTools';
import { PlusCircle } from 'react-feather'

import './styles.css';

const Menu = (props) => {
  return (
    <div className="menu-container">
      <MenuTools />
      <ul>
        <li>Home</li>
        <li>Setup</li>
        <li><PlusCircle onClick={props.handleAddComic} size={24} /></li>
      </ul>
    </div>
  )
};

export default Menu;