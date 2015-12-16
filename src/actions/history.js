import {
  MOVEMENT,
  SAVE_BOX_INFO,
  SHRINK,
  GROW,
  UPDATE_INDEX,
  SET_REPLAY_MODE,
  RESET_GAME,
  SPEED_UP,
} from '../constants';


export function resetGame() {
  return {
    type: RESET_GAME,
  };
}


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


export function saveBoxInfo(wormWidth, wormHeight, player) {
  return {
    type: SAVE_BOX_INFO,
    player: player,
    payload: {
      width: wormWidth,
      height: wormHeight,
    },
  };
}

export function speedUp(player) {
  return (dispatch) => {
    dispatch({
      type: SPEED_UP,
      player: player,
    });
  };
}

export function shrink(player) {
  return (dispatch) => {
    dispatch({
      type: SHRINK,
      player: player,
    });
  };
}

export function grow(player) {
  return (dispatch) => {
    dispatch({
      type: GROW,
      player: player,
    });
  };
}

function checkEdges(getState, direction, player) {
  const history = getState().history;
  const idx = history.get('idx');
  const worm = history.get(player).get(idx);

  switch (direction) {
  case 'right':
    return worm.get('positionX') < 1440;
  case 'left':
    return worm.get('positionX') > -150;
  case 'up':
    return worm.get('positionY') > -150;
  case 'down':
    return worm.get('positionY') < 550;
  default:
    break;
  }
}

export function forward(player) {
  return (dispatch, getState) => {
    if (checkEdges(getState, 'right', player)) {
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
    if (checkEdges(getState, 'left', player)) {
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
    if (checkEdges(getState, 'up', player)) {
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
    if (checkEdges(getState, 'down', player)) {
      dispatch({
        type: MOVEMENT,
        payload: 'down',
        player: player,
      });
    }
  };
}
