
import React, { useEffect, useState } from 'react';
import { ChevronLeft, RefreshCw, Info } from 'lucide-react';
import { MerchantConfig } from '../types';

interface MemberCodeProps {
  onBack: () => void;
  merchant: MerchantConfig;
}

const MemberCode: React.FC<MemberCodeProps> = ({ onBack, merchant }) => {
  const [countdown, setCountdown] = useState(60);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          setRefreshKey(k => k + 1);
          return 60;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleManualRefresh = () => {
    setCountdown(60);
    setRefreshKey(k => k + 1);
  };

  return (
    <div className="bg-[#1a1a1a] min-h-screen flex flex-col">
      <div className="px-5 pt-16 pb-4 flex items-center justify-between sticky top-0 z-50">
        <button onClick={onBack} className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white active-scale">
          <ChevronLeft size={22} />
        </button>
        <span className="font-black text-lg tracking-tight text-white">会员权益码</span>
        <button onClick={handleManualRefresh} className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white active-scale">
          <RefreshCw size={18} className={countdown < 5 ? 'animate-spin' : ''} />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
        <div className="bg-white rounded-[48px] w-full shadow-2xl p-10 flex flex-col items-center relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-2" style={{ backgroundColor: merchant.theme.primary }}></div>
          
          <div className="mt-4 flex flex-col items-center mb-10">
             <div className="w-20 h-20 rounded-full bg-gray-100 border-[6px] border-white shadow-xl overflow-hidden mb-4">
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop" className="w-full h-full object-cover" />
             </div>
             <div className="text-xl font-black text-black tracking-tight">粒</div>
             <div className="text-[10px] text-gray-300 font-black mt-1 tracking-widest uppercase">铂金会员</div>
          </div>

          <div className="w-full mb-10 group cursor-pointer" onClick={handleManualRefresh}>
             <div className="flex justify-between w-full h-20 gap-[2px] px-2">
                {[...Array(50)].map((_, i) => (
                    <div 
                      key={i + refreshKey} 
                      className="h-full bg-black rounded-full transition-all duration-500" 
                      style={{ 
                        width: `${Math.random() > 0.6 ? '4px' : '2px'}`, 
                        opacity: Math.random() > 0.1 ? 1 : 0.3,
                        transform: `scaleY(${0.8 + Math.random() * 0.2})`
                      }}
                    ></div>
                ))}
             </div>
             <div className="text-center mt-3 font-mono text-sm tracking-[0.4em] text-gray-400">8812 6675 0922</div>
          </div>

          <div className="relative p-3 border-2 border-gray-100 rounded-[32px] mb-8 active-scale" onClick={handleManualRefresh}>
             <div className="w-48 h-48 flex flex-wrap gap-px overflow-hidden rounded-2xl">
                {[...Array(144)].map((_, i) => (
                   <div key={i + refreshKey} className={`w-[15px] h-[15px] transition-all duration-300 ${Math.random() > 0.5 ? 'bg-black' : 'bg-transparent'}`}></div>
                ))}
             </div>
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white p-2 rounded-xl shadow-lg border border-gray-50">
                   <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center font-black text-[10px]" style={{ color: merchant.theme.primary }}>{merchant.logo}</div>
                </div>
             </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-gray-300 font-black tracking-widest uppercase mb-12">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
             {countdown}秒后自动刷新
          </div>

          <div className="w-full grid grid-cols-3 gap-4 pt-10 border-t border-dashed border-gray-100">
             <StatMini label="优惠券" value="0" />
             <StatMini label="积分" value="19" highlight color={merchant.theme.secondary} />
             <StatMini label="余额" value="0.00" />
          </div>
        </div>

        <div className="mt-10 flex items-center gap-2 text-white/30 text-[10px] font-black tracking-widest uppercase">
           <Info size={12} />
           <span>结算时请向收银员出示此码</span>
        </div>
      </div>
    </div>
  );
};

const StatMini = ({ label, value, highlight, color }: any) => (
  <div className="text-center">
    <div className={`text-xl font-black mb-1.5 ${highlight ? '' : 'text-black'}`} style={highlight ? { color } : {}}>{value}</div>
    <div className="text-[9px] text-gray-300 font-black uppercase tracking-widest">{label}</div>
  </div>
);

export default MemberCode;
