import React from 'react';
import Radium from 'radium';

const Pizza = ({ pizza, replayInProgress }) => {
  const styles = {
    pizza: {
      fontSize: 50,
      position: 'absolute',
      top: pizza.y,
      left: pizza.x,
    },
    zIndexMin: {
      zIndex: -9999,
    },
  };
  if (replayInProgress) {
    return null;
  }

  return (
    <span style={ [styles.pizza, styles.zIndexMin] }>
      { pizza.isEaten ? '💩' : '🍕' }
    </span>
  );
};

export default Radium(Pizza);

