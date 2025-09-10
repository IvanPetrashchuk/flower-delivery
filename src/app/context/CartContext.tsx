// app/context/CartContext.tsx
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Flower, CartItem } from "@app/lib/types";

// Визначаємо типи для контексту
type CartContextType = {
  cart: CartItem[];
  addToCart: (flower: Flower) => void;
  removeFromCart: (flowerId: number) => void;
  updateItemCount: (flowerId: number, count: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (flower: Flower) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.flower.id === flower.id);
      if (existingItem) {
        return prevCart.map((item) => (item.flower.id === flower.id ? { ...item, count: item.count + 1 } : item));
      } else {
        return [...prevCart, { flower, count: 1 }];
      }
    });
  };

  const removeFromCart = (flowerId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.flower.id !== flowerId));
  };

  const updateItemCount = (flowerId: number, count: number) => {
    setCart((prevCart) => {
      if (count <= 0) {
        return prevCart.filter((item) => item.flower.id !== flowerId);
      }
      return prevCart.map((item) => (item.flower.id === flowerId ? { ...item, count } : item));
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateItemCount,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
