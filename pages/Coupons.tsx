
import React, { useState } from 'react';
import { ChevronLeft, Info } from 'lucide-react';

interface CouponsProps {
  onBack: () => void;
}

const Coupons: React.FC<CouponsProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('可使用');

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <button onClick={onBack} className="p-2 -ml-2"><ChevronLeft size={24} /></button>
        <span className="font-bold">券包</span>
        <div className="w-8"></div>
      </div>

      {/* Tabs */}
      <div className="bg-white px-4 mb-px">
         <div className="bg-[#f7e28b]/20 flex rounded-xl overflow-hidden p-1">
            {['可使用', '已使用', '不可用', '已赠送'].map(t => (
                <button 
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === t ? 'bg-white text-[#c7b25b]' : 'text-gray-400'}`}
                >
                  {t}
                </button>
            ))}
         </div>
      </div>

      {/* Subscription Notice */}
      <div className="bg-white p-4 flex items-center justify-between mb-3">
         <div className="flex items-center gap-1.5 text-xs text-gray-400">
            开启优惠券过期/到账提醒 <Info size={14} />
         </div>
         <button className="bg-[#f7e28b] px-3 py-1.5 rounded-full text-[10px] font-bold">立即订阅</button>
      </div>

      {/* Empty State */}
      <div className="flex-1 flex flex-col items-center justify-center p-10">
        <div className="relative opacity-20 grayscale scale-125 mb-8">
            <img src="https://picsum.photos/seed/empty-coupon/400/400" className="w-48 h-48" />
        </div>
        <p className="text-gray-400 text-sm font-medium">暂无优惠券</p>
      </div>

      {/* Footer Buttons */}
      <div className="bg-white p-4 flex gap-4 fixed bottom-0 inset-x-0 shadow-up">
         <button className="flex-1 py-4 text-[#c7b25b] font-bold border-r border-gray-100">
            转赠给好友
         </button>
         <button className="flex-1 py-4 bg-[#f7e28b] rounded-r-full font-bold">
            兑换码
         </button>
      </div>
    </div>
  );
};

export default Coupons;
