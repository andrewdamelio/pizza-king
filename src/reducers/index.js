import { combineReducers } from 'redux';
import pizza from './pizza';
import history from './history';
import game from './game';

const rootReducer = combineReducers({
  pizza,
  history,
  game,
});

export default rootReducer;
