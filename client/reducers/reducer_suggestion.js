import { FETCH_SUGGESTIONS } from '../actions/index.js';

export default function(state = [], action) {
  switch (action.type) {
  case FETCH_SUGGESTIONS:
    return [ action.payload, ...state ];
  }
  return state;
}