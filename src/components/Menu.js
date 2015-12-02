import React from 'react';
import Radium from 'radium';

const Menu = ({ replayInProgress, showReplay, history, setWormPosition }) => {
  return (
    <nav className="border-bottom">
      <button className="btn"
              disabled={ replayInProgress || history.size === 0 }
              onClick={ showReplay }>Replay</button>

      <input type="range"
             disabled={ replayInProgress }
             min="0"
             max={ history.size > 0 ? history.size - 1 : history.size  }
             onChange={ (e) => {
               const thing = history.toJS()[e.target.value];
               setWormPosition(thing.positionX, thing.positionY, thing.direction, thing.size);
             } } />
    </nav>
  );
};

export default Radium(Menu);
