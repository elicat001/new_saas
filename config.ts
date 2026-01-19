
import { MerchantConfig, Product } from './types';

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

export const PRODUCTS_MOCK: Record<string, Product[]> = {
  "TX1": [
    {
      id: "1", 
      name: "半条梦龙425g超大块", 
      price: 38.9, 
      vipPrice: 29.34, 
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop", 
      category: "店铺线下活动", 
      description: "浓郁巧克力与松软蛋糕的完美结合，层层惊喜，满足感爆棚。", 
      specs: ["标准份", "加大份"]
    },
    {
      id: "3", 
      name: "红丝绒芒果慕斯蛋糕", 
      price: 19.9, 
      vipPrice: 11.94, 
      image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=400&fit=crop", 
      category: "「😋」进店福利", 
      description: "进口芒果泥与红丝绒蛋糕坯的清新碰撞，口感轻盈细腻。", 
      specs: ["3寸", "6寸"]
    },
    {
      id: "4", 
      name: "招牌原味吐司", 
      price: 15.0, 
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop", 
      category: "现烤吐司", 
      description: "手工揉制，超长发酵，每一口都是小麦的清香。", 
      specs: ["整条", "切片"]
    }
  ],
  "MIO": [
    {
      id: "m1", 
      name: "经典拿铁", 
      price: 28.0, 
      vipPrice: 18.0, 
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop", 
      category: "精品咖啡", 
      description: "精选意式拼配豆，奶泡细腻，口感醇厚回甘。", 
      specs: ["热", "冰"]
    },
    {
      id: "m2", 
      name: "澳白咖啡", 
      price: 32.0, 
      image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=400&h=400&fit=crop", 
      category: "精品咖啡", 
      description: "浓缩咖啡与微奶泡的黄金比例，咖啡味更浓郁。", 
      specs: ["标准", "浓郁"]
    }
  ],
  "URBAN": [
    {
      id: "u1", 
      name: "法式法棍", 
      price: 12.0, 
      image: "https://images.unsplash.com/photo-1597079910443-60c43fc4f729?w=400&h=400&fit=crop", 
      category: "硬欧系列", 
      description: "外脆内软，传统法式工艺，麦香味十足。", 
      specs: ["标准"]
    }
  ]
};
