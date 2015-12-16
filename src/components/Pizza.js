import React from 'react';
import Radium from 'radium';

const Pizza = ({ pizza, replayInProgress, gameOver }) => {
  const styles = {
    pizza: {
      fontSize: 50,
      transition: 'all 500ms cubic-bezier(0.245, 1.590, 0.140, 0.850)',
    },
    eaten: {
      fontSize: 52,
      transition: 'all 0.2s ease',
    },
    position: {
      position: 'absolute',
      top: pizza.get('y'),
      left: pizza.get('x'),
    },
  };

  if (replayInProgress) {
    return null;
  }

  let pizzaOrPowerup;
  if (pizza.get('powerup') === 'speed') {
    pizzaOrPowerup = pizza.get('isEaten') ? '️' : '⚡';
  } else {
    pizzaOrPowerup = pizza.get('isEaten') ? '💩' : '🍕';
  }


  return (
    <span className={ gameOver === 0 ? 'bounce' : null }
          style={ pizza.get('isEaten')
            ? [styles.eaten, styles.position]
            : [styles.pizza, styles.position] }>
      { pizzaOrPowerup }
    </span>
  );
};

export default Radium(Pizza);


