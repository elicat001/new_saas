
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Phone, CheckCircle2 } from 'lucide-react';

interface CheckoutProps {
  onBack: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ onBack }) => {
  const [paymentType, setPaymentType] = useState<'wechat' | 'balance'>('wechat');
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleConfirmOrder = () => {
    setShowPaymentModal(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col pb-24">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <button onClick={onBack} className="p-2 -ml-2"><ChevronLeft size={24} /></button>
        <span className="font-bold">确认订单</span>
        <div className="w-8"></div>
      </div>

      <div className="p-4 space-y-4">
        {/* Order Type Tabs */}
        <div className="flex bg-[#f7e28b]/20 p-1.5 rounded-xl">
           {['堂食', '配送', '快递'].map(t => (
             <button key={t} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${t === '堂食' ? 'bg-[#f7e28b] text-gray-800' : 'text-gray-400'}`}>
               {t}
             </button>
           ))}
        </div>

        {/* Shop Info Card */}
        <div className="bg-white p-4 rounded-2xl shadow-sm">
           <h3 className="font-bold text-lg mb-4">棠小一</h3>
           <div className="flex items-center justify-between py-4 border-t border-gray-50">
              <span className="text-sm text-gray-800">订单备注</span>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                 要求、偏好 <ChevronRight size={14} />
              </div>
           </div>
        </div>

        {/* Items Card */}
        <div className="bg-white p-4 rounded-2xl shadow-sm space-y-6">
           <h3 className="font-bold">共 1 份商品</h3>
           <div className="flex gap-4">
              <img src="https://picsum.photos/seed/product4/200/200" className="w-16 h-16 rounded-lg object-cover" />
              <div className="flex-1">
                 <div className="flex justify-between items-start">
                    <div className="flex items-center gap-1">
                       <span className="text-sm font-bold">红丝绒芒果慕斯蛋糕</span>
                       <span className="bg-orange-100 text-orange-500 text-[8px] px-1 rounded">集</span>
                    </div>
                    <span className="text-sm font-bold">¥ 19.90</span>
                 </div>
                 <div className="flex justify-between mt-1">
                    <span className="text-xs text-gray-400">3寸</span>
                    <span className="text-xs text-gray-400">x1</span>
                 </div>
              </div>
           </div>

           <div className="flex justify-between py-4 border-t border-gray-50">
              <span className="text-sm font-bold">集章</span>
              <span className="text-xs text-gray-500">本单将获得 <span className="text-orange-500 font-bold">1</span> 个集章</span>
           </div>

           <div className="flex justify-between py-4 border-t border-gray-50">
              <span className="text-sm font-bold">使用券</span>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                 无可用券 <ChevronRight size={14} />
              </div>
           </div>

           <div className="flex justify-end pt-4 border-t border-gray-50">
              <span className="text-sm text-gray-400 mr-2">小计</span>
              <span className="font-bold text-lg">¥ 19.90</span>
           </div>
        </div>

        {/* Top Up Promotion */}
        <div className="space-y-3">
            <h4 className="text-sm font-bold">充值更划算</h4>
            <div className="flex gap-3 overflow-x-auto scrollbar-hide">
                <div className="min-w-[140px] bg-white p-4 rounded-2xl border-2 border-transparent relative shadow-sm overflow-hidden">
                    <span className="absolute top-0 left-0 bg-[#f7e28b] text-[8px] font-bold px-1.5 py-0.5 rounded-br-lg">免单</span>
                    <div className="text-center py-4">
                        <div className="text-lg font-bold">60元</div>
                        <div className="text-[10px] text-gray-400">充值3倍</div>
                    </div>
                </div>
                <div className="min-w-[140px] bg-white p-4 rounded-2xl shadow-sm border-2 border-transparent">
                    <div className="text-center py-4">
                        <div className="text-lg font-bold">20.00元</div>
                    </div>
                </div>
                <div className="min-w-[140px] bg-white p-4 rounded-2xl shadow-sm border-2 border-transparent">
                    <div className="text-center py-4">
                        <div className="text-lg font-bold">30.00元</div>
                    </div>
                </div>
            </div>
        </div>

        {/* Payment Options */}
        <div className="bg-white p-4 rounded-2xl shadow-sm">
           <h4 className="text-sm font-bold mb-4">支付方式</h4>
           <div className="space-y-4">
              <button onClick={() => setPaymentType('wechat')} className="w-full flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <div className="bg-green-500 text-white p-1 rounded-full"><CheckCircle2 size={16} /></div>
                    <span className="text-sm">微信支付</span>
                 </div>
                 <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentType === 'wechat' ? 'border-[#f7e28b] bg-[#f7e28b]' : 'border-gray-200'}`}>
                    {paymentType === 'wechat' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                 </div>
              </button>
              <button onClick={() => setPaymentType('balance')} className="w-full flex items-center justify-between opacity-50">
                 <div className="flex items-center gap-3">
                    <div className="bg-gray-300 text-white p-1 rounded-full"><CheckCircle2 size={16} /></div>
                    <span className="text-sm">余额支付</span>
                    <span className="text-[10px] text-gray-400">余额: ¥0.00</span>
                 </div>
                 <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center border-gray-200`}>
                 </div>
              </button>
           </div>
        </div>
      </div>

      {/* Footer Confirm Bar */}
      <div className="fixed bottom-0 inset-x-0 p-4 bg-white shadow-up flex items-center justify-between z-40">
         <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">共计</span>
            <span className="text-xl font-bold text-[#f7e28b]">¥ 19.90</span>
         </div>
         <button onClick={handleConfirmOrder} className="bg-[#f7e28b] px-10 py-3.5 rounded-full font-bold shadow-sm">
            确认下单
         </button>
      </div>

      {/* Payment Processing Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-8">
           <div className="bg-white w-full rounded-3xl p-10 flex flex-col items-center relative animate-in zoom-in-95 duration-200">
              <button onClick={() => setShowPaymentModal(false)} className="absolute top-4 right-4 text-gray-400"><X size={24} /></button>
              <div className="bg-gray-100 p-6 rounded-2xl mb-8">
                 <Phone size={64} className="text-gray-400" />
              </div>
              <p className="text-center font-bold text-lg leading-relaxed px-4">
                 订单支付请求已发送到手机，需在手机上完成支付。
              </p>
              <button onClick={() => setShowPaymentModal(false)} className="mt-12 text-[#4c6ef5] font-bold">
                 取消
              </button>
           </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
