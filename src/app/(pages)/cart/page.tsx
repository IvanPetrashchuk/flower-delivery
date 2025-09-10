// src/app/(pages)/cart/page.tsx
"use client";

import React from "react";
import Header from "@/app/components/ui/Header";
import CartItemComponent from "@app/components/ui/CartItem";
import OrderForm from "@app/components/ui/OrderForm";
import { useCart } from "@app/context/CartContext";
import { Flower } from "@app/lib/types";

export default function ShoppingCartPage() {
  const { cart, updateItemCount, removeFromCart, clearCart, isLoaded } = useCart();

  const totalPrice = cart.reduce((sum, item) => sum + item.flower.price * item.count, 0);

  const handleUpdateQuantity = (flowerId: number, newQuantity: number) => {
    updateItemCount(flowerId, newQuantity);
  };

  const handleSubmitOrder = (formData: any) => {
    console.log("Submitting order:", formData);
    alert("Order submitted successfully!");
    clearCart();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      <Header onSortByPrice={() => {}} onSortByDate={() => {}} onSortByFavorites={() => {}} sortBy={""} />
      <main className="flex-1 p-6 flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
        <div className="w-full md:w-1/3">
          <OrderForm cartItems={cart} totalPrice={totalPrice} onSubmit={handleSubmitOrder} />
        </div>
        <div className="w-full md:w-2/3">
          <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
          {!isLoaded ? (
            <p className="text-gray-600">Loading cart...</p>
          ) : (
            cart.length === 0 ? (
              <p className="text-gray-600">Your cart is empty.</p>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <CartItemComponent
                    key={item.flower.id}
                    item={item}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemoveItem={removeFromCart}
                  />
                ))}
              </div>
            )
          )}
        </div>
      </main>
    </div>
  );
}