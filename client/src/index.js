import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createStore,applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import rootReducer from './redux/reducers/index'
export const store=createStore(rootReducer,applyMiddleware(thunk))
ReactDOM.render(
 <Provider store={store}>
     <App />
 </Provider>,
  
 
  document.getElementById('root')
);


reportWebVitals();
