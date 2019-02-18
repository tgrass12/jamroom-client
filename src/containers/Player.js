import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUserDevices, playTrack, resumePlayback, pausePlayback, setDevice} from '../services/spotify';
import {removeFromQueue} from '../store/actions/queue';

import PlaybackControls from '../components/PlaybackControls';
import Device from '../components/Device';
import Track from '../components/Track';

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTrack: null,
      currentTrackDuration: 0,
      devices: [],
      triggerQueueChange: null,
      isPlaying: false
    }

    this.getDevices = this.getDevices.bind(this);
    this.advanceQueue = this.advanceQueue.bind(this);
    this.pausePlayback = this.pausePlayback.bind(this);
    this.resumePlayback = this.resumePlayback.bind(this);
  }

  componentWillMount() {
    this.getDevices();
  }

  async setActiveDevice(deviceId) {
    await setDevice(deviceId);
    this.getDevices();
  }

  async getDevices() {
    const rawDevices = await getUserDevices();
    const devices = rawDevices.map(d => (
      {
        id: d.id,
        isActive: d.is_active,
        name: d.name
      }
    ));
    this.setState({devices: devices});
  }

  pausePlayback() {
    const queueTrigger = this.state.triggerQueueChange;
    clearInterval(queueTrigger);
    this.setState({
      triggerQueueChange: null,
      isPlaying: false
    })
    pausePlayback();
  }

  async resumePlayback() {
    const timePassed = await resumePlayback();
    const triggerQueue = setTimeout(
      this.advanceQueue,
      this.state.currentTrackDuration - timePassed
    );
    this.setState({
      triggerQueueChange: triggerQueue,
      isPlaying: true
    })
  }

  advanceQueue() {
    const trackToPlay = this.props.queue.shift();
    if (trackToPlay) {
      const triggerQueue = setTimeout(this.advanceQueue, trackToPlay.duration);
      playTrack(trackToPlay.uri);
      this.setState({
        currentTrack: trackToPlay,
        triggerQueueChange: triggerQueue,
        isPlaying: true,
        currentTrackDuration: trackToPlay.duration
      });
    }
    else if (!trackToPlay && !!this.state.currentTrack) {
      this.setState({
        currentTrack: null,
        currentTrackDuration: 0
      });
      this.pausePlayback();
    }
    this.props.removeFromQueue(trackToPlay);  
  }

  render() {
    const {title, artist, albumArt, uri} = this.state.currentTrack || {};
    const {devices, isPlaying, currentTrack} = this.state;
    const deviceComponents = devices.map(d => {
      return (
        <Device
          key={d.id}
          name={d.name} 
          isActive={d.isActive}
          setActive={this.setActiveDevice.bind(this, d.id)}
          />
        )
    }
    );

    return (
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-6">
            <h1>Current Track</h1>
          {!!currentTrack && (
            <div>
              <Track 
                title={title}
                artist={artist}
                albumArt={albumArt}
                uri={uri}
                isActive
              />
            </div>
          )}
          <PlaybackControls
            track={currentTrack}
            playTrack={this.resumePlayback}
            nextTrack={this.advanceQueue}
            pauseTrack={this.pausePlayback}
            isPlaying={isPlaying} />
          </div>
          <div className="col-md-6">
            <h3 style={{'display': 'inline-block'}}>Devices</h3>
              <button 
                style={{'marginLeft': '20px'}} 
                className="btn btn-primary"
                onClick={this.getDevices}>
                Get Devices
              </button>
            {devices.length === 0 && (
              <p>No valid devices.</p>
            )}
            <ul>
              {deviceComponents}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return ({
    queue: state.queue
  });
}

export default connect(mapStateToProps, {removeFromQueue})(Player);