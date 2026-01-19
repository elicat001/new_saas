
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Check } from 'lucide-react';

interface TopUpProps {
  onBack: () => void;
}

const TopUp: React.FC<TopUpProps> = ({ onBack }) => {
  const [selectedAmount, setSelectedAmount] = useState(10);
  const AMOUNTS = [10, 20, 30, 40];

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 flex items-center justify-between sticky top-0 z-10">
        <button onClick={onBack} className="p-2 -ml-2"><ChevronLeft size={24} /></button>
        <span className="font-bold">充值</span>
        <div className="w-8"></div>
      </div>

      <div className="p-6">
        <h1 className="text-4xl font-bold mb-2">账号充值</h1>
        <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-1 text-xs text-gray-400">
               <MapPin size={14} /> 棠小一 | 86.2km <ChevronRight size={14} />
            </div>
            <span className="text-xs text-gray-400">我的余额</span>
        </div>

        {/* Amount Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
            {AMOUNTS.map(amount => (
                <button
                    key={amount}
                    onClick={() => setSelectedAmount(amount)}
                    className={`relative h-32 rounded-2xl border-2 flex items-center justify-center transition-all ${selectedAmount === amount ? 'border-[#f7e28b] bg-[#f7e28b]/5' : 'border-gray-100'}`}
                >
                    {selectedAmount === amount && (
                        <div className="absolute top-0 right-0 bg-[#f7e28b] p-1 rounded-bl-xl rounded-tr-xl">
                            <Check size={12} strokeWidth={4} />
                        </div>
                    )}
                    <div className="text-2xl font-bold text-black">{amount.toFixed(2)} <span className="text-sm font-medium text-gray-400">元</span></div>
                </button>
            ))}
        </div>

        <div className="flex items-center justify-center gap-2 mb-10">
            <span className="text-xs text-gray-400">展开全部 (5张)</span>
            <ChevronRight size={14} className="text-gray-400 rotate-90" />
        </div>

        <div className="flex items-center gap-2 mb-10 px-4">
            <div className="w-5 h-5 rounded-full border border-gray-200"></div>
            <span className="text-xs text-gray-400">我已阅读并同意 <span className="text-[#f7e28b]">《储值协议》</span></span>
        </div>

        <button className="w-full bg-[#f7e28b] py-4 rounded-full font-bold shadow-lg mb-6">
            立即充值 {selectedAmount.toFixed(2)}
        </button>

        <button className="w-full text-center text-xs text-gray-400 font-bold">查看充值记录</button>

        <div className="mt-16">
            <h4 className="text-xs text-gray-400 font-bold mb-4">充值说明</h4>
            <ul className="text-[10px] text-gray-400 space-y-2 list-decimal list-inside">
                <li>仅支持微信支付充值。</li>
                <li>当您的充值出现问题，或者未到账时，请联系管理员。</li>
            </ul>
        </div>
      </div>
    </div>
  );
};

export default TopUp;
