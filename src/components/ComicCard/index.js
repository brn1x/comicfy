import React from 'react'

import './styles.css'

const ComicCard = (props) => {
  return (
    <div className="container" onClick={() => {props.openFile(props.dir)}}>
      <div>
        <img src={props.cover} alt="Comic Cover"/>
      </div>
      <div className="title-div">
        <h1 className="title">{props.name}</h1>
      </div>
    </div>
  )
}

export default ComicCard