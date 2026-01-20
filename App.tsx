
import React, { useState, useEffect } from 'react';
import { TabType, StoreContext, CartItem, Order, OrderStatus } from './types';
import { api } from './api';
import Entry from './pages/Entry';
import Menu from './pages/Menu';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import OrderDetail from './pages/OrderDetail';
import Checkout from './pages/Checkout';
import { Home as HomeIcon, ShoppingBag, FileText, User, Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<'entry' | 'main' | 'order-detail' | 'checkout'>('entry');
  const [currentTab, setCurrentTab] = useState<TabType>(TabType.HOME);
  const [storeContext, setStoreContext] = useState<StoreContext | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 模拟从缓存读取
  useEffect(() => {
    const savedContext = localStorage.getItem('store_context');
    if (savedContext) {
      const ctx = JSON.parse(savedContext);
      setStoreContext(ctx);
      const savedCart = localStorage.getItem(`cart_${ctx.id}`);
      if (savedCart) setCart(JSON.parse(savedCart));
      setView('main');
    }
  }, []);

  // 处理扫码入口逻辑
  const handleResolve = async (sceneCode: string) => {
    setLoading(true);
    try {
      const ctx = await api.resolveContext(sceneCode);
      
      // 门店切换逻辑：提示清空购物车
      if (storeContext && storeContext.id !== ctx.id && cart.length > 0) {
        if (window.confirm('检测到您切换了门店，是否清空原门店购物车？')) {
          setCart([]);
          localStorage.removeItem(`cart_${storeContext.id}`);
        }
      }

      setStoreContext(ctx);
      localStorage.setItem('store_context', JSON.stringify(ctx));
      
      // 加载新门店购物车
      const savedCart = localStorage.getItem(`cart_${ctx.id}`);
      setCart(savedCart ? JSON.parse(savedCart) : []);
      
      setView('main');
      setCurrentTab(TabType.MENU);
    } catch (err) {
      alert('门店解析失败');
    } finally {
      setLoading(false);
    }
  };

  // 购物车更新持久化
  const updateCart = (newCart: CartItem[]) => {
    setCart(newCart);
    if (storeContext) {
      localStorage.setItem(`cart_${storeContext.id}`, JSON.stringify(newCart));
    }
  };

  const MiniProgramCapsule = () => (
    <div className="fixed top-6 right-4 z-[100] flex items-center gap-3 px-3 py-1.5 rounded-full wechat-capsule shadow-sm">
      <div className="flex gap-1">
        <div className="w-1 h-1 bg-black rounded-full opacity-80"></div>
        <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
        <div className="w-1 h-1 bg-black rounded-full opacity-80"></div>
      </div>
      <div className="w-px h-3 bg-gray-300"></div>
      <div className="w-4 h-4 border-[1.5px] border-black rounded-full flex items-center justify-center">
        <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
      </div>
    </div>
  );

  const renderContent = () => {
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
        onPaid={(orderId) => {
          setCart([]);
          localStorage.removeItem(`cart_${storeContext.id}`);
          setSelectedOrderId(orderId);
          setView('order-detail');
        }}
      />
    );

    if (view === 'order-detail') return (
      <OrderDetail 
        onBack={() => setView('main')} 
        orderId={selectedOrderId} 
        store={storeContext} 
      />
    );

    switch (currentTab) {
      case TabType.HOME:
      case TabType.MENU: 
        return <Menu 
          store={storeContext} 
          cart={cart} 
          onUpdateCart={updateCart} 
          onCheckout={() => setView('checkout')}
          onScanAgain={() => setView('entry')}
        />;
      case TabType.ORDERS: 
        return <Orders 
          onSelectOrder={(id) => { setSelectedOrderId(id); setView('order-detail'); }} 
          store={storeContext} 
        />;
      case TabType.PROFILE: 
        return <Profile 
          onOrders={() => setCurrentTab(TabType.ORDERS)} 
          store={storeContext} 
        />;
      default: return null;
    }
  };

  return (
    <div className="h-screen w-full bg-white flex flex-col max-w-md mx-auto relative overflow-hidden font-sans shadow-2xl">
      <MiniProgramCapsule />
      <div className="flex-1 overflow-y-auto scrollbar-hide bg-[#F8F8F8]">
        {renderContent()}
      </div>
      {view === 'main' && (
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[380px] bg-white/95 backdrop-blur-lg shadow-[0_10px_30px_rgba(0,0,0,0.1)] rounded-full px-8 py-3 flex justify-between items-center z-50 border border-gray-100/50">
          {[
            { tab: TabType.MENU, icon: ShoppingBag, label: '点单' },
            { tab: TabType.ORDERS, icon: FileText, label: '订单' },
            { tab: TabType.PROFILE, icon: User, label: '我的' }
          ].map(({ tab, icon: Icon, label }) => (
            <button 
              key={tab} 
              onClick={() => setCurrentTab(tab)} 
              className={`flex flex-col items-center transition-all active:scale-90 ${currentTab === tab ? 'text-black' : 'text-gray-300'}`}
            >
              <Icon size={24} strokeWidth={currentTab === tab ? 2.5 : 2} style={{ color: currentTab === tab ? storeContext?.theme.secondary : undefined }} />
              <span className={`text-[10px] mt-0.5 font-bold ${currentTab === tab ? 'block' : 'hidden'}`}>{label}</span>
            </button>
          ))}
        </nav>
      )}
    </div>
  );
};

export default App;
