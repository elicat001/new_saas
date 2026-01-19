
import React, { useState } from 'react';
import { Search, Plus, Minus, Info, ChevronRight, MapPin, X, ShoppingCart, Users } from 'lucide-react';
// Added MerchantConfig import
import { MerchantConfig } from '../types';

interface Product {
  id: string;
  name: string;
  price: number;
  vipPrice?: number;
  image: string;
  category: string;
  description: string;
  specs?: string[];
}

const CATEGORIES = [
  '店铺线下活动',
  '「😋」进店福利',
  '贝果&牛角(促销)',
  '进店福利',
  '提拉米苏',
  '瑞士卷(微糖)',
  '法式甜品',
  '日式甜品'
];

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: '半条梦龙425g超大...',
    price: 38.9,
    vipPrice: 29.34,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop',
    category: '店铺线下活动',
    description: '浓郁巧克力与松软蛋糕的完美结合，超大份量满足感。'
  },
  {
    id: '2',
    name: '(到店) 甜品自助甜品...',
    price: 48.9,
    vipPrice: 29.34,
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=400&fit=crop',
    category: '店铺线下活动',
    description: '本店所有产品，不限数量，吃多少拿多少。'
  },
  {
    id: '3',
    name: '红丝绒芒果慕斯蛋糕',
    price: 19.9,
    vipPrice: 11.94,
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=400&fit=crop',
    category: '「😋」进店福利',
    description: '红丝绒与热带芒果的酸甜碰撞，口感轻盈细腻。',
    specs: ['3寸']
  },
  {
    id: '4',
    name: '2件方形切件蛋糕🍰...',
    price: 12.9,
    vipPrice: 7.74,
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=400&h=400&fit=crop',
    category: '「😋」进店福利',
    description: '精选当日新鲜食材，两件更划算。'
  }
];

interface MenuProps {
  onCheckout: () => void;
  // Added merchant prop
  merchant: MerchantConfig;
}

