import React, { createContext, useContext, useState, useEffect } from "react";

// Create Cart Context
const CartContext = createContext();

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error loading cart:", error);
        setCart([]);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add item to cart
  const addToCart = (
    productId,
    productName,
    productPrice,
    productImage,
    quantity = 1,
  ) => {
    setCart((prevCart) => {
      // Check if item already exists in cart
      const existingItemIndex = prevCart.findIndex(
        (item) => item.productId === productId,
      );

      if (existingItemIndex !== -1) {
        // Item exists, update quantity
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += quantity;
        return updatedCart;
      } else {
        // Item doesn't exist, add new item
        return [
          ...prevCart,
          {
            productId,
            productName,
            productPrice,
            productImage,
            quantity,
            deliveryOption: "1", // Default to free shipping
          },
        ];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.productId !== productId),
    );
  };

  // Update item quantity
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      const itemIndex = updatedCart.findIndex(
        (item) => item.productId === productId,
      );
      if (itemIndex !== -1) {
        updatedCart[itemIndex].quantity = newQuantity;
      }
      return updatedCart;
    });
  };

  // Update delivery option
  const updateDeliveryOption = (productId, deliveryOptionId) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      const itemIndex = updatedCart.findIndex(
        (item) => item.productId === productId,
      );
      if (itemIndex !== -1) {
        updatedCart[itemIndex].deliveryOption = deliveryOptionId;
      }
      return updatedCart;
    });
  };

  // Get total cart quantity
  const getCartQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Get cart total price
  const getCartTotal = () => {
    return cart.reduce(
      (total, item) => total + item.productPrice * item.quantity,
      0,
    );
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    updateDeliveryOption,
    getCartQuantity,
    getCartTotal,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
