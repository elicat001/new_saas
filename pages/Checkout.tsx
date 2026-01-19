
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Phone, CheckCircle2, Check } from 'lucide-react';

interface CheckoutProps {
  onBack: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ onBack }) => {
  const [paymentType, setPaymentType] = useState<'wechat' | 'balance'>('wechat');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedRecharge, setSelectedRecharge] = useState(0);

  const handleConfirmOrder = () => {
    setShowPaymentModal(true);
  };

  return (
    <div className="bg-[#F8F8F8] min-h-screen flex flex-col pb-32">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 flex items-center justify-between sticky top-0 z-50">
        <button onClick={onBack} className="p-2 -ml-2 active:scale-90 transition-transform"><ChevronLeft size={24} /></button>
        <span className="font-black text-lg">确认订单</span>
        <div className="w-8"></div>
      </div>

      <div className="p-4 space-y-4">
        {/* Order Type Tabs */}
        <div className="flex bg-[#f7e28b]/20 p-1.5 rounded-2xl">
           {['堂食', '配送', '快递'].map(t => (
             <button key={t} className={`flex-1 py-3 rounded-xl text-xs font-black transition-all ${t === '堂食' ? 'bg-[#f7e28b] text-black shadow-sm' : 'text-gray-400'}`}>
               {t}
             </button>
           ))}
        </div>

        {/* Shop Info Card */}
        <div className="bg-white p-5 rounded-[24px] shadow-sm">
           <h3 className="font-black text-xl mb-6">棠小一</h3>
           <div className="flex items-center justify-between py-5 border-t border-gray-50 active:bg-gray-50 transition-colors">
              <span className="text-sm font-bold text-gray-800">订单备注</span>
              <div className="flex items-center gap-1 text-xs text-gray-400 font-medium">
                 要求、偏好 <ChevronRight size={14} />
              </div>
           </div>
        </div>

        {/* Items Card */}
        <div className="bg-white p-5 rounded-[24px] shadow-sm space-y-6">
           <h3 className="font-black text-lg">共 1 份商品</h3>
           <div className="flex gap-4">
              <img src="https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=200&h=200&fit=crop" className="w-16 h-16 rounded-2xl object-cover" />
              <div className="flex-1">
                 <div className="flex justify-between items-start">
                    <div className="flex items-center gap-1">
                       <span className="text-sm font-black leading-none">红丝绒芒果慕斯蛋糕</span>
                       <div className="bg-orange-100 text-orange-500 text-[9px] px-1.5 py-0.5 rounded font-black">集</div>
                    </div>
                    <span className="text-sm font-black text-black">¥ 19.90</span>
                 </div>
                 <div className="flex justify-between mt-2">
                    <span className="text-[11px] text-gray-400 font-bold">3寸</span>
                    <span className="text-[11px] text-gray-400 font-bold">x1</span>
                 </div>
              </div>
           </div>

           <div className="flex justify-between py-5 border-t border-gray-50">
              <span className="text-sm font-bold text-gray-800">集章</span>
              <span className="text-[11px] text-gray-500 font-medium">本单将获得 <span className="text-orange-500 font-black">1</span> 个集章</span>
           </div>

           <div className="flex justify-between py-5 border-t border-gray-50 active:bg-gray-50 transition-colors">
              <span className="text-sm font-bold text-gray-800">使用券</span>
              <div className="flex items-center gap-1 text-[11px] text-gray-400 font-medium">
                 无可用券 <ChevronRight size={14} />
              </div>
           </div>

           <div className="flex justify-end pt-2">
              <span className="text-sm text-gray-400 mr-2 font-bold">小计</span>
              <span className="font-black text-xl">¥ 19.90</span>
           </div>
        </div>

        {/* Top Up Promotion */}
        <div className="space-y-4 pt-2">
            <h4 className="text-sm font-black px-1">充值更划算</h4>
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
                <div 
                  onClick={() => setSelectedRecharge(0)}
                  className={`min-w-[140px] bg-white p-5 rounded-[24px] border-2 transition-all relative shadow-sm overflow-hidden ${selectedRecharge === 0 ? 'border-[#f7e28b] bg-[#f7e28b]/5' : 'border-transparent'}`}
                >
                    <span className="absolute top-0 left-0 bg-[#f7e28b] text-[9px] font-black px-2 py-1 rounded-br-2xl">免单</span>
                    <div className="text-center py-4">
                        <div className="text-2xl font-black">60元</div>
                        <div className="text-[11px] text-gray-400 font-bold mt-1">充值3倍</div>
                    </div>
                    {selectedRecharge === 0 && <div className="absolute bottom-2 right-2 text-[#f7e28b]"><CheckCircle2 size={16} /></div>}
                </div>
                <div 
                  onClick={() => setSelectedRecharge(1)}
                  className={`min-w-[140px] bg-white p-5 rounded-[24px] border-2 transition-all shadow-sm ${selectedRecharge === 1 ? 'border-[#f7e28b] bg-[#f7e28b]/5' : 'border-transparent'}`}
                >
                    <div className="text-center py-4">
                        <div className="text-2xl font-black">20.00元</div>
                    </div>
                </div>
                <div 
                  onClick={() => setSelectedRecharge(2)}
                  className={`min-w-[140px] bg-white p-5 rounded-[24px] border-2 transition-all shadow-sm ${selectedRecharge === 2 ? 'border-[#f7e28b] bg-[#f7e28b]/5' : 'border-transparent'}`}
                >
                    <div className="text-center py-4">
                        <div className="text-2xl font-black">30.00元</div>
                    </div>
                </div>
            </div>
        </div>

        {/* Payment Options */}
        <div className="bg-white p-5 rounded-[24px] shadow-sm">
           <h4 className="text-sm font-black mb-6">支付方式</h4>
           <div className="space-y-6">
              <button onClick={() => setPaymentType('wechat')} className="w-full flex items-center justify-between group">
                 <div className="flex items-center gap-4">
                    <div className="bg-green-500 text-white p-1 rounded-full"><Check size={14} strokeWidth={4} /></div>
                    <span className="text-sm font-bold text-gray-800">微信支付</span>
                 </div>
                 <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${paymentType === 'wechat' ? 'border-[#f7e28b] bg-[#f7e28b]' : 'border-gray-200'}`}>
                    {paymentType === 'wechat' && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>}
                 </div>
              </button>
              <button onClick={() => setPaymentType('balance')} className="w-full flex items-center justify-between opacity-50 cursor-not-allowed">
                 <div className="flex items-center gap-4">
                    <div className="bg-gray-300 text-white p-1 rounded-full"><Check size={14} strokeWidth={4} /></div>
                    <span className="text-sm font-bold text-gray-800">余额支付</span>
                    <span className="text-[10px] text-gray-400 font-bold">余额: ¥0.00</span>
                 </div>
                 <div className={`w-5 h-5 rounded-full border-2 border-gray-100`}></div>
              </button>
           </div>
        </div>
      </div>

      {/* Footer Confirm Bar */}
      <div className="fixed bottom-0 inset-x-0 p-5 bg-white shadow-up flex items-center justify-between z-[60] pb-8">
         <div className="flex items-baseline gap-2">
            <span className="text-[11px] text-gray-400 font-black">共计</span>
            <span className="text-2xl font-black text-[#d4b945]">¥ 19.90</span>
         </div>
         <button onClick={handleConfirmOrder} className="bg-[#f7e28b] px-12 py-4 rounded-full font-black text-base shadow-xl shadow-brand-yellow/30 active:scale-95 transition-all">
            确认下单
         </button>
      </div>

      {/* Payment Processing Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/60 z-[200] flex items-center justify-center p-8 backdrop-blur-md">
           <div className="bg-white w-full max-w-[320px] rounded-[40px] p-10 flex flex-col items-center relative animate-in zoom-in-95 duration-300 shadow-2xl">
              <button onClick={() => setShowPaymentModal(false)} className="absolute top-6 right-6 text-gray-300 hover:text-gray-500 transition-colors"><X size={24} /></button>
              <div className="bg-[#F8F8F8] p-8 rounded-3xl mb-10 border border-gray-50">
                 <Phone size={80} strokeWidth={1} className="text-gray-400" />
              </div>
              <p className="text-center font-black text-lg leading-relaxed text-gray-800">
                 订单支付请求已发送到手机，需在手机上完成支付。
              </p>
              <button onClick={() => setShowPaymentModal(false)} className="mt-12 text-[#4c6ef5] font-black hover:opacity-80 transition-opacity">
                 取消
              </button>
           </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
