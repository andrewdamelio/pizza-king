import { combineReducers } from 'redux';
import pizza from './pizza';
import history from './history';
import game from './game';
import chat from './chat';

const rootReducer = combineReducers({
  pizza,
  history,
  chat,
  game,
});

export default rootReducer;
