import {
  MOVEMENT,
  SAVE_BOX_INFO,
  SHRINK,
  GROW,
  SET_POSITION,
  UPDATE_INDEX,
  SET_REPLAY_MODE,
} from '../constants';

export function setReplayMode(flag) {
  return {
    type: SET_REPLAY_MODE,
    payload: {
      flag: flag,
    },
  };
}

export function updateIndex(index) {
  return {
    type: UPDATE_INDEX,
    index: index,
  };
}


export function saveBoxInfo(wormWidth, wormHeight) {
  return {
    type: SAVE_BOX_INFO,
    payload: {
      width: wormWidth,
      height: wormHeight,
    },
  };
}

export function setPosition(posX, posY, direction, size) {
  return {
    type: SET_POSITION,
    payload: {
      positionX: posX,
      positionY: posY,
      direction: direction,
      size: size,
    },
  };
}

export function shrink() {
  return (dispatch) => {
    dispatch({
      type: SHRINK,
    });
  };
}

export function grow() {
  return (dispatch) => {
    dispatch({
      type: GROW,
    });
  };
}

export function forward() {
  return (dispatch) => {
    dispatch({
      type: MOVEMENT,
      payload: 'forward',
    });
  };
}

export function backward() {
  return (dispatch) => {
    dispatch({
      type: MOVEMENT,
      payload: 'backward',
    });
  };
}

export function up() {
  return (dispatch) => {
    dispatch({
      type: MOVEMENT,
      payload: 'up',
    });
  };
}

export function down() {
  return (dispatch) => {
    dispatch({
      type: MOVEMENT,
      payload: 'down',
    });
  };
}
