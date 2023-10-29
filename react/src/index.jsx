import React from 'react';
import ReactDOM from 'react-dom';

/**
 * To use Redux
 */
// import { createStore, applyMiddleware, compose } from 'redux';
// import { Provider } from 'react-redux'
// import thunk from 'redux-thunk';
// import rootReducer from './reducers'

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(rootReducer, composeEnhancers(
// 	applyMiddleware(thunk)
// ));

import App from './components/App';
import './styles/globals.css';
/**
 * React App
 */

const appContainer = document.getElementById('customizer-app');
if (appContainer) {
  // const component = <Provider store={store}>
  // 	<App />
  // </Provider>;

  const component = <App />;

  appContainer.innerHTML = '';
  ReactDOM.render(component, appContainer);
}
