import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './modules';
import loggerMiddleware from './lib/loggerMiddleware';
import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';

const logger = createLogger();
// thunk
const store = createStore(rootReducer, applyMiddleware(logger, ReduxThunk));
// logger
// const store = createStore(rootReducer, applyMiddleware(logger));
// middleware
// const store = createStore(rootReducer, applyMiddleware(loggerMiddleware));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
