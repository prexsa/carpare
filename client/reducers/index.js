import { combineReducers } from 'redux';
import conditionReducer from './reducer_condition.js';

const rootReducer = combineReducers({
  condition: conditionReducer
});

export default rootReducer;