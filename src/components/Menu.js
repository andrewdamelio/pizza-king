import React, { PropTypes } from 'react';

const Menu = ({ showReplay, history, updateIndex }) => {
  const replayInProgress = history.get('replay');
  const wormHistory = history.get('worms');

  return (
    <nav className="border-bottom">
      <button className="btn"
              disabled={ replayInProgress || wormHistory.size === 0 }
              onClick={ showReplay }>Replay</button>

      <input type="range"
             disabled={ replayInProgress }
             min="0"
             max={ wormHistory.size > 0 ? wormHistory.size - 1 : wormHistory.size  }
             onBlur={ (e) => {
               updateIndex(wormHistory.size - 1);
               e.target.value = 0;
             }}
             onMouseUp={ (e) => {
               updateIndex(wormHistory.size - 1);
               e.target.value = 0;
             }}
             onChange={ (e) => {
               updateIndex(e.target.value);
             }} />
    </nav>
  );
};

Menu.displayName = 'Menu';
Menu.propTypes = {
  showReplay: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  updateIndex: PropTypes.func.isRequired,
};

export default Menu;
