import CartActionTypes from './cart.types';
import {addItemToCart} from './cart.utils';

const INITIAL_STATE = {
  hidden: true,
  cartItems: []//,
 // itemCount: 0
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden
      };
    case CartActionTypes.ADD_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload)//,
        //itemCount: state.cartItems.reduce((accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity,0)+1
      }
    default:
      return state;
  }
};

export default cartReducer;