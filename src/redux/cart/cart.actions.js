import CartActionTypes from './cart.types';

export const toggleCartHidden = () => {
    const hiddenState = {hidden: true};
    return ({
      type: CartActionTypes.TOGGLE_CART_HIDDEN,
      payload: hiddenState
    });

  }

export const addItem = (item) => ({
  type: CartActionTypes.ADD_ITEM,
  payload: item
});

export const deleteItem = (item) => ({
  type: CartActionTypes.DELETE_ITEM,
  payload: item
});

export const removeItem = (item) => ({
  type: CartActionTypes.REMOVE_ITEM,
  payload: item
});