
import React, { useState, useEffect } from 'react';
import { ChevronLeft, RefreshCw, CheckCircle2, Clock, Store, Package, AlertCircle } from 'lucide-react';
import { StoreContext, OrderStatus } from '../types';
import { api } from '../api';

interface OrderDetailProps {
  onBack: () => void;
  orderId: string | null;
  store: StoreContext;
}

const OrderDetail: React.FC<OrderDetailProps> = ({ onBack, orderId, store }) => {
  const [status, setStatus] = useState<OrderStatus>(OrderStatus.PENDING_PAY);
  const [loading, setLoading] = useState(true);

  // 指数退避轮询逻辑
  useEffect(() => {
    if (!orderId) return;

    let pollCount = 0;
    const maxPolls = 5;
    // Fix: Use any to avoid NodeJS vs browser setTimeout type conflicts
    let timer: any;

    const poll = async () => {
      try {
        const newStatus = await api.getOrderStatus(orderId);
        setStatus(newStatus);
        setLoading(false);

        // 如果未支付成功且未达到最大尝试次数，继续轮询
        if (newStatus === OrderStatus.PENDING_PAY && pollCount < maxPolls) {
          const delay = Math.pow(2, pollCount) * 1000; // 1s, 2s, 4s, 8s...
          pollCount++;
          timer = setTimeout(poll, Math.min(delay, 8000));
        }
      } catch (err) {
        console.error("轮询失败", err);
      }
    };

    poll();
    return () => clearTimeout(timer);
  }, [orderId]);

  const steps = [
    { label: '已下单', key: OrderStatus.PENDING_PAY, icon: <Clock size={14} /> },
    { label: '制作中', key: OrderStatus.PREPARING, icon: <Store size={14} /> },
    { label: '待自取', key: OrderStatus.READY, icon: <Package size={14} /> },
    { label: '已完成', key: OrderStatus.COMPLETED, icon: <CheckCircle2 size={14} /> }
  ];

  const currentStepIndex = steps.findIndex(s => s.key === status) || 0;

  return (
    <div className="bg-[#F8F8F8] min-h-screen flex flex-col pb-40 relative">
      <div className="bg-white px-5 pt-16 pb-4 flex items-center justify-between sticky top-0 z-50 border-b border-gray-50">
        <button onClick={onBack} className="w-10 h-10 bg-gray-50 border border-gray-200 rounded-[16px] flex items-center justify-center active-scale transition-all">
          <ChevronLeft size={22} />
        </button>
        <span className="font-black text-lg tracking-tight">订单详情</span>
        <div className="w-10"></div>
      </div>

      <div className="bg-white px-6 py-10 mb-4 shadow-sm">
        <div className="flex items-center justify-between mb-10">
           <div>
              <h2 className="text-3xl font-black text-black mb-1">
                {status === OrderStatus.PENDING_PAY ? '正在同步支付状态...' : '订单处理中'}
              </h2>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                订单编号: {orderId}
              </p>
           </div>
           {loading && <RefreshCw className="animate-spin text-brand" size={24} />}
        </div>

        {/* Stepper */}
        <div className="flex items-start justify-between relative px-2">
          <div className="absolute top-4 left-6 right-6 h-[2px] bg-gray-100 -z-0"></div>
          <div className="absolute top-4 left-6 h-[2px] bg-brand -z-0 transition-all duration-1000" style={{ width: `${(currentStepIndex / 3) * 85}%` }}></div>

          {steps.map((step, idx) => {
            const isCompleted = idx <= currentStepIndex;
            return (
              <div key={idx} className="flex flex-col items-center relative z-10 w-16">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center border-4 transition-all ${isCompleted ? 'bg-brand border-white shadow-md' : 'bg-white border-gray-100 text-gray-200'}`}>
                  {step.icon}
                </div>
                <span className={`text-[9px] font-black mt-3 whitespace-nowrap ${isCompleted ? 'text-black' : 'text-gray-300'}`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="px-5">
        <div className="bg-white rounded-[32px] p-8 border border-gray-50 flex flex-col items-center">
           <AlertCircle size={40} className="text-gray-100 mb-4" />
           <p className="text-sm text-gray-400 font-bold mb-6">制作完成后将通过小程序通知您</p>
           <button 
             onClick={onBack}
             className="w-full py-4 rounded-[24px] border border-[var(--brand-secondary)] bg-brand font-black active-scale"
           >
             返回首页
           </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
