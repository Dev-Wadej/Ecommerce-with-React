import './cart-dropdown.styles.scss';
import CartItem from '../cart-item/cart-item.component';
import Button from '../button/button.component';
import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </div>
      <Button>Go TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
