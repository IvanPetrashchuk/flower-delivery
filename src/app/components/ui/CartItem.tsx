"use client";

import React from "react";
import Image from "next/image";
import { CartItem } from "@app/lib/types";

interface CartItemProps {
  item: CartItem;
  onUpdateQuantity: (flowerId: number, newQuantity: number) => void;
  onRemoveItem: (flowerId: number) => void; 
}

export default function CartItemComponent({ item, onUpdateQuantity, onRemoveItem }: CartItemProps) {
  const handleIncrease = () => {
    onUpdateQuantity(item.flower.id, item.count + 1);
  };

  const handleDecrease = () => {
    if (item.count > 1) {
      onUpdateQuantity(item.flower.id, item.count - 1);
    }
  };

  const handleRemove = () => {
    onRemoveItem(item.flower.id);
  };

  return (
    <div className="flex items-center justify-between p-4 border rounded-md shadow-sm bg-white mb-4">
      <div className="flex items-center">
        <div className="w-20 h-20 rounded-md overflow-hidden mr-4">
          <Image
            src={item.flower.imageUrl}
            alt={item.flower.name}
            width={80}
            height={80}
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold">{item.flower.name}</h3>
          <p className="text-gray-600">${item.flower.price.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={handleDecrease}
          className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
        >
          -
        </button>
        <span className="text-lg font-medium w-6 text-center">{item.count}</span>
        <button
          onClick={handleIncrease}
          className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
        >
          +
        </button>
      </div>
      {/* Кнопка "хрестик" */}
      <button onClick={handleRemove} className="text-gray-400 hover:text-red-500 transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
