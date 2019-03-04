import { combineReducers } from 'redux';
import tracks from './tracks';
import queue from './queue';
import lobbies from './lobby';
import currentUser from './currentUser';
import errors from './errors';

const rootReducer = combineReducers({
  tracks,
  queue,
  lobbies,
  currentUser,
  errors
});

export default rootReducer;