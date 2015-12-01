import Immutable from 'immutable';
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
    const wormState = getState().worm;
    const pizza = getState().pizza;

    // ?? ¯\_(ツ)_/¯
    const pizzaCopy = Immutable.List(JSON.parse(JSON.stringify(pizza)));

    let dirty = false;
    const pizzaParty = pizzaCopy.map((value) => {
      const wormBox = {
        x: wormState.get('positionX'),
        y: wormState.get('positionY'),
        width: wormState.get('width'),
        height: wormState.get('height'),
      };

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
        dispatch({
          type: GROW,
        });
      }
      dispatch(updatePizza(pizzaParty));
    }
  };
}

function doWorldsCollide(a, b) {
  return !(
    ((a.y + a.height) < (b.y)) ||
    (a.y > (b.y + b.height)) ||
    ((a.x + a.width) < b.x) ||
    (a.x > (b.x + b.width))
  );
}
