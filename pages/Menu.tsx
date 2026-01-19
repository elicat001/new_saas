
import React, { useState, useEffect } from 'react';
import { Search, Plus, Minus, ChevronRight, MapPin, X, ShoppingCart, Users, Loader2 } from 'lucide-react';
import { MerchantConfig, Product } from '../types';
import { api } from '../api';

interface CartItem {
  product: Product;
  quantity: number;
  selectedSpec?: string;
}

interface MenuProps {
  onCheckout: () => void;
  merchant: MerchantConfig;
}

const Menu: React.FC<MenuProps> = ({ onCheckout, merchant }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [loading, setLoading] = useState(true);
  
  const [orderType, setOrderType] = useState<'堂食' | '配送' | '快递'>('堂食');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSpec, setSelectedSpec] = useState<string | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const fetchMenu = async () => {
      setLoading(true);
      try {
        const data = await api.getMenu(merchant.id);
        setProducts(data);
        const cats = Array.from(new Set(data.map(p => p.category)));
        setCategories(cats);
        if (cats.length > 0) setActiveCategory(cats[0]);
      } catch (err) {
        console.error("Menu fetch failed", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, [merchant.id]);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  const handleOpenProduct = (product: Product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setSelectedSpec(product.specs && product.specs.length > 0 ? product.specs[0] : undefined);
  };

  const addToCart = () => {
    if (selectedProduct) {
      setIsAdding(true);
      
      // SaaS: Simulate network latency for a better UX feedback loop
      setTimeout(() => {
        setCart(prev => {
          const existingIndex = prev.findIndex(item => 
            item.product.id === selectedProduct.id && item.selectedSpec === selectedSpec
          );
          if (existingIndex !== -1) {
            const newCart = [...prev];
            newCart[existingIndex].quantity += quantity;
            return newCart;
          }
          return [...prev, { product: selectedProduct, quantity, selectedSpec }];
        });
        
        setIsAdding(false);
        setSelectedProduct(null);
      }, 600);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col h-full bg-white items-center justify-center">
        <Loader2 className="animate-spin text-gray-200 mb-2" />
        <span className="text-[10px] font-black text-gray-300 tracking-widest uppercase">Fetching Menu...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white relative pb-32">
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
              <button key={t} onClick={() => setOrderType(t as any)} className={`px-5 py-2 rounded-full text-[11px] font-black tracking-wide transition-all ${orderType === t ? 'bg-black text-white shadow-lg' : 'text-gray-400'}`}>
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="text-[11px] text-gray-400 font-bold mb-6 flex items-center gap-1.5">
          <MapPin size={12} className="text-brand" /> 自动定位至最近门店
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
        <div className="flex-1 bg-white overflow-y-auto p-5 scrollbar-hide">
          <h2 className="text-[10px] font-black text-gray-300 mb-6 uppercase tracking-[0.2em]">{activeCategory}</h2>
          <div className="space-y-8">
            {products.filter(p => p.category === activeCategory).map(product => (
              <div key={product.id} className="flex gap-5 active:bg-gray-50/50 p-2 -m-2 rounded-3xl transition-all" onClick={() => handleOpenProduct(product)}>
                <div className="relative shrink-0">
                   <img src={product.image} alt={product.name} className="w-24 h-24 rounded-[28px] object-cover shadow-sm border border-gray-50" />
                   {product.vipPrice && <div className="absolute -top-1 -left-1 bg-black text-brand text-[7px] px-1.5 py-0.5 rounded-full font-black shadow-sm">VIP</div>}
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h3 className="text-sm font-black text-gray-900 leading-snug line-clamp-1">{product.name}</h3>
                    <p className="text-[10px] text-gray-400 mt-1.5 font-bold line-clamp-2 leading-relaxed">{product.description}</p>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex flex-col">
                        <span className="text-lg font-black text-black leading-none">¥{product.price}</span>
                        {product.vipPrice && <span className="text-[10px] font-black text-brand mt-1">¥{product.vipPrice}</span>}
                    </div>
                    <button className="bg-brand px-4 py-2.5 rounded-full text-[10px] font-black tracking-wider shadow-sm active-scale">选规格</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {cartCount > 0 && (
        <div className="fixed bottom-28 left-1/2 -translate-x-1/2 w-[90%] max-w-[400px] bg-[#1a1a1a] h-16 rounded-full flex items-center shadow-2xl z-[100] animate-in slide-in-from-bottom duration-500">
          <div className="flex-1 px-6 flex items-center gap-5">
            <div className="relative">
                <div className="bg-brand p-3.5 rounded-full -mt-12 shadow-2xl border-[6px] border-[#1a1a1a] active-scale"><ShoppingCart size={24} strokeWidth={2.5} /></div>
                <span className="absolute -top-12 -right-2 bg-red-500 text-white text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-[#1a1a1a]">{cartCount}</span>
            </div>
            <div className="text-white flex flex-col justify-center">
                <div className="flex items-baseline gap-1">
                   <span className="text-xs font-black text-white/50">¥</span>
                   <span className="text-2xl font-black">{totalPrice.toFixed(2)}</span>
                </div>
            </div>
          </div>
          <button onClick={onCheckout} className="bg-brand h-full px-12 rounded-r-full font-black text-[13px] text-black tracking-widest uppercase">结算</button>
        </div>
      )}

      {selectedProduct && (
        <div className="fixed inset-0 bg-black/80 z-[110] flex items-center justify-center p-6 backdrop-blur-md">
          <div className="bg-white w-full max-sm rounded-main overflow-hidden relative animate-in zoom-in-95 duration-300">
            <button onClick={() => !isAdding && setSelectedProduct(null)} className={`absolute top-6 right-6 p-2.5 rounded-full z-10 transition-all ${isAdding ? 'opacity-20 cursor-not-allowed' : 'bg-white/20 text-white'}`}>
              <X size={20} />
            </button>
            <div className="h-64 relative">
                <img src={selectedProduct.image} className="w-full h-full object-cover" />
            </div>
            <div className="p-8">
              <h3 className="text-xl font-black mb-2">{selectedProduct.name}</h3>
              <p className="text-[11px] text-gray-400 font-bold mb-8">{selectedProduct.description}</p>
              {selectedProduct.specs && (
                <div className="mb-10 flex flex-wrap gap-3">
                  {selectedProduct.specs.map(spec => (
                    <button key={spec} disabled={isAdding} onClick={() => setSelectedSpec(spec)} className={`px-6 py-2.5 rounded-inner text-[11px] font-black border-2 transition-all ${selectedSpec === spec ? 'bg-brand border-brand' : 'bg-gray-50 border-transparent text-gray-400'} ${isAdding ? 'opacity-50' : ''}`}>{spec}</button>
                  ))}
                </div>
              )}
              <div className="flex items-center justify-between mb-10 pt-8 border-t border-gray-50">
                 <div className="text-3xl font-black text-black">¥{selectedProduct.price}</div>
                 <div className="flex items-center gap-6">
                    <button disabled={isAdding} onClick={() => setQuantity(q => Math.max(1, q - 1))} className={`w-10 h-10 border-2 border-gray-100 rounded-full flex items-center justify-center transition-all ${isAdding ? 'opacity-20' : 'active-scale'}`}><Minus /></button>
                    <span className="font-black text-xl">{quantity}</span>
                    <button disabled={isAdding} onClick={() => setQuantity(q => q + 1)} className={`w-10 h-10 bg-brand rounded-full flex items-center justify-center transition-all ${isAdding ? 'opacity-20' : 'active-scale'}`}><Plus /></button>
                 </div>
              </div>
              <button 
                onClick={addToCart} 
                disabled={isAdding}
                className="w-full bg-brand py-5 rounded-inner font-black text-lg uppercase tracking-widest shadow-xl shadow-brand-yellow/30 active-scale flex items-center justify-center gap-3 disabled:opacity-80 transition-all"
              >
                {isAdding ? (
                  <>
                    <Loader2 size={24} className="animate-spin" />
                    <span>Processing</span>
                  </>
                ) : (
                  '加入购物车'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
