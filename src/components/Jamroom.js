import React from 'react';
import TrackQueue from './TrackQueue';
import TrackPicker from './TrackPicker';
import Player from '../containers/Player';

const Jamroom = () => (
  <div className="container">
    <div className="row">
      <Player />
    </div>
    <div className="row">
      <TrackQueue />  
      <TrackPicker />  
    </div>
  </div>
);  

export default Jamroom;