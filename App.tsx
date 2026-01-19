
import React, { useState, useEffect } from 'react';
import { TabType, MerchantConfig } from './types';
import { api } from './api';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import OrderDetail from './pages/OrderDetail';
import MemberCode from './pages/MemberCode';
import Checkout from './pages/Checkout';
import UserInfo from './pages/UserInfo';
import Addresses from './pages/Addresses';
import TopUp from './pages/TopUp';
import Coupons from './pages/Coupons';
import IntegralDetails from './pages/IntegralDetails';
import { Home as HomeIcon, ShoppingBag, FileText, User, Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [merchants, setMerchants] = useState<MerchantConfig[]>([]);
  const [currentMerchant, setCurrentMerchant] = useState<MerchantConfig | null>(null);
  const [currentTab, setCurrentTab] = useState<TabType>(TabType.HOME);
  const [view, setView] = useState<'main' | 'order-detail' | 'member-code' | 'checkout' | 'user-info' | 'addresses' | 'top-up' | 'coupons' | 'integral-details'>('main');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // SaaS: Global Initialization
  useEffect(() => {
    const init = async () => {
      try {
        const data = await api.getMerchants();
        setMerchants(data);
        if (data.length > 0) setCurrentMerchant(data[0]);
      } catch (err) {
        console.error("Initialization failed", err);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  // SaaS: Dynamic Theme Injection
  useEffect(() => {
    if (!currentMerchant) return;
    const root = document.documentElement;
    root.style.setProperty('--brand-primary', currentMerchant.theme.primary);
    root.style.setProperty('--brand-secondary', currentMerchant.theme.secondary);
    root.style.setProperty('--radius-main', currentMerchant.theme.borderRadius);
    root.style.setProperty('--radius-inner', currentMerchant.theme.borderRadius === '0px' ? '0px' : '24px');
  }, [currentMerchant]);

  if (loading || !currentMerchant) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-white">
        <Loader2 className="animate-spin text-gray-300 mb-4" size={40} />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Loading SaaS Engine...</p>
      </div>
    );
  }

  const MiniProgramCapsule = () => (
    <div className="fixed top-6 right-4 z-[100] flex items-center gap-3 px-3 py-1.5 rounded-full wechat-capsule">
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
    if (view === 'order-detail') return <OrderDetail onBack={() => setView('main')} orderId={selectedOrderId} merchant={currentMerchant} />;
    if (view === 'member-code') return <MemberCode onBack={() => setView('main')} merchant={currentMerchant} />;
    if (view === 'checkout') return <Checkout onBack={() => setView('main')} merchant={currentMerchant} />;
    if (view === 'user-info') return <UserInfo onBack={() => setView('main')} merchant={currentMerchant} />;
    if (view === 'addresses') return <Addresses onBack={() => setView('main')} merchant={currentMerchant} />;
    if (view === 'top-up') return <TopUp onBack={() => setView('main')} merchant={currentMerchant} />;
    if (view === 'coupons') return <Coupons onBack={() => setView('main')} merchant={currentMerchant} />;
    if (view === 'integral-details') return <IntegralDetails onBack={() => setView('main')} merchant={currentMerchant} />;

    switch (currentTab) {
      case TabType.HOME: return <Home onMenu={() => setCurrentTab(TabType.MENU)} onMemberCode={() => setView('member-code')} merchant={currentMerchant} />;
      case TabType.MENU: return <Menu onCheckout={() => setView('checkout')} merchant={currentMerchant} />;
      case TabType.ORDERS: return <Orders onSelectOrder={(id) => { setSelectedOrderId(id); setView('order-detail'); }} merchant={currentMerchant} />;
      case TabType.PROFILE: return <Profile 
          onOrders={() => setCurrentTab(TabType.ORDERS)} 
          onUserInfo={() => setView('user-info')}
          onAddresses={() => setView('addresses')}
          onTopUp={() => setView('top-up')}
          onCoupons={() => setView('coupons')}
          onIntegralDetails={() => setView('integral-details')}
          merchant={currentMerchant}
          merchants={merchants}
          onSwitchMerchant={(m) => setCurrentMerchant(m)}
        />;
      default: return <Home onMenu={() => setCurrentTab(TabType.MENU)} onMemberCode={() => setView('member-code')} merchant={currentMerchant} />;
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
            { tab: TabType.HOME, icon: HomeIcon, label: '首页' },
            { tab: TabType.MENU, icon: ShoppingBag, label: '点单' },
            { tab: TabType.ORDERS, icon: FileText, label: '订单' },
            { tab: TabType.PROFILE, icon: User, label: '我的' }
          ].map(({ tab, icon: Icon, label }) => (
            <button key={tab} onClick={() => setCurrentTab(tab)} className={`flex flex-col items-center transition-all active:scale-90 ${currentTab === tab ? 'text-black' : 'text-gray-300'}`}>
              <Icon size={24} strokeWidth={currentTab === tab ? 2.5 : 2} style={{ color: currentTab === tab ? 'var(--brand-secondary)' : undefined }} />
              <span className={`text-[10px] mt-0.5 font-bold ${currentTab === tab ? 'block' : 'hidden'}`}>{label}</span>
            </button>
          ))}
        </nav>
      )}
    </div>
  );
};

export default App;
