import { LOAD_LOBBIES } from '../actionTypes';

const lobbies = (state=[], action) => {
  switch (action.type) {
    case LOAD_LOBBIES:
      return [...action.lobbies];
    default:
      return state;
  }
}

export default lobbies;