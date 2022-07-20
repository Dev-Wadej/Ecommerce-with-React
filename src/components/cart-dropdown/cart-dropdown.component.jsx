import {
  CartDropdownContainer,
  EmptyMessage,
  CartItems,
} from './cart-dropdown.styles.jsx';
import CartItem from '../cart-item/cart-item.component';
import Button from '../button/button.component';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/cart.context';

const CartDropdown = () => {
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate('/checkout');
  };
  const { cartItems } = useContext(CartContext);
  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} cartItem={cartItem} />
          ))
        ) : (
          <EmptyMessage>Your Cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={goToCheckoutHandler}>Go TO CHECKOUT</Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
