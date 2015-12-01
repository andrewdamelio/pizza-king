import { SET_REPLAY_MODE  } from '../constants';

export function setReplayMode(flag) {
  return {
    type: SET_REPLAY_MODE,
    payload: {
      flag: flag,
    },
  };
}
