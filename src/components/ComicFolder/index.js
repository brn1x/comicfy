import React from 'react';

import folderImg from '../../assets/folder-comics.png'

import './styles.css'

const ComicFolder = (props) => {
  return (
    <div className="comic-folder">
      <div onClick={props.openFolder}>
        <img className="folder-img" src={folderImg} alt="folder-logo"></img>
        <div className="title-div">
          <h1 className="title">{ props.title }</h1>
        </div>
      </div>
    </div>
  )
};

export default ComicFolder;