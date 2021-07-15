// import modules
import React from 'react';
import ReactDOM from 'react-dom';

// import styles
import './styles/reset.css';
import './styles/global.css';

// import context provider
import { Provider } from './Context';

// import main container component
import App from './components/App';

// render awesomeness :)
ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root')
);
