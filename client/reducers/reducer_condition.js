import { FETCH_CONDITIONS } from '../actions/index.js';

export default function(state = [], action) {
  switch (action.type) {
  case FETCH_CONDITIONS:
    return [ action.payload, ...state ];
  }
  return state;
}