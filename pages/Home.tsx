
import React from 'react';
// Added Scan and ChevronRight to imports
import { QrCode, Home as HomeIcon, MapPin, Truck, CalendarCheck, User, Scan, ChevronRight } from 'lucide-react';

interface HomeProps {
  onMenu: () => void;
  onMemberCode: () => void;
}

const Home: React.FC<HomeProps> = ({ onMenu, onMemberCode }) => {
  const handleScan = () => {
    // In a real app, this would trigger the camera.
    // For this UI replica, we simulate the navigation to the menu.
    onMenu();
  };

  return (
    <div className="relative">
      {/* Brand Header Section */}
      <div className="bg-[#e5e5e5] pt-12 pb-24 px-6 flex flex-col items-center">
        <h1 className="text-4xl font-bold tracking-widest text-black mb-6">棠小一</h1>
        
        {/* Illustration */}
        <div className="relative w-48 h-48 mb-8">
          <div className="absolute inset-0 bg-yellow-400 rounded-full opacity-10 animate-pulse"></div>
          <img 
            src="https://picsum.photos/seed/bakery-dog/400/400" 
            alt="Brand mascot" 
            className="w-full h-full object-contain relative z-10 rounded-2xl grayscale-[0.2]"
          />
        </div>
      </div>

      {/* Profile Card Overlay */}
      <div className="px-5 -mt-20">
        <div className="bg-white rounded-[32px] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)] relative overflow-hidden">
          {/* Avatar & Info */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex flex-col">
              <span className="text-gray-500 text-lg font-medium">Hello</span>
              <span className="text-2xl font-black">粒</span>
              <span className="text-gray-400 text-[10px] font-bold mt-1 tracking-wider">暂未开通此VIP特权</span>
            </div>
            <div className="flex flex-col items-end">
                <div className="w-16 h-16 rounded-full bg-gray-100 overflow-hidden mb-2 border-[4px] border-white shadow-lg">
                    <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop" alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <button 
                  onClick={onMemberCode}
                  className="bg-[#f7e28b] px-3 py-1.5 rounded-full flex items-center gap-1.5 active:scale-95 transition-transform shadow-sm"
                >
                  <QrCode size={14} className="text-black" />
                  <span className="text-[10px] font-black text-black">会员码</span>
                </button>
            </div>
          </div>

          {/* New Scan to Order Section */}
          <button 
            onClick={handleScan}
            className="w-full bg-[#f7e28b] mb-6 py-4 rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-brand-yellow/30 active:scale-[0.98] transition-all"
          >
            <div className="bg-white/40 p-2 rounded-full">
              <Scan size={24} strokeWidth={2.5} className="text-black" />
            </div>
            <div className="text-left">
              <div className="text-sm font-black text-black">扫码点餐</div>
              <div className="text-[10px] text-black/60 font-bold uppercase tracking-tight">Scan QR code to order</div>
            </div>
          </button>

          {/* Service Grid */}
          <div className="grid grid-cols-2 gap-px bg-gray-50 rounded-2xl overflow-hidden border border-gray-50">
            <button onClick={onMenu} className="bg-white py-6 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 active:bg-gray-100 transition-colors">
              <div className="p-2.5 bg-gray-50 rounded-xl">
                <HomeIcon size={26} strokeWidth={1.5} className="text-gray-700" />
              </div>
              <div className="text-center">
                <div className="font-black text-[13px] text-gray-800">堂食</div>
                <div className="text-[9px] text-gray-400 uppercase font-bold tracking-tighter">Dine In</div>
              </div>
            </button>
            <button onClick={onMenu} className="bg-white py-6 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 active:bg-gray-100 transition-colors border-l border-gray-50">
              <div className="p-2.5 bg-gray-50 rounded-xl">
                <User size={26} strokeWidth={1.5} className="text-gray-700" />
              </div>
              <div className="text-center">
                <div className="font-black text-[13px] text-gray-800">自取</div>
                <div className="text-[9px] text-gray-400 uppercase font-bold tracking-tighter">Pick Up</div>
              </div>
            </button>
            <button onClick={onMenu} className="bg-white py-6 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 active:bg-gray-100 transition-colors border-t border-gray-50">
              <div className="p-2.5 bg-gray-50 rounded-xl">
                <Truck size={26} strokeWidth={1.5} className="text-gray-700" />
              </div>
              <div className="text-center">
                <div className="font-black text-[13px] text-gray-800">外送</div>
                <div className="text-[9px] text-gray-400 uppercase font-bold tracking-tighter">Delivery</div>
              </div>
            </button>
            <button onClick={onMenu} className="bg-white py-6 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 active:bg-gray-100 transition-colors border-t border-l border-gray-50">
              <div className="p-2.5 bg-gray-50 rounded-xl">
                <CalendarCheck size={26} strokeWidth={1.5} className="text-gray-700" />
              </div>
              <div className="text-center">
                <div className="font-black text-[13px] text-gray-800">自助预约</div>
                <div className="text-[9px] text-gray-400 uppercase font-bold tracking-tighter">Reservation</div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Status / Promotion */}
      <div className="mt-8 px-5 pb-32">
          <div className="bg-[#e5e5e5] rounded-[24px] py-4 text-center text-gray-400 text-xs font-black mb-4 shadow-inner">
            未满足开通条件
          </div>
          
          <div className="bg-white border border-gray-50 rounded-[24px] p-5 flex items-center justify-between shadow-sm">
             <div className="flex items-center gap-2">
                <div className="bg-[#f7e28b]/20 p-2 rounded-full">
                  <MapPin size={16} className="text-[#d4b945]" />
                </div>
                <span className="font-black text-sm text-gray-800">棠小一（XX店）</span>
             </div>
             <div className="text-[11px] font-bold text-gray-400 flex items-center gap-1">
               距离您86.2km <ChevronRight size={14} />
             </div>
          </div>
      </div>
    </div>
  );
};

export default Home;
