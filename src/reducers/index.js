import { combineReducers } from 'redux';
import pizza from './pizza';
import history from './history';

const rootReducer = combineReducers({
  pizza,
  history,
});

export default rootReducer;
