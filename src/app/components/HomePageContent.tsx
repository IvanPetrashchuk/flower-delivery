// src/app/components/HomePageContent.tsx
"use client";

import React, { useState } from "react";
import ShopSidebar from "./ui/ShopSidebar";
import FlowerCard from "./ui/FlowerCard";
import { Flower, Shop } from "../lib/types";

type HomePageContentProps = {
  shops: Shop[];
  initialFlowers: Flower[];
  initialShopId: number;
  getFlowersByShop: (shopId: number) => Promise<Flower[]>;
};

export default function HomePageContent({
  shops,
  initialFlowers,
  initialShopId,
  getFlowersByShop,
}: HomePageContentProps) {
  const [activeShopId, setActiveShopId] = useState<number>(initialShopId);
  const [flowers, setFlowers] = useState<Flower[]>(initialFlowers);
  const [loading, setLoading] = useState(false);

  const handleShopSelect = async (shopId: number) => {
    setActiveShopId(shopId);
    setLoading(true);
    const newFlowers = await getFlowersByShop(shopId);
    setFlowers(newFlowers);
    setLoading(false);
  };

  return (
    <>
      <ShopSidebar shops={shops} activeShopId={activeShopId.toString()} onSelectShop={handleShopSelect as any} />
      <main className="flex-1 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? <p>Loading...</p> : flowers.map((flower) => <FlowerCard key={flower.id} flower={flower} />)}
        </div>
      </main>
    </>
  );
}
