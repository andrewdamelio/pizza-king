import { handleActions } from 'redux-actions';
import { fromJS } from 'immutable';
import {
  MOVEMENT,
  GROW,
  SHRINK,
  SPEED_UP,
  UPDATE_INDEX,
  SET_REPLAY_MODE,
  SAVE_BOX_INFO,
  RESET_GAME,
} from '../constants';

const initialState = fromJS({
  player1: [{
    positionX: 25,
    positionY: 25,
    direction: 1,
    size: 10,
    width: 13,
    height: 15,
    speed: 20,
  }],
  player2: [{
    positionX: 1400,
    positionY: 25,
    direction: 1,
    size: 10,
    width: 13,
    height: 15,
    speed: 20,
  }],
  replay: false,
  idx: 0,
});

const counterReducer = handleActions({
  [SPEED_UP]: (state, action) => {
    const idx = state.get('idx');
    const worm = state.get(action.player).get(idx);
    const newWorm = worm.update('speed', (value) => value * 2);
    let newState;

    if (action.player === 'player1') {
      newState = state.merge({
        player1: state.get('player1').set(idx, newWorm),
      });
    } else if (action.player === 'player2') {
      newState = state.merge({
        player2: state.get('player2').set(idx, newWorm),
      });
    }

    return newState;
  },
  [SET_REPLAY_MODE]: (state, action) => {
    return state.merge({
      replay: action.payload.flag,
    });
  },
  [UPDATE_INDEX]: (state, action) => {
    return state.merge({
      idx: action.index,
    });
  },
  [MOVEMENT]: (state, action) => {
    const idx = state.get('idx');
    const worm = state.get(action.player).get(idx);
    const velocity = worm.get('speed');

    let direction = worm.get('direction');
    let positionX = worm.get('positionX');
    let positionY = worm.get('positionY');

    if (action.payload === 'forward') {
      direction = -1;
      positionX = positionX + velocity;
    } else if (action.payload === 'backward') {
      direction = 1;
      positionX = positionX - velocity;
    } else if (action.payload === 'up') {
      positionY = positionY - velocity;
    } else if (action.payload === 'down') {
      positionY = positionY + velocity;
    }

    const newWorm = worm.merge({
      direction: direction,
      positionX: positionX,
      positionY: positionY,
    });

    let newState;
    if (action.player === 'player1') {
      newState = state.merge({
        player1: state.get(action.player).push(newWorm),
        player2: state.get('player2').push(state.get('player2').last()),
        idx: state.get('idx') + 1,
      });
    } else if (action.player === 'player2') {
      newState = state.merge({
        player2: state.get(action.player).push(newWorm),
        player1: state.get('player1').push(state.get('player1').last()),
        idx: state.get('idx') + 1,
      });
    }

    return newState;
  },
  [SAVE_BOX_INFO]: (state, action) => {
    const idx = state.get('idx');
    const worm = state.get(action.player).get(idx);
    const newWorm = worm.merge({
      width: action.payload.width,
      height: action.payload.height,
    });

    let newState;
    if (action.player === 'player1') {
      newState = state.merge({
        player1: state.get('player1').set(idx, newWorm),
      });
    } else if (action.player === 'player2') {
      newState = state.merge({
        player2: state.get('player2').set(idx, newWorm),
      });
    }
    return newState;
  },
  [GROW]: (state, action) => {
    const idx = state.get('idx');
    const worm = state.get(action.player).get(idx);
    const newWorm = worm.update('size', (value) => value < 120 ? value + 10 : value);

    let newState;
    if (action.player === 'player1') {
      newState = state.merge({
        player1: state.get('player1').set(idx, newWorm),
      });
    } else if (action.player === 'player2') {
      newState = state.merge({
        player2: state.get('player2').set(idx, newWorm),
      });
    }
    return newState;
  },
  [SHRINK]: (state, action) => {
    const idx = state.get('idx');
    const worm = state.get(action.player).get(idx);
    const newWorm = worm.update('size', (value) => value > 10 ? value - 10 : value);

    let newState;
    if (action.player === 'player1') {
      newState = state.merge({
        player1: state.get('player1').set(idx, newWorm),
      });
    } else if (action.player === 'player2') {
      newState = state.merge({
        player2: state.get('player2').set(idx, newWorm),
      });
    }
    return newState;
  },
  [RESET_GAME]: () => {
    return initialState;
  },
}, initialState);
export default counterReducer;
