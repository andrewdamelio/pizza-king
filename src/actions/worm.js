import {
  FORWARD,
  BACKWARD,
  UP,
  DOWN,
  SAVE_BOX_INFO,
  SHRINK,
  GROW,
  SET_POSITION,
  SAVE_HISTORY,
} from '../constants';

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
  return (dispatch, getState) => {
    if (getState().worm.get('size') > 10 ) {
      dispatch({
        type: SAVE_HISTORY,
        payload: {
          data: getState().worm,
        },
      });
      dispatch({
        type: SHRINK,
      });
    }
  };
}

export function grow() {
  return (dispatch, getState) => {
    if (getState().worm.get('size') < 120 ) {
      dispatch({
        type: SAVE_HISTORY,
        payload: {
          data: getState().worm,
        },
      });
      dispatch({
        type: GROW,
      });
    }
  };
}

export function forward() {
  return (dispatch, getState) => {
    // so one could run into the champ pit after winning
    const gameOver = getState().pizza.filter(value => {
      return !value.isEaten;
    });

    if (!getState().history.get('replay') && (getState().worm.get('positionX') < (window.innerWidth - 425 ) || gameOver.size === 0)) {
      moveWorm(dispatch, getState, FORWARD);
    }
  };
}

export function backward() {
  return (dispatch, getState) => {
    if (!getState().history.get('replay') && getState().worm.get('positionX') > 15) {
      moveWorm(dispatch, getState, BACKWARD);
    }
  };
}

export function up() {
  return (dispatch, getState) => {
    if (!getState().history.get('replay') && getState().worm.get('positionY') > 35) {
      moveWorm(dispatch, getState, UP);
    }
  };
}

export function down() {
  return (dispatch, getState) => {
    if (!getState().history.get('replay') && getState().worm.get('positionY') < window.innerHeight - 200) {
      moveWorm(dispatch, getState, DOWN);
    }
  };
}

function moveWorm(dispatch, getState, direction) {
  dispatch({
    type: direction,
  });
  dispatch({
    type: SAVE_HISTORY,
    payload: {
      data: getState().worm,
    },
  });
}
