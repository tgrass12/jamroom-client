import { makeApiCall, setAuthHeader } from '../../services/api';
import { SET_CURRENT_USER } from '../actionTypes';
import { addError, removeError } from './errors';
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
          dispatch(removeError());
          resolve();
        })
        .catch(err => {
          console.log('error caught');
          console.log(err.error.message);
          dispatch(addError(err.error.message));
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