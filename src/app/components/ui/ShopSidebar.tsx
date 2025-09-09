'use client';

import React from 'react';
import { Shop } from '@app/lib/types'; 

type ShopSidebarProps = {
  shops: Shop[];
  activeShopId: string;
  onSelectShop: (shopId: string) => void;
};

export default function ShopSidebar({ shops, activeShopId, onSelectShop }: ShopSidebarProps) {
  return (
    <aside className="w-64 border-r border-gray-200 p-4 bg-white">
      <h2 className="text-lg font-semibold mb-4">Shops:</h2>
      <div className="space-y-2">
        {shops.map((shop) => (
          <button
            key={shop.id}
            onClick={() => onSelectShop(shop.id.toString())}
            className={`w-full text-left py-2 px-4 rounded-lg transition-colors duration-200
              ${activeShopId === shop.id.toString() ? 'bg-blue-100 text-blue-800 font-medium' : 'hover:bg-gray-100'}
            `}
          >
            {shop.name}
          </button>
        ))}
      </div>
    </aside>
  );
}