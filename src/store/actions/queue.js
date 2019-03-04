import {
  ADD_TRACK_TO_QUEUE,
  GET_TRACK_QUEUE,
  REMOVE_TRACK_FROM_QUEUE,
  LOAD_LOBBY_QUEUE
} from '../actionTypes';

import { makeApiCall } from '../../services/api';

export const getQueue = () => ({
  type: GET_TRACK_QUEUE
});

export const addToQueue = (track) => ({
  type: ADD_TRACK_TO_QUEUE,
  track
});

export const removeFromQueue = (track) => ({
  type: REMOVE_TRACK_FROM_QUEUE,
  track
});

export const addToLobbyQueue = (lobbyId, track) => {
  return dispatch => {
    return makeApiCall('post', `/api/lobbies/${lobbyId}/queue`, track)
      .then(res => {
        dispatch(addToQueue(track));
      })
      .catch(err => {
        console.log(err);
      })
  }
}

export const removeFromLobbyQueue = (lobbyId, track) => {
  return dispatch => {
    return makeApiCall('delete', `/api/lobbies/${lobbyId}/queue/${track.uid}`)
      .then(res => {
        dispatch(removeFromQueue(track));
      })
  }
}

export const getLobbyQueue = (lobbyId) => {
  return dispatch => {
    return makeApiCall('get', `/api/lobbies/${lobbyId}/queue`)
      .then(res => {
        dispatch(loadLobbyQueue(res));
      })
  }
}

export const loadLobbyQueue = (queue) => ({
  type: LOAD_LOBBY_QUEUE,
  queue
});