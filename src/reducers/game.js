import { handleActions } from 'redux-actions';
import { fromJS } from 'immutable';
import { JOIN_GAME, ADD_PLAYER, REMOVE_PLAYER } from '../constants';

const gameReducer = handleActions({
  [ADD_PLAYER]: (state, action) => {
    let newState;

    if (action.players.player1 && action.players.player2) {
      newState = state.merge({
        players: ['player1', 'player2'],
      });
    } else {
      newState = state.merge({
        players: state.get('players').push(action.player),
      });
    }

    return newState;
  },
  [JOIN_GAME]: (state, action) => {
    let newState;

    if (action.players.player1 && action.players.player2) {
      newState = state.merge({
        players: ['player1', 'player2'],
        player: action.player,
      });
    } else {
      newState = state.merge({
        players: state.get('players').push(action.player),
        player: action.player,
      });
    }

    return newState;
  },
  [REMOVE_PLAYER]: (state, action) => {
    return state.merge({
      players: state.get('players').filter(value => value !== action.player),
    });
  },
}, fromJS({
  players: [],
  player: null,
}));

export default gameReducer;
