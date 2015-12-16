/*eslint-disable */

const PIZZA_ARMY_SIZE = 21;

function getRandomPosition() {
  const xLimit = 1200;
  const yLimit = 450;
  const randomX = Math.floor(Math.random() * xLimit) + 15;
  const randomY = Math.floor(Math.random() * yLimit) + 15;
  return [randomX, randomY];
}

function createPizza() {
  var res = [];
  for (var i = 1; i <= PIZZA_ARMY_SIZE; i++) {
    var pos = getRandomPosition();
    res.push({
      isEaten: false,
      x: pos[0],
      y: pos[1],
      scoredBy: null,
    });
  }


  // Add Powerup [SPEED]
  var pos = getRandomPosition();
  res.push({
    isEaten: false,
    x: pos[0],
    y: pos[1],
    powerup: 'speed',
  });

  return res;
}

module.exports = createPizza;

/*eslint-enable */
