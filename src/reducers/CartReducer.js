import {
  ADD_TO_CART,
  REMOVED_CART_ITEM,
  CLEAR_CART,
  SET_QUANTITY,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  CALCULATE_TOTAL_AMOUNT,
} from '../actions/CartActions';

const getLocalCart = () =>
  localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
//
const initialState = {
  cart: getLocalCart(),
  total_items: 0,
  total_amount: 0,
};

const cartReducer = (state = initialState, action) => {
  const id = action.payload ? action.payload.id : undefined;
  switch (action.type) {
    case ADD_TO_CART: {
      let tempTotalAmount = 0;
      const tempItem = state.cart.find((item) => item.id === id);
      if (tempItem) {
        const tempCart = state.cart.map((item) => {
          if (item.id === id) {
            let newQuantity = item.quantity + 1;
            tempTotalAmount +=
              item.discountPrice > 0
                ? item.discountPrice * newQuantity
                : item.price * newQuantity;
            return { ...item, quantity: newQuantity };
          } else {
            tempTotalAmount +=
              item.discountPrice > 0
                ? item.discountPrice * item.quantity
                : item.price * item.quantity;
            return item;
          }
        });
        return {
          ...state,
          cart: tempCart,
          total_amount: tempTotalAmount,
        };
      } else {
        tempTotalAmount +=
          action.payload.discountPrice > 0
            ? action.payload.discountPrice * action.payload.quantity
            : action.payload.price * action.payload.quantity;
        return {
          ...state,
          cart: [...state.cart, action.payload],
          total_amount: tempTotalAmount,
        };
      }
    }
    case REMOVED_CART_ITEM: {
      let tempTotalAmount = state.total_amount - action.payload.amount;
      const tempCart = state.cart.filter((item) => item.id !== id);
      return { ...state, cart: tempCart, total_amount: tempTotalAmount };
    }
    case SET_QUANTITY: {
      let tempTotalAmount = 0;
      const tempCart = state.cart.map((item) => {
        if (item.id === id) {
          let newQuantity = action.payload.quantity;
          tempTotalAmount +=
            item.discountPrice > 0
              ? item.discountPrice * newQuantity
              : item.price * newQuantity;
          return { ...item, quantity: newQuantity };
        } else {
          tempTotalAmount +=
            item.discountPrice > 0
              ? item.discountPrice * item.quantity
              : item.price * item.quantity;
          return item;
        }
      });
      return { ...state, cart: tempCart, total_amount: tempTotalAmount };
    }
    case INCREASE_QUANTITY: {
      let tempTotalAmount = state.total_amount + action.payload.amount;
      const tempCart = state.cart.map((item) => {
        if (item.id === id) {
          let newQuantity = ++item.quantity;
          return { ...item, quantity: newQuantity };
        } else return item;
      });
      return { ...state, cart: tempCart, total_amount: tempTotalAmount };
    }
    case DECREASE_QUANTITY: {
      let tempTotalAmount = state.total_amount - action.payload.amount;
      const tempCart = state.cart.map((item) => {
        if (item.id === id) {
          let newQuantity = --item.quantity;
          newQuantity = newQuantity > 0 ? newQuantity : 1;
          return { ...item, quantity: newQuantity };
        } else return item;
      });
      return { ...state, cart: tempCart, total_amount: tempTotalAmount };
    }
    case CALCULATE_TOTAL_AMOUNT: {
      let tempTotalAmount = 0;
      if (state.cart.length > 0) {
        for (const item of state.cart) {
          if (item.discountPrice > 0) {
            tempTotalAmount += item.discountPrice * item.quantity;
          } else {
            tempTotalAmount += item.quantity * item.price;
          }
        }
        return { ...state, total_amount: tempTotalAmount };
      }
      return state;
    }
    case CLEAR_CART: {
      return { ...state, cart: [] };
    }
    default:
      return state;
  }
};

export default cartReducer;
