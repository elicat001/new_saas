
import React, { useState, useEffect } from 'react';
import { ChevronLeft, RefreshCw, CheckCircle2, Clock, Store, Package, Loader2 } from 'lucide-react';
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

  useEffect(() => {
    if (!orderId) return;

    let pollCount = 0;
    const maxPolls = 4;
    let timer: any;

    const poll = async () => {
      try {
        const current = await api.getOrderStatus(orderId);
        setStatus(current);
        setLoading(false);

        // 如果未支付成功且在轮询次数内，继续轮询 (1s, 2s, 4s, 5s)
        if (current === OrderStatus.PENDING_PAY && pollCount < maxPolls) {
          const delays = [1000, 2000, 4000, 5000];
          timer = setTimeout(poll, delays[pollCount]);
          pollCount++;
        }
      } catch (e) {
        console.error('Polling error', e);
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

  const currentIdx = steps.findIndex(s => s.key === status);

  return (
    <div className="bg-[#F8F8F8] min-h-screen flex flex-col pb-40">
      <div className="bg-white px-5 pt-16 pb-4 flex items-center justify-between sticky top-0 z-50 border-b border-gray-50">
        <button onClick={onBack} className="w-10 h-10 bg-gray-50 border border-gray-200 rounded-2xl flex items-center justify-center active-scale">
          <ChevronLeft size={22} />
        </button>
        <span className="font-black text-lg tracking-tight">订单状态</span>
        <div className="w-10"></div>
      </div>

      <div className="bg-white px-8 py-12 mb-4 shadow-sm">
        <div className="flex items-center justify-between mb-12">
           <div>
              <h2 className="text-3xl font-black mb-1">
                {status === OrderStatus.PENDING_PAY ? '正在同步支付...' : '制作中'}
              </h2>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">ID: {orderId}</p>
           </div>
           {loading ? <Loader2 className="animate-spin text-gray-200" /> : <div className="bg-brand/10 p-3 rounded-2xl" style={{ backgroundColor: store.theme.primary + '33' }}><Store className="text-brand" style={{ color: store.theme.secondary }} /></div>}
        </div>

        <div className="flex items-start justify-between relative px-2">
          <div className="absolute top-4 left-6 right-6 h-[2.5px] bg-gray-100"></div>
          <div className="absolute top-4 left-6 h-[2.5px] bg-brand transition-all duration-1000" style={{ width: `${(currentIdx / 3) * 88}%`, backgroundColor: store.theme.primary }}></div>

          {steps.map((step, idx) => {
            const active = idx <= currentIdx;
            return (
              <div key={idx} className="flex flex-col items-center relative z-10 w-16">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center border-4 transition-all ${active ? 'bg-brand border-white shadow-lg scale-110' : 'bg-white border-gray-100 text-gray-200'}`} style={active ? { backgroundColor: store.theme.primary } : {}}>
                  {step.icon}
                </div>
                <span className={`text-[9px] font-black mt-3 uppercase tracking-tighter ${active ? 'text-black' : 'text-gray-300'}`}>{step.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="px-5">
        <div className="bg-white rounded-[32px] p-8 flex flex-col items-center border border-gray-50 shadow-sm">
           <div className="text-[10px] text-gray-300 font-black uppercase tracking-[0.3em] mb-2">Queue Number</div>
           <div className="text-6xl font-black mb-8" style={{ color: store.theme.secondary }}>B108</div>
           <p className="text-xs text-gray-400 font-bold mb-10 text-center leading-relaxed">请关注门店叫号大屏，<br/>凭此号至取餐柜领餐。</p>
           <button onClick={onBack} className="w-full py-4 rounded-[16px] border border-gray-100 text-xs font-black text-gray-400 active:bg-gray-50 transition-all uppercase tracking-widest">返回首页</button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
