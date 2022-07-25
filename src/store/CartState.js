import { createStore, combineReducers } from 'redux';

import cartReducer from '../reducers/CartReducer';
import userReducer from '../reducers/UserReducer';
import { devToolsEnhancer } from 'redux-devtools-extension';
// localStorage.getItem('cart')
// ? JSON.parse(localStorage.getItem('cart'))
// : []
// , devToolsEnhancer()
const rootReducer = combineReducers({ cartReducer, userReducer });

// export const cartStore = createStore(cartReducer, devToolsEnhancer());

export const cartStore = createStore(rootReducer, devToolsEnhancer());
