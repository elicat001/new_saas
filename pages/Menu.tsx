
import React, { useState } from 'react';
import { Search, Plus, Minus, Info, ChevronRight, MapPin, X, ShoppingCart, Users } from 'lucide-react';

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
}

const Menu: React.FC<MenuProps> = ({ onCheckout }) => {
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
    <div className="flex flex-col h-full bg-white relative pb-24">
      {/* Header Bar */}
      <div className="px-4 pt-8 bg-white sticky top-0 z-40">
        <div className="flex items-center justify-between mb-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-100 rounded-full bg-white shadow-sm active:scale-95 transition-all">
            <Users size={16} />
            <span className="text-xs font-bold">拼单</span>
          </button>
          <div className="flex items-center gap-4">
             <div className="bg-gray-50 p-2 rounded-full"><Search size={20} className="text-gray-400" /></div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
             <h1 className="text-2xl font-bold">棠小一</h1>
             <ChevronRight size={20} className="text-gray-400" />
          </div>
          <div className="flex bg-[#F2F2F2] rounded-full p-1 h-9">
            {['堂食', '配送', '快递'].map(t => (
              <button
                key={t}
                onClick={() => setOrderType(t as any)}
                className={`px-4 rounded-full text-xs font-bold transition-all ${orderType === t ? 'bg-black text-white shadow-md' : 'text-gray-400'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="text-[11px] text-gray-400 mb-4 flex items-center gap-1">
          <MapPin size={12} /> 距离您86.2km
        </div>

        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
          <div className="px-3 py-1.5 border border-[#f7e28b] text-[#d4b945] text-[10px] font-bold rounded-lg bg-[#f7e28b]/10 whitespace-nowrap">会员商品6折起</div>
          <div className="px-3 py-1.5 border border-[#f7e28b] text-[#d4b945] text-[10px] font-bold rounded-lg bg-[#f7e28b]/10 whitespace-nowrap">订单≥0.01元，充值3倍享免单</div>
          <div className="px-3 py-1.5 text-gray-400 text-[10px] font-bold rounded-lg bg-gray-50 flex items-center gap-1">
            更多 <ChevronRight size={10} className="rotate-90" />
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar Categories */}
        <div className="w-24 bg-[#F8F8F8] overflow-y-auto scrollbar-hide">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`w-full py-5 px-3 text-[12px] text-left leading-tight transition-all relative ${activeCategory === cat ? 'bg-white font-bold text-black' : 'text-gray-500'}`}
            >
              {activeCategory === cat && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-black rounded-r-full"></div>}
              {cat}
            </button>
          ))}
        </div>

        {/* Product List */}
        <div className="flex-1 bg-white overflow-y-auto p-4 scrollbar-hide">
          <div className="mb-6">
            <h2 className="text-sm font-bold text-[#f7e28b] mb-4">门店推荐</h2>
            <div className="grid grid-cols-2 gap-4">
               {PRODUCTS.slice(0, 1).map(p => (
                 <div key={p.id} className="flex flex-col gap-2" onClick={() => handleOpenProduct(p)}>
                    <img src={p.image} className="w-full aspect-square object-cover rounded-xl" />
                    <div className="text-xs font-bold truncate">{p.name}</div>
                    <div className="flex items-center justify-between">
                       <span className="font-bold">¥{p.price}</span>
                       <div className="bg-[#f7e28b] p-1 rounded-full"><Plus size={14} /></div>
                    </div>
                 </div>
               ))}
            </div>
          </div>

          <h2 className="text-sm font-bold mb-4">{activeCategory}</h2>
          <div className="space-y-6">
            {PRODUCTS.filter(p => p.category === activeCategory || activeCategory === '店铺线下活动').map(product => (
              <div key={product.id} className="flex gap-4 active:bg-gray-50 p-1 rounded-xl transition-all" onClick={() => handleOpenProduct(product)}>
                <img src={product.image} alt={product.name} className="w-24 h-24 rounded-2xl object-cover shrink-0" />
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h3 className="text-sm font-bold leading-tight line-clamp-1">{product.name}</h3>
                    <p className="text-[10px] text-gray-400 mt-1 line-clamp-1">{product.description}</p>
                    {product.vipPrice && (
                      <div className="mt-1 flex items-center gap-1">
                        <div className="bg-black text-[#f7e28b] text-[8px] px-1 rounded font-black">VIP</div>
                        <span className="text-xs font-bold text-[#d4b945]">¥{product.vipPrice}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">¥{product.price}</span>
                    <button className="bg-[#f7e28b] px-3 py-1.5 rounded-full text-[11px] font-bold shadow-sm active:scale-90 transition-all">
                      选规格
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 py-4 px-4 bg-gray-50 rounded-2xl flex items-center justify-center gap-2 text-xs text-gray-400 font-medium">
             查看不可售商品(1件) <ChevronRight size={14} className="rotate-90" />
          </div>
        </div>
      </div>

      {/* Cart Float Bar */}
      {cartCount > 0 && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-[92%] max-w-[400px] bg-[#333] h-14 rounded-full flex items-center shadow-2xl z-[100] animate-in slide-in-from-bottom duration-300">
          <div className="flex-1 px-5 flex items-center gap-4">
            <div className="relative">
                <div className="bg-[#f7e28b] p-3 rounded-full -mt-10 shadow-lg border-[6px] border-[#333] transition-transform active:scale-95">
                    <ShoppingCart size={22} />
                </div>
                <span className="absolute -top-10 -right-2 bg-red-500 text-white text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#333]">{cartCount}</span>
            </div>
            <div className="text-white flex flex-col">
                <span className="text-xl font-bold leading-none">¥ {totalPrice.toFixed(2)}</span>
                <span className="text-[10px] text-gray-400">还需支付 ¥{totalPrice.toFixed(2)}</span>
            </div>
          </div>
          <button 
            onClick={onCheckout}
            className="bg-[#f7e28b] h-full px-10 rounded-r-full font-black text-sm text-gray-800 active:bg-brand-yellow-dark transition-colors"
          >
            去结算
          </button>
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/70 z-[110] flex items-center justify-center p-6 backdrop-blur-sm">
          <div className="bg-white w-full rounded-[40px] overflow-hidden relative animate-in slide-in-from-bottom duration-300">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-5 right-5 bg-black/10 hover:bg-black/20 p-2 rounded-full text-white z-10 transition-colors">
              <X size={20} />
            </button>
            <div className="h-72 relative">
                <img src={selectedProduct.image} className="w-full h-full object-cover" />
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <div className="w-2 h-2 bg-white/30 rounded-full"></div>
                </div>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-black mb-1">{selectedProduct.name}</h3>
              <p className="text-xs text-gray-400 mb-8 font-medium leading-relaxed">产品描述: {selectedProduct.description}</p>
              
              <div className="mb-10">
                <div className="text-xs font-bold mb-4 text-gray-500">份量(必选)</div>
                <div className="bg-[#f7e28b]/30 border-2 border-[#f7e28b] text-[#c7b25b] px-10 py-3 rounded-2xl inline-block text-sm font-black">
                  3寸
                </div>
              </div>

              <div className="flex items-center justify-between mb-8 pt-8 border-t border-gray-50">
                 <div>
                    <div className="flex items-center gap-2">
                       <span className="text-3xl font-black text-black">¥ {selectedProduct.price}</span>
                       {selectedProduct.vipPrice && (
                         <>
                           <div className="bg-black text-[#f7e28b] text-[9px] px-1.5 py-0.5 rounded font-black">VIP</div>
                           <span className="text-sm font-black text-[#d4b945]">¥{selectedProduct.vipPrice}</span>
                         </>
                       )}
                    </div>
                    <div className="text-[11px] text-gray-400 mt-1 font-bold">3寸</div>
                 </div>
                 <div className="flex items-center gap-6">
                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-9 h-9 border-2 border-gray-100 rounded-full flex items-center justify-center text-gray-300 active:bg-gray-50">
                       <Minus size={20} strokeWidth={3} />
                    </button>
                    <span className="font-black text-xl w-4 text-center">{quantity}</span>
                    <button onClick={() => setQuantity(q => q + 1)} className="w-9 h-9 bg-[#f7e28b] rounded-full flex items-center justify-center shadow-lg active:scale-95">
                       <Plus size={20} strokeWidth={3} />
                    </button>
                 </div>
              </div>

              <button onClick={addToCart} className="w-full bg-[#f7e28b] py-5 rounded-full font-black text-lg shadow-xl shadow-brand-yellow/30 active:scale-[0.98] transition-all">
                加入购物车
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
