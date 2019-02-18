import React from 'react';

const Track = ({title, artist, albumArt, uri, isQueue, isActive, addToQueue, removeFromQueue}) => (
  <li className="list-group-item">
    <div className="track-details">
      <div style={{'display': 'inline-block'}}>
        <img alt='' className="track-album-art" src={albumArt}/>
      </div>
      <div>
        <div className="track-info">
          <p className="track-title">{title}</p>
          <p className="track-artist">{artist}</p>
        </div>
      </div>
    </div>
    <div className="btn-container">
    { !isQueue && !isActive && (
      <button 
        className="btn btn-track btn-primary" 
        onClick={addToQueue}>
        +
      </button>
    )}
    { isQueue && (
      <button 
        className="btn btn-track btn-primary" 
        onClick={removeFromQueue}>
        -
      </button>
    )}
    </div>
  </li>
);

export default Track;