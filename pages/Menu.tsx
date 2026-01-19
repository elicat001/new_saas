
import React, { useState } from 'react';
// Added MapPin to imports
import { Search, Plus, Info, ChevronRight, MapPin } from 'lucide-react';

const CATEGORIES = ['店铺线下活动', '进店福利', '贝果&牛角', '提拉米苏', '瑞士卷', '下午茶套餐'];

const PRODUCTS = [
  {
    id: '1',
    name: '半条梦龙425g超大...',
    price: 38.9,
    vipPrice: 29.34,
    image: 'https://picsum.photos/seed/product1/300/300',
    category: '店铺线下活动',
    description: '浓郁巧克力与松软蛋糕的完美结合'
  },
  {
    id: '2',
    name: '(到店) 甜品自助甜品...',
    price: 48.9,
    vipPrice: 29.34,
    image: 'https://picsum.photos/seed/product2/300/300',
    category: '店铺线下活动',
    description: '本店所有产品，不限数量，吃...'
  },
  {
    id: '3',
    name: '2件方形切件蛋糕...',
    price: 12.9,
    vipPrice: 7.74,
    image: 'https://picsum.photos/seed/product3/300/300',
    category: '进店福利',
    description: '每日新鲜制作，口感绵密'
  }
];

const Menu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const [orderType, setOrderType] = useState<'DINE_IN' | 'DELIVERY'>('DINE_IN');

  return (
    <div className="flex flex-col h-full pt-4">
      {/* Search & Header */}
      <div className="px-4 mb-4">
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
      <div className="flex-1 overflow-hidden">
        {/* Sidebar */}
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

        {/* Product List */}
        <div className="flex-1 bg-white overflow-y-auto p-4">
          <h2 className="text-sm font-bold mb-4">{activeCategory}</h2>
          <div className="space-y-6">
            {PRODUCTS.filter(p => p.category === activeCategory).map(product => (
              <div key={product.id} className="flex gap-3">
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
                    <button className="bg-[#f7e28b] p-1.5 rounded-full shadow-sm">
                      <Plus size={16} />
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

      {/* Shop Closed Notice Overlay (Simulated) */}
      <div className="fixed inset-x-0 bottom-24 flex justify-center px-4 pointer-events-none">
        <div className="bg-white/95 border border-gray-100 shadow-2xl rounded-2xl p-6 w-full max-w-[360px] pointer-events-auto transform translate-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">门店休息中</h3>
            <ChevronRight className="rotate-90 text-gray-400" />
          </div>
          <div className="space-y-3">
            <div>
              <div className="text-sm font-bold text-gray-800">营业时间：</div>
              <div className="text-sm text-gray-500 mt-1">周一至周日 09:00-21:00</div>
            </div>
            <button className="w-full bg-[#f7e28b] py-3 rounded-full font-bold text-sm shadow-sm">
              开启提醒通知
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
