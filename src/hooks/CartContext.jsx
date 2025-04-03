import { createContext, useState, useContext, useEffect } from "react";

//1
const CartContext = createContext();

//2
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product._id === product._id,
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item.product._id === product._id
            ? { product: item.product, quantity: item.quantity + quantity }
            : item,
        );
      } else {
        return [...prevCart, { product, quantity }];
      }
    });
  };

  const addToCartWithQuantity = (product, quantity) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product._id === product._id,
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item.product._id === product._id
            ? { product: item.product, quantity: item.quantity + quantity }
            : item,
        );
      } else {
        return [...prevCart, { product, quantity }];
      }
    });
  };

  const quantityProductFromCart = (product_id) => {
    const existingItem = cart.find((item) => item.product._id === product_id);
    return existingItem ? existingItem.quantity : 0;
  };

  const removeFromCart = (product_id) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.product._id !== product_id),
    );
  };

  const reduceFromCart = (product_id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.product._id === product_id
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        reduceFromCart,
        totalItems,
        addToCartWithQuantity,
        quantityProductFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

//3
export const useCart = () => useContext(CartContext);
