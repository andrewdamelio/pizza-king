import { handleActions } from 'redux-actions';
import { fromJS } from 'immutable';
import { UPDATE_PIZZA, CREATE_PIZZA } from '../constants';


const pizzaReducer = handleActions({
  [UPDATE_PIZZA]: (state, action) => {
    return action.pizza;
  },
  [CREATE_PIZZA]: (state, action) => {
    return state.merge(state.push({
      isEaten: false,
      x: action.pizza[0],
      y: action.pizza[1],
    }));
  },
}, fromJS([]));


export default pizzaReducer;
