import {
  GET_TRACK_QUEUE,
  LOAD_LOBBY_QUEUE,
  ADD_TRACK_TO_QUEUE, 
  REMOVE_TRACK_FROM_QUEUE} from '../actionTypes';

export default (state=[], action) => {
  switch(action.type) {  
    case GET_TRACK_QUEUE:
      return [...state];
    case LOAD_LOBBY_QUEUE:
      return [...action.queue];
    case ADD_TRACK_TO_QUEUE:
      return [...state, action.track];
    case REMOVE_TRACK_FROM_QUEUE:
      return state.filter(t => t.uid !== action.track.uid);
    default:
      return state;
  }
}