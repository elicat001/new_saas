
import React, { useState } from 'react';
import { ChevronLeft, Info, X, Tag, Ticket } from 'lucide-react';
// Added MerchantConfig import
import { MerchantConfig } from '../types';

interface CouponsProps {
  onBack: () => void;
  // Added merchant prop
  merchant: MerchantConfig;
}

// Updated component signature to accept merchant prop
const Coupons: React.FC<CouponsProps> = ({ onBack, merchant }) => {
  const [activeTab, setActiveTab] = useState('可使用');
  const [showExchange, setShowExchange] = useState(false);

  const MOCK_COUPONS = [
    { id: 1, title: '满30减5元优惠券', expire: '2025-12-31', amount: 5, condition: '满30元可用', tag: 'Limited' },
    { id: 2, title: '全场8折通用券', expire: '2025-10-15', amount: '8折', condition: '无门槛', tag: 'New' }
  ];

  return (
    <div className="bg-[#F8F8F8] min-h-screen flex flex-col pb-32">
      {/* Header */}
      <div className="bg-white px-5 pt-16 pb-4 flex items-center justify-between sticky top-0 z-50 border-b border-gray-50">
        <button onClick={onBack} className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center active-scale"><ChevronLeft size={22} /></button>
        <span className="font-black text-lg tracking-tight text-black">我的券包</span>
        <button onClick={() => setShowExchange(true)} className="text-xs font-black px-4 py-2 rounded-full active-scale" style={{ backgroundColor: `${merchant.theme.primary}1A`, color: merchant.theme.secondary }}>兑换码</button>
      </div>

      {/* Tabs */}
      <div className="bg-white px-5 py-6 mb-4 shadow-sm">
         <div className="flex justify-around items-center">
            {['可使用', '已使用', '已过期'].map(t => (
                <button 
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={`text-sm font-black transition-all relative pb-3 ${activeTab === t ? 'text-black' : 'text-gray-300'}`}
                >
                  {t}
                  {activeTab === t && <div className="absolute bottom-0 left-0 w-full h-1 rounded-full" style={{ backgroundColor: merchant.theme.primary }}></div>}
                </button>
            ))}
         </div>
      </div>

      {/* List */}
      <div className="flex-1 px-5 space-y-4">
        {activeTab === '可使用' ? (
          MOCK_COUPONS.map(coupon => (
            <div key={coupon.id} className="bg-white rounded-[32px] overflow-hidden shadow-soft border border-gray-50 flex active-scale">
               <div className="w-32 bg-[#1a1a1a] flex flex-col items-center justify-center p-6 relative" style={{ color: merchant.theme.primary }}>
                  <div className="text-2xl font-black">{coupon.amount}<span className="text-xs ml-0.5">{typeof coupon.amount === 'number' ? '元' : ''}</span></div>
                  <div className="text-[9px] font-bold opacity-60 mt-2 uppercase tracking-widest">{coupon.condition}</div>
                  {/* Decorative circles for ticket look */}
                  <div className="absolute top-1/2 -left-3 w-6 h-6 bg-[#F8F8F8] rounded-full -translate-y-1/2"></div>
                  <div className="absolute top-1/2 -right-3 w-6 h-6 bg-[#F8F8F8] rounded-full -translate-y-1/2 z-10"></div>
               </div>
               <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                       <h4 className="text-[15px] font-black text-black leading-tight">{coupon.title}</h4>
                       <span className="text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-wider" style={{ backgroundColor: `${merchant.theme.primary}33`, color: merchant.theme.secondary }}>{coupon.tag}</span>
                    </div>
                    <p className="text-[10px] text-gray-300 font-bold flex items-center gap-1.5">
                       有效期至 {coupon.expire}
                    </p>
                  </div>
                  <button className="self-end text-[10px] font-black text-black border border-gray-100 px-5 py-2 rounded-full hover:bg-gray-50 transition-colors">
                     立即使用
                  </button>
               </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-40 opacity-20">
             <Ticket size={60} strokeWidth={1} />
             <span className="mt-4 text-xs font-black tracking-widest uppercase">No Coupons Available</span>
          </div>
        )}
      </div>

      {/* Exchange Modal */}
      {showExchange && (
        <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-8 backdrop-blur-md">
           <div className="bg-white w-full max-sm rounded-[48px] p-10 flex flex-col items-center relative animate-in zoom-in-95 duration-300">
              <button onClick={() => setShowExchange(false)} className="absolute top-8 right-8 text-gray-300"><X size={24} /></button>
              <div className="w-20 h-20 rounded-[28px] flex items-center justify-center mb-8" style={{ backgroundColor: `${merchant.theme.primary}33`, color: merchant.theme.secondary }}>
                 <Tag size={40} />
              </div>
              <h3 className="text-2xl font-black mb-2">兑换码</h3>
              <p className="text-xs text-gray-400 font-bold mb-10">请输入您的优惠券兑换码</p>
              
              <input 
                type="text" 
                placeholder="Enter Code Here" 
                className="w-full bg-gray-50 border-2 border-transparent outline-none rounded-[24px] px-8 py-5 text-center font-black text-lg tracking-widest placeholder:text-gray-200 transition-all mb-10"
                style={{ caretColor: merchant.theme.primary }}
                onFocus={(e) => e.target.style.borderColor = merchant.theme.primary}
                onBlur={(e) => e.target.style.borderColor = 'transparent'}
              />
              
              <button className="w-full py-5 rounded-[24px] font-black shadow-xl active-scale uppercase tracking-widest" style={{ backgroundColor: merchant.theme.primary, boxShadow: `0 15px 30px -5px ${merchant.theme.primary}40` }}>
                Redeem Now
              </button>
           </div>
        </div>
      )}
    </div>
  );
};

export default Coupons;
