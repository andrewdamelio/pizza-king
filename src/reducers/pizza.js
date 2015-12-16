import { handleActions } from 'redux-actions';
import { fromJS } from 'immutable';
import { UPDATE_PIZZA, CREATE_PIZZA } from '../constants';
import createPizza from '../utils/createPizza';

const initalState = createPizza();

const pizzaReducer = handleActions({
  [UPDATE_PIZZA]: (state, action) => {
    return action.pizza;
  },
  [CREATE_PIZZA]: (state, action) => {
    return action.pizza;
  },
}, fromJS(initalState));
export default pizzaReducer;
