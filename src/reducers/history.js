import { handleActions } from 'redux-actions';
import { fromJS } from 'immutable';
import {
  MOVEMENT,
  GROW,
  SHRINK,
  UPDATE_INDEX,
  SET_REPLAY_MODE,
  SAVE_HISTORY,
  SAVE_BOX_INFO,
} from '../constants';


const counterReducer = handleActions({
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
  [SAVE_HISTORY]: (state, action) => {
    return state.merge({
      worms: state.get('worms').push(action.payload.worms),
      idx: state.get('idx') + 1,
    });
  },
  [MOVEMENT]: (state, action) => {
    const idx = state.get('idx');
    const worm = state.get('worms').get(idx);
    const velocity = 15;
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

    return state.merge({
      worms: state.get('worms').push(newWorm),
      idx: state.get('idx') + 1,
    });
  },
  [SAVE_BOX_INFO]: (state, action) => {
    const idx = state.get('idx');
    const worm = state.get('worms').get(idx);
    const newWorm = worm.merge({
      width: action.payload.width,
      height: action.payload.height,
    });

    return state.merge({
      worms: state.get('worms').set(idx, newWorm),
    });
  },
  [GROW]: (state) => {
    const idx = state.get('idx');
    const worm = state.get('worms').get(idx);
    const newWorm = worm.update('size', (value) => value < 120 ? value + 10 :
      value);

    return state.merge({
      worms: state.get('worms').push(newWorm),
      idx: state.get('idx') + 1,
    });
  },
  [SHRINK]: (state) => {
    const idx = state.get('idx');
    const worm = state.get('worms').get(idx);
    const newWorm = worm.update('size', (value) => value > 10 ? value - 10 :
      value);

    return state.merge({
      worms: state.get('worms').push(newWorm),
      idx: state.get('idx') + 1,
    });
  },
}, fromJS({
  worms: [{
    positionX: 125,
    positionY: 125,
    direction: 1,
    size: 10,
    width: 13,
    height: 15,
  }],
  replay: false,
  idx: 0,
}));
export default counterReducer;
