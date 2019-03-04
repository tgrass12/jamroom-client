import { makeApiCall } from '../../services/api';
import { LOAD_LOBBIES } from '../actionTypes';

export const createLobby = (lobbyName) => (dispatch, getState) => {
  const {currentUser} = getState();
  const body = {
    hostId: currentUser.user.id,
    name: lobbyName
  }
  return makeApiCall('post', '/api/lobbies', body)
    .then(res => {
    })
    .catch(err => {
      console.log(err);
    })
}

export const loadLobbies = lobbies => ({
  type: LOAD_LOBBIES,
  lobbies
})

export const fetchLobbies = () => {
  return dispatch => {
    return makeApiCall('get', '/api/lobbies')
      .then(res => {
        dispatch(loadLobbies(res));
      })
      .catch(err => {
        console.log(err);
      })
  }
}