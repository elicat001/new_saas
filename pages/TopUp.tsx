
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, Wallet, Info } from 'lucide-react';
import { MerchantConfig } from '../types';

interface TopUpProps {
  onBack: () => void;
  merchant: MerchantConfig;
}

const TopUp: React.FC<TopUpProps> = ({ onBack, merchant }) => {
  const [selectedAmount, setSelectedAmount] = useState(10);
  const [agreed, setAgreed] = useState(false);
  
  const AMOUNTS = [
    { value: 10, bonus: 0 },
    { value: 50, bonus: 5 },
    { value: 100, bonus: 15 },
    { value: 200, bonus: 40 }
  ];

  return (
    <div className="bg-[#F8F8F8] min-h-screen flex flex-col pb-10">
      <div className="bg-white px-5 pt-16 pb-4 flex items-center justify-between sticky top-0 z-50 border-b border-gray-50">
        <button onClick={onBack} className="w-10 h-10 bg-gray-50 border border-gray-200 rounded-[16px] hover:bg-gray-100 flex items-center justify-center active-scale transition-all">
          <ChevronLeft size={22} />
        </button>
        <span className="font-black text-lg tracking-tight text-black">充值余额</span>
        <div className="w-10"></div>
      </div>

      <div className="p-8">
        <div className="bg-white rounded-[48px] p-10 shadow-soft mb-10 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full blur-3xl" style={{ backgroundColor: `${merchant.theme.primary}1A` }}></div>
            <div className="relative z-10 flex items-center gap-5 mb-8">
                <div className="w-16 h-16 rounded-[24px] flex items-center justify-center" style={{ backgroundColor: `${merchant.theme.primary}33`, color: merchant.theme.secondary }}>
                    <Wallet size={32} />
                </div>
                <div>
                    <div className="text-[10px] text-gray-300 font-black uppercase tracking-widest mb-1">Current Balance</div>
                    <div className="text-3xl font-black text-black tracking-tight">¥ 0.00</div>
                </div>
            </div>
            
            <div className="text-[10px] text-gray-300 font-black uppercase tracking-widest border-t border-gray-50 pt-8 mb-6">Select Amount</div>
            
            <div className="grid grid-cols-2 gap-4">
                {AMOUNTS.map(item => (
                    <button
                        key={item.value}
                        onClick={() => setSelectedAmount(item.value)}
                        className={`relative h-32 rounded-[32px] border-2 transition-all active-scale group ${selectedAmount === item.value ? 'bg-[#f7e28b]/5' : 'border-gray-50 bg-white'}`}
                        style={selectedAmount === item.value ? { borderColor: merchant.theme.primary, backgroundColor: `${merchant.theme.primary}0D` } : {}}
                    >
                        {selectedAmount === item.value && (
                            <div className="absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center shadow-md" style={{ backgroundColor: merchant.theme.primary }}>
                                <Check size={14} strokeWidth={4} />
                            </div>
                        )}
                        <div className="flex flex-col items-center">
                            <div className="text-2xl font-black text-black">¥{item.value}</div>
                            {item.bonus > 0 && (
                               <div className="mt-2 px-3 py-1 bg-black text-[8px] font-black rounded-full uppercase tracking-widest" style={{ color: merchant.theme.primary }}>
                                 Bonus ¥{item.bonus}
                               </div>
                            )}
                        </div>
                    </button>
                ))}
            </div>
        </div>

        <div className="px-4 mb-10">
            <div 
              onClick={() => setAgreed(!agreed)}
              className="flex items-center gap-4 cursor-pointer group"
            >
                <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${agreed ? 'bg-black border-black' : 'border-gray-200 group-hover:border-gray-300'}`}>
                    {agreed && <Check size={14} strokeWidth={4} style={{ color: merchant.theme.primary }} />}
                </div>
                <span className="text-[11px] text-gray-400 font-bold leading-none">
                  我已阅读并同意 <span className="text-black font-black underline decoration-2" style={{ textDecorationColor: merchant.theme.primary }}>《储值协议》</span>
                </span>
            </div>
        </div>

        <button 
          disabled={!agreed}
          className={`w-full py-6 rounded-[24px] border font-black text-lg shadow-xl transition-all active-scale mb-10 ${agreed ? 'bg-brand text-black border-[var(--brand-secondary)]' : 'bg-gray-100 text-gray-300 border-gray-200 shadow-none cursor-not-allowed'}`}
          style={agreed ? { backgroundColor: merchant.theme.primary, boxShadow: `0 15px 30px -5px ${merchant.theme.primary}40` } : {}}
        >
            立即支付 ¥{selectedAmount.toFixed(2)}
        </button>

        <div className="bg-white/50 rounded-[32px] p-8 border border-gray-50">
            <h4 className="flex items-center gap-2 text-[10px] text-gray-300 font-black mb-6 uppercase tracking-widest">
                <Info size={14} />
                Important Notice
            </h4>
            <ul className="space-y-4">
                <li className="flex gap-4">
                    <span className="w-5 h-5 bg-gray-100 text-[10px] font-black flex items-center justify-center rounded-full shrink-0">1</span>
                    <span className="text-[11px] text-gray-400 font-bold leading-relaxed">仅支持微信支付/支付宝充值，充值金额即刻到账。</span>
                </li>
                <li className="flex gap-4">
                    <span className="w-5 h-5 bg-gray-100 text-[10px] font-black flex items-center justify-center rounded-full shrink-0">2</span>
                    <span className="text-[11px] text-gray-400 font-bold leading-relaxed">储值金长期有效，不设有效期，不支持提现。</span>
                </li>
            </ul>
        </div>
      </div>
    </div>
  );
};

export default TopUp;
