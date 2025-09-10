// src/app/page.tsx
import React from "react";
import HomePageContent from "@app/components/HomePageContent";
import { getShops, getFlowersByShop } from "@app/lib/data";

export default async function HomePage() {
  const shops = await getShops();
  const initialShopId = shops[0]?.id || 1;
  const initialFlowers = await getFlowersByShop(initialShopId);

  const fetchFlowers = async (shopId: number) => {
    "use server";
    return await getFlowersByShop(shopId);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      <HomePageContent
        shops={shops}
        initialFlowers={initialFlowers}
        initialShopId={initialShopId}
        getFlowersByShop={fetchFlowers}
      />
    </div>
  );
}
