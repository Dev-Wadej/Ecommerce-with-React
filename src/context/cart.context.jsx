import { createContext, useReducer } from 'react';
import { createAction } from '../utils/reducer/reducer.utils';

const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter(
    (cartItem) => cartItem.id !== cartItemToClear.id
  );
};
const removeCartItem = (cartItems, cartItemToRemove) => {
  //Find the cart item to remove

  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );
  // check if quantity is equal to 1, if it is remove that item from the cart

  if (existingCartItem.quantity === 1) {
    return cartItems.filter(
      (cartItem) => cartItem.id !== cartItemToRemove.id
    );
  }
  //return back cartitems with matching cart item with the reduced quantity
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const addCartItem = (cartItems, producttoAdd) => {
  // FInd if the cartitems contains product to add
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === producttoAdd.id
  );

  // If found, Increment the quantity

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === producttoAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  return [...cartItems, { ...producttoAdd, quantity: 1 }];
};

export const CartContext = createContext({
  isCartOpen: false,
  setIscartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  clearItemFromCart: () => {},
  removeItemFromCart: () => {},
  total: 0,
});

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    default:
      throw new Error(`unhandled type of ${type} in car`);
  }
};

const INITIAL_STATE = {
  cartCount: 0,
  total: 0,
  isCartOpen: false,
  cartItems: [],
};

export const CartProvider = ({ children }) => {
  const [{ cartItems, cartCount, cartTotal, isCartOpen }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);
  const updateCartItemsReducer = (newCartItems) => {
    const newCartTotal = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    const newCartCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartTotal: newCartTotal,
        cartCount: newCartCount,
      })
    );
  };
  const setIscartOpen = (bool) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
  };
  const addItemToCart = (producttoAdd) => {
    const newCartItems = addCartItem(cartItems, producttoAdd);
    updateCartItemsReducer(newCartItems);
  };
  const removeItemFromCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  };
  const clearItemFromCart = (cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    updateCartItemsReducer(newCartItems);
  };
  const value = {
    isCartOpen,
    setIscartOpen,
    removeItemFromCart,
    addItemToCart,
    clearItemFromCart,
    cartItems,
    cartCount,
    cartTotal,
  };
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
