import { JOIN_GAME, ADD_PLAYER, REMOVE_PLAYER } from '../constants';

export function joinGame(data) {
  return {
    type: JOIN_GAME,
    player: data.player,
    players: data.players,
  };
}

export function addPlayer(data) {
  return {
    type: ADD_PLAYER,
    player: data.player,
    players: data.players,
  };
}

export function removePlayer(player) {
  return {
    type: REMOVE_PLAYER,
    player: player,
  };
}
