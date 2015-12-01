import './styles/styles.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import PizzaKing from './containers/PizzaKing';

import {
  DevTools,
  DebugPanel,
  LogMonitor,
} from 'redux-devtools/lib/react';


const initialState = {};
const store = configureStore(initialState);

ReactDOM.render(
  <div>
    <Provider store={ store }>
      <PizzaKing />
    </Provider>
    <DebugPanel top left bottom>
      <DevTools store={ store }
                monitor={ LogMonitor }
                visibleOnLoad={ false } />
    </DebugPanel>
  </div>,
  document.getElementById('pizza')
);
