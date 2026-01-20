
export enum TabType {
  HOME = 'HOME',
  MENU = 'MENU',
  ORDERS = 'ORDERS',
  PROFILE = 'PROFILE'
}

export enum OrderStatus {
  PENDING_PAY = 'PENDING_PAY',
  PAID = 'PAID',
  PREPARING = 'PREPARING',
  READY = 'READY',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface StoreContext {
  id: string;
  name: string;
  table_no?: string;
  allow_order: boolean;
  allow_pay: boolean;
  address: string;
  order_type_default: 'DINE_IN' | 'PICK_UP';
  theme: {
    primary: string;
    secondary: string;
  };
}

// Added missing MerchantConfig interface definition
export interface MerchantConfig {
  id: string;
  name: string;
  slogan: string;
  logo: string;
  mascot: string;
  theme: {
    primary: string;
    secondary: string;
    borderRadius: string;
  };
  features: {
    dineIn: boolean;
    pickup: boolean;
    delivery: boolean;
    express: boolean;
    topup: boolean;
    coupons: boolean;
  };
}

export interface CartItem {
  cart_item_id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  spec?: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  vipPrice?: number;
  image: string;
  description?: string;
  category: string;
  specs?: string[];
}

export interface Order {
  id: string;
  storeId: string;
  storeName: string;
  status: OrderStatus;
  totalAmount: number;
  items: CartItem[];
  takeNo?: string;
  createdAt: string;
}
