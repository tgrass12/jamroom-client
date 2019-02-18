import { GET_TRACKS } from '../actionTypes';

export default (state=[], action) => {
  switch(action.type) {
    case GET_TRACKS:
      return [...action.foundTracks];
    default:
      return state;
  }
}