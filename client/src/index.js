import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import reducers from './reducers';

// CSS files arent assigned to a varibale so we can just import the file and have the same effect.
//import materializeCSS from 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/css/materialize.min.css';

import reduxThunk from 'redux-thunk';


const store = createStore(reducers, {}, applyMiddleware(reduxThunk))


ReactDOM.render(<Provider store={store}><App /></Provider>, document.querySelector('#root'));