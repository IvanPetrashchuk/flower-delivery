export type Flower = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  shopId: number;
  isFavorite?: boolean;
  dateAdded: string;
};

export type Shop = {
  id: number;
  name: string;
};

export type CartItem = {
  flower: Flower;
  count: number;
};

export type Order = {
  id: string;
  items: CartItem[];
  totalPrice: number;
  deliveryAddress: string;
  email: string;
  phone: string;
  orderDate: Date;
};

export type Coupon = {
  name: string;
  code: string;
};

export type User = {
  email: string;
  phone: string;
  orderHistory: Order[];
};
