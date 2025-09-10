import { Flower } from './types';

export const getCart = (): { flower: Flower; count: number }[] => {
  if (typeof window !== "undefined") {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  }
  return [];
};

const saveCart = (cart: { flower: Flower; count: number }[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

export const addToCart = (flower: Flower) => {
  const cart = getCart();
  const existingItem = cart.find((item) => item.flower.id === flower.id);
  if (existingItem) {
    existingItem.count += 1;
  } else {
    cart.push({ flower, count: 1 });
  }
  saveCart(cart);
};

export const updateQuantity = (flowerId: number, newQuantity: number) => {
  const cart = getCart();
  const updatedCart = cart.map((item) =>
    item.flower.id === flowerId
      ? { ...item, count: newQuantity > 0 ? newQuantity : 1 }
      : item
  );
  saveCart(updatedCart);
};

export const removeFromCart = (flowerId: number) => {
  const cart = getCart();
  const updatedCart = cart.filter((item) => item.flower.id !== flowerId);
  saveCart(updatedCart);
};

export const clearCart = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("cart");
  }
};