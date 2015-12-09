import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import socket from '../socket/socket';
import Pizza from '../components/Pizza';
import Menu from '../components/Menu';
import Worm from '../components/Worm';
import { detectPizza } from '../actions/pizza';

import {
  saveBoxInfo,
  shrink,
  grow,
  forward,
  backward,
  up,
  down,
  updateIndex,
  setReplayMode,
} from '../actions/history';

function mapStateToProps(state) {
  return {
    history: state.history,
    pizza: state.pizza,
    game: state.game,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    forward: (player) => dispatch(forward(player)),
    backward: (player) => dispatch(backward(player)),
    up: (player) => dispatch(up(player)),
    down: (player) => dispatch(down(player)),
    grow: (player) => dispatch(grow(player)),
    shrink: (player) => dispatch(shrink(player)),
    detectPizza: () => dispatch(detectPizza()),
    updateIndex: (index) => dispatch(updateIndex(index)),
    setReplayMode: (flag) => dispatch(setReplayMode(flag)),
    saveBoxInfo: (width, height, player) => dispatch(saveBoxInfo(width, height, player)),
  };
}

class CounterPage extends Component {
  static propTypes = {
    game: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    pizza: PropTypes.object.isRequired,
    forward: PropTypes.func.isRequired,
    backward: PropTypes.func.isRequired,
    up: PropTypes.func.isRequired,
    down: PropTypes.func.isRequired,
    setReplayMode: PropTypes.func.isRequired,
    grow: PropTypes.func.isRequired,
    updateIndex: PropTypes.func.isRequired,
    shrink: PropTypes.func.isRequired,
    detectPizza: PropTypes.func.isRequired,
  };

  _handleMovement = (e) => {
    const { props } = this;
    const player = props.game.get('player');

    if ( e.keyCode >= 37 && e.keyCode <= 40 && !props.history.get('replay')) {
      if (e.keyCode === 38) {
        props.up(player);
        socket.emit('moved', { player: player, direction: 'up' });
      } else if (e.keyCode === 40) {
        props.down(player);
        socket.emit('moved', { player: player, direction: 'down' });
      } else if (e.keyCode === 37) {
        props.backward(player);
        socket.emit('moved', { player: player, direction: 'backward' });
      } else if (e.keyCode === 39) {
        props.forward(player);
        socket.emit('moved', { player: player, direction: 'forward' });
      }
      props.detectPizza();
    }

    // HAckz
    if (e.keyCode === 187) {
      props.grow(player);
      socket.emit('grow', player);
    } else if (e.keyCode === 189) {
      props.shrink(player);
      socket.emit('shrink', player);
    }
  }

  _handleReplay = () => {
    const { props } = this;
    const data = {
      history: props.history,
      game: props.game,
    };
    socket.emit('replay', data);
  }

  componentDidMount() {
    window.addEventListener('keydown', this._handleMovement);
  }

  render() {
    const { props } = this;

    const gameOver  = props.pizza.filter(pizza => {
      return !pizza.get('isEaten');
    });

    const worms = (
      <div>
        <Worm  player={'player1'}
               history={ props.history }
               pizza={ props.pizza }
               saveBoxInfo={ props.saveBoxInfo } />

        <Worm  player={'player2'}
               history={ props.history }
               pizza={ props.pizza }
               saveBoxInfo={ props.saveBoxInfo } />
    </div>
    );

    const pizzaParty = props.pizza.map((pizza, idx) => {
      return (
        <Pizza key={ idx }
               pizza={ pizza }
               replayInProgress={ props.history.get('replay') }
               gameOver={ gameOver.size } />
        );
    });

    return (
      <section>
        <Menu showReplay={ this._handleReplay }
              game={ props.game }
              pizza={ props.pizza }
              history={ props.history }/>

        <div className="">
          <div style={ styles.gameContainer }
               className="border">
            { pizzaParty}
            { worms }
          </div>

          <div className="p2">

            <div className=""
                 style={ styles.titleContent } >
              <a href="http://github.com/andrewdamelio/pizza-king" style={ styles.titleEmoji }>👑</a>
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
    margin: 'auto',
    height: '550px',
    width: '1450px',
    position: 'relative',
    overflow: 'hidden',
  },
  titleContent: {
    textAlign: 'center',
  },
  titleText: {
    fontSize: '1.5em',
  },
  titleEmoji: {
    fontSize: '5.5em',
    textDecoration: 'none',
  },
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Radium(CounterPage));
