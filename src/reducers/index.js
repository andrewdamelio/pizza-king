import { combineReducers } from 'redux';
import worm from './worm';
import pizza from './pizza';
import history from './history';

const rootReducer = combineReducers({
  worm,
  pizza,
  history,
});

export default rootReducer;
