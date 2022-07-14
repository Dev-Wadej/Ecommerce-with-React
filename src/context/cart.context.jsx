import { createContext, useState, useEffect } from 'react';

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
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIscartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  const addItemToCart = (producttoAdd) => {
    setCartItems(addCartItem(cartItems, producttoAdd));
  };
  const value = {
    isCartOpen,
    setIscartOpen,
    addItemToCart,
    cartItems,
    cartCount,
  };
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
