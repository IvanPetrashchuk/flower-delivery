"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isShopActive = pathname === "/";
  const isCartActive = pathname === "/cart";

  const shopLinkClasses = `py-2 px-4 font-medium transition-colors ${
    isShopActive ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-blue-600"
  }`;

  const cartLinkClasses = `py-2 px-4 font-medium transition-colors ${
    isCartActive ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-blue-600"
  }`;

  return (
    <header className="bg-white shadow-sm py-4 px-6 border-b border-gray-200 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Link href="/" className="font-bold text-lg text-gray-900">
          Delivery.com
        </Link>
        <nav className="flex items-center space-x-4">
          <Link href="/" className={shopLinkClasses}>
            Shop
          </Link>
          <Link href="/cart" className={cartLinkClasses}>
            Shopping Cart
          </Link>
        </nav>
      </div>
      <div className="flex items-center space-x-4 text-sm text-gray-500">
        <span className="cursor-pointer hover:text-gray-900 transition-colors duration-200">Sort by price</span>
        <span className="cursor-pointer hover:text-gray-900 transition-colors duration-200">Sort by date</span>
      </div>
    </header>
  );
}
