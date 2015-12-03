import Immutable from 'immutable';
import doWorldsCollide from '../utils/doWorldsCollide';
import { GROW, UPDATE_PIZZA, CREATE_PIZZA  } from '../constants';

export function createPizza(pizza) {
  return {
    type: CREATE_PIZZA,
    pizza: pizza,
  };
}

export function updatePizza(pizza) {
  return {
    type: UPDATE_PIZZA,
    pizza: pizza,
  };
}

export function detectPizza() {
  return (dispatch, getState) => {
    const wormState = getState().history.get('worms').get(getState().history.get('idx'));
    const pizza = getState().pizza;

    const wormBox = {
      x: wormState.get('positionX'),
      y: wormState.get('positionY'),
      width: wormState.get('width'),
      height: wormState.get('height'),
    };

    //  ¯\_(ツ)_/¯
    const pizzaCopy = Immutable.List(JSON.parse(JSON.stringify(pizza)));

    let dirty = false;
    const pizzaParty = pizzaCopy.map((value) => {
      const pizzaBox = {
        x: value.x,
        y: value.y,
        width: 51,
        height: 76,
      };

      if (doWorldsCollide(wormBox, pizzaBox)) {
        if (!value.isEaten) {
          value.isEaten = true;
          dirty = true;
        }
      }

      return value;
    });

    if (dirty) {
      if (wormState.get('size') < 120 ) {
        dispatch({ type: GROW });
      }
      dispatch(updatePizza(pizzaParty));
    }
  };
}
