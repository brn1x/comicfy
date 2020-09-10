import React from 'react'

import './styles.css'

const ComicCard = (props) => {
  console.log(props)
  const cover = require(`../../assets/covers/${props.cover}`)

  return (
    <div className="container" onClick={() => {props.openFile(props.dir)}}>
      <div>
        <img className="cover" src={cover} alt="Comic Cover"/>
      </div>
      <div className="title-div">
        <h1 className="title">{props.name}</h1>
      </div>
    </div>
  )
}

export default ComicCard