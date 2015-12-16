import { fromJS } from 'immutable';
import { audioCrunch } from '../utils/audioFX';

export function updateLog(actions, log) {
  actions.updateLog(fromJS(log));
}

export function updatePizza(actions, pizza) {
  actions.updatePizza(fromJS(pizza));
}

export function resetGame(actions) {
  actions.toggleVictory();
  audioCrunch.currentTime = 0;
  audioCrunch.volume = 0.2;
  audioCrunch.play();

  actions.resetGame();
}

export function grow(actions, player) {
  actions.grow(player);
}

export function speedUp(actions, player) {
  actions.speedUp(player);
}

export function shrink(actions, player) {
  actions.shrink(player);
}

export function welcome(actions, data) {
  actions.createPizza(fromJS(data.pizza));
  actions.joinGame(data);
}

export function join(actions, data) {
  actions.addPlayer(data);
}

export function quit(actions, player) {
  actions.removePlayer(player);
}

export function movement(actions, data) {
  if (data.direction === 'up') {
    actions.up(data.player);
  } else if (data.direction === 'down') {
    actions.down(data.player);
  } else if (data.direction === 'backward') {
    actions.backward(data.player);
  } else if (data.direction === 'forward') {
    actions.forward(data.player);
  }
}

export function replay(actions, data) {
  const history = fromJS(data.history);
  const game = fromJS(data.game);

  if (history.size > 0) {
    actions.setReplayMode(true);
    const playerName = game.get('player');
    history.get(playerName).map((worm, idx) => {
      setTimeout(() => {
        actions.updateIndex(idx);
        if ((idx + 1) === history.get(playerName).size) {
          actions.setReplayMode(false);
        }
      }, 25 * (idx + 1));
    });
  }
}
