import doWorldsCollide from './doWorldsCollide';
import assert from 'assert';

describe('doWorldsCollide', () => {
  const boxA = {
    x: 100,
    y: 100,
    width: 50,
    height: 50,
  };

  const boxB = {
    x: 500,
    y: 300,
    width: 50,
    height: 50,
  };

  const boxC = {
    x: 140,
    y: 140,
    width: 50,
    height: 50,
  };

  it('should detect a box collision', () => {
    assert.strictEqual(true, doWorldsCollide(boxA, boxC));
  });

  it('should not detect a box collision', () => {
    assert.strictEqual(false, doWorldsCollide(boxA, boxB));
  });
});
