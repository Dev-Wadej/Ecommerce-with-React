import './cart-dropdown.styles.scss';
import Button from '../button/button.component';
import React from 'react';

const CartDropdown = () => {
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items"></div>
      <Button>Go TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
