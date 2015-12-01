import { handleActions } from 'redux-actions';
import { fromJS } from 'immutable';

import {
  FORWARD,
  BACKWARD,
  UP,
  DOWN,
  SET_POSITION,
  SAVE_BOX_INFO,
  GROW,
  SHRINK,
} from '../constants';


const wormReducer = handleActions({
  [FORWARD]: (state) => {
    return state.merge({
      direction: -1,
      positionX: state.get('positionX') + 15,
    });
  },
  [BACKWARD]: (state) => {
    return state.merge({
      direction: 1,
      positionX: state.get('positionX') - 15,
    });
  },
  [UP]: (state) => state.update('positionY', (value) => value - 15),
  [DOWN]: (state) => state.update('positionY', (value) => value + 15),
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
  [GROW]: (state) => state.update('size', (value) => value + 10),
  [SHRINK]: (state) => state.update('size', (value) => value - 10),
}, fromJS({
  positionX: 125,
  positionY: 125,
  direction: 1,
  size: 10,
  width: 52,
  height: 77,
}));

export default wormReducer;
