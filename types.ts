
export enum TabType {
  HOME = 'HOME',
  MENU = 'MENU',
  ORDERS = 'ORDERS',
  PROFILE = 'PROFILE'
}

export interface Product {
  id: string;
  name: string;
  price: number;
  vipPrice?: number;
  image: string;
  description?: string;
  category: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: 'PAID' | 'CANCELLED' | 'PENDING';
  items: { product: Product; quantity: number }[];
  totalPrice: number;
  date: string;
  type: 'DINE_IN' | 'PICK_UP' | 'DELIVERY';
}
