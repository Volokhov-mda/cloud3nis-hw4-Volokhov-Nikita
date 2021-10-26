import { /*compose, */createStore, applyMiddleware } from "redux";
import createSagaMiddleware from '@redux-saga/core';
// import thunk from 'redux-thunk';

import rootReducer from './reducers/rootReducer.js';


export const saga = createSagaMiddleware();

export const store = createStore(
    rootReducer,
    // compose(
      applyMiddleware(/*thunk, */saga),
      // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    // ),
  );