
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Phone, CheckCircle2, Check, ShieldCheck, Wallet } from 'lucide-react';

interface CheckoutProps {
  onBack: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ onBack }) => {
  const [paymentType, setPaymentType] = useState<'wechat' | 'balance'>('wechat');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedRecharge, setSelectedRecharge] = useState<number | null>(null);

  const handleConfirmOrder = () => {
    setShowPaymentModal(true);
  };

  return (
    <div className="bg-[#F8F8F8] min-h-screen flex flex-col pb-40">
      {/* Header */}
      <div className="bg-white px-5 pt-16 pb-4 flex items-center justify-between sticky top-0 z-50 border-b border-gray-50">
        <button onClick={onBack} className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center active:scale-90 transition-transform"><ChevronLeft size={22} /></button>
        <span className="font-black text-lg tracking-tight">确认订单</span>
        <div className="w-10"></div>
      </div>

      <div className="p-5 space-y-5">
        {/* Order Type Tabs */}
        <div className="flex bg-[#F2F2F2] p-1.5 rounded-[24px]">
           {['堂食', '配送', '快递'].map(t => (
             <button 
               key={t} 
               className={`flex-1 py-3.5 rounded-[18px] text-[13px] font-black transition-all ${t === '堂食' ? 'bg-white text-black shadow-[0_4px_15px_rgba(0,0,0,0.05)]' : 'text-gray-400'}`}
             >
               {t}
             </button>
           ))}
        </div>

        {/* Shop Info Card */}
        <div className="bg-white p-6 rounded-[32px] shadow-sm">
           <div className="flex items-center gap-2 mb-6">
              <h3 className="font-black text-2xl">棠小一</h3>
              <div className="bg-[#f7e28b]/20 px-2 py-0.5 rounded text-[9px] font-black text-[#d4b945] uppercase">Open</div>
           </div>
           <div className="flex items-center justify-between py-5 border-t border-gray-50 active:bg-gray-50 rounded-2xl px-2 -mx-2 transition-colors">
              <span className="text-sm font-bold text-gray-800">订单备注</span>
              <div className="flex items-center gap-1.5 text-xs text-gray-400 font-bold">
                 添加口味偏好、过敏原说明 <ChevronRight size={14} className="text-gray-200" />
              </div>
           </div>
        </div>

        {/* Items Card */}
        <div className="bg-white p-6 rounded-[32px] shadow-sm space-y-6">
           <h3 className="font-black text-lg flex items-center justify-between">
              <span>商品清单</span>
              <span className="text-xs text-gray-400 font-bold">共 1 份</span>
           </h3>
           <div className="flex gap-5">
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=200&h=200&fit=crop" className="w-20 h-20 rounded-[24px] object-cover shadow-md" />
                <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">1</span>
              </div>
              <div className="flex-1 flex flex-col justify-center">
                 <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                       <span className="text-[15px] font-black leading-none text-gray-800">红丝绒芒果慕斯蛋糕</span>
                       <div className="bg-orange-100 text-orange-500 text-[9px] px-1.5 py-0.5 rounded font-black border border-orange-200/50">特惠</div>
                    </div>
                    <span className="text-[15px] font-black text-black">¥19.90</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1.5">
                       <span className="text-[11px] text-gray-400 font-bold">3寸</span>
                       <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                       <span className="text-[11px] text-gray-400 font-bold">标准甜度</span>
                    </div>
                 </div>
              </div>
           </div>

           <div className="space-y-4 pt-4 border-t border-gray-50">
             <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-gray-800">集章权益</span>
                <span className="text-[11px] text-gray-400 font-bold">下单即获 <span className="text-orange-500 font-black text-sm ml-0.5">1</span> 个集章</span>
             </div>

             <div className="flex justify-between items-center group active:scale-95 transition-transform">
                <span className="text-sm font-bold text-gray-800">优惠券 / 礼品卡</span>
                <div className="flex items-center gap-1.5 text-[11px] text-[#d4b945] font-black">
                   暂无可用 <ChevronRight size={14} className="text-gray-200" />
                </div>
             </div>
           </div>

           <div className="flex justify-end pt-4 border-t border-gray-50">
              <div className="flex flex-col items-end">
                 <div className="flex items-baseline gap-2">
                    <span className="text-[11px] text-gray-400 font-bold">优惠 ¥0.00</span>
                    <span className="text-xs text-gray-400 font-bold">小计</span>
                    <span className="font-black text-2xl text-black">¥19.90</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Top Up Promotion - Authentic Cards */}
        <div className="space-y-4 pt-2">
            <h4 className="text-sm font-black px-1 flex items-center justify-between">
               <span>充值超值购</span>
               <span className="text-[10px] text-gray-400 font-bold">更多金额 <ChevronRight size={10} /></span>
            </h4>
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
                <div 
                  onClick={() => setSelectedRecharge(selectedRecharge === 0 ? null : 0)}
                  className={`min-w-[150px] bg-white p-6 rounded-[32px] border-2 transition-all relative shadow-sm overflow-hidden active:scale-95 ${selectedRecharge === 0 ? 'border-[#f7e28b] bg-[#f7e28b]/5' : 'border-transparent'}`}
                >
                    <span className="absolute top-0 left-0 bg-[#f7e28b] text-[9px] font-black px-3 py-1 rounded-br-2xl uppercase">Limited</span>
                    <div className="text-center py-4">
                        <div className="text-2xl font-black text-black">60.00 <span className="text-xs font-bold">元</span></div>
                        <div className="text-[10px] text-gray-400 font-black mt-2 bg-gray-50 rounded-full py-1">返现 ¥5.00</div>
                    </div>
                    {selectedRecharge === 0 && <div className="absolute bottom-3 right-3 text-[#f7e28b]"><CheckCircle2 size={20} fill="currentColor" className="text-white" /></div>}
                </div>
                <div 
                  onClick={() => setSelectedRecharge(selectedRecharge === 1 ? null : 1)}
                  className={`min-w-[150px] bg-white p-6 rounded-[32px] border-2 transition-all shadow-sm active:scale-95 ${selectedRecharge === 1 ? 'border-[#f7e28b] bg-[#f7e28b]/5' : 'border-transparent'}`}
                >
                    <div className="text-center py-4">
                        <div className="text-2xl font-black text-black">20.00 <span className="text-xs font-bold">元</span></div>
                        <div className="text-[10px] text-gray-400 font-bold mt-2">即刻到账</div>
                    </div>
                    {selectedRecharge === 1 && <div className="absolute bottom-3 right-3 text-[#f7e28b]"><CheckCircle2 size={20} fill="currentColor" className="text-white" /></div>}
                </div>
                <div 
                  onClick={() => setSelectedRecharge(2 ? null : 2)}
                  className={`min-w-[150px] bg-white p-6 rounded-[32px] border-2 transition-all shadow-sm active:scale-95 ${selectedRecharge === 2 ? 'border-[#f7e28b] bg-[#f7e28b]/5' : 'border-transparent'}`}
                >
                    <div className="text-center py-4">
                        <div className="text-2xl font-black text-black">30.00 <span className="text-xs font-bold">元</span></div>
                        <div className="text-[10px] text-gray-400 font-bold mt-2">即刻到账</div>
                    </div>
                </div>
            </div>
        </div>

        {/* Payment Options Refined */}
        <div className="bg-white p-6 rounded-[32px] shadow-sm">
           <h4 className="text-sm font-black mb-6">选择支付方式</h4>
           <div className="space-y-6">
              <button onClick={() => setPaymentType('wechat')} className="w-full flex items-center justify-between group active:scale-[0.98] transition-all">
                 <div className="flex items-center gap-5">
                    <div className="bg-[#07C160] text-white p-1.5 rounded-full shadow-md"><Check size={16} strokeWidth={4} /></div>
                    <div className="flex flex-col items-start">
                       <span className="text-sm font-black text-gray-800">微信支付</span>
                       <span className="text-[9px] text-gray-300 font-bold uppercase tracking-widest">WeChat Pay</span>
                    </div>
                 </div>
                 <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${paymentType === 'wechat' ? 'border-[#f7e28b] bg-[#f7e28b]' : 'border-gray-100'}`}>
                    {paymentType === 'wechat' && <div className="w-3 h-3 bg-white rounded-full"></div>}
                 </div>
              </button>
              
              <button className="w-full flex items-center justify-between opacity-40 cursor-not-allowed">
                 <div className="flex items-center gap-5">
                    <div className="bg-gray-100 text-gray-300 p-1.5 rounded-full"><Wallet size={16} strokeWidth={3} /></div>
                    <div className="flex flex-col items-start">
                       <div className="flex items-center gap-2">
                          <span className="text-sm font-black text-gray-800">余额支付</span>
                          <span className="text-[10px] text-gray-300 font-bold">¥0.00</span>
                       </div>
                       <span className="text-[9px] text-gray-300 font-bold uppercase tracking-widest">Balance Pay</span>
                    </div>
                 </div>
                 <div className={`w-6 h-6 rounded-full border-2 border-gray-50`}></div>
              </button>
           </div>
           
           <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-center gap-2 text-[10px] text-gray-300 font-bold">
              <ShieldCheck size={14} className="text-gray-200" />
              <span>本服务由 微信支付 提供安全支持</span>
           </div>
        </div>
      </div>

      {/* Footer Confirm Bar - Floating & Elegant */}
      <div className="fixed bottom-0 inset-x-0 p-6 bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.05)] flex items-center justify-between z-[60] pb-10">
         <div className="flex flex-col">
            <span className="text-[10px] text-gray-300 font-black uppercase tracking-widest mb-0.5">Total Amount</span>
            <div className="flex items-baseline gap-1.5">
               <span className="text-sm font-black text-[#d4b945]">¥</span>
               <span className="text-3xl font-black text-[#d4b945]">19.90</span>
            </div>
         </div>
         <button onClick={handleConfirmOrder} className="bg-[#f7e28b] px-14 py-5 rounded-[24px] font-black text-lg shadow-2xl shadow-brand-yellow/30 active:scale-95 transition-all">
            立即支付
         </button>
      </div>

      {/* Payment Processing Modal - Clean & Modern */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/70 z-[200] flex items-center justify-center p-8 backdrop-blur-md">
           <div className="bg-white w-full max-w-[340px] rounded-[48px] p-12 flex flex-col items-center relative animate-in zoom-in-95 duration-300 shadow-2xl">
              <button onClick={() => setShowPaymentModal(false)} className="absolute top-8 right-8 text-gray-300 hover:text-gray-500 transition-colors"><X size={24} /></button>
              <div className="bg-[#F8F8F8] p-10 rounded-[36px] mb-12 border border-gray-50 shadow-inner group">
                 <Phone size={80} strokeWidth={1} className="text-gray-300 group-hover:text-gray-400 transition-colors" />
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-ping opacity-20 bg-[#f7e28b] w-20 h-20 rounded-full"></div>
              </div>
              <p className="text-center font-black text-xl leading-tight text-gray-800 mb-2">
                 请求已发送
              </p>
              <p className="text-center text-sm font-medium text-gray-400 leading-relaxed mb-12">
                 请在绑定的手机上<br/>完成支付确认。
              </p>
              <div className="flex flex-col items-center gap-6 w-full">
                 <button onClick={() => setShowPaymentModal(false)} className="w-full bg-gray-50 py-4 rounded-2xl text-gray-400 font-black text-sm active:bg-gray-100 transition-colors">
                   支付遇到问题？
                 </button>
                 <button onClick={() => setShowPaymentModal(false)} className="text-[#4c6ef5] font-black tracking-widest uppercase text-xs active:opacity-60 transition-opacity">
                   Cancel Order
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
