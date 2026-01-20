
import React, { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Minus, MapPin, AlertCircle, Loader2 } from 'lucide-react';
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
    <div className="h-full flex items-center justify-center bg-white">
      <Loader2 className="animate-spin text-gray-200" />
    </div>
  );

  const categories = Array.from(new Set(products.map(p => p.category)));

  return (
    <div className="flex flex-col h-full bg-white relative">
      <div className="px-5 pt-14 pb-4 bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-gray-50">
        <div className="flex items-center justify-between mb-1.5">
          <h1 className="text-xl font-black">{store.name}</h1>
          <div className="bg-emerald-50 text-emerald-600 text-[9px] px-2 py-0.5 rounded-full font-black">营业中</div>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-gray-400 font-bold">
          <MapPin size={12} className="text-brand" /> {store.table_no ? `桌号: ${store.table_no}` : store.address}
        </div>
        {!store.allow_order && (
          <div className="mt-3 bg-red-50 text-red-500 px-3 py-2 rounded-xl flex items-center gap-2 text-[11px] font-black">
            <AlertCircle size={14} /> 门店休息中，暂不支持下单
          </div>
        )}
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-20 bg-gray-50 overflow-y-auto scrollbar-hide">
          {categories.map(c => (
            <button key={c} onClick={() => setActiveCategory(c)} className={`w-full py-6 px-3 text-[11px] text-left leading-tight transition-all relative ${activeCategory === c ? 'bg-white font-black' : 'text-gray-400 font-bold'}`}>
              {activeCategory === c && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-black rounded-r-full" style={{ backgroundColor: store.theme.secondary }}></div>}
              {c}
            </button>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto p-5 scrollbar-hide pb-40">
          <div className="space-y-8">
            {products.filter(p => p.category === activeCategory).map(p => {
              const qty = cart.find(i => i.productId === p.id)?.quantity || 0;
              return (
                <div key={p.id} className="flex gap-4 group">
                  <img src={p.image} className="w-20 h-20 rounded-[18px] object-cover border border-gray-100" />
                  <div className="flex-1 flex flex-col justify-between py-0.5">
                    <div>
                      <h3 className="text-[13px] font-black text-gray-900 leading-none">{p.name}</h3>
                      <p className="text-[9px] text-gray-300 mt-1 line-clamp-1">{p.description}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-base font-black">¥{p.price}</span>
                      <div className="flex items-center gap-3">
                        {qty > 0 && (
                          <button onClick={() => updateQty(p, -1)} className="w-6 h-6 border border-gray-200 rounded-full flex items-center justify-center active-scale transition-colors"><Minus size={14} /></button>
                        )}
                        {qty > 0 && <span className="text-xs font-black">{qty}</span>}
                        <button onClick={() => updateQty(p, 1)} disabled={!store.allow_order} className={`w-6 h-6 rounded-full flex items-center justify-center active-scale transition-all ${store.allow_order ? 'bg-brand border border-brand/50' : 'bg-gray-100 text-gray-300'}`} style={store.allow_order ? { backgroundColor: store.theme.primary } : {}}><Plus size={14} /></button>
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
        <div className="fixed bottom-28 left-1/2 -translate-x-1/2 w-[92%] max-w-[400px] bg-[#1a1a1a] h-16 rounded-full flex items-center shadow-2xl z-50 animate-in slide-in-from-bottom duration-500 overflow-hidden">
          <div className="flex-1 px-8 flex items-center gap-4">
            <div className="relative">
              <div className="bg-brand border border-brand/20 p-3 rounded-full -mt-10 shadow-2xl active-scale" style={{ backgroundColor: store.theme.primary }}>
                <ShoppingCart size={22} strokeWidth={2.5} />
              </div>
              <span className="absolute -top-10 -right-2 bg-red-500 text-white text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#1a1a1a]">{cartCount}</span>
            </div>
            <div className="text-white flex flex-col">
              <span className="text-[10px] font-black opacity-40 uppercase tracking-widest leading-none">Estimated</span>
              <span className="text-lg font-black leading-none mt-1">¥{totalPrice.toFixed(2)}</span>
            </div>
          </div>
          <button onClick={onCheckout} className="bg-brand h-full px-12 border-l border-white/10 font-black text-[13px] tracking-widest uppercase active-scale" style={{ backgroundColor: store.theme.primary }}>去结算</button>
        </div>
      )}
    </div>
  );
};

export default Menu;
