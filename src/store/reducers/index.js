import { combineReducers } from 'redux';
import tracks from './tracks';
import queue from './queue';
import currentUser from './currentUser';
import errors from './errors';

const rootReducer = combineReducers({
  tracks,
  queue,
  currentUser,
  errors
});

export default rootReducer;