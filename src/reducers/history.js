import { handleActions } from 'redux-actions';
import { fromJS } from 'immutable';
import { SET_REPLAY_MODE, SAVE_HISTORY } from '../constants';


const counterReducer = handleActions({
  [SET_REPLAY_MODE]: (state, action) => {
    return state.merge({
      replay: action.payload.flag,
    });
  },
  [SAVE_HISTORY]: (state, action) => {
    return state.merge({
      worms: state.get('worms').push(action.payload.worms),
    });
  },
}, fromJS({
  worms: [],
  replay: false,
}));

export default counterReducer;
