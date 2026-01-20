
import React, { useState, useRef } from 'react';
import { QrCode, Home as HomeIcon, MapPin, Truck, CalendarCheck, User, Scan, ChevronRight, X } from 'lucide-react';
import { MerchantConfig } from '../types';

interface HomeProps {
  onMenu: () => void;
  onMemberCode: () => void;
  merchant: MerchantConfig;
}

const Home: React.FC<HomeProps> = ({ onMenu, onMemberCode, merchant }) => {
  const [isScanning, setIsScanning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startScan = async () => {
    setIsScanning(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' }, 
        audio: false 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setTimeout(() => {
        stopScan();
        onMenu();
      }, 3000);
    } catch (err) {
      console.error("Error accessing camera for scan:", err);
      alert("无法访问相机，请检查权限设置。");
      setIsScanning(false);
    }
  };

  const stopScan = () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    stream?.getTracks().forEach(track => track.stop());
    setIsScanning(false);
  };

  // Logic to determine grid columns based on enabled features
  const enabledFeatures = [
    { id: 'dineIn', icon: <HomeIcon size={24} />, title: "堂食", subtitle: "DINE IN", enabled: merchant.features.dineIn },
    { id: 'pickup', icon: <User size={24} />, title: "自取", subtitle: "PICK UP", enabled: merchant.features.pickup },
    { id: 'delivery', icon: <Truck size={24} />, title: "外送", subtitle: "DELIVERY", enabled: merchant.features.delivery },
    { id: 'express', icon: <CalendarCheck size={24} />, title: "快递", subtitle: "EXPRESS", enabled: merchant.features.express },
  ].filter(f => f.enabled);

  return (
    <div className="relative min-h-screen pb-32">
      <div className="bg-[#e5e5e5] pt-16 pb-32 px-6 flex flex-col items-center relative overflow-hidden transition-all duration-500">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mt-24 blur-3xl"></div>
        <h1 className="text-4xl font-black tracking-[0.25em] text-black mb-10 z-10 flex items-center">
          {merchant.name}
          <sup className="text-[12px] ml-1 font-black align-top">®</sup>
        </h1>
        
        <div className="relative w-40 h-40 z-10">
          <div 
            className="absolute inset-0 rounded-inner opacity-20 animate-pulse scale-110 blur-xl"
            style={{ backgroundColor: 'var(--brand-primary)' }}
          ></div>
          <div 
            className="w-full h-full bg-white/40 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-xl rounded-inner overflow-hidden"
          >
             <img 
               src={merchant.mascot} 
               alt="吉祥物" 
               className="w-32 h-32 object-cover rounded-inner shadow-sm"
             />
          </div>
        </div>
      </div>

      <div className="px-5 -mt-24 relative z-20">
        <div className="bg-white p-8 shadow-soft rounded-main transition-all duration-500">
          <div className="flex justify-between items-center mb-10">
            <div>
              <div className="text-gray-400 text-xs font-black tracking-widest mb-1.5 uppercase">欢迎回来</div>
              <div className="text-3xl font-black text-black tracking-tighter">粒 <span className="text-lg font-bold text-gray-300 ml-1">会员</span></div>
            </div>
            <div className="flex flex-col items-end gap-3">
                <div className="w-16 h-16 rounded-full border-[4px] border-white shadow-lg overflow-hidden active-scale cursor-pointer">
                    <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop" alt="头像" className="w-full h-full object-cover" />
                </div>
                <button 
                  onClick={onMemberCode}
                  className="bg-[#1a1a1a] px-4 py-2 rounded-full flex items-center gap-2 active-scale shadow-lg"
                >
                  <QrCode size={12} style={{ color: 'var(--brand-primary)' }} />
                  <span className="text-[10px] font-black tracking-wider" style={{ color: 'var(--brand-primary)' }}>会员码</span>
                </button>
            </div>
          </div>

          <button 
            onClick={startScan}
            className="w-full bg-brand mb-8 py-5 rounded-inner flex items-center justify-center gap-5 shadow-xl shadow-brand-yellow/30 active-scale group"
            style={{ boxShadow: `0 15px 30px -5px ${merchant.theme.primary}40` }}
          >
            <div className="bg-white/40 p-3 rounded-inner group-hover:rotate-12 transition-transform">
              <Scan size={26} strokeWidth={2.5} className="text-black" />
            </div>
            <div className="text-left">
              <div className="text-lg font-black text-black leading-none">扫码点餐</div>
              <div className="text-[10px] text-black/50 font-black uppercase tracking-[0.15em] mt-1.5">扫码极速下单</div>
            </div>
          </button>

          <div className="grid grid-cols-2 gap-0.5 bg-gray-50 rounded-[32px] overflow-hidden border border-gray-50">
            {enabledFeatures.map((feature, idx) => (
              <ServiceBtn 
                key={feature.id}
                icon={feature.icon} 
                title={feature.title} 
                subtitle={feature.subtitle} 
                onClick={onMenu}
                className={`
                  ${idx === 0 ? 'border-r border-b' : ''}
                  ${idx === 1 ? 'border-b' : ''}
                  ${idx === 2 ? 'border-r' : ''}
                `}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 px-5">
          <div className="bg-white border border-gray-100/50 rounded-inner p-6 flex items-center justify-between shadow-sm active-scale">
             <div className="flex items-center gap-4">
                <div className="bg-brand/20 p-3 rounded-inner">
                  <MapPin size={20} className="text-brand" />
                </div>
                <div>
                   <span className="font-black text-sm text-gray-900 block tracking-tight">{merchant.name}（旗舰店）</span>
                   <span className="text-[10px] text-gray-400 font-bold mt-0.5">为您自动定位至最近门店...</span>
                </div>
             </div>
             <div className="text-[11px] font-black text-brand flex items-center gap-1.5 bg-brand/10 px-4 py-2 rounded-full">
               距离您 86km <ChevronRight size={14} />
             </div>
          </div>
      </div>

      {isScanning && (
        <div className="fixed inset-0 bg-black z-[500] flex flex-col items-center justify-center animate-in fade-in duration-300">
           <video ref={videoRef} autoPlay playsInline className="absolute inset-0 w-full h-full object-cover" />
           <div className="relative z-10 flex flex-col items-center">
              <div className="w-[65vw] aspect-square relative">
                 <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-brand rounded-tl-3xl"></div>
                 <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-brand rounded-tr-3xl"></div>
                 <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-brand rounded-bl-3xl"></div>
                 <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-brand rounded-br-3xl"></div>
                 <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-brand to-transparent shadow-[0_0_15px_brand] animate-bounce mt-10"></div>
              </div>
           </div>
           <button onClick={stopScan} className="absolute bottom-20 p-6 bg-white/20 rounded-full text-white"><X size={32} /></button>
        </div>
      )}
    </div>
  );
};

const ServiceBtn = ({ icon, title, subtitle, onClick, className }: any) => (
  <button 
    onClick={onClick} 
    className={`bg-white py-10 flex flex-col items-center justify-center gap-4 hover:bg-gray-50 active:bg-gray-100 transition-all border-gray-100 ${className}`}
  >
    <div className="p-4 bg-gray-50/80 rounded-full text-slate-800 transition-transform group-hover:scale-110">
      {icon}
    </div>
    <div className="text-center">
      <div className="font-black text-[16px] text-slate-800 tracking-tight leading-none">{title}</div>
      <div className="text-[10px] text-slate-400 font-black uppercase tracking-wider mt-2">{subtitle}</div>
    </div>
  </button>
);

export default Home;
