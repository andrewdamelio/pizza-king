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


function checkEdges(getState, direction) {
  const history = getState().history;
  const idx = history.get('idx');
  const worm = history.get('worms').get(idx);

  switch (direction) {
  case 'right':
    return worm.get('positionX') < window.innerWidth - 190;
  case 'left':
    return worm.get('positionX') > 0;
  case 'up':
    return worm.get('positionY') > 0;
  case 'down':
    return worm.get('positionY') < window.innerHeight - 37;
  default:
    break;
  }
}

export function forward(player) {
  return (dispatch, getState) => {
    if (checkEdges(getState, 'right')) {
      dispatch({
        type: MOVEMENT,
        payload: 'forward',
        player: player,
      });
    }
  };
}

export function backward(player) {
  return (dispatch, getState) => {
    if (checkEdges(getState, 'left')) {
      dispatch({
        type: MOVEMENT,
        payload: 'backward',
        player: player,
      });
    }
  };
}

export function up(player) {
  return (dispatch, getState) => {
    if (checkEdges(getState, 'up')) {
      dispatch({
        type: MOVEMENT,
        payload: 'up',
        player: player,
      });
    }
  };
}

export function down(player) {
  return (dispatch, getState) => {
    if (checkEdges(getState, 'down')) {
      dispatch({
        type: MOVEMENT,
        payload: 'down',
        player: player,
      });
    }
  };
}
