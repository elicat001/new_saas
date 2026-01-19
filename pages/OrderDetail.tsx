
import React from 'react';
import { ChevronLeft, Info, Headset } from 'lucide-react';

interface OrderDetailProps {
  onBack: () => void;
  orderId: string | null;
}

const OrderDetail: React.FC<OrderDetailProps> = ({ onBack, orderId }) => {
  return (
    <div className="bg-gray-50 min-h-full flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <button onClick={onBack} className="p-2 -ml-2"><ChevronLeft size={24} /></button>
        <span className="font-bold">订单详情</span>
        <div className="w-8"></div>
      </div>

      {/* Status Section */}
      <div className="px-4 py-8 flex flex-col items-center justify-center bg-white mb-3">
        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-4">
           <Info className="text-gray-400" />
        </div>
        <h2 className="text-3xl font-bold mb-2">已取消</h2>
        <p className="text-sm text-gray-400">下单时间 2025-11-19 17:45:43</p>
      </div>

      {/* Order Main Card */}
      <div className="px-4 mb-3">
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
          <div className="p-4 border-b border-gray-50 flex justify-between items-center">
            <span className="font-bold">取单号</span>
            <span className="text-2xl font-bold">{orderId || '8085'}</span>
          </div>
          
          <div className="p-4">
            <div className="flex justify-between mb-4">
                <div className="text-sm font-bold">共 50 份商品</div>
                <div className="text-sm text-gray-300">未支付</div>
            </div>
            
            <div className="flex gap-4 mb-6">
              <img src="https://picsum.photos/seed/order-item/200/200" className="w-16 h-16 rounded-lg object-cover" />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="text-sm font-bold">(到店) 甜品自助甜品周末...</h4>
                  <span className="text-sm font-medium">¥ 2445.00</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-400">1人份</span>
                  <span className="text-xs text-gray-400">x50</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end items-center gap-1 mb-6">
               <span className="text-sm text-gray-400">总计</span>
               <span className="text-xl font-bold">¥ 2445.00</span>
            </div>

            <button className="w-full flex items-center justify-center gap-2 py-3 border border-gray-100 rounded-xl text-sm font-medium">
               <Headset size={18} />
               联系客服
            </button>
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div className="px-4 mb-20">
        <div className="bg-white rounded-2xl p-4 space-y-4 shadow-sm">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">订单编号</span>
            <span className="font-medium text-gray-800">2025111917454332274</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">下单时间</span>
            <span className="font-medium text-gray-800">2025-11-19 17:45:43</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">下单门店</span>
            <span className="font-medium text-gray-800">棠小一</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">订单类型</span>
            <span className="font-medium text-gray-800">堂食</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">取单号</span>
            <span className="font-medium text-gray-800">{orderId || '8085'}</span>
          </div>
        </div>
      </div>

      {/* Footer Button */}
      <div className="fixed bottom-0 inset-x-0 p-4 bg-white shadow-up">
        <button onClick={onBack} className="w-full bg-[#f7e28b] py-4 rounded-full font-bold text-gray-800">
          返回首页
        </button>
      </div>
    </div>
  );
};

export default OrderDetail;
