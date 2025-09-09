// src/components/ui/FlowerCard.tsx
"use client";

import React from "react";
import { Flower } from "@/app/lib/types";
import Image from "next/image";
import { useCart } from "@/app/context/CartContext"; // Імпортуємо хук useCart

type FlowerCardProps = {
  flower: Flower;
};

export default function FlowerCard({ flower }: FlowerCardProps) {
  const { addToCart } = useCart(); 

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col items-center">
      <div className="relative w-40 h-40 rounded-lg overflow-hidden mb-4">
        <Image
          src={flower.imageUrl}
          alt={flower.name}
          fill={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "cover" }}
          className="rounded-lg"
        />
      </div>
      <h3 className="text-xl font-medium">{flower.name}</h3>
      <p className="text-lg text-gray-600 mt-1">${flower.price.toFixed(2)}</p>
      <button
        onClick={() => addToCart(flower)} // Додаємо обробник події
        className="mt-4 w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
      >
        add to Cart
      </button>
    </div>
  );
}
