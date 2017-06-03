import { FETCH_EQUIPMENT, FETCH_SPECS } from '../actions/index.js';

/*
export default function(state = [], action) {
  switch(action.type) {
    case FETCH_SPECS: 
    // console.log('FETCH_EQUIPMENT: ', action.payload);
      return [ action.payload, ...state ];
  }

  return state;
}
*/
export default function(state = [], action) {
  console.log('action: ', action.payload);
  return state;
}