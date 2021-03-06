import { devTools } from 'redux-devtools';
import thunkMiddleware from 'redux-thunk';
import logger from './config/logger';
import rootReducer from '../reducers';

import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';

export default function configureStore(initialState) {
  const store = compose(
    __DEV__ ? applyMiddleware(thunkMiddleware, logger) : applyMiddleware(thunkMiddleware),
    devTools(),
  )(createStore)(rootReducer, initialState);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
