import { createStore } from 'redux';
import cartReducer from '../reducers/CartReducer';
import { devToolsEnhancer } from 'redux-devtools-extension';
// localStorage.getItem('cart')
// ? JSON.parse(localStorage.getItem('cart'))
// : []
// , devToolsEnhancer()
export const cartStore = createStore(cartReducer, devToolsEnhancer());
