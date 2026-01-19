
import { MerchantConfig } from './types';

export const MERCHANTS: MerchantConfig[] = [
  {
    id: 'TX1',
    name: '棠小一烘焙',
    slogan: 'TANG XIAO YI',
    logo: '棠',
    mascot: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=300&h=300&fit=crop',
    theme: {
      primary: '#f7e28b',
      secondary: '#d4b945',
      borderRadius: '40px',
    },
    features: {
      dineIn: true, pickup: true, delivery: true, express: true, topup: true, coupons: true
    }
  },
  {
    id: 'MIO',
    name: 'Mio Coffee',
    slogan: 'MIO BREW',
    logo: 'M',
    mascot: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop',
    theme: {
      primary: '#2D5A27',
      secondary: '#1A3317',
      borderRadius: '12px',
    },
    features: {
      dineIn: true, pickup: true, delivery: false, express: false, topup: true, coupons: true
    }
  },
  {
    id: 'URBAN',
    name: 'Urban Bakery',
    slogan: 'UB IND.',
    logo: 'U',
    mascot: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=300&fit=crop',
    theme: {
      primary: '#1a1a1a',
      secondary: '#000000',
      borderRadius: '0px',
    },
    features: {
      dineIn: true, pickup: true, delivery: true, express: false, topup: false, coupons: true
    }
  }
];
