import { combineReducers } from 'redux';
import conditionReducer from './reducer_condition.js';
import submodelReducer from './reducer_submodel.js';
import specsReducer from './reducer_specs.js';
import equipmentReducer from './reducer_equipment.js';

const rootReducer = combineReducers({
  condition: conditionReducer,
  submodel: submodelReducer,
  specs: specsReducer,
  equipments: equipmentReducer
});

export default rootReducer;