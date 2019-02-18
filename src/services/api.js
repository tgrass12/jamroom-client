import axios from 'axios';
import Cookies from 'universal-cookie';
import {refreshSpotifyToken} from './spotify';

export function makeApiCall(verb, path, payload) {
  return new Promise((resolve, reject) => {
    return axios[verb](path, payload)
      .then(res => {
        return resolve(res.data)
      })
      .catch(err => {
        reject(err.response.data);
      });  
  })
}

export function setAuthHeader(token, destination) {
  if(token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
  else {
    delete axios.defaults.headers.common['Authorization'];
  }
}

export function checkRefreshTokenCookie() {
  const cookies = new Cookies();
  return cookies.get('rt');
}

export async function getAccessToken() {
  const accessToken = JSON.parse(localStorage.getItem('at'));
  if (!accessToken) return;
  
  const now = new Date();
  if (now >= accessToken.expiresAt)
  {
    await refreshSpotifyToken();
  } 
  return JSON.parse(localStorage.getItem('at')).token;
}