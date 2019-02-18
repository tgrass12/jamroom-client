import { combineReducers } from 'redux';
import tracks from './tracks';
import queue from './queue';
import currentUser from './currentUser';

const rootReducer = combineReducers({
  tracks,
  queue,
  currentUser
});

export default rootReducer;