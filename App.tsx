
import React, { useState, useEffect } from 'react';
import { TabType, StoreContext, CartItem } from './types';
import { api } from './api';
import Entry from './pages/Entry';
import Menu from './pages/Menu';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import OrderDetail from './pages/OrderDetail';
import Checkout from './pages/Checkout';
import { ShoppingBag, FileText, User, Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<'entry' | 'main' | 'order-detail' | 'checkout'>('entry');
  const [currentTab, setCurrentTab] = useState<TabType>(TabType.MENU);
  const [storeContext, setStoreContext] = useState<StoreContext | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 初始化检查缓存
  useEffect(() => {
    const cachedCtx = localStorage.getItem('store_context');
    if (cachedCtx) {
      const ctx = JSON.parse(cachedCtx);
      setStoreContext(ctx);
      const cachedCart = localStorage.getItem(`cart_${ctx.id}`);
      if (cachedCart) setCart(JSON.parse(cachedCart));
      setView('main');
    }
  }, []);

  const handleResolve = async (scene: string) => {
    setLoading(true);
    try {
      const ctx = await api.resolveContext(scene);
      
      // 门店切换清空购物车提示
      if (storeContext && storeContext.id !== ctx.id && cart.length > 0) {
        if (window.confirm('检测到您切换了门店，是否清空当前购物车？')) {
          setCart([]);
          localStorage.removeItem(`cart_${storeContext.id}`);
        }
      }

      setStoreContext(ctx);
      localStorage.setItem('store_context', JSON.stringify(ctx));
      
      const newCart = localStorage.getItem(`cart_${ctx.id}`);
      setCart(newCart ? JSON.parse(newCart) : []);
      
      setView('main');
      setCurrentTab(TabType.MENU);
    } catch (e) {
      alert('扫码解析失败');
    } finally {
      setLoading(false);
    }
  };

  const syncCart = (newCart: CartItem[]) => {
    setCart(newCart);
    if (storeContext) {
      localStorage.setItem(`cart_${storeContext.id}`, JSON.stringify(newCart));
    }
  };

  const renderView = () => {
    if (loading) return (
      <div className="h-full flex flex-col items-center justify-center bg-white">
        <Loader2 className="animate-spin text-gray-300 mb-4" size={40} />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">正在进入门店...</p>
      </div>
    );

    if (view === 'entry') return <Entry onScan={handleResolve} />;
    if (!storeContext) return null;

    if (view === 'checkout') return (
      <Checkout 
        onBack={() => setView('main')} 
        store={storeContext} 
        items={cart} 
        onPaid={(id) => {
          syncCart([]);
          setSelectedOrderId(id);
          setView('order-detail');
        }}
      />
    );

    if (view === 'order-detail') return (
      <OrderDetail onBack={() => setView('main')} orderId={selectedOrderId} store={storeContext} />
    );

    switch (currentTab) {
      case TabType.MENU: 
        return <Menu store={storeContext} cart={cart} onUpdateCart={syncCart} onCheckout={() => setView('checkout')} />;
      case TabType.ORDERS: 
        return <Orders onSelectOrder={(id) => { setSelectedOrderId(id); setView('order-detail'); }} store={storeContext} />;
      case TabType.PROFILE: 
        return <Profile onOrders={() => setCurrentTab(TabType.ORDERS)} store={storeContext} />;
      default: return null;
    }
  };

  return (
    <div className="h-screen w-full bg-[#F8F8F8] flex flex-col max-w-md mx-auto relative overflow-hidden shadow-2xl">
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {renderView()}
      </div>
      {view === 'main' && (
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[360px] bg-white/95 backdrop-blur-lg shadow-soft rounded-full px-10 py-3 flex justify-between items-center z-50 border border-gray-100/50">
          {[
            { tab: TabType.MENU, icon: ShoppingBag, label: '点单' },
            { tab: TabType.ORDERS, icon: FileText, label: '订单' },
            { tab: TabType.PROFILE, icon: User, label: '我的' }
          ].map(({ tab, icon: Icon, label }) => (
            <button key={tab} onClick={() => setCurrentTab(tab)} className={`flex flex-col items-center gap-0.5 transition-all ${currentTab === tab ? 'text-black scale-110' : 'text-gray-300'}`}>
              <Icon size={22} strokeWidth={currentTab === tab ? 2.5 : 2} style={{ color: currentTab === tab ? storeContext.theme.secondary : undefined }} />
              <span className={`text-[9px] font-black ${currentTab === tab ? 'opacity-100' : 'opacity-0'}`}>{label}</span>
            </button>
          ))}
        </nav>
      )}
    </div>
  );
};

export default App;
