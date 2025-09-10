// src/components/HomePageContent.tsx
"use client";

import React, { useState, useEffect } from "react";
import ShopSidebar from "./ui/ShopSidebar";
import FlowerCard from "./ui/FlowerCard";
import Header from "./ui/Header";
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
  const [sortBy, setSortBy] = useState<string>('');
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleShopSelect = async (shopId: number) => {
    setActiveShopId(shopId);
    setLoading(true);
    const newFlowers = await getFlowersByShop(shopId);
    setFlowers(newFlowers);
    setLoading(false);
    setSortBy('');
  };

  const toggleFavorite = (flowerId: number) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(flowerId)) {
        return prevFavorites.filter((id) => id !== flowerId);
      } else {
        return [...prevFavorites, flowerId];
      }
    });
  };

  const sortFlowers = (criteria: 'price' | 'date' | 'favorites') => {
    setSortBy(criteria);
    const sortedFlowers = [...flowers].sort((a, b) => {
      if (criteria === 'favorites') {
        const aIsFavorite = favorites.includes(a.id) ? 1 : 0;
        const bIsFavorite = favorites.includes(b.id) ? 1 : 0;
        return bIsFavorite - aIsFavorite; // Улюблені йдуть першими
      }
      if (criteria === 'price') {
        return a.price - b.price;
      }
      // Сортування за датою, припускаючи, що у вашому типі Flower є `dateAdded`
      if (criteria === 'date') {
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      }
      return 0;
    });
    setFlowers(sortedFlowers);
  };
  
  const flowersWithFavorites = flowers.map(flower => ({
    ...flower,
    isFavorite: favorites.includes(flower.id),
  }));

  return (
    <>
      <Header
        onSortByPrice={() => sortFlowers('price')}
        onSortByDate={() => sortFlowers('date')}
        onSortByFavorites={() => sortFlowers('favorites')}
        sortBy={sortBy}
      />
      <div className="flex flex-1">
        <ShopSidebar
          shops={shops}
          activeShopId={activeShopId.toString()}
          onSelectShop={handleShopSelect as any}
        />
        <main className="flex-1 p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {loading ? <p>Loading...</p> : flowersWithFavorites.map((flower) => (
              <FlowerCard
                key={flower.id}
                flower={flower}
                toggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        </main>
      </div>
    </>
  );
}