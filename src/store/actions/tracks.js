import { GET_TRACKS } from '../actionTypes';
import axios from 'axios';
import {getAccessToken} from '../../services/api';

export function fetchTracks(trackQuery) {
  return async dispatch => {
    const token = await getAccessToken();
    const authHeader = `Bearer ${token}`;
    const encoded = trackQuery.replace(' ', '+');
    const query = `?type=track,artist&q="${encoded}"`
    return axios.get(`https://api.spotify.com/v1/search${query}`,
    {
      headers: 
      {
        'Authorization': authHeader
      }
    }).then(res => {
      const tracks = res.data.tracks.items.map(t => {
        const artists = t.artists.map(a =>  a.name).join(',');
        return {
          'artist': artists,
          'title': t.name,
          'albumArt': t.album.images[t.album.images.length - 1].url,
          'uri': t.uri,
          'duration': t.duration_ms
        }
      })
      dispatch(loadTracks(tracks));
    })
    .catch(err => {
      console.log(err)
    })
  }
}

const loadTracks = (foundTracks) => ({
    type: GET_TRACKS,
    foundTracks
});
