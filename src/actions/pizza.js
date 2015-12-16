import Immutable from 'immutable';
import socket from '../socket/socket';
import doWorldsCollide from '../utils/doWorldsCollide';
import { SPEED_UP, GROW, UPDATE_PIZZA, CREATE_PIZZA } from '../constants';
import { audioCrunch, audioPowerup } from '../utils/audioFX';

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
    const history = getState().history;
    const game = getState().game;
    const pizza = getState().pizza;

    const playerName = game.get('player');
    const wormState = history.get(playerName).get(history.get('idx'));

    const wormBox = {
      x: wormState.get('positionX'),
      y: wormState.get('positionY'),
      width: wormState.get('width'),
      height: wormState.get('height'),
    };

    //           ¯\_(ツ)_/¯
    //  TODO: FIX THIS MONSTROSITY
    const pizzaCopy = Immutable.List(JSON.parse(JSON.stringify(pizza)));

    let dirty = false;
    let grow = false;
    let powerup = false;
    const pizzaParty = pizzaCopy.map((value) => {
      const pizzaBox = {
        x: value.x,
        y: value.y,
        width: 51,
        height: 76,
      };

      if (doWorldsCollide(wormBox, pizzaBox)) {
        if (!value.isEaten) {
          dirty = true;
          value.isEaten = true;
          value.scoredBy = playerName;
          if (value.powerup) {
            powerup = true;
          } else {
            grow = true;
          }
        }
      }

      return value;
    });

    if (dirty) {
      if (grow && wormState.get('size') < 120 ) {
        audioCrunch.currentTime = 0;
        audioCrunch.volume = 0.2;
        audioCrunch.play();

        dispatch({
          type: GROW,
          player: playerName,
        });
        socket.emit('grow', playerName);
      }

      if (powerup) {
        audioPowerup.currentTime = 0;
        audioPowerup.volume = 0.2;
        audioPowerup.play();

        dispatch({
          type: SPEED_UP,
          player: playerName,
        });
        socket.emit('speedUp', playerName);
      }

      dispatch(updatePizza(Immutable.fromJS(pizzaParty.toJS())));
      socket.emit('updatePizza', pizzaParty);
    }
  };
}
