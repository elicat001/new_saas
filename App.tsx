
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { TabType, StoreContext, CartItem, MerchantConfig } from './types';
import { api } from './api';
import { MERCHANTS } from './config';

// 页面组件导入
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

// 图标库
import { ShoppingBag, FileText, User, Loader2 } from 'lucide-react';

const App: React.FC = () => {
  // 核心路由与导航状态
  const [view, setView] = useState<string>('entry');
  const [currentTab, setCurrentTab] = useState<TabType>(TabType.MENU);
  
  // 业务核心数据状态
  const [storeContext, setStoreContext] = useState<StoreContext | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 初始化：尝试从缓存加载
  useEffect(() => {
    const cachedCtx = localStorage.getItem('saas_store_context');
    if (cachedCtx) {
      const ctx = JSON.parse(cachedCtx);
      setStoreContext(ctx);
      const cachedCart = localStorage.getItem(`cart_${ctx.id}`);
      if (cachedCart) setCart(JSON.parse(cachedCart));
      setView('main');
    }
  }, []);

  // SaaS 动态主题注入引擎
  useEffect(() => {
    if (storeContext) {
      const root = document.documentElement;
      root.style.setProperty('--brand-primary', storeContext.theme.primary);
      root.style.setProperty('--brand-secondary', storeContext.theme.secondary);
      // 支持动态圆角适配 (SaaS 差异化关键)
      const radius = MERCHANTS.find(m => m.id === storeContext.id)?.theme.borderRadius || '40px';
      root.style.setProperty('--radius-main', radius);
    }
  }, [storeContext]);

  // 购物车原子化同步逻辑
  const syncCart = useCallback((newCart: CartItem[]) => {
    setCart(newCart);
    if (storeContext) {
      localStorage.setItem(`cart_${storeContext.id}`, JSON.stringify(newCart));
    }
  }, [storeContext]);

  // 核心交互：扫码与场景解析
  const handleResolve = async (scene: string) => {
    setIsLoading(true);
    try {
      const ctx = await api.resolveContext(scene);
      // 处理门店切换逻辑
      if (storeContext && storeContext.id !== ctx.id) {
        if (cart.length > 0 && !window.confirm('切换门店将清空当前购物车，是否继续？')) {
          return;
        }
        setCart([]);
      }
      
      setStoreContext(ctx);
      localStorage.setItem('saas_store_context', JSON.stringify(ctx));
      
      // 加载对应门店的购物车
      const savedCart = localStorage.getItem(`cart_${ctx.id}`);
      setCart(savedCart ? JSON.parse(savedCart) : []);
      
      setView('main');
      setCurrentTab(TabType.MENU);
    } catch (e) {
      console.error("Resolve Error:", e);
      alert('门店信息解析失败');
    } finally {
      setIsLoading(false);
    }
  };

  // 视图分发引擎 (Route Dispatcher)
  const PageRenderer = useMemo(() => {
    if (isLoading) return (
      <div className="h-full flex flex-col items-center justify-center bg-white">
        <Loader2 className="animate-spin text-gray-200 mb-6" size={48} />
        <p className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-300">Syncing SaaS Config</p>
      </div>
    );

    if (view === 'entry') return <Entry onScan={handleResolve} />;
    if (!storeContext) return null;

    // 路由分表
    switch (view) {
      case 'checkout':
        return <Checkout onBack={() => setView('main')} store={storeContext} items={cart} onPaid={(id) => { syncCart([]); setSelectedOrderId(id); setView('order-detail'); }} />;
      case 'order-detail':
        return <OrderDetail onBack={() => setView('main')} orderId={selectedOrderId} store={storeContext} />;
      case 'user-info':
        return <UserInfo onBack={() => setView('main')} merchant={MERCHANTS.find(m => m.id === storeContext.id)!} />;
      case 'top-up':
        return <TopUp onBack={() => setView('main')} merchant={MERCHANTS.find(m => m.id === storeContext.id)!} />;
      case 'coupons':
        return <Coupons onBack={() => setView('main')} merchant={MERCHANTS.find(m => m.id === storeContext.id)!} />;
      case 'integral':
        return <IntegralDetails onBack={() => setView('main')} merchant={MERCHANTS.find(m => m.id === storeContext.id)!} />;
      case 'member-code':
        return <MemberCode onBack={() => setView('main')} merchant={MERCHANTS.find(m => m.id === storeContext.id)!} />;
      case 'addresses':
        return <Addresses onBack={() => setView('main')} merchant={MERCHANTS.find(m => m.id === storeContext.id)!} />;
      case 'main':
      default:
        return (
          <>
            {currentTab === TabType.MENU && <Menu store={storeContext} cart={cart} onUpdateCart={syncCart} onCheckout={() => setView('checkout')} />}
            {currentTab === TabType.ORDERS && <Orders onSelectOrder={(id) => { setSelectedOrderId(id); setView('order-detail'); }} store={storeContext} />}
            {currentTab === TabType.PROFILE && (
              <Profile 
                onOrders={() => setCurrentTab(TabType.ORDERS)} 
                onUserInfo={() => setView('user-info')}
                onTopUp={() => setView('top-up')}
                onCoupons={() => setView('coupons')}
                onIntegralDetails={() => setView('integral')}
                onAddresses={() => setView('addresses')}
                store={storeContext} 
                merchants={MERCHANTS}
                onSwitchMerchant={(m) => handleResolve(`MOCK_SCENE_${m.id}`)}
              />
            )}
          </>
        );
    }
  }, [view, currentTab, storeContext, cart, isLoading, selectedOrderId, syncCart]);

  return (
    <div className="h-screen w-full bg-[#F2F2F2] flex flex-col max-w-md mx-auto relative overflow-hidden shadow-2xl border-x border-gray-100/50">
      <main className="flex-1 overflow-y-auto scrollbar-hide bg-white transition-opacity duration-300">
        {PageRenderer}
      </main>

      {/* 沉浸式底部导航：仅在主页面 Tab 切换时显示 */}
      {view === 'main' && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-[360px] z-50 animate-in slide-in-from-bottom duration-500">
          <nav className="bg-white/80 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] rounded-[32px] px-8 py-4 flex justify-between items-center border border-white/50">
            {[
              { tab: TabType.MENU, icon: ShoppingBag, label: '点单' },
              { tab: TabType.ORDERS, icon: FileText, label: '订单' },
              { tab: TabType.PROFILE, icon: User, label: '我的' }
            ].map(({ tab, icon: Icon, label }) => {
              const isActive = currentTab === tab;
              return (
                <button 
                  key={tab} 
                  onClick={() => setCurrentTab(tab)} 
                  className={`flex flex-col items-center gap-1 transition-all duration-300 ${isActive ? 'scale-110' : 'text-gray-300 hover:text-gray-400'}`}
                >
                  <Icon size={22} strokeWidth={isActive ? 3 : 2} style={{ color: isActive ? 'var(--brand-secondary)' : undefined }} />
                  <span className={`text-[9px] font-black uppercase tracking-widest transition-opacity duration-300 ${isActive ? 'opacity-100 text-black' : 'opacity-0'}`}>
                    {label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </div>
  );
};

export default App;
