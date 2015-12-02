/**
 * Used to get a random x, y position
 */

export default function getRandomPosition() {
  const xLimit = window.innerWidth - 425;
  const yLimit = window.innerHeight - 385;
  const randomX = Math.floor(Math.random() * xLimit) + 25;
  const randomY = Math.floor(Math.random() * yLimit) + 75;
  return [randomX, randomY];
}
