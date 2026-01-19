
import React from 'react';
// Added User to imports
import { QrCode, Home as HomeIcon, MapPin, Truck, CalendarCheck, User } from 'lucide-react';

interface HomeProps {
  onMenu: () => void;
  onMemberCode: () => void;
}

const Home: React.FC<HomeProps> = ({ onMenu, onMemberCode }) => {
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
        <div className="bg-white rounded-3xl p-6 shadow-sm relative overflow-hidden">
          {/* Avatar & Info */}
          <div className="flex justify-between items-start mb-8">
            <div className="flex flex-col">
              <span className="text-gray-500 text-lg">Hello</span>
              <span className="text-2xl font-bold">粒</span>
              <span className="text-gray-400 text-xs mt-1">暂未开通此VIP特权</span>
            </div>
            <div className="flex flex-col items-end">
                <div className="w-16 h-16 rounded-full bg-gray-100 overflow-hidden mb-2 border-4 border-white shadow-md">
                    <img src="https://picsum.photos/seed/user-avatar/100/100" alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <button 
                  onClick={onMemberCode}
                  className="bg-[#f7e28b] px-3 py-1.5 rounded-full flex items-center gap-1.5"
                >
                  <QrCode size={16} className="text-gray-700" />
                  <span className="text-xs font-bold text-gray-700">会员码</span>
                </button>
            </div>
          </div>

          {/* Service Grid */}
          <div className="grid grid-cols-2 gap-px bg-gray-100">
            <button onClick={onMenu} className="bg-white py-8 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
              <div className="p-3 bg-white rounded-xl border border-gray-100">
                <HomeIcon size={32} strokeWidth={1.5} className="text-gray-700" />
              </div>
              <div className="text-center">
                <div className="font-bold text-gray-800">堂食</div>
                <div className="text-[10px] text-gray-400 uppercase tracking-tighter">Dine In</div>
              </div>
            </button>
            <button onClick={onMenu} className="bg-white py-8 flex flex-col items-center justify-center gap-2 border-l border-gray-100 hover:bg-gray-50 transition-colors">
              <div className="p-3 bg-white rounded-xl border border-gray-100">
                <User size={32} strokeWidth={1.5} className="text-gray-700" />
              </div>
              <div className="text-center">
                <div className="font-bold text-gray-800">自取</div>
                <div className="text-[10px] text-gray-400 uppercase tracking-tighter">Pick Up</div>
              </div>
            </button>
            <button onClick={onMenu} className="bg-white py-8 flex flex-col items-center justify-center gap-2 border-t border-gray-100 hover:bg-gray-50 transition-colors">
              <div className="p-3 bg-white rounded-xl border border-gray-100">
                <Truck size={32} strokeWidth={1.5} className="text-gray-700" />
              </div>
              <div className="text-center">
                <div className="font-bold text-gray-800">外送</div>
                <div className="text-[10px] text-gray-400 uppercase tracking-tighter">Delivery</div>
              </div>
            </button>
            <button onClick={onMenu} className="bg-white py-8 flex flex-col items-center justify-center gap-2 border-t border-l border-gray-100 hover:bg-gray-50 transition-colors">
              <div className="p-3 bg-white rounded-xl border border-gray-100">
                <CalendarCheck size={32} strokeWidth={1.5} className="text-gray-700" />
              </div>
              <div className="text-center">
                <div className="font-bold text-gray-800">自助预约</div>
                <div className="text-[10px] text-gray-400 uppercase tracking-tighter">Reservation</div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Status / Promotion */}
      <div className="mt-8 px-5">
          <div className="bg-[#e5e5e5] rounded-full py-4 text-center text-gray-500 font-bold mb-4 shadow-inner">
            未满足开通条件
          </div>
          
          <div className="bg-[#f7e28b] rounded-t-3xl p-5 flex items-center justify-between shadow-sm">
             <div className="flex items-center gap-2">
                <MapPin size={18} />
                <span className="font-bold text-sm">棠小一（XX店）</span>
             </div>
             <div className="text-xs text-gray-600">距离您86.2km &gt;</div>
          </div>
      </div>
    </div>
  );
};

export default Home;
