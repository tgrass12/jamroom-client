import { makeApiCall, setAuthHeader } from '../../services/api';
import { SET_CURRENT_USER } from '../actionTypes';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  }
}

export function authUser(authType, userData) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      return makeApiCall('post', `/api/auth/${authType}`, userData)
        .then(({token, ...user}) => {
          localStorage.setItem('token', token);
          setAuthHeader(token);
          dispatch(setCurrentUser(user));
          resolve();
        })
        .catch(err => {
          reject();
        });
    })
  }
}

export function logout() {
  return dispatch => {
    localStorage.clear();
    cookies.remove('at');
    cookies.remove('rt');
    setAuthHeader();
    dispatch(setCurrentUser({}))
  }
}