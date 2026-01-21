
import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Plus, Minus, MapPin, AlertCircle, Loader2, Star, Search } from 'lucide-react';
import { StoreContext, CartItem, Product } from '../types';
import { api } from '../api';

interface MenuProps {
  store: StoreContext;
  cart: CartItem[];
  onUpdateCart: (cart: CartItem[]) => void;
  onCheckout: () => void;
}

const Menu: React.FC<MenuProps> = ({ store, cart, onUpdateCart, onCheckout }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 初始化拉取菜单
  useEffect(() => {
    const fetchMenu = async () => {
      setLoading(true);
      try {
        const data = await api.getMenu(store.id);
        setProducts(data);
        if (data.length > 0) setActiveCategory(data[0].category);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, [store.id]);

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = cart.reduce((s, i) => s + (i.price * i.quantity), 0);

  const handleUpdateQty = (p: Product, delta: number) => {
    if (!store.allow_order) return;
    const existing = cart.find(i => i.productId === p.id);
    if (existing) {
      const next = existing.quantity + delta;
      if (next <= 0) onUpdateCart(cart.filter(i => i.productId !== p.id));
      else onUpdateCart(cart.map(i => i.productId === p.id ? { ...i, quantity: next } : i));
    } else if (delta > 0) {
      onUpdateCart([...cart, { 
        cart_item_id: Math.random().toString(36).substr(2, 9), 
        productId: p.id, name: p.name, price: p.price, quantity: 1, image: p.image 
      }]);
    }
  };

  if (loading) return (
    <div className="h-full flex flex-col items-center justify-center bg-white">
      <div className="relative">
         <Loader2 className="animate-spin text-brand" size={40} style={{ color: 'var(--brand-secondary)' }} />
         <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black" style={{ color: 'var(--brand-secondary)' }}>SAAS</div>
      </div>
      <div className="mt-6 text-[10px] font-black text-gray-300 uppercase tracking-[0.4em] animate-pulse">Initializing Catalog</div>
    </div>
  );

  const categories = Array.from(new Set(products.map(p => p.category)));

  return (
    <div className="flex flex-col h-full bg-white animate-in fade-in duration-700 relative">
      {/* 沉浸式顶栏 */}
      <header className="px-6 pt-14 pb-8 sticky top-0 z-40 bg-white/90 backdrop-blur-2xl border-b border-gray-50">
        <div className="flex items-center justify-between mb-5">
          <div className="flex flex-col">
             <h1 className="text-2xl font-black tracking-tight text-gray-900 flex items-center gap-2">
               {store.name}
               <span className="bg-emerald-50 text-emerald-600 text-[8px] px-1.5 py-0.5 rounded-md font-black uppercase tracking-widest">OPEN</span>
             </h1>
             <div className="flex items-center gap-2 mt-1">
               <div className="flex items-center gap-1 text-[11px] text-gray-400 font-bold">
                 <MapPin size={12} style={{ color: 'var(--brand-secondary)' }} /> 
                 {store.table_no ? `桌号: ${store.table_no}` : store.address}
               </div>
             </div>
          </div>
          <button className="w-11 h-11 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100 active-scale shadow-sm">
             <Search size={20} className="text-gray-400" />
          </button>
        </div>

        {!store.allow_order && (
          <div className="bg-red-50 text-red-500 px-5 py-3 rounded-2xl flex items-center gap-3 text-[10px] font-black border border-red-100/50">
            <AlertCircle size={14} /> 门店已打烊，当前仅支持浏览商品
          </div>
        )}
      </header>

      {/* 联动交互主区 */}
      <div className="flex flex-1 overflow-hidden">
        {/* 左侧侧边导航 */}
        <aside className="w-24 bg-gray-50/50 overflow-y-auto scrollbar-hide border-r border-gray-100/50">
          {categories.map(c => {
            const isActive = activeCategory === c;
            return (
              <button 
                key={c} 
                onClick={() => setActiveCategory(c)} 
                className={`w-full py-7 px-4 text-[11px] text-left leading-tight transition-all relative group ${isActive ? 'bg-white font-black text-gray-900' : 'text-gray-300 font-bold hover:text-gray-400'}`}
              >
                {isActive && (
                  <div 
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 rounded-r-full transition-all duration-300" 
                    style={{ backgroundColor: 'var(--brand-secondary)' }}
                  ></div>
                )}
                <span className={`block transition-transform duration-300 ${isActive ? 'translate-x-1' : 'group-active:scale-95'}`}>{c}</span>
              </button>
            );
          })}
        </aside>

        {/* 右侧商品网格 */}
        <main className="flex-1 overflow-y-auto p-5 scrollbar-hide pb-48" ref={scrollContainerRef}>
          <div className="space-y-10">
            <div className="flex items-center gap-2 mb-2">
               <div className="w-6 h-0.5 bg-black/5 rounded-full"></div>
               <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{activeCategory}</span>
            </div>

            {products.filter(p => p.category === activeCategory).map((p, idx) => {
              const qty = cart.find(i => i.productId === p.id)?.quantity || 0;
              return (
                <div key={p.id} className="flex gap-4 items-center group animate-in slide-in-from-right-4 duration-500" style={{ animationDelay: `${idx * 50}ms` }}>
                  <div className="relative shrink-0">
                    <img 
                      src={p.image} 
                      className="w-24 h-24 rounded-[28px] object-cover border border-gray-100 shadow-sm transition-transform duration-500 group-hover:scale-105" 
                    />
                    {p.vipPrice && (
                      <div className="absolute -top-1 -left-1 bg-black text-brand text-[8px] font-black px-2 py-0.5 rounded-lg uppercase tracking-tighter" style={{ color: 'var(--brand-primary)' }}>VIP</div>
                    )}
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between h-24 py-1">
                    <div>
                      <h3 className="text-[14px] font-black text-gray-900 leading-tight mb-1">{p.name}</h3>
                      <p className="text-[10px] text-gray-400 font-medium line-clamp-2 leading-tight opacity-70">{p.description}</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-lg font-black tracking-tight text-gray-900">¥{p.price.toFixed(2)}</span>
                        {p.vipPrice && <span className="text-[9px] text-gray-400 font-bold line-through">¥{p.vipPrice}</span>}
                      </div>
                      
                      <div className="flex items-center gap-3">
                        {qty > 0 && (
                          <button 
                            onClick={() => handleUpdateQty(p, -1)} 
                            className="w-8 h-8 border border-gray-100 rounded-full flex items-center justify-center active-scale transition-all hover:bg-gray-50 text-gray-300"
                          >
                            <Minus size={14} strokeWidth={3} />
                          </button>
                        )}
                        {qty > 0 && <span className="text-xs font-black w-4 text-center text-gray-900">{qty}</span>}
                        <button 
                          onClick={() => handleUpdateQty(p, 1)} 
                          disabled={!store.allow_order} 
                          className={`w-8 h-8 rounded-full flex items-center justify-center active-scale transition-all shadow-lg ${store.allow_order ? 'text-black' : 'bg-gray-50 text-gray-200 cursor-not-allowed shadow-none'}`}
                          style={store.allow_order ? { backgroundColor: 'var(--brand-primary)', boxShadow: `0 8px 15px -4px var(--brand-primary)80` } : {}}
                        >
                          <Plus size={16} strokeWidth={3} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>

      {/* 物理反馈购物车条 */}
      {cartCount > 0 && (
        <div className="fixed bottom-32 left-1/2 -translate-x-1/2 w-[92%] max-w-[400px] z-[60] animate-in slide-in-from-bottom-12 duration-500">
          <div className="bg-[#121212] h-18 rounded-[36px] flex items-center shadow-[0_30px_70px_-10px_rgba(0,0,0,0.5)] overflow-hidden border border-white/5 backdrop-blur-xl">
            <div className="flex-1 px-8 flex items-center gap-4">
              <div className="relative">
                <div 
                  className="p-3.5 rounded-[24px] -mt-12 shadow-2xl active-scale border-4 border-[#121212] transition-transform duration-500" 
                  style={{ backgroundColor: 'var(--brand-primary)' }}
                >
                  <ShoppingCart size={22} strokeWidth={3} className="text-black" />
                </div>
                <span className="absolute -top-12 -right-2 bg-red-500 text-white text-[9px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-[#121212] shadow-lg animate-bounce">
                  {cartCount}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.25em] mb-0.5">Total Payable</span>
                <span className="text-xl font-black text-white tracking-tight">¥{totalPrice.toFixed(2)}</span>
              </div>
            </div>
            <button 
              onClick={onCheckout} 
              className="bg-brand h-full px-12 font-black text-[13px] tracking-widest uppercase active-scale text-black transition-opacity hover:opacity-90" 
              style={{ backgroundColor: 'var(--brand-primary)' }}
            >
              去结算
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
