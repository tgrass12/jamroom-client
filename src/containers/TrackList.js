import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { 
  addToLobbyQueue, 
  getLobbyQueue, 
  removeFromLobbyQueue 
} from '../store/actions/queue';
import Track from '../components/Track';

class TrackList extends Component {
  componentDidMount() {
    if(this.props.isQueue) {
      const lobbyId = this.props.match.params.id;
      this.props.getLobbyQueue(lobbyId);
    }
  }

  addToQueue(trackInfo) {
    const uid = `${Date.now()}:${trackInfo.uri}`;
    //TODO: Remove all dependencies to withRouter for lobbyId by fixing state
    this.props.addToLobbyQueue(
      this.props.match.params.id,
      {...trackInfo, uid: uid}
    );
  }

  removeFromQueue(trackInfo) {
    this.props.removeFromLobbyQueue(
      this.props.match.params.id,
      trackInfo
    );
  }

  render() {
    const {isQueue, tracks, queue} = this.props;
    const trackSource = isQueue ? queue : tracks;
    const trackList = trackSource.map(t => (
      //A track in the search bar can use it's unique ID as it's URI as it will
      //only appear once.  When added to the queue, a song can be added multiple
      //times, so we create a new uid with the uri and time it was added
      <Track 
        key={t.uid || t.uri}
        artist={t.artist}
        title={t.title}
        albumArt={t.albumArt}
        uri={t.uri}
        isQueue={isQueue}
        addToQueue={this.addToQueue.bind(this, t)}
        removeFromQueue={this.removeFromQueue.bind(this, t)}
      />
    ));
    return (   
      <div className="card">
        <div className="card-header">
          { !isQueue && 'Tracks'}
          { isQueue && 'Queue' }
        </div>
        <ul className="list-group list-group-flush">
          {trackList.length === 0 && !isQueue && 'No tracks found.'}
          {trackList}
        </ul>
      </div>
    );    
  }
}

function mapStateToProps(state) {
  return ({
    tracks: state.tracks,
    queue: state.queue
  })
}

export default withRouter(connect(
  mapStateToProps, 
  {addToLobbyQueue, getLobbyQueue, removeFromLobbyQueue})(TrackList)
);