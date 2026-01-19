
import React, { useState, useRef } from 'react';
import { QrCode, Home as HomeIcon, MapPin, Truck, CalendarCheck, User, Scan, ChevronRight, X, Loader2 } from 'lucide-react';

interface HomeProps {
  onMenu: () => void;
  onMemberCode: () => void;
}

const Home: React.FC<HomeProps> = ({ onMenu, onMemberCode }) => {
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
      
      // Simulate a successful scan after 3 seconds
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

  return (
    <div className="relative min-h-screen pb-32">
      {/* Brand Header */}
      <div className="bg-[#e5e5e5] pt-16 pb-32 px-6 flex flex-col items-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mt-24 blur-3xl"></div>
        <h1 className="text-4xl font-black tracking-[0.25em] text-black mb-10 z-10">棠小一<sup className="text-[12px] ml-1 font-black align-top">®</sup></h1>
        
        <div className="relative w-40 h-40 z-10">
          <div className="absolute inset-0 bg-[#f7e28b] rounded-[40px] opacity-20 animate-pulse scale-110 blur-xl"></div>
          <div className="w-full h-full bg-white/40 rounded-[42px] backdrop-blur-md border border-white/30 flex items-center justify-center shadow-xl">
             <img 
               src="https://images.unsplash.com/photo-1551024506-0bccd828d307?w=300&h=300&fit=crop" 
               alt="Brand mascot" 
               className="w-32 h-32 object-cover rounded-[32px] shadow-sm"
             />
          </div>
        </div>
      </div>

      {/* Profile Card */}
      <div className="px-5 -mt-24 relative z-20">
        <div className="bg-white rounded-[40px] p-8 shadow-soft">
          <div className="flex justify-between items-center mb-10">
            <div>
              <div className="text-gray-400 text-xs font-black tracking-widest mb-1.5 uppercase">Welcome Back</div>
              <div className="text-3xl font-black text-black tracking-tighter">粒 <span className="text-lg font-bold text-gray-300 ml-1">Member</span></div>
            </div>
            <div className="flex flex-col items-end gap-3">
                <div 
                  className="w-16 h-16 rounded-full border-[4px] border-white shadow-lg overflow-hidden active-scale cursor-pointer"
                  onClick={() => {}}
                >
                    <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop" alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <button 
                  onClick={onMemberCode}
                  className="bg-[#1a1a1a] px-4 py-2 rounded-full flex items-center gap-2 active-scale shadow-lg"
                >
                  <QrCode size={12} className="text-[#f7e28b]" />
                  <span className="text-[10px] font-black text-[#f7e28b] tracking-wider">会员码</span>
                </button>
            </div>
          </div>

          {/* Action: Scan */}
          <button 
            onClick={startScan}
            className="w-full bg-[#f7e28b] mb-8 py-5 rounded-[28px] flex items-center justify-center gap-5 shadow-xl shadow-brand-yellow/30 active-scale group"
          >
            <div className="bg-white/40 p-3 rounded-2xl group-hover:rotate-12 transition-transform">
              <Scan size={26} strokeWidth={2.5} className="text-black" />
            </div>
            <div className="text-left">
              <div className="text-lg font-black text-black leading-none">扫码点餐</div>
              <div className="text-[10px] text-black/50 font-black uppercase tracking-[0.15em] mt-1.5">Scan to order</div>
            </div>
          </button>

          {/* Grid Services */}
          <div className="grid grid-cols-2 gap-px bg-gray-50 rounded-[32px] overflow-hidden border border-gray-50">
            <ServiceBtn icon={<HomeIcon size={24} />} title="堂食" subtitle="DINE IN" onClick={onMenu} />
            <ServiceBtn icon={<User size={24} />} title="自取" subtitle="PICK UP" onClick={onMenu} />
            <ServiceBtn icon={<Truck size={24} />} title="外送" subtitle="DELIVERY" onClick={onMenu} />
            <ServiceBtn icon={<CalendarCheck size={24} />} title="自助预约" subtitle="RESERVE" onClick={onMenu} />
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="mt-8 px-5">
          <div className="bg-white border border-gray-100/50 rounded-[32px] p-6 flex items-center justify-between shadow-sm active-scale">
             <div className="flex items-center gap-4">
                <div className="bg-[#f7e28b]/20 p-3 rounded-2xl">
                  <MapPin size={20} className="text-[#d4b945]" />
                </div>
                <div>
                   <span className="font-black text-sm text-gray-900 block tracking-tight">棠小一（深圳总店）</span>
                   <span className="text-[10px] text-gray-400 font-bold mt-0.5">深圳市南山区粤海街道...</span>
                </div>
             </div>
             <div className="text-[11px] font-black text-[#d4b945] flex items-center gap-1.5 bg-[#f7e28b]/10 px-4 py-2 rounded-full">
               86.2km <ChevronRight size={14} />
             </div>
          </div>
      </div>

      {/* Banner */}
      <div className="mt-6 px-5 mb-10">
         <div className="bg-[#1a1a1a] rounded-[32px] p-8 flex items-center justify-between relative overflow-hidden group active-scale">
            <div className="relative z-10">
               <div className="text-[#f7e28b] text-xl font-black mb-1.5 tracking-tight">会员首单6折</div>
               <div className="text-white/40 text-[10px] font-black tracking-widest uppercase">Member First Order 40% OFF</div>
            </div>
            <div className="relative z-10 bg-[#f7e28b] text-black px-6 py-3 rounded-full text-xs font-black shadow-lg shadow-[#f7e28b]/20">
               立即参与
            </div>
            <div className="absolute top-0 right-0 w-32 h-full bg-white/5 skew-x-12 -mr-16 group-hover:bg-white/10 transition-colors"></div>
         </div>
      </div>

      {/* Scanner Overlay */}
      {isScanning && (
        <div className="fixed inset-0 bg-black z-[500] flex flex-col items-center justify-center animate-in fade-in duration-300">
           <div className="absolute top-16 right-6 z-10">
              <button onClick={stopScan} className="p-4 bg-white/10 rounded-full backdrop-blur-md active-scale text-white">
                <X size={24} />
              </button>
           </div>
           
           <video ref={videoRef} autoPlay playsInline className="absolute inset-0 w-full h-full object-cover" />
           
           <div className="relative z-10 flex flex-col items-center">
              <div className="w-[65vw] aspect-square relative">
                 {/* Scanner Corners */}
                 <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-[#f7e28b] rounded-tl-3xl"></div>
                 <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-[#f7e28b] rounded-tr-3xl"></div>
                 <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-[#f7e28b] rounded-bl-3xl"></div>
                 <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-[#f7e28b] rounded-br-3xl"></div>
                 
                 {/* Scanning Line */}
                 <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#f7e28b] to-transparent shadow-[0_0_15px_#f7e28b] animate-bounce mt-10"></div>
                 
                 {/* Placeholder for camera content */}
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/20 backdrop-blur-[2px] w-full h-full rounded-3xl"></div>
                 </div>
              </div>
              
              <div className="mt-12 text-center space-y-4">
                 <div className="flex items-center justify-center gap-3 bg-black/40 backdrop-blur-md px-6 py-3 rounded-full">
                    <Loader2 size={16} className="text-[#f7e28b] animate-spin" />
                    <span className="text-white text-xs font-black tracking-widest uppercase">Align with QR Code</span>
                 </div>
                 <p className="text-white/40 text-[10px] font-black tracking-widest uppercase">Scanning for tables...</p>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

const ServiceBtn = ({ icon, title, subtitle, onClick }: any) => (
  <button onClick={onClick} className="bg-white py-8 flex flex-col items-center justify-center gap-3 hover:bg-gray-50 active:bg-gray-100 transition-colors">
    <div className="p-3 bg-gray-50 rounded-2xl text-gray-800">
      {icon}
    </div>
    <div className="text-center">
      <div className="font-black text-[14px] text-gray-900 tracking-tight">{title}</div>
      <div className="text-[9px] text-gray-400 font-black uppercase tracking-wider mt-0.5">{subtitle}</div>
    </div>
  </button>
);

export default Home;
