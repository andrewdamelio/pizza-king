import { handleActions } from 'redux-actions';
import { fromJS } from 'immutable';
import { UPDATE_LOG } from '../constants';


const initalState = [];

const chatReducer = handleActions({
  [UPDATE_LOG]: (state, action) => {
    return action.log;
  },
}, fromJS(initalState));

export default chatReducer;
