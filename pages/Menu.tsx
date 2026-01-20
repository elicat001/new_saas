
import React, { useState, useEffect } from 'react';
import { Search, Plus, Minus, MapPin, ShoppingCart, Loader2, X, AlertCircle } from 'lucide-react';
import { StoreContext, CartItem, Product } from '../types';
import { api } from '../api';

interface MenuProps {
  store: StoreContext;
  cart: CartItem[];
  onUpdateCart: (newCart: CartItem[]) => void;
  onCheckout: () => void;
  onScanAgain: () => void;
}

const Menu: React.FC<MenuProps> = ({ store, cart, onUpdateCart, onCheckout, onScanAgain }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchMenu = async () => {
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

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleUpdateQuantity = (product: Product, delta: number) => {
    if (!store.allow_order) return;
    const existing = cart.find(i => i.productId === product.id);
    if (existing) {
      const newQuantity = existing.quantity + delta;
      if (newQuantity <= 0) {
        onUpdateCart(cart.filter(i => i.productId !== product.id));
      } else {
        onUpdateCart(cart.map(i => i.productId === product.id ? { ...i, quantity: newQuantity } : i));
      }
    } else if (delta > 0) {
      onUpdateCart([...cart, { 
        productId: product.id, 
        name: product.name, 
        price: product.price, 
        quantity: 1, 
        image: product.image 
      }]);
    }
  };

  if (loading) return (
    <div className="flex flex-col h-full bg-white items-center justify-center">
      <Loader2 className="animate-spin text-gray-200 mb-2" />
      <span className="text-[10px] font-black text-gray-300 tracking-widest">加载菜单...</span>
    </div>
  );

  const categories = Array.from(new Set(products.map(p => p.category)));

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Header */}
      <div className="px-5 pt-14 pb-4 bg-white sticky top-0 z-40">
        <div className="flex items-center justify-between mb-2">
           <h1 className="text-xl font-black">{store.name}</h1>
           <button onClick={onScanAgain} className="bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-[16px] text-[10px] font-black text-gray-400 active-scale">切换桌号</button>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-bold">
          <MapPin size={12} className="text-brand" /> {store.table_no ? `桌号: ${store.table_no}` : '外带'}
          {!store.allow_order && (
            <span className="ml-2 text-red-500 flex items-center gap-1">
              <AlertCircle size={12} /> 门店休息中
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-24 bg-gray-50 overflow-y-auto scrollbar-hide">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`w-full py-6 px-4 text-[12px] text-left leading-tight transition-all relative ${activeCategory === cat ? 'bg-white font-black text-black' : 'text-gray-400 font-bold'}`}>
              {activeCategory === cat && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-black rounded-r-full"></div>}
              {cat}
            </button>
          ))}
        </div>
        <div className="flex-1 bg-white overflow-y-auto p-5 scrollbar-hide pb-40">
          <div className="space-y-8">
            {products.filter(p => p.category === activeCategory).map(product => {
              const qty = cart.find(i => i.productId === product.id)?.quantity || 0;
              return (
                <div key={product.id} className="flex gap-4">
                  <img src={product.image} className="w-20 h-20 rounded-[20px] object-cover border border-gray-50" />
                  <div className="flex-1 flex flex-col justify-between py-0.5">
                    <div>
                      <h3 className="text-sm font-black text-gray-900">{product.name}</h3>
                      <p className="text-[10px] text-gray-400 mt-1 line-clamp-1">{product.description}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[15px] font-black">¥{product.price}</span>
                      {store.allow_order ? (
                        <div className="flex items-center gap-3">
                          {qty > 0 && (
                            <>
                              <button onClick={() => handleUpdateQuantity(product, -1)} className="w-6 h-6 border border-gray-200 rounded-full flex items-center justify-center active-scale"><Minus size={14} /></button>
                              <span className="text-xs font-black">{qty}</span>
                            </>
                          )}
                          <button onClick={() => handleUpdateQuantity(product, 1)} className="w-6 h-6 bg-brand border border-[var(--brand-secondary)] rounded-full flex items-center justify-center active-scale"><Plus size={14} /></button>
                        </div>
                      ) : (
                        <span className="text-[10px] text-gray-300 font-bold">暂停下单</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Cart Bar */}
      {cartCount > 0 && (
        <div className="fixed bottom-28 left-1/2 -translate-x-1/2 w-[90%] max-w-[400px] bg-[#1a1a1a] h-16 rounded-full flex items-center shadow-2xl z-[100] animate-in slide-in-from-bottom duration-500">
          <div className="flex-1 px-6 flex items-center gap-5">
            <div className="relative">
                <div className="bg-brand border border-[var(--brand-secondary)] p-3.5 rounded-full -mt-12 shadow-2xl active-scale"><ShoppingCart size={24} strokeWidth={2.5} /></div>
                <span className="absolute -top-12 -right-2 bg-red-500 text-white text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-[#1a1a1a]">{cartCount}</span>
            </div>
            <div className="text-white">
                <span className="text-xs font-black opacity-50 mr-1">¥</span>
                <span className="text-xl font-black">{totalPrice.toFixed(2)}</span>
            </div>
          </div>
          <button 
            onClick={onCheckout}
            className="bg-brand h-full px-12 rounded-r-full border-l border-[var(--brand-secondary)] font-black text-[13px] tracking-widest uppercase active-scale"
          >
            去结算
          </button>
        </div>
      )}
    </div>
  );
};

export default Menu;
