import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    game: state.game,
  };
}

class CounterPage extends Component {
  static propTypes = {
    game: PropTypes.object.isRequired,
  };

  render() {
    const { props } = this;
    const visibleStyle = props.game.get('players').size < 2 ? styles.visible : styles.hidden;

    return (
      <div
        className="fixed top-0 bottom-0 left-0 right-0 p1"
        style={{ ...styles.base, ...visibleStyle }}>

        <div
          className={ `center p1 z4 bg-white` }
          style={{ ...styles.modalContent }}>
          <ul>
            <li style={ styles.players }>{'waiting for opponent...'}</li>
          </ul>
        </div>

      </div>
    );
  }
}

const styles = {
  base: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    transition: 'visibility 550ms, opacity 550ms',
  },
  players: {
    fontSize: '3em',
    listStyle: 'none',
    lineHeight: '6em',
    color: 'tomato',
  },
  modalContent: {
    width: '50vw',
    height: '50vh',
    margin: '4rem auto',
    boxShadow: '  7px 7px 5px 0px rgba(50, 50, 50, 0.75)',
  },
  visible: {
    visibility: 'visible',
    opacity: 1,
    zIndex: 1,
  },
  hidden: {
    visibility: 'hidden',
    opacity: 0,
  },
};

export default connect(
  mapStateToProps,
  {},
)(Radium(CounterPage));
