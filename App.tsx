
import React, { useState, useEffect } from 'react';
import { TabType, StoreContext, CartItem, MerchantConfig } from './types';
import { api } from './api';
import { MERCHANTS } from './config';
import Entry from './pages/Entry';
import Menu from './pages/Menu';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import OrderDetail from './pages/OrderDetail';
import Checkout from './pages/Checkout';
import UserInfo from './pages/UserInfo';
import TopUp from './pages/TopUp';
import Coupons from './pages/Coupons';
import IntegralDetails from './pages/IntegralDetails';
import MemberCode from './pages/MemberCode';
import Addresses from './pages/Addresses';
import { ShoppingBag, FileText, User, Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<'entry' | 'main' | 'order-detail' | 'checkout' | 'user-info' | 'top-up' | 'coupons' | 'integral' | 'member-code' | 'addresses'>('entry');
  const [currentTab, setCurrentTab] = useState<TabType>(TabType.MENU);
  const [storeContext, setStoreContext] = useState<StoreContext | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 动态注入主题色
  useEffect(() => {
    if (storeContext) {
      const root = document.documentElement;
      root.style.setProperty('--brand-primary', storeContext.theme.primary);
      root.style.setProperty('--brand-secondary', storeContext.theme.secondary);
    }
  }, [storeContext]);

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

  const handleSwitchMerchant = (m: MerchantConfig) => {
    const ctx: StoreContext = {
      id: m.id,
      name: m.name,
      allow_order: m.features.dineIn,
      allow_pay: true,
      address: '虚拟演示地址',
      order_type_default: 'PICK_UP',
      theme: { primary: m.theme.primary, secondary: m.theme.secondary }
    };
    setStoreContext(ctx);
    localStorage.setItem('store_context', JSON.stringify(ctx));
    const newCart = localStorage.getItem(`cart_${ctx.id}`);
    setCart(newCart ? JSON.parse(newCart) : []);
  };

  const renderView = () => {
    if (loading) return (
      <div className="h-full flex flex-col items-center justify-center bg-white animate-in fade-in duration-500">
        <Loader2 className="animate-spin text-gray-300 mb-4" size={40} />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Loading Experience...</p>
      </div>
    );

    if (view === 'entry') return <Entry onScan={handleResolve} />;
    if (!storeContext) return null;

    // Sub-pages
    if (view === 'checkout') return <Checkout onBack={() => setView('main')} store={storeContext} items={cart} onPaid={(id) => { syncCart([]); setSelectedOrderId(id); setView('order-detail'); }} />;
    if (view === 'order-detail') return <OrderDetail onBack={() => setView('main')} orderId={selectedOrderId} store={storeContext} />;
    if (view === 'user-info') return <UserInfo onBack={() => setView('main')} merchant={MERCHANTS.find(m => m.id === storeContext.id) || MERCHANTS[0]} />;
    if (view === 'top-up') return <TopUp onBack={() => setView('main')} merchant={MERCHANTS.find(m => m.id === storeContext.id) || MERCHANTS[0]} />;
    if (view === 'coupons') return <Coupons onBack={() => setView('main')} merchant={MERCHANTS.find(m => m.id === storeContext.id) || MERCHANTS[0]} />;
    if (view === 'integral') return <IntegralDetails onBack={() => setView('main')} merchant={MERCHANTS.find(m => m.id === storeContext.id) || MERCHANTS[0]} />;
    if (view === 'member-code') return <MemberCode onBack={() => setView('main')} merchant={MERCHANTS.find(m => m.id === storeContext.id) || MERCHANTS[0]} />;
    if (view === 'addresses') return <Addresses onBack={() => setView('main')} merchant={MERCHANTS.find(m => m.id === storeContext.id) || MERCHANTS[0]} />;

    switch (currentTab) {
      case TabType.MENU: return <Menu store={storeContext} cart={cart} onUpdateCart={syncCart} onCheckout={() => setView('checkout')} />;
      case TabType.ORDERS: return <Orders onSelectOrder={(id) => { setSelectedOrderId(id); setView('order-detail'); }} store={storeContext} />;
      case TabType.PROFILE: return (
        <Profile 
          onOrders={() => setCurrentTab(TabType.ORDERS)} 
          onUserInfo={() => setView('user-info')}
          onTopUp={() => setView('top-up')}
          onCoupons={() => setView('coupons')}
          onIntegralDetails={() => setView('integral')}
          onAddresses={() => setView('addresses')}
          store={storeContext} 
          merchants={MERCHANTS}
          onSwitchMerchant={handleSwitchMerchant}
        />
      );
      default: return null;
    }
  };

  return (
    <div className="h-screen w-full bg-[#F8F8F8] flex flex-col max-w-md mx-auto relative overflow-hidden shadow-2xl border-x border-gray-100">
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {renderView()}
      </div>
      {view === 'main' && (
        <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[85%] max-w-[340px] bg-white/90 backdrop-blur-xl shadow-soft rounded-full px-10 py-3.5 flex justify-between items-center z-50 border border-white/50 animate-in slide-in-from-bottom duration-700">
          {[
            { tab: TabType.MENU, icon: ShoppingBag, label: '点单' },
            { tab: TabType.ORDERS, icon: FileText, label: '订单' },
            { tab: TabType.PROFILE, icon: User, label: '我的' }
          ].map(({ tab, icon: Icon, label }) => (
            <button key={tab} onClick={() => setCurrentTab(tab)} className={`flex flex-col items-center gap-0.5 transition-all duration-300 ${currentTab === tab ? 'scale-110' : 'text-gray-300'}`}>
              <Icon size={22} strokeWidth={currentTab === tab ? 2.5 : 2} style={{ color: currentTab === tab ? 'var(--brand-secondary)' : undefined }} />
              <span className={`text-[9px] font-black uppercase tracking-widest ${currentTab === tab ? 'text-black opacity-100' : 'opacity-0'}`}>{label}</span>
            </button>
          ))}
        </nav>
      )}
    </div>
  );
};

export default App;
