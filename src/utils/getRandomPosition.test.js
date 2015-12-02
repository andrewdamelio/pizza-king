import getRandomPosition from './getRandomPosition';
import assert from 'assert';

describe('getRandomPosition', () => {
  it('should return two random numbers', () => {
    global.window = {
      innerHeight: 920,
      innerWidth: 1024,
    };
    const pos = getRandomPosition();
    assert.strictEqual(false, isNaN(pos[0]));
    assert.strictEqual(false, isNaN(pos[1]));
  });
});
