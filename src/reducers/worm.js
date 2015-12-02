import { handleActions } from 'redux-actions';
import { fromJS } from 'immutable';

import {
  MOVEMENT,
  SET_POSITION,
  SAVE_BOX_INFO,
  GROW,
  SHRINK,
} from '../constants';


const wormReducer = handleActions({
  [MOVEMENT]: (state, action) => {
    const velocity = 15;
    let direction = state.get('direction');
    let positionX = state.get('positionX');
    let positionY = state.get('positionY');

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

    return state.merge({
      direction: direction,
      positionX: positionX,
      positionY: positionY,
    });
  },
  [SET_POSITION]: (state, action) => {
    return state.merge({
      positionX: action.payload.positionX,
      positionY: action.payload.positionY,
      direction: action.payload.direction,
      size: action.payload.size,
    });
  },
  [SAVE_BOX_INFO]: (state, action) => {
    return state.merge({
      width: action.payload.width,
      height: action.payload.height,
    });
  },
  [GROW]: (state) => state.update('size', (value) => value < 120 ? value + 10 : value),
  [SHRINK]: (state) => state.update('size', (value) => value > 10 ? value - 10 : value),
}, fromJS({
  positionX: 125,
  positionY: 125,
  direction: 1,
  size: 10,
  width: 13,
  height: 15,
}));

export default wormReducer;
