
import React, { useState } from 'react';
import { TabType } from './types';
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
import { Home as HomeIcon, ShoppingBag, FileText, User } from 'lucide-react';

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<TabType>(TabType.HOME);
  const [view, setView] = useState<'main' | 'order-detail' | 'member-code' | 'checkout' | 'user-info' | 'addresses' | 'top-up' | 'coupons'>('main');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

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

  const navigateToOrderDetail = (id: string) => {
    setSelectedOrderId(id);
    setView('order-detail');
  };

  const renderContent = () => {
    if (view === 'order-detail') return <OrderDetail onBack={() => setView('main')} orderId={selectedOrderId} />;
    if (view === 'member-code') return <MemberCode onBack={() => setView('main')} />;
    if (view === 'checkout') return <Checkout onBack={() => setView('main')} />;
    if (view === 'user-info') return <UserInfo onBack={() => setView('main')} />;
    if (view === 'addresses') return <Addresses onBack={() => setView('main')} />;
    if (view === 'top-up') return <TopUp onBack={() => setView('main')} />;
    if (view === 'coupons') return <Coupons onBack={() => setView('main')} />;

    switch (currentTab) {
      case TabType.HOME: return <Home onMenu={() => setCurrentTab(TabType.MENU)} onMemberCode={() => setView('member-code')} />;
      case TabType.MENU: return <Menu onCheckout={() => setView('checkout')} />;
      case TabType.ORDERS: return <Orders onSelectOrder={navigateToOrderDetail} />;
      case TabType.PROFILE: return <Profile 
          onOrders={() => setCurrentTab(TabType.ORDERS)} 
          onUserInfo={() => setView('user-info')}
          onAddresses={() => setView('addresses')}
          onTopUp={() => setView('top-up')}
          onCoupons={() => setView('coupons')}
        />;
      default: return <Home onMenu={() => setCurrentTab(TabType.MENU)} onMemberCode={() => setView('member-code')} />;
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
          <button 
            onClick={() => setCurrentTab(TabType.HOME)}
            className={`flex flex-col items-center transition-all active:scale-90 ${currentTab === TabType.HOME ? 'text-black' : 'text-gray-300'}`}
          >
            <HomeIcon size={24} strokeWidth={currentTab === TabType.HOME ? 2.5 : 2} />
            <span className={`text-[10px] mt-0.5 font-bold ${currentTab === TabType.HOME ? 'block' : 'hidden'}`}>首页</span>
          </button>
          <button 
            onClick={() => setCurrentTab(TabType.MENU)}
            className={`flex flex-col items-center transition-all active:scale-90 ${currentTab === TabType.MENU ? 'text-black' : 'text-gray-300'}`}
          >
            <ShoppingBag size={24} strokeWidth={currentTab === TabType.MENU ? 2.5 : 2} />
            <span className={`text-[10px] mt-0.5 font-bold ${currentTab === TabType.MENU ? 'block' : 'hidden'}`}>点单</span>
          </button>
          <button 
            onClick={() => setCurrentTab(TabType.ORDERS)}
            className={`flex flex-col items-center transition-all active:scale-90 ${currentTab === TabType.ORDERS ? 'text-black' : 'text-gray-300'}`}
          >
            <FileText size={24} strokeWidth={currentTab === TabType.ORDERS ? 2.5 : 2} />
            <span className={`text-[10px] mt-0.5 font-bold ${currentTab === TabType.ORDERS ? 'block' : 'hidden'}`}>订单</span>
          </button>
          <button 
            onClick={() => setCurrentTab(TabType.PROFILE)}
            className={`flex flex-col items-center transition-all active:scale-90 ${currentTab === TabType.PROFILE ? 'text-black' : 'text-gray-300'}`}
          >
            <User size={24} strokeWidth={currentTab === TabType.PROFILE ? 2.5 : 2} />
            <span className={`text-[10px] mt-0.5 font-bold ${currentTab === TabType.PROFILE ? 'block' : 'hidden'}`}>我的</span>
          </button>
        </nav>
      )}
    </div>
  );
};

export default App;