// Updated component signature to accept merchant prop
const Menu: React.FC<MenuProps> = ({ onCheckout, merchant }) => {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const [orderType, setOrderType] = useState<'堂食' | '配送' | '快递'>('堂食');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<{product: Product, quantity: number}[]>([]);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  const handleOpenProduct = (product: Product) => {
    setSelectedProduct(product);
    setQuantity(1);
  };

  const addToCart = () => {
    if (selectedProduct) {
      setCart(prev => [...prev, { product: selectedProduct, quantity }]);
      setSelectedProduct(null);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white relative pb-32">
      {/* Header */}
      <div className="px-5 pt-14 bg-white sticky top-0 z-40">
        <div className="flex items-center justify-between mb-6">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-100 rounded-full bg-white shadow-sm active-scale">
            <Users size={16} />
            <span className="text-[11px] font-black uppercase tracking-wider">拼单</span>
          </button>
          <div className="bg-gray-50 p-3 rounded-full text-gray-400 active-scale"><Search size={20} strokeWidth={2.5} /></div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5 active-scale">
             <h1 className="text-2xl font-black tracking-tight">{merchant.name}</h1>
             <ChevronRight size={20} className="text-gray-200" />
          </div>
          <div className="flex bg-gray-100 rounded-full p-1.5">
            {['堂食', '配送', '快递'].map(t => (
              <button
                key={t}
                onClick={() => setOrderType(t as any)}
                className={`px-5 py-2 rounded-full text-[11px] font-black tracking-wide transition-all ${orderType === t ? 'bg-black text-white shadow-lg' : 'text-gray-400'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="text-[11px] text-gray-400 font-bold mb-6 flex items-center gap-1.5">
          <MapPin size={12} className="text-[#d4b945]" /> 距离您 86.2km
        </div>

        {/* Promo Tags */}
        <div className="flex gap-3 overflow-x-auto pb-6 scrollbar-hide">
          <Tag text="会员商品 6 折起" />
          <Tag text="充值 3 倍享免单" />
          <div className="px-3 py-2 text-gray-300 text-[10px] font-black rounded-xl bg-gray-50 flex items-center gap-1">
            MORE <ChevronRight size={10} className="rotate-90" />
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-24 bg-gray-50 overflow-y-auto scrollbar-hide">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`w-full py-6 px-4 text-[12px] text-left leading-tight transition-all relative ${activeCategory === cat ? 'bg-white font-black text-black' : 'text-gray-400 font-bold'}`}
            >
              {activeCategory === cat && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-black rounded-r-full"></div>}
              {cat}
            </button>
          ))}
        </div>

        {/* Products */}
        <div className="flex-1 bg-white overflow-y-auto p-5 scrollbar-hide">
          <h2 className="text-[10px] font-black text-gray-300 mb-6 uppercase tracking-[0.2em]">{activeCategory}</h2>
          <div className="space-y-8">
            {PRODUCTS.filter(p => p.category === activeCategory || activeCategory === '店铺线下活动').map(product => (
              <div 
                key={product.id} 
                className="flex gap-5 active:bg-gray-50/50 p-2 -m-2 rounded-3xl transition-all" 
                onClick={() => handleOpenProduct(product)}
              >
                <div className="relative shrink-0">
                   <img src={product.image} alt={product.name} className="w-24 h-24 rounded-[28px] object-cover shadow-sm border border-gray-50" />
                   {product.vipPrice && <div className="absolute -top-1 -left-1 bg-black text-[#f7e28b] text-[7px] px-1.5 py-0.5 rounded-full font-black shadow-sm">VIP</div>}
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h3 className="text-sm font-black text-gray-900 leading-snug line-clamp-1">{product.name}</h3>
                    <p className="text-[10px] text-gray-400 mt-1.5 font-bold line-clamp-2 leading-relaxed">{product.description}</p>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex flex-col">
                        <span className="text-lg font-black text-black leading-none">¥{product.price}</span>
                        {product.vipPrice && <span className="text-[10px] font-black text-[#d4b945] mt-1">¥{product.vipPrice}</span>}
                    </div>
                    <button className="bg-[#f7e28b] px-4 py-2.5 rounded-full text-[10px] font-black tracking-wider shadow-sm active-scale">
                      选规格
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 py-6 px-4 border-t border-gray-50 flex items-center justify-center gap-2 text-[10px] text-gray-300 font-black uppercase tracking-widest">
             No more items to show
          </div>
        </div>
      </div>

      {/* Cart Float */}
      {cartCount > 0 && (
        <div className="fixed bottom-28 left-1/2 -translate-x-1/2 w-[90%] max-w-[400px] bg-[#1a1a1a] h-16 rounded-full flex items-center shadow-2xl z-[100] animate-in slide-in-from-bottom duration-500">
          <div className="flex-1 px-6 flex items-center gap-5">
            <div className="relative">
                <div className="bg-[#f7e28b] p-3.5 rounded-full -mt-12 shadow-2xl border-[6px] border-[#1a1a1a] active-scale">
                    <ShoppingCart size={24} strokeWidth={2.5} />
                </div>
                <span className="absolute -top-12 -right-2 bg-red-500 text-white text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-[#1a1a1a]">{cartCount}</span>
            </div>
            <div className="text-white flex flex-col justify-center">
                <div className="flex items-baseline gap-1">
                   <span className="text-xs font-black text-white/50">¥</span>
                   <span className="text-2xl font-black">{totalPrice.toFixed(2)}</span>
                </div>
                <span className="text-[9px] text-white/30 font-black tracking-widest uppercase mt-0.5">Subtotal</span>
            </div>
          </div>
          <button 
            onClick={onCheckout}
            className="bg-[#f7e28b] h-full px-12 rounded-r-full font-black text-[13px] text-black active:bg-brand-yellow-dark transition-colors tracking-widest uppercase"
          >
            Settle
          </button>
        </div>
      )}

      {/* Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/80 z-[110] flex items-center justify-center p-6 backdrop-blur-md">
          <div className="bg-white w-full max-sm rounded-[48px] overflow-hidden relative animate-in zoom-in-95 duration-300 shadow-2xl">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-6 right-6 bg-white/20 backdrop-blur-md hover:bg-white/40 p-2.5 rounded-full text-white z-10 transition-colors">
              <X size={20} strokeWidth={3} />
            </button>
            <div className="h-80 relative group">
                <img src={selectedProduct.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            <div className="p-10">
              <div className="flex justify-between items-start mb-2">
                 <h3 className="text-2xl font-black tracking-tight">{selectedProduct.name}</h3>
              </div>
              <p className="text-[11px] text-gray-400 font-bold leading-relaxed mb-10">{selectedProduct.description}</p>
              
              <div className="mb-12">
                <div className="text-[10px] font-black mb-4 text-gray-300 uppercase tracking-widest">Specs (Required)</div>
                <div className="bg-[#f7e28b]/10 border-2 border-[#f7e28b] text-black px-8 py-3.5 rounded-[20px] inline-flex text-sm font-black shadow-sm">
                  3寸
                </div>
              </div>

              <div className="flex items-center justify-between mb-10 pt-10 border-t border-gray-50">
                 <div>
                    <div className="flex items-baseline gap-1.5">
                       <span className="text-sm font-black text-black/50">¥</span>
                       <span className="text-3xl font-black text-black">{selectedProduct.price}</span>
                    </div>
                    <div className="text-[10px] text-gray-400 mt-1 font-black uppercase tracking-wider">Unit Price</div>
                 </div>
                 <div className="flex items-center gap-6">
                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-10 h-10 border-2 border-gray-100 rounded-full flex items-center justify-center text-gray-300 active-scale">
                       <Minus size={20} strokeWidth={3} />
                    </button>
                    <span className="font-black text-xl w-6 text-center">{quantity}</span>
                    <button onClick={() => setQuantity(q => q + 1)} className="w-10 h-10 bg-[#f7e28b] rounded-full flex items-center justify-center shadow-lg active-scale">
                       <Plus size={20} strokeWidth={3} />
                    </button>
                 </div>
              </div>

              <button onClick={addToCart} className="w-full bg-[#f7e28b] py-6 rounded-[28px] font-black text-lg shadow-xl shadow-brand-yellow/30 active-scale uppercase tracking-widest">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Tag = ({ text }: { text: string }) => (
  <div className="px-4 py-2 border border-[#f7e28b] text-[#d4b945] text-[10px] font-black rounded-xl bg-[#f7e28b]/10 whitespace-nowrap tracking-wide">
    {text}
  </div>
);

export default Menu;
