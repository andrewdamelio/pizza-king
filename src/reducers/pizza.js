import { handleActions } from 'redux-actions';
import { fromJS } from 'immutable';
import { UPDATE_PIZZA, CREATE_PIZZA } from '../constants';


const pizzaReducer = handleActions({
  [UPDATE_PIZZA]: (state, action) => {
    return action.pizza;
  },
  [CREATE_PIZZA]: (state, action) => {
    return action.pizza;
  },
}, fromJS([]));


export default pizzaReducer;
