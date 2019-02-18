import React from 'react';
import TrackList from '../containers/TrackList';
import TrackSearch from '../containers/TrackSearch';

const TrackPicker = () =>
(
    <div className="col-md-6">
      <TrackSearch />
      <TrackList />
    </div>
);

export default TrackPicker;