import { FETCH_STYLEID } from '../actions/index.js';

export default function(state = [], action) {
  switch(action.type) {
    case FETCH_STYLEID: 
      return [ action.payload, ...state ];
  }

  return state;
}