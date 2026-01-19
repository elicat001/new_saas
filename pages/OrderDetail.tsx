
import React from 'react';
import { ChevronLeft, Info, Headset, RefreshCw } from 'lucide-react';
// Added MerchantConfig import
import { MerchantConfig } from '../types';

interface OrderDetailProps {
  onBack: () => void;
  orderId: string | null;
  // Added merchant prop
  merchant: MerchantConfig;
}

// Updated component signature to accept merchant prop
const OrderDetail: React.FC<OrderDetailProps> = ({ onBack, orderId, merchant }) => {
  // Mocking status check - in a real app this would come from a prop or API
  const isCancelled = true; 

  return (
    <div className="bg-[#F8F8F8] min-h-full flex flex-col pb-40">
      {/* Header */}
      <div className="bg-white px-5 pt-16 pb-4 flex items-center justify-between sticky top-0 z-50 border-b border-gray-50">
        <button onClick={onBack} className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center active:scale-90 transition-transform">
          <ChevronLeft size={22} />
        </button>
        <span className="font-black text-lg tracking-tight">订单详情</span>
        <div className="w-10"></div>
      </div>

      {/* Status Section */}
      <div className="px-4 py-12 flex flex-col items-center justify-center bg-white mb-4 shadow-sm">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-5 ${isCancelled ? 'bg-gray-100' : 'bg-[#f7e28b]/20'}`}>
           <Info className={isCancelled ? 'text-gray-300' : 'text-[#d4b945]'} size={32} />
        </div>
        <h2 className={`text-4xl font-black mb-3 ${isCancelled ? 'text-gray-300' : 'text-black'}`}>
          {isCancelled ? '已取消' : '订单已完成'}
        </h2>
        <p className="text-xs text-gray-400 font-bold tracking-widest uppercase">Ordered at 2025-11-19 17:45:43</p>
      </div>

      {/* Order Main Card */}
      <div className="px-5 mb-4">
        <div className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-gray-50">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-300 font-black uppercase tracking-widest mb-1">Queue ID</span>
              <span className="text-3xl font-black text-[#d4b945]">{orderId || '8085'}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-gray-300 font-black block mb-1">Status</span>
              <span className={`text-sm font-black ${isCancelled ? 'text-gray-300' : 'text-black'}`}>
                {isCancelled ? '订单失效' : '正在出餐'}
              </span>
            </div>
          </div>
          
          {/* Product Section - Grayscale if cancelled */}
          <div className={`p-6 ${isCancelled ? 'grayscale opacity-60' : ''}`}>
            <div className="flex justify-between items-center mb-6">
                <div className="text-sm font-black text-gray-800">商品清单 (50份)</div>
                <div className="text-[10px] font-black text-gray-300 uppercase">Unpaid</div>
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
          <h4 className="text-[10px] font-black text-gray-300 uppercase tracking-widest border-b border-gray-50 pb-3">Order Info</h4>
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
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400 font-bold">订单类型</span>
            <span className="font-black text-gray-800">堂食</span>
          </div>
        </div>
      </div>

      {/* Footer Buttons - Reorder disabled if cancelled */}
      <div className="fixed bottom-0 inset-x-0 p-6 bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.05)] flex gap-4 z-50 pb-10">
        <button 
          onClick={onBack} 
          className="flex-1 bg-gray-100 py-5 rounded-[24px] font-black text-gray-400 active:bg-gray-200 transition-colors"
        >
          返回首页
        </button>
        <button 
          disabled={isCancelled}
          className={`flex-1 py-5 rounded-[24px] font-black text-lg shadow-2xl transition-all flex items-center justify-center gap-2 ${
            isCancelled 
            ? 'bg-gray-50 text-gray-200 cursor-not-allowed shadow-none' 
            : 'bg-[#f7e28b] text-black shadow-brand-yellow/30 active:scale-95'
          }`}
        >
          <RefreshCw size={18} />
          再来一单
        </button>
      </div>
    </div>
  );
};

export default OrderDetail;
