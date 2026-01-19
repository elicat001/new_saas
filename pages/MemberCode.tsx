
import React, { useEffect, useState } from 'react';
import { ChevronLeft } from 'lucide-react';

interface MemberCodeProps {
  onBack: () => void;
}

const MemberCode: React.FC<MemberCodeProps> = ({ onBack }) => {
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => (prev <= 1 ? 60 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gray-50 min-h-full flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 flex items-center justify-between sticky top-0 z-10">
        <button onClick={onBack} className="p-2 -ml-2"><ChevronLeft size={24} /></button>
        <span className="font-bold">会员码</span>
        <div className="w-8"></div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8 py-10">
        <div className="bg-white rounded-3xl w-full shadow-lg p-10 flex flex-col items-center relative">
          {/* Top Avatar cutout */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2">
             <div className="w-24 h-24 rounded-full bg-white p-1.5 shadow-md">
                <img src="https://picsum.photos/seed/user-code/150/150" className="w-full h-full rounded-full object-cover" />
             </div>
          </div>

          <div className="mt-8 text-xl font-bold mb-10">粒</div>

          {/* Barcode Mock */}
          <div className="w-full mb-10 space-y-1">
             <div className="flex justify-between w-full h-24 gap-[2px]">
                {[...Array(40)].map((_, i) => (
                    <div key={i} className={`h-full bg-black rounded-full`} style={{ width: `${Math.random() > 0.5 ? '2px' : '4px'}`, opacity: Math.random() > 0.2 ? 1 : 0.5 }}></div>
                ))}
             </div>
          </div>

          {/* QR Code Mock */}
          <div className="w-48 h-48 bg-gray-50 p-2 border-2 border-gray-100 rounded-2xl mb-6 flex flex-wrap gap-px overflow-hidden">
             {[...Array(100)].map((_, i) => (
                <div key={i} className={`w-[18px] h-[18px] ${Math.random() > 0.5 ? 'bg-black' : 'bg-transparent'}`}></div>
             ))}
          </div>

          <div className="text-sm text-gray-400 mb-10">每{countdown}秒自动刷新</div>

          {/* Bottom Stats */}
          <div className="w-full grid grid-cols-3 border-t border-dashed border-gray-100 pt-10">
             <div className="text-center">
                <div className="text-xl font-bold mb-1">0</div>
                <div className="text-[10px] text-gray-400">优惠券</div>
             </div>
             <div className="text-center border-x border-gray-50">
                <div className="text-xl font-bold mb-1">19</div>
                <div className="text-[10px] text-gray-400">积分</div>
             </div>
             <div className="text-center">
                <div className="text-xl font-bold mb-1">0.00</div>
                <div className="text-[10px] text-gray-400">余额</div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberCode;
