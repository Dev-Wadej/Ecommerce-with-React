import {
  CartIconContainer,
  ShoppingIcon,
  ItemCount,
} from './cart-icon.styles.jsx';
import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';

import React from 'react';
const CartIcon = () => {
  const { isCartOpen, setIscartOpen, cartCount } =
    useContext(CartContext);
  const toggleIsCartOpen = () => setIscartOpen(!isCartOpen);
  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
