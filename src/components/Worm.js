import React, { Component, PropTypes } from 'react';
import Radium from 'radium';


class Worm extends Component {

  static propTypes = {
    worm: PropTypes.object.isRequired,
    pizza: PropTypes.object.isRequired,
    saveBoxInfo: PropTypes.func.isRequired,
    replayInProgress: PropTypes.bool.isRequired,
  }

  componentDidUpdate(prevProps) {
    const { props, refs } = this;
    if (prevProps.worm.get('size') !== props.worm.get('size') && !props.replayInProgress) {
      props.saveBoxInfo(refs.worm.offsetWidth, refs.worm.offsetHeight);
    }
  }

  render() {
    const {  worm, pizza, replayInProgress } = this.props;
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
