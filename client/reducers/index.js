import { combineReducers } from 'redux';
import conditionReducer from './reducer_condition.js';
import submodelReducer from './reducer_submodel.js';
import specsReducer from './reducer_specs.js';
import equipmentReducer from './reducer_equipment.js';
import photoReducer from './reducer_photo.js';
import suggestionReducer from './reducer_suggestion.js';
import styleIdReducer from './reducer_styleId.js';

const rootReducer = combineReducers({
  condition: conditionReducer,
  submodel: submodelReducer,
  specs: specsReducer,
  equipments: equipmentReducer,
  photo: photoReducer,
  suggestion: suggestionReducer,
  styleId: styleIdReducer
});

export default rootReducer;