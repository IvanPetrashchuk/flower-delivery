// src/app/cart/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Header from "@/app/components/ui/Header";
import CartItemComponent from "@app/components/ui/CartItem";
import OrderForm from "@app/components/ui//OrderForm";
import { CartItem } from "@app/lib/types";



export default function ShoppingCartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      const items: CartItem[] = JSON.parse(savedCart);
      setCartItems(items);
      calculateTotalPrice(items);
    }
  }, []);

  const calculateTotalPrice = (items: CartItem[]) => {
    const total = items.reduce((sum, item) => sum + item.flower.price * item.quantity, 0);
    setTotalPrice(total);
  };

  const handleUpdateQuantity = (flowerId: number, newQuantity: number) => {
    const updatedCart = cartItems
      .map((item) => (item.flower.id === flowerId ? { ...item, quantity: newQuantity } : item))
      .filter((item) => item.count > 0);

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotalPrice(updatedCart);
  };

  const handleSubmitOrder = (formData: any) => {
    console.log("Submitting order:", formData);
    alert("Order submitted successfully!");
    setCartItems([]);
    localStorage.removeItem("cart");
    setTotalPrice(0);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      <Header />
      <main className="flex-1 p-6 flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
        <div className="w-full md:w-2/3">
          <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
          {cartItems.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <CartItemComponent key={item.flower.id} item={item} onUpdateQuantity={handleUpdateQuantity} />
              ))}
            </div>
          )}
        </div>
        <div className="w-full md:w-1/3">
          <OrderForm cartItems={cartItems} totalPrice={totalPrice} onSubmit={handleSubmitOrder} />
        </div>
      </main>
    </div>
  );
}
