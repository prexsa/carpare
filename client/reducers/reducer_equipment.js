import { FETCH_EQUIPMENT } from '../actions/index.js';

export default function(state = [], action) {
  switch(action.type) {
    case FETCH_EQUIPMENT: 
    // console.log('FETCH_EQUIPMENT: ', action.payload);
      return [ action.payload, ...state ];
  }

  return state;
}