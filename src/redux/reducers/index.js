import {combineReducers} from 'redux';

import filterReducer from './filterRedures';

export default combineReducers({
  filter: filterReducer,
});
