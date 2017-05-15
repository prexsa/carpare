import { combineReducers } from 'redux';
import conditionReducer from './reducer_condition.js';
import submodelReducer from './reducer_submodel.js';
import equipmentReducer from './reducer_equipment.js';

const rootReducer = combineReducers({
  condition: conditionReducer,
  submodel: submodelReducer,
  equipment: equipmentReducer
});

export default rootReducer;