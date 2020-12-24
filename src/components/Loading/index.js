import React from 'react';

import './styles.css';

const Loading = (props) => {
  return (
    <div className="loading-container">
      <div className="loader"></div>
      <p className="loading-font">Loading, please wait</p>
      <p className="loading-font">Accordingly to Comic Books quantity, it must take longer</p>
    </div>
  )
};

export default Loading;