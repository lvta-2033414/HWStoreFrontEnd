import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { GlobalProvider } from './store/GlobalState';
import { cartStore } from './store/CartState';
import { Provider } from 'react-redux';

import App from './App';

import 'bootstrap-icons/font/bootstrap-icons.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <GlobalProvider>
      <Provider store={cartStore}>
        <App />
      </Provider>
    </GlobalProvider>
  </Router>,
);
