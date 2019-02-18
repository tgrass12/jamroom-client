import React from 'react';

const PlaybackControls = ({track, nextTrack, playTrack, pauseTrack, isPlaying}) => (
  <div>
  {!track && (
    <div>
      <p> No Track Yet </p>
      <button 
        className="btn btn-primary"
        onClick={nextTrack}>Start Playing</button>
    </div>
  )}
  {!!track && isPlaying && (
    <button 
      className="btn btn-primary btn-playback"
      onClick={pauseTrack}>
      Pause
    </button>
  )}
  {!!track && !isPlaying && (
    <button 
      className="btn btn-primary btn-playback"
      onClick={playTrack}>
      Play
    </button>
  )}
  {!!track && (
    <button 
      className="btn btn-primary btn-playback"
      onClick={nextTrack}>
      Next
    </button>
  )}
  </div>
)

export default PlaybackControls;