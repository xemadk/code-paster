import React from 'react';
import ReactDOM from 'react-dom';
import { StylesProvider } from '@material-ui/styles';
import {Provider} from 'react-redux';
import App from './app';
import {store} from './store'



ReactDOM.render(
  <Provider store={store}>
  <>
    <StylesProvider injectFirst>
      <App />
    </StylesProvider>
  </>
  </Provider>
  ,
  document.getElementById('root')
);
