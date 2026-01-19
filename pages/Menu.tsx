
import React, { useState } from 'react';
import { Search, Plus, Minus, Info, ChevronRight, MapPin, X, ShoppingCart } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  vipPrice?: number;
  image: string;
  category: string;
  description: string;
}

const CATEGORIES = ['店铺线下活动', '进店福利', '贝果&牛角', '提拉米苏', '瑞士卷', '下午茶套餐'];

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: '半条梦龙425g超大...',
    price: 38.9,
    vipPrice: 29.34,
    image: 'https://picsum.photos/seed/product1/400/400',
    category: '店铺线下活动',
    description: '浓郁巧克力与松软蛋糕的完美结合'
  },
  {
    id: '2',
    name: '(到店) 甜品自助甜品...',
    price: 48.9,
    vipPrice: 29.34,
    image: 'https://picsum.photos/seed/product2/400/400',
    category: '店铺线下活动',
    description: '本店所有产品，不限数量，吃多少拿多少'
  },
  {
    id: '3',
    name: '红丝绒芒果慕斯蛋糕',
    price: 19.9,
    vipPrice: 11.94,
    image: 'https://picsum.photos/seed/product4/400/400',
    category: '进店福利',
    description: '红丝绒与热带芒果的酸甜碰撞，口感轻盈细腻。'
  }
];

interface MenuProps {
  onCheckout: () => void;
}

const Menu: React.FC<MenuProps> = ({ onCheckout }) => {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const [orderType, setOrderType] = useState<'DINE_IN' | 'DELIVERY'>('DINE_IN');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [cartCount, setCartCount] = useState(0);

  const handleOpenProduct = (product: Product) => {
    setSelectedProduct(product);
    setQuantity(1);
  };

  const addToCart = () => {
    setCartCount(prev => prev + quantity);
    setSelectedProduct(null);
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Search & Header */}
      <div className="px-4 pt-4 mb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 font-bold text-xl">
            棠小一 <ChevronRight size={20} />
          </div>
          <div className="flex items-center gap-2">
             <button className="p-2 bg-gray-100 rounded-full"><Search size={18} /></button>
             <div className="flex bg-gray-100 rounded-full p-1">
                <button 
                    onClick={() => setOrderType('DINE_IN')}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${orderType === 'DINE_IN' ? 'bg-black text-white' : 'text-gray-400'}`}
                >堂食</button>
                <button 
                    onClick={() => setOrderType('DELIVERY')}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${orderType === 'DELIVERY' ? 'bg-black text-white' : 'text-gray-400'}`}
                >配送</button>
             </div>
          </div>
        </div>
        <div className="text-xs text-gray-400 mb-2 flex items-center gap-1">
          <MapPin size={12} /> 距离您86.2km
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <span className="px-3 py-1 border border-[#f7e28b] text-[#f7e28b] text-[10px] rounded shrink-0">会员商品6折起</span>
          <span className="px-3 py-1 border border-[#f7e28b] text-[#f7e28b] text-[10px] rounded shrink-0">订单≥0.01元，充值3倍享免单</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden pb-24">
        <div className="w-24 bg-gray-50 overflow-y-auto">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`w-full py-5 px-3 text-xs text-left transition-all relative ${activeCategory === cat ? 'bg-white font-bold' : 'text-gray-500'}`}
            >
              {activeCategory === cat && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-black"></div>}
              {cat}
            </button>
          ))}
        </div>

        <div className="flex-1 bg-white overflow-y-auto p-4">
          <h2 className="text-sm font-bold mb-4">{activeCategory}</h2>
          <div className="space-y-6">
            {PRODUCTS.filter(p => p.category === activeCategory || activeCategory === '店铺线下活动').map(product => (
              <div key={product.id} className="flex gap-3" onClick={() => handleOpenProduct(product)}>
                <img src={product.image} alt={product.name} className="w-24 h-24 rounded-lg object-cover" />
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h3 className="text-sm font-bold leading-tight line-clamp-2">{product.name}</h3>
                    <p className="text-[10px] text-gray-400 mt-1 line-clamp-1">{product.description}</p>
                    {product.vipPrice && (
                      <div className="mt-1 flex items-center gap-1">
                        <span className="bg-black text-[#f7e28b] text-[8px] px-1 rounded uppercase font-bold">VIP</span>
                        <span className="text-xs font-bold text-[#f7e28b]">¥{product.vipPrice}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-base font-bold">¥{product.price}</span>
                    <button className="bg-[#f7e28b] px-3 py-1 rounded-full text-[10px] font-bold shadow-sm">
                      选规格
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 py-4 px-4 bg-gray-50 rounded-xl flex items-center justify-between">
             <span className="text-xs text-gray-400">查看不可售商品(1件)</span>
             <ChevronRight size={14} className="text-gray-300" />
          </div>
        </div>
      </div>

      {/* Cart Bar */}
      {cartCount > 0 && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-[90%] max-w-[400px] bg-[#333] rounded-full flex items-center overflow-hidden shadow-2xl z-50">
          <div className="flex-1 px-6 flex items-center gap-4">
            <div className="relative">
                <div className="bg-[#f7e28b] p-3 rounded-full -mt-6 shadow-lg border-4 border-[#333]">
                    <ShoppingCart size={24} />
                </div>
                <span className="absolute -top-6 -right-1 bg-[#f7e28b] text-black text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#333]">{cartCount}</span>
            </div>
            <div className="text-white">
                <span className="text-xl font-bold">¥ {(cartCount * 19.9).toFixed(2)}</span>
            </div>
          </div>
          <button 
            onClick={onCheckout}
            className="bg-[#f7e28b] h-full px-8 py-4 font-bold text-gray-800"
          >
            去结算
          </button>
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4">
          <div className="bg-white w-full rounded-3xl overflow-hidden relative animate-in slide-in-from-bottom duration-300">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 bg-black/20 p-1.5 rounded-full text-white z-10">
              <X size={20} />
            </button>
            <div className="h-64 relative">
                <img src={selectedProduct.image} className="w-full h-full object-cover" />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-white/40 rounded-full"></div>
                </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{selectedProduct.name}</h3>
              <p className="text-xs text-gray-400 mb-6">产品描述: {selectedProduct.description}</p>
              
              <div className="mb-6">
                <div className="text-xs font-bold mb-3">份量(必选)</div>
                <div className="bg-[#f7e28b]/30 border border-[#f7e28b] text-[#c7b25b] px-6 py-2.5 rounded-xl inline-block text-sm font-bold">
                  3寸
                </div>
              </div>

              <div className="flex items-center justify-between mb-8 border-t border-gray-50 pt-6">
                 <div>
                    <div className="flex items-center gap-1.5">
                       <span className="text-2xl font-bold text-black">¥ {selectedProduct.price}</span>
                       <div className="bg-black text-[#f7e28b] text-[8px] px-1 rounded uppercase font-bold">VIP</div>
                       <span className="text-sm font-bold text-[#f7e28b]">¥{selectedProduct.vipPrice}</span>
                    </div>
                    <div className="text-[10px] text-gray-400 mt-1">3寸</div>
                 </div>
                 <div className="flex items-center gap-4">
                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-1 border border-gray-200 rounded-full text-gray-400">
                       <Minus size={18} />
                    </button>
                    <span className="font-bold text-lg">{quantity}</span>
                    <button onClick={() => setQuantity(q => q + 1)} className="p-1 bg-[#f7e28b] rounded-full">
                       <Plus size={18} />
                    </button>
                 </div>
              </div>

              <button onClick={addToCart} className="w-full bg-[#f7e28b] py-4 rounded-full font-bold text-lg shadow-sm">
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
