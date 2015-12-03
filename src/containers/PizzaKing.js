import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import getRandomPosition from '../utils/getRandomPosition';
import Pizza from '../components/Pizza';
import Menu from '../components/Menu';
import Worm from '../components/Worm';

import { detectPizza, createPizza } from '../actions/pizza';

import {
  saveBoxInfo,
  shrink,
  grow,
  setPosition,
  forward,
  backward,
  up,
  down,
  updateIndex,
  setReplayMode,
} from '../actions/history';

const PIZZA_ARMY_SIZE = 12;

function mapStateToProps(state) {
  return {
    history: state.history,
    pizza: state.pizza,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    forward: () => dispatch(forward()),
    backward: () => dispatch(backward()),
    up: () => dispatch(up()),
    down: () => dispatch(down()),
    grow: () => dispatch(grow()),
    shrink: () => dispatch(shrink()),
    detectPizza: () => dispatch(detectPizza()),
    createPizza: (pizza) => dispatch(createPizza(pizza)),
    updateIndex: (index) => dispatch(updateIndex(index)),
    setPosition: (posX, posY, direction, size) => dispatch(setPosition(posX, posY, direction, size)),
    setReplayMode: (flag) => dispatch(setReplayMode(flag)),
    saveBoxInfo: (width, height) => dispatch(saveBoxInfo(width, height)),
  };
}

class CounterPage extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    pizza: PropTypes.object.isRequired,
    forward: PropTypes.func.isRequired,
    backward: PropTypes.func.isRequired,
    up: PropTypes.func.isRequired,
    down: PropTypes.func.isRequired,
    setPosition: PropTypes.func.isRequired,
    setReplayMode: PropTypes.func.isRequired,
    grow: PropTypes.func.isRequired,
    updateIndex: PropTypes.func.isRequired,
    shrink: PropTypes.func.isRequired,
    createPizza: PropTypes.func.isRequired,
    detectPizza: PropTypes.func.isRequired,
  };

  _handleMovement = (e) => {
    const { props } = this;

    if ( e.keyCode >= 37 && e.keyCode <= 40) {
      if (e.keyCode === 38) {
        props.up();
      } else if (e.keyCode === 40) {
        props.down();
      } else if (e.keyCode === 37) {
        props.backward();
      } else if (e.keyCode === 39) {
        props.forward();
      }
      props.detectPizza();
    }

    // HAckz
    if (e.keyCode === 187) {
      props.grow();
    } else if (e.keyCode === 189) {
      props.shrink();
    }
  }

  _handleReplay = () => {
    const { props } = this;

    if (props.history.size > 0) {
      props.setReplayMode(true);
      props.history.get('worms').map((worm, idx) => {
        setTimeout(() => {
          props.updateIndex(idx);
          if ((idx + 1) === props.history.get('worms').size) {
            props.setReplayMode(false);
          }
        }, 25 * (idx + 1));
      });
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', this._handleMovement);
    for (let i = 1; i <= PIZZA_ARMY_SIZE; i++) {
      this.props.createPizza(getRandomPosition(), i);
    }
  }

  render() {
    const { props } = this;

    const pizzaParty = props.pizza.map((pizza, idx) => {
      return (
        <Pizza key={ idx }
               pizza={ pizza }
               replayInProgress={ props.history.get('replay') } />
        );
    });

    return (
      <section>
        <Menu showReplay={ this._handleReplay }
              history={ props.history }
              updateIndex={ props.updateIndex } />

        <div className="flex flex-row">
          <div style={ styles.gameContainer }
               className="border">
            { pizzaParty}

            <Worm  history={ props.history }
                   pizza={ props.pizza }
                   saveBoxInfo={ props.saveBoxInfo } />
          </div>

          <div className="border flex flex-center p2"
               style={ styles.titleContainer }>

            <div className="flex flex-column"
                 style={ styles.titleContent } >
              <div style={ styles.titleEmoji }>👑</div>
              <div style={ styles.titleText }>The Pizza King</div>
            </div>
          </div>
         </div>
      </section>
    );
  }
}

const styles = {
  gameContainer: {
    width: '80%',
    height: '90vh',
  },
  titleContainer: {
    width: '20%',
    height: '90vh',
  },
  titleContent: {
    width: '100%',
    textAlign: 'center',
  },
  titleText: {
    fontSize: '1.5em',
  },
  titleEmoji: {
    fontSize: '8em',
  },
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Radium(CounterPage));
