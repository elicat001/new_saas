
import React, { useState } from 'react';
import { ChevronLeft, Info, Headset, RefreshCw, X, AlertCircle, Check, Store, Clock, Package, CheckCircle2 } from 'lucide-react';
import { MerchantConfig } from '../types';

interface OrderDetailProps {
  onBack: () => void;
  orderId: string | null;
  merchant: MerchantConfig;
}

const OrderDetail: React.FC<OrderDetailProps> = ({ onBack, orderId, merchant }) => {
  const [isCancelled, setIsCancelled] = useState(false); 
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  
  // SaaS: Track the current step of the order (0: Placed, 1: Preparing, 2: Ready, 3: Completed)
  const [currentStep] = useState(1);

  const steps = [
    { label: '已下单', icon: <Clock size={14} /> },
    { label: '制作中', icon: <Store size={14} /> },
    { label: '待自取', icon: <Package size={14} /> },
    { label: '已完成', icon: <CheckCircle2 size={14} /> }
  ];

  const handleCancelOrder = () => {
    setIsCancelled(true);
    setShowCancelConfirm(false);
  };

  return (
    <div className="bg-[#F8F8F8] min-h-full flex flex-col pb-40 relative">
      {/* Header */}
      <div className="bg-white px-5 pt-16 pb-4 flex items-center justify-between sticky top-0 z-50 border-b border-gray-50">
        <button onClick={onBack} className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center active-scale transition-transform">
          <ChevronLeft size={22} />
        </button>
        <span className="font-black text-lg tracking-tight">订单详情</span>
        <div className="w-10"></div>
      </div>

      {/* Enhanced Status Section with Progress Tracker */}
      <div className="bg-white px-6 py-10 mb-4 shadow-sm">
        {isCancelled ? (
          <div className="flex flex-col items-center py-4">
             <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <X className="text-gray-300" size={32} />
             </div>
             <h2 className="text-3xl font-black text-gray-300 mb-1">订单已取消</h2>
             <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">交易已关闭</p>
          </div>
        ) : (
          <div className="w-full">
            <div className="flex items-center justify-between mb-10">
               <div>
                  <h2 className="text-3xl font-black text-black mb-1">{steps[currentStep].label}</h2>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">预计还需 15-20 分钟</p>
               </div>
               <div className="bg-brand/10 p-3 rounded-2xl">
                 <Store className="text-brand" size={24} />
               </div>
            </div>

            {/* Stepper Implementation */}
            <div className="flex items-start justify-between relative px-2">
              {/* Connecting Background Line */}
              <div className="absolute top-4 left-6 right-6 h-[2px] bg-gray-100 -z-0"></div>
              {/* Active Progress Line */}
              <div 
                className="absolute top-4 left-6 h-[2px] bg-brand -z-0 transition-all duration-1000 ease-out"
                style={{ width: `${(currentStep / (steps.length - 1)) * 88}%` }}
              ></div>

              {steps.map((step, idx) => {
                const isCompleted = idx < currentStep;
                const isActive = idx === currentStep;
                
                return (
                  <div key={idx} className="flex flex-col items-center relative z-10 w-16">
                    <div 
                      className={`w-9 h-9 rounded-full flex items-center justify-center border-4 transition-all duration-500 ${
                        isCompleted ? 'bg-brand border-white shadow-md' : 
                        isActive ? 'bg-white border-brand shadow-lg scale-110' : 
                        'bg-white border-gray-100 text-gray-200'
                      }`}
                    >
                      {isCompleted ? <Check size={16} strokeWidth={4} /> : step.icon}
                    </div>
                    <span className={`text-[9px] font-black mt-3 uppercase tracking-tighter whitespace-nowrap ${
                      isActive ? 'text-black' : 'text-gray-300'
                    }`}>
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Order Main Card */}
      <div className="px-5 mb-4">
        <div className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-gray-50">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-300 font-black uppercase tracking-widest mb-1">取餐号</span>
              <span className={`text-3xl font-black transition-colors ${isCancelled ? 'text-gray-200' : 'text-brand'}`}>{orderId || '8085'}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-gray-300 font-black block mb-1">点餐模式</span>
              <span className={`text-sm font-black transition-colors ${isCancelled ? 'text-gray-300' : 'text-black'}`}>
                堂食·即时
              </span>
            </div>
          </div>
          
          <div className={`p-6 transition-all duration-700 ${isCancelled ? 'grayscale opacity-60' : ''}`}>
            <div className="flex justify-between items-center mb-6">
                <div className="text-sm font-black text-gray-800">商品清单 (50份)</div>
                <div className="text-[10px] font-black text-gray-300 uppercase">已支付 ¥2445.00</div>
            </div>
            
            <div className="flex gap-5 mb-8">
              <img src="https://images.unsplash.com/photo-1551024506-0bccd828d307?w=300&h=300&fit=crop" className="w-20 h-20 rounded-[24px] object-cover shadow-md" />
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-[15px] font-black leading-tight text-gray-800 line-clamp-2">(到店) 甜品自助甜品周末不限时</h4>
                  <span className="text-[15px] font-black ml-2">¥2445.00</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-[11px] text-gray-400 font-bold">1人份</span>
                  <span className="text-[11px] text-gray-400 font-black">x50</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end items-baseline gap-2 mb-8 border-t border-gray-50 pt-6">
               <span className="text-xs text-gray-400 font-bold">实付总计</span>
               <span className="text-3xl font-black text-black">¥2445.00</span>
            </div>

            <button className="w-full flex items-center justify-center gap-2 py-4 border border-gray-100 rounded-2xl text-xs font-black text-gray-400 active:bg-gray-50 transition-colors">
               <Headset size={18} />
               联系门店客服
            </button>
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div className="px-5 mb-32">
        <div className="bg-white rounded-[32px] p-8 space-y-6 shadow-sm border border-gray-50">
          <h4 className="text-[10px] font-black text-gray-300 uppercase tracking-widest border-b border-gray-50 pb-3">订单信息</h4>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400 font-bold">订单编号</span>
            <span className="font-black text-gray-800">2025111917454332274</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400 font-bold">下单时间</span>
            <span className="font-black text-gray-800">2025-11-19 17:45:43</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400 font-bold">下单门店</span>
            <span className="font-black text-gray-800">{merchant.name}（深圳总店）</span>
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="fixed bottom-0 inset-x-0 p-6 bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.05)] flex gap-4 z-50 pb-10">
        {!isCancelled ? (
          <>
            <button 
              onClick={() => setShowCancelConfirm(true)}
              className="px-6 py-5 rounded-[24px] font-black text-xs text-red-500 border border-red-100 bg-red-50/50 active:bg-red-50 transition-colors tracking-widest uppercase"
            >
              取消订单
            </button>
            <button 
              className="flex-1 py-5 rounded-[24px] font-black text-lg bg-brand text-black shadow-xl shadow-brand-yellow/30 active:scale-95 flex items-center justify-center gap-2 transition-all"
              style={{ backgroundColor: merchant.theme.primary }}
            >
              <RefreshCw size={18} />
              再来一单
            </button>
          </>
        ) : (
          <>
            <button 
              onClick={onBack} 
              className="flex-1 bg-gray-100 py-5 rounded-[24px] font-black text-gray-400 active:bg-gray-200 transition-colors"
            >
              返回首页
            </button>
            <button 
              className="flex-1 py-5 rounded-[24px] font-black text-lg bg-brand text-black shadow-xl shadow-brand-yellow/30 active:scale-95 flex items-center justify-center gap-2 transition-all"
              style={{ backgroundColor: merchant.theme.primary }}
            >
              <RefreshCw size={18} />
              重新下单
            </button>
          </>
        )}
      </div>

      {/* Cancellation Confirmation Modal */}
      {showCancelConfirm && (
        <div className="fixed inset-0 bg-black/70 z-[600] flex items-center justify-center p-8 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-[340px] rounded-[48px] p-10 flex flex-col items-center relative animate-in zoom-in-95 duration-300 shadow-2xl">
            <button onClick={() => setShowCancelConfirm(false)} className="absolute top-8 right-8 text-gray-300 hover:text-gray-500 transition-colors">
              <X size={24} />
            </button>
            
            <div className="w-20 h-20 rounded-[32px] bg-red-50 flex items-center justify-center mb-8">
               <AlertCircle size={40} className="text-red-500" />
            </div>
            
            <h3 className="text-2xl font-black text-black mb-3">取消订单？</h3>
            <p className="text-center text-sm font-medium text-gray-400 leading-relaxed mb-10">
              商家已开始准备您的餐点，<br/>此时取消可能产生部分费用。
            </p>
            
            <div className="flex flex-col gap-4 w-full">
               <button 
                 onClick={handleCancelOrder}
                 className="w-full bg-black py-5 rounded-[24px] text-white font-black text-sm active:scale-95 transition-all shadow-lg"
               >
                 确定取消
               </button>
               <button 
                 onClick={() => setShowCancelConfirm(false)}
                 className="w-full py-4 rounded-[24px] text-gray-300 font-black text-xs tracking-widest uppercase hover:text-gray-500 transition-colors"
               >
                 我再想想
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetail;
