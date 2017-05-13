import { combineReducers } from 'redux';
import conditionReducer from './reducer_condition.js';
import submodelReducer from './reducer_submodel.js';

const rootReducer = combineReducers({
  condition: conditionReducer,
  submodel: submodelReducer
});

export default rootReducer;