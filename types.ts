
export enum TabType {
  HOME = 'HOME',
  MENU = 'MENU',
  ORDERS = 'ORDERS',
  PROFILE = 'PROFILE'
}

export interface ThemeConfig {
  primary: string;
  secondary: string;
  borderRadius: string;
  fontFamily?: string;
}

export interface MerchantConfig {
  id: string;
  name: string;
  slogan: string;
  logo: string;
  mascot: string;
  theme: ThemeConfig;
  features: {
    dineIn: boolean;
    pickup: boolean;
    delivery: boolean;
    express: boolean;
    topup: boolean;
    coupons: boolean;
  };
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
