import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

class Worm extends Component {

  static propTypes = {
    player: PropTypes.string.isRequired,
    pizza: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    saveBoxInfo: PropTypes.func.isRequired,
  }

  componentDidUpdate(prevProps) {
    const { props, refs } = this;
    const replayInProgress = props.history.get('replay');
    const idx = props.history.get('idx');
    const oldIdx = prevProps.history.get('idx');
    const worm = props.history.get(props.player).get(idx);
    const oldWorm = prevProps.history.get(props.player).get(oldIdx);


    if (worm && oldWorm && (oldWorm.get('size') !== worm.get('size')) && !replayInProgress) {
      props.saveBoxInfo(refs.worm.offsetWidth, refs.worm.offsetHeight, props.player);
    }
  }

  render() {
    const { props } = this;
    const replayInProgress = props.history.get('replay');
    let idx;
    if (replayInProgress) {
      idx = props.history.get('idx');
    } else {
      idx = props.history.get(props.player).size - 1;
    }


    const worm = props.history.get(props.player).get(idx);

    if (!worm) {
      return null;
    }

    const crown = {
      position: 'relative',
      bottom: worm.get('size') / 1.5,
      left: -worm.get('size'),
      fontSize: worm.get('size') / 2,
    };

    const player = {
      fontSize: worm.get('size'),
      position: 'absolute',
      top: worm.get('positionY'),
      left: worm.get('positionX'),
      transform: `scaleX(${worm.get('direction')})`,
      transition: 'transform 0.2s ease',
    };

    const gameOver = props.pizza.filter((value) => {
      return !value.has('powerup') && !value.get('isEaten');
    });

    const player1 = props.pizza.filter((value) => {
      if (value.get('scoredBy') === 'player1') {
        return value.get('scoredBy');
      }
    });
    const player2 = props.pizza.filter((value) => {
      if (value.get('scoredBy') === 'player2') {
        return value.get('scoredBy');
      }
    });

    let showCrown;
    if (props.player === 'player1') {
      showCrown = player1.size > player2.size ? true : false;
    } else if (props.player === 'player2') {
      showCrown = player2.size > player1.size ? true : false;
    }

    return (
      <div ref="worm"
           style={{ ...player }}>
        🐛
        { gameOver.size === 0 && showCrown && !replayInProgress
          ?  <span style={ crown }>👑</span>
          : ''
        }
      </div>
    );
  }
}

export default Radium(Worm);
