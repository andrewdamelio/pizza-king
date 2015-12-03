import React, { Component, PropTypes } from 'react';
import Radium from 'radium';


class Worm extends Component {

  static propTypes = {
    pizza: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    saveBoxInfo: PropTypes.func.isRequired,
  }

  componentDidUpdate(prevProps) {
    const { props, refs } = this;
    const replayInProgress = props.history.get('replay');
    const idx = props.history.get('idx');
    const oldIdx = prevProps.history.get('idx');
    const worm = props.history.get('worms').get(idx);
    const oldWorm = prevProps.history.get('worms').get(oldIdx);


    if (worm && oldWorm && (oldWorm.get('size') !== worm.get('size')) && !replayInProgress) {
      props.saveBoxInfo(refs.worm.offsetWidth, refs.worm.offsetHeight);
    }
  }

  render() {
    const {  pizza, history } = this.props;
    const replayInProgress = history.get('replay');
    const idx = history.get('idx');
    const worm = history.get('worms').get(idx);

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
      position: 'absolute',
      top: worm.get('positionY'),
      left: worm.get('positionX'),
      transform: `scaleX(${worm.get('direction')})`,
      transition: 'transform 0.2s ease',
      fontSize: worm.get('size'),
    };

    const gameOver = pizza.filter(value => {
      return !value.isEaten;
    });

    return (
      <div className="p1">
        <div>
          <div ref="worm"
               style={{ ...player, ...{ zIndex: -9999 } }}>
            🐛
            { gameOver.size === 0 && !replayInProgress
              ?  <span style={ crown }>👑</span>
              : ''
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Radium(Worm);
