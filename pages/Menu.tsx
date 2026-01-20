
import React, { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Minus, MapPin, AlertCircle, Loader2, Star } from 'lucide-react';
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

  useEffect(() => {
    const fetch = async () => {
      const data = await api.getMenu(store.id);
      setProducts(data);
      if (data.length > 0) setActiveCategory(data[0].category);
      setLoading(false);
    };
    fetch();
  }, [store.id]);

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = cart.reduce((s, i) => s + (i.price * i.quantity), 0);

  const updateQty = (p: Product, delta: number) => {
    if (!store.allow_order) return;
    const existing = cart.find(i => i.productId === p.id);
    if (existing) {
      const next = existing.quantity + delta;
      if (next <= 0) onUpdateCart(cart.filter(i => i.productId !== p.id));
      else onUpdateCart(cart.map(i => i.productId === p.id ? { ...i, quantity: next } : i));
    } else if (delta > 0) {
      onUpdateCart([...cart, { 
        cart_item_id: Math.random().toString(), 
        productId: p.id, name: p.name, price: p.price, quantity: 1, image: p.image 
      }]);
    }
  };

  if (loading) return (
    <div className="h-full flex flex-col items-center justify-center bg-white">
      <Loader2 className="animate-spin text-brand mb-4" />
      <div className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Loading Catalog</div>
    </div>
  );

  const categories = Array.from(new Set(products.map(p => p.category)));

  return (
    <div className="flex flex-col h-full bg-white relative animate-in fade-in duration-500">
      <div className="px-6 pt-14 pb-6 bg-white/90 backdrop-blur-xl sticky top-0 z-40 border-b border-gray-50/50">
        <div className="flex items-center justify-between mb-2">
          <div className="flex flex-col">
             <h1 className="text-2xl font-black tracking-tight">{store.name}</h1>
             <div className="flex items-center gap-1.5 mt-0.5">
               <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
               <span className="text-[10px] text-emerald-600 font-black uppercase tracking-widest">Store Open</span>
             </div>
          </div>
          <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100">
             <Star size={20} className="text-gray-200" />
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-bold mt-2">
          <MapPin size={12} className="text-brand" /> 
          {store.table_no ? `桌号: ${store.table_no}` : store.address}
        </div>
        {!store.allow_order && (
          <div className="mt-4 bg-red-50 text-red-500 px-4 py-3 rounded-2xl flex items-center gap-2.5 text-[11px] font-black border border-red-100/50 animate-pulse">
            <AlertCircle size={14} /> 门店休息中，暂不支持下单
          </div>
        )}
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-24 bg-gray-50/50 overflow-y-auto scrollbar-hide border-r border-gray-50">
          {categories.map(c => (
            <button 
              key={c} 
              onClick={() => setActiveCategory(c)} 
              className={`w-full py-7 px-4 text-[11px] text-left leading-tight transition-all relative ${activeCategory === c ? 'bg-white font-black' : 'text-gray-400 font-bold'}`}
            >
              {activeCategory === c && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-brand rounded-r-full" style={{ backgroundColor: 'var(--brand-secondary)' }}></div>}
              <span className={activeCategory === c ? 'scale-105 inline-block' : ''}>{c}</span>
            </button>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide pb-48">
          <div className="space-y-10">
            {products.filter(p => p.category === activeCategory).map(p => {
              const qty = cart.find(i => i.productId === p.id)?.quantity || 0;
              return (
                <div key={p.id} className="flex gap-5 group items-center">
                  <div className="relative shrink-0">
                    <img src={p.image} className="w-24 h-24 rounded-[28px] object-cover border border-gray-100 shadow-sm" />
                    {p.vipPrice && (
                      <div className="absolute -top-2 -left-2 bg-black text-brand text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter" style={{ color: 'var(--brand-primary)' }}>VIP</div>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col justify-between h-24 py-1">
                    <div>
                      <h3 className="text-[15px] font-black text-gray-900 leading-tight mb-1">{p.name}</h3>
                      <p className="text-[10px] text-gray-300 font-medium line-clamp-1">{p.description}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-lg font-black tracking-tighter">¥{p.price.toFixed(2)}</span>
                        {p.vipPrice && <span className="text-[9px] text-gray-300 font-bold line-through">¥{p.vipPrice}</span>}
                      </div>
                      <div className="flex items-center gap-3.5">
                        {qty > 0 && (
                          <button onClick={() => updateQty(p, -1)} className="w-7 h-7 border border-gray-200 rounded-full flex items-center justify-center active-scale transition-all hover:bg-gray-50"><Minus size={14} /></button>
                        )}
                        {qty > 0 && <span className="text-xs font-black w-3 text-center">{qty}</span>}
                        <button 
                          onClick={() => updateQty(p, 1)} 
                          disabled={!store.allow_order} 
                          className={`w-7 h-7 rounded-full flex items-center justify-center active-scale transition-all shadow-md ${store.allow_order ? 'bg-brand border border-brand/20' : 'bg-gray-100 text-gray-200 cursor-not-allowed shadow-none'}`}
                        >
                          <Plus size={14} strokeWidth={3} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {cartCount > 0 && (
        <div className="fixed bottom-28 left-1/2 -translate-x-1/2 w-[92%] max-w-[400px] bg-[#1a1a1a] h-18 rounded-[32px] flex items-center shadow-2xl z-50 animate-in slide-in-from-bottom duration-500 overflow-hidden border border-white/5">
          <div className="flex-1 px-8 flex items-center gap-5">
            <div className="relative">
              <div className="bg-brand p-3.5 rounded-[22px] -mt-12 shadow-2xl active-scale border-4 border-[#1a1a1a]" style={{ backgroundColor: 'var(--brand-primary)' }}>
                <ShoppingCart size={22} strokeWidth={3} />
              </div>
              <span className="absolute -top-12 -right-3 bg-red-500 text-white text-[9px] font-black w-5.5 h-5.5 rounded-full flex items-center justify-center border-2 border-[#1a1a1a]">{cartCount}</span>
            </div>
            <div className="text-white flex flex-col">
              <span className="text-[10px] font-black opacity-30 uppercase tracking-[0.2em] leading-none mb-1">In your bag</span>
              <span className="text-xl font-black leading-none">¥{totalPrice.toFixed(2)}</span>
            </div>
          </div>
          <button 
            onClick={onCheckout} 
            className="bg-brand h-full px-12 border-l border-white/5 font-black text-[13px] tracking-widest uppercase active-scale" 
            style={{ backgroundColor: 'var(--brand-primary)' }}
          >
            去结算
          </button>
        </div>
      )}
    </div>
  );
};

export default Menu;
