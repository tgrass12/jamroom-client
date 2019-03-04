import React, {Component} from 'react';
import TrackQueue from '../components/TrackQueue';
import TrackPicker from '../components/TrackPicker';
import Player from './Player';

class Lobby extends Component {

  render() {

    return (
      <div className="container">
        <div className="row">
          <Player />
        </div>
        <div className="row">
          <TrackQueue />  
          <TrackPicker />  
        </div>
      </div>
    )
  }
}

export default Lobby;