import { FETCH_CAR } from "../actions/index.js"

export default function(state = [], action) {
  switch(action.type) {
    case FETCH_CAR:
      return [ action.payload, ...state ];
  }

  return state;
}