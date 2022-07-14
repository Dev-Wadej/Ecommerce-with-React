import { Children, createContext, useState } from 'react';

export const CartContext = createContext({
  isCartOpen: false,
  setIscartOpen: () => null,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIscartOpen] = useState(false);
  const value = { isCartOpen, setIscartOpen };
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
