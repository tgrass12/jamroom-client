import {
  ADD_TRACK_TO_QUEUE,
  GET_TRACK_QUEUE,
  REMOVE_TRACK_FROM_QUEUE 
} from '../actionTypes';

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
})