import axios from 'axios';
import Cookies from 'universal-cookie';
import {makeApiCall, getAccessToken} from './api';
const cookies = new Cookies();
const SPOTIFY_API = 'https://api.spotify.com/v1';

export function connectSpotify() {    
  axios.get('/api/spotify/signin')
    .then(res => window.location = res.data);
}  

export function refreshSpotifyToken() {
  const refreshToken = cookies.get('rt');
  return makeApiCall('post', '/api/spotify/refresh', {token: refreshToken})
    .then(data => {
      let date = new Date();
      date.setSeconds(date.getSeconds() + data.expires_in);
      localStorage.setItem(
        'at',
        JSON.stringify({
          expiresAt: date,
          token: data.access_token,         
        }) 
      );
      return data.access_token;
    })
    .catch(err => {
      return (err)
    });
}

export async function getUserDevices() {
  const token = await getAccessToken();
  return axios.get(`${SPOTIFY_API}/me/player/devices`,
  {
    headers: 
    {
      'Authorization': `Bearer ${token}`
    }
  }).then( res => {
    return (res.data.devices);
  })
  .catch(err => {
    return (err)
  });
}

export async function setDevice(id) {
  const token = await getAccessToken();
  return axios.put(`${SPOTIFY_API}/me/player`,
  {
    //Must be array or returns 400 Bad Request
    device_ids: [id]
  },
  {
    headers:
      {
        'Authorization': `Bearer ${token}`
      }
  }).then(() => {
    getPlayerStatus().then(data =>{
      console.log(data);
    })
  })
    .catch(err => {
    console.log(err);
  });
}

export async function playTrack(trackUri) {
  const token = await getAccessToken();
  axios.put(`${SPOTIFY_API}/me/player/play`,
  {
   uris: [trackUri]
  },
  {
    headers:
      {
        'Authorization': `Bearer ${token}`
      }
  }).catch(err => {
    console.log(err);
  });
}

export async function getPlayerStatus() {
  const token = await getAccessToken();
  return axios.get(`${SPOTIFY_API}/me/player`,
  {
    headers: 
      {
        'Authorization': `Bearer ${token}`
      }
  });
}

export async function resumePlayback() {
  const token = await getAccessToken();
  return getPlayerStatus().then(res => {
    return axios.put(`${SPOTIFY_API}/me/player/play`,
    {},
    {
      headers: 
      {
        'Authorization': `Bearer ${token}`
      }
    }).then(() => {
      return res.data.progress_ms;
    })
  })
}

export async function pausePlayback() {
  const token = await getAccessToken();
  axios.put(`${SPOTIFY_API}/me/player/pause`,
  {},
  {
    headers:
      {
        'Authorization': `Bearer ${token}`
      }
  }).then(res => {
  }).catch(err => {
    console.log(err);
  });
}