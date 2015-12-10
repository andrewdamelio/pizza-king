import './styles/styles.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import PizzaKing from './containers/PizzaKing';
import Setup from './containers/Setup';
import socket from './socket/socket';
import * as gameActions from './actions/game';
import * as historyActions from './actions/history';
import * as pizzaActions from './actions/pizza';
import * as socketHelper from './actions/socket';

import {
  DevTools,
  DebugPanel,
  LogMonitor,
} from 'redux-devtools/lib/react';

const initialState = {};
const store = configureStore(initialState);
const actions = bindActionCreators({ ...pizzaActions, ...historyActions, ...gameActions }, store.dispatch);

socket.on('replay', socketHelper.replay.bind(this, actions));
socket.on('updatePizza', socketHelper.updatePizza.bind(this, actions));
socket.on('resetGame', socketHelper.resetGame.bind(this, actions));
socket.on('grow', socketHelper.grow.bind(this, actions));
socket.on('shrink', socketHelper.shrink.bind(this, actions));
socket.on('welcome', socketHelper.welcome.bind(this, actions));
socket.on('join', socketHelper.join.bind(this, actions));
socket.on('quit', socketHelper.quit.bind(this, actions));
socket.on('other_player_moved', socketHelper.movement.bind(this, actions));

ReactDOM.render(
  <div>
    <Provider store={ store }>
      <div>
        <Setup />
        <PizzaKing />
      </div>

    </Provider>
    { __DEV__ ? (
      <DebugPanel top right bottom>
        <DevTools store={ store }
                  monitor={ LogMonitor }
                  visibleOnLoad={ false } />
      </DebugPanel>
    ) : null }
  </div>,
  document.getElementById('pizza')
);
