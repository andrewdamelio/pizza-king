import React, { PropTypes } from 'react';
import socket from '../socket/socket';

const Menu = ({ showReplay, game, history, gameOver }) => {
  const player = game.get('player') || 'Spectator';
  const playerColor = (player === 'player1') ? 'orange' : 'green';

  function handleClick() {
    socket.emit('restartGame');
  }

  return (
    <nav className="border-bottom flex flex-justify">
      <div>
      <button className="btn black"
              style={ gameOver !== 0 || history.get('replay') ? { ...styles.hidden } : null }
              onClick={ showReplay }>Replay</button>
      </div>

      <div className={ `bold caps p1 black bg-${ playerColor }` }>
        { player }
      </div>

      <div>
        <button className="btn black"
                style={ gameOver !== 0 || history.get('replay') ? { ...styles.hidden } : null }
                onClick={ handleClick }>Play again</button>
      </div>
    </nav>
  );
};

Menu.displayName = 'Menu';
Menu.propTypes = {
  showReplay: PropTypes.func.isRequired,
  game: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  gameOver: PropTypes.number.isRequired,
};

const styles = {
  hidden: {
    visibility: 'hidden',
    opacity: 0,
  },
};

export default Menu;
