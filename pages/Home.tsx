
import React from 'react';
import { QrCode, Home as HomeIcon, MapPin, Truck, CalendarCheck, User, Scan, ChevronRight } from 'lucide-react';

interface HomeProps {
  onMenu: () => void;
  onMemberCode: () => void;
}

const Home: React.FC<HomeProps> = ({ onMenu, onMemberCode }) => {
  const handleScan = () => {
    // Simulate opening camera and navigating to menu
    onMenu();
  };

  return (
    <div className="relative min-h-screen pb-32">
      {/* Brand Header Section */}
      <div className="bg-[#e5e5e5] pt-14 pb-28 px-6 flex flex-col items-center relative overflow-hidden">
        <h1 className="text-4xl font-black tracking-[0.2em] text-black mb-8">棠小一<sup className="text-[10px] ml-1 font-black align-top">®</sup></h1>
        
        {/* Brand Decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/5 rounded-full -ml-12 -mb-12 blur-2xl"></div>

        {/* Mascot / Illustration Container */}
        <div className="relative w-44 h-44 mb-4">
          <div className="absolute inset-0 bg-[#f7e28b] rounded-full opacity-20 animate-pulse scale-110"></div>
          <div className="w-full h-full bg-white/40 rounded-[40px] backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-2xl relative z-10">
             <img 
               src="https://images.unsplash.com/photo-1551024506-0bccd828d307?w=300&h=300&fit=crop" 
               alt="Brand mascot" 
               className="w-32 h-32 object-cover rounded-[30px]"
             />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="px-5 -mt-24 relative z-20">
        <div className="bg-white rounded-[40px] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
          {/* User Info Header */}
          <div className="flex justify-between items-center mb-10">
            <div>
              <div className="text-gray-400 text-sm font-bold tracking-tight mb-1">HELLO,</div>
              <div className="text-3xl font-black text-black">粒</div>
              <div className="mt-2 inline-flex items-center gap-1 bg-gray-50 px-2.5 py-1 rounded-full border border-gray-100">
                 <span className="w-1.5 h-1.5 bg-[#f7e28b] rounded-full"></span>
                 <span className="text-[10px] text-gray-400 font-black tracking-tight uppercase">General Member</span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-3">
                <div className="w-16 h-16 rounded-full border-[5px] border-white shadow-xl overflow-hidden active:scale-95 transition-transform" onClick={onMemberCode}>
                    <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop" alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <button 
                  onClick={onMemberCode}
                  className="bg-[#333] px-3.5 py-1.5 rounded-full flex items-center gap-2 shadow-lg active:scale-90 transition-all"
                >
                  <QrCode size={12} className="text-[#f7e28b]" />
                  <span className="text-[10px] font-black text-[#f7e28b]">会员码</span>
                </button>
            </div>
          </div>

          {/* Primary Action: Scan to Order */}
          <button 
            onClick={handleScan}
            className="w-full bg-[#f7e28b] mb-8 py-5 rounded-[28px] flex items-center justify-center gap-4 shadow-xl shadow-brand-yellow/40 active:scale-[0.98] transition-all relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
               <Scan size={80} strokeWidth={1} />
            </div>
            <div className="bg-white/50 p-3 rounded-2xl">
              <Scan size={26} strokeWidth={2.5} className="text-black" />
            </div>
            <div className="text-left">
              <div className="text-lg font-black text-black leading-tight">扫码点餐</div>
              <div className="text-[10px] text-black/50 font-black uppercase tracking-widest mt-0.5">Scan to order now</div>
            </div>
          </button>

          {/* Secondary Services Grid */}
          <div className="grid grid-cols-2 gap-px bg-gray-100 rounded-[32px] overflow-hidden border border-gray-100 shadow-inner">
            <button onClick={onMenu} className="bg-white py-8 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 active:bg-gray-100 transition-colors">
              <div className="p-3 bg-[#F8F8F8] rounded-2xl group-active:scale-90 transition-transform">
                <HomeIcon size={24} strokeWidth={2} className="text-gray-800" />
              </div>
              <div className="text-center">
                <div className="font-black text-[14px] text-gray-800 tracking-tight">堂食</div>
                <div className="text-[9px] text-gray-400 font-black uppercase tracking-wider">Dine In</div>
              </div>
            </button>
            <button onClick={onMenu} className="bg-white py-8 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 active:bg-gray-100 transition-colors">
              <div className="p-3 bg-[#F8F8F8] rounded-2xl group-active:scale-90 transition-transform">
                <User size={24} strokeWidth={2} className="text-gray-800" />
              </div>
              <div className="text-center">
                <div className="font-black text-[14px] text-gray-800 tracking-tight">自取</div>
                <div className="text-[9px] text-gray-400 font-black uppercase tracking-wider">Pick Up</div>
              </div>
            </button>
            <button onClick={onMenu} className="bg-white py-8 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 active:bg-gray-100 transition-colors">
              <div className="p-3 bg-[#F8F8F8] rounded-2xl group-active:scale-90 transition-transform">
                <Truck size={24} strokeWidth={2} className="text-gray-800" />
              </div>
              <div className="text-center">
                <div className="font-black text-[14px] text-gray-800 tracking-tight">外送</div>
                <div className="text-[9px] text-gray-400 font-black uppercase tracking-wider">Delivery</div>
              </div>
            </button>
            <button onClick={onMenu} className="bg-white py-8 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 active:bg-gray-100 transition-colors">
              <div className="p-3 bg-[#F8F8F8] rounded-2xl group-active:scale-90 transition-transform">
                <CalendarCheck size={24} strokeWidth={2} className="text-gray-800" />
              </div>
              <div className="text-center">
                <div className="font-black text-[14px] text-gray-800 tracking-tight">自助预约</div>
                <div className="text-[9px] text-gray-400 font-black uppercase tracking-wider">Reserved</div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Store Location Card */}
      <div className="mt-8 px-5">
          <div className="bg-white border border-gray-100 rounded-[32px] p-6 flex items-center justify-between shadow-sm active:bg-gray-50 transition-colors">
             <div className="flex items-center gap-4">
                <div className="bg-[#f7e28b]/20 p-3 rounded-2xl">
                  <MapPin size={20} className="text-[#d4b945]" />
                </div>
                <div>
                   <span className="font-black text-sm text-gray-800 block">棠小一（深圳总店）</span>
                   <span className="text-[10px] text-gray-400 font-bold">深圳市南山区粤海街道...</span>
                </div>
             </div>
             <div className="text-[11px] font-black text-[#d4b945] flex items-center gap-1 bg-[#f7e28b]/10 px-3 py-1.5 rounded-full">
               86.2km <ChevronRight size={14} />
             </div>
          </div>
      </div>

      {/* Promotion Banner */}
      <div className="mt-6 px-5 mb-8">
         <div className="bg-black rounded-[32px] p-8 flex items-center justify-between relative overflow-hidden">
            <div className="relative z-10">
               <div className="text-[#f7e28b] text-xl font-black mb-1">会员首单6折</div>
               <div className="text-white/60 text-xs font-bold">Member's first order 40% OFF</div>
            </div>
            <div className="relative z-10 bg-[#f7e28b] text-black px-6 py-2.5 rounded-full text-xs font-black shadow-lg shadow-[#f7e28b]/20 active:scale-95 transition-transform">
               立即参与
            </div>
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-32 h-full bg-white/5 skew-x-12 -mr-16"></div>
         </div>
      </div>
    </div>
  );
};

export default Home;
