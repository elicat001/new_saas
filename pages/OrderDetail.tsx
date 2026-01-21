
import React, { useState, useEffect, useMemo } from 'react';
import { 
  ChevronLeft, 
  Store, 
  Package, 
  Loader2, 
  Phone, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  ChevronRight,
  ArrowRight,
  Receipt
} from 'lucide-react';
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
  const [estimatedTime, setEstimatedTime] = useState(12); // 模拟预计分钟

  // 1. 智能轮询引擎
  useEffect(() => {
    if (!orderId) return;

    let pollCount = 0;
    let timer: any;

    const poll = async () => {
      try {
        const current = await api.getOrderStatus(orderId);
        setStatus(current);
        setLoading(false);

        // 如果未完成且未超时，根据当前状态调整频率
        const isFinal = current === OrderStatus.COMPLETED || current === OrderStatus.CANCELLED;
        if (!isFinal && pollCount < 20) {
          // 如果正在制作中，频率稍慢；如果是待取餐，频率加快
          const interval = current === OrderStatus.READY ? 3000 : 5000;
          timer = setTimeout(poll, interval);
          pollCount++;
        }
      } catch (e) {
        console.error('Polling sync failed', e);
        timer = setTimeout(poll, 8000); // 错误降级
      }
    };

    poll();
    return () => clearTimeout(timer);
  }, [orderId]);

  // 2. 状态映射配置
  const statusConfig = useMemo(() => {
    const steps = [
      { label: '已下单', key: OrderStatus.PENDING_PAY, icon: Clock },
      { label: '制作中', key: OrderStatus.PREPARING, icon: Store },
      { label: '待自取', key: OrderStatus.READY, icon: Package },
      { label: '已完成', key: OrderStatus.COMPLETED, icon: CheckCircle2 }
    ];

    const currentIdx = steps.findIndex(s => s.key === status);
    
    return {
      steps,
      currentIdx,
      title: status === OrderStatus.READY ? '美食已就绪' : status === OrderStatus.COMPLETED ? '订单已完成' : '后厨制作中',
      subtitle: status === OrderStatus.READY ? '请尽快前往取餐区领取' : '大师正在用心准备您的美食',
      progress: ((currentIdx + 1) / steps.length) * 100
    };
  }, [status]);

  // 3. 模拟订单内容 (实际应从 API 获取)
  const orderItems = [
    { name: '半条梦龙蛋糕', qty: 1, price: 38.9 },
    { name: '冰拿铁 (无糖)', qty: 1, price: 28.0 }
  ];

  return (
    <div className="bg-[#F6F7F9] min-h-screen flex flex-col pb-20 animate-in fade-in duration-700">
      {/* 沉浸式动态顶栏 */}
      <header className="px-6 pt-16 pb-12 relative overflow-hidden transition-colors duration-1000" style={{ backgroundColor: status === OrderStatus.READY ? 'var(--brand-primary)' : '#FFF' }}>
        <div className="flex items-center justify-between relative z-10 mb-8">
          <button onClick={onBack} className="w-10 h-10 bg-white/50 backdrop-blur-md rounded-2xl flex items-center justify-center active-scale border border-black/5">
            <ChevronLeft size={20} />
          </button>
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Order Tracking</span>
          </div>
          <button className="w-10 h-10 bg-white/50 backdrop-blur-md rounded-2xl flex items-center justify-center active-scale border border-black/5">
            <Phone size={18} />
          </button>
        </div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <h1 className="text-3xl font-black tracking-tight mb-2 transition-all">{statusConfig.title}</h1>
          <p className="text-[11px] text-gray-400 font-bold max-w-[200px] leading-relaxed">{statusConfig.subtitle}</p>
        </div>
        
        {/* 背景装饰 */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-black/5 rounded-full blur-3xl"></div>
      </header>

      {/* 核心状态追踪卡片 */}
      <div className="px-5 -mt-6 relative z-20">
        <div className="bg-white rounded-[32px] p-8 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.05)] border border-white/50">
          {/* 取餐码展示区 */}
          <div className="flex flex-col items-center mb-10 pb-10 border-b border-dashed border-gray-100">
            <div className="text-[9px] font-black text-gray-300 uppercase tracking-[0.4em] mb-3">Pick-up Number</div>
            <div className="text-6xl font-black tracking-tighter tabular-nums flex items-baseline gap-1" style={{ color: 'var(--brand-secondary)' }}>
              <span className="text-2xl">#</span>
              {orderId?.slice(-3) || '108'}
            </div>
            {status !== OrderStatus.COMPLETED && (
              <div className="mt-5 flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full border border-gray-100">
                <Clock size={12} className="text-brand" />
                <span className="text-[10px] font-black text-gray-400">预计还要 {estimatedTime} 分钟</span>
              </div>
            )}
          </div>

          {/* 进度步进器 */}
          <div className="flex justify-between items-start relative px-1">
            {/* 背景连线 */}
            <div className="absolute top-4 left-4 right-4 h-[2px] bg-gray-50 rounded-full overflow-hidden">
               <div 
                 className="h-full bg-brand transition-all duration-1000 ease-out" 
                 style={{ width: `${(statusConfig.currentIdx / 3) * 100}%`, backgroundColor: 'var(--brand-primary)' }}
               ></div>
            </div>

            {statusConfig.steps.map((step, idx) => {
              const isActive = idx <= statusConfig.currentIdx;
              const isCurrent = idx === statusConfig.currentIdx;
              const Icon = step.icon;
              return (
                <div key={idx} className="flex flex-col items-center relative z-10 w-14">
                  <div 
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-500 border-4 ${
                      isActive ? 'bg-black border-white shadow-lg' : 'bg-white border-gray-50 text-gray-200'
                    } ${isCurrent ? 'scale-125' : 'scale-100'}`}
                    style={isCurrent ? { backgroundColor: 'var(--brand-primary)', color: 'black' } : (isActive ? { backgroundColor: 'black', color: 'white' } : {})}
                  >
                    <Icon size={14} strokeWidth={3} />
                  </div>
                  <span className={`text-[8px] font-black mt-3 transition-colors ${isActive ? 'text-black' : 'text-gray-300'}`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 电子收据详情 */}
      <div className="px-5 mt-6 mb-10">
        <div className="bg-white rounded-[32px] overflow-hidden shadow-sm relative border border-gray-100">
          {/* 小票波浪头装饰 */}
          <div className="flex justify-between px-2 -mt-1">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="w-4 h-4 rounded-full bg-[#F6F7F9] -translate-y-1/2"></div>
            ))}
          </div>
          
          <div className="p-8">
            <div className="flex items-center gap-3 mb-8">
              <Receipt size={16} className="text-gray-300" />
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Order Summary</h3>
            </div>

            <div className="space-y-5">
              {orderItems.map((item, i) => (
                <div key={i} className="flex justify-between items-center group">
                  <div className="flex items-center gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-100 group-hover:scale-150 transition-transform"></div>
                    <span className="text-[13px] font-bold text-gray-800">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-[11px] font-black text-gray-300">x{item.qty}</span>
                    <span className="text-[13px] font-black tracking-tight">¥{item.price.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-dashed border-gray-100">
              <div className="flex justify-between items-center">
                <span className="text-xs font-black text-gray-400">实付总额</span>
                <span className="text-2xl font-black tabular-nums">¥66.90</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50/50 p-6 flex items-center justify-between border-t border-gray-50">
             <div className="flex flex-col">
                <span className="text-[9px] text-gray-300 font-black uppercase mb-1">Store</span>
                <span className="text-[11px] font-black">{store.name}</span>
             </div>
             <button className="flex items-center gap-1.5 text-[10px] font-black text-brand bg-white px-4 py-2 rounded-xl shadow-sm active-scale">
               联系商家 <ArrowRight size={10} />
             </button>
          </div>
        </div>
      </div>

      {/* 底部功能区 */}
      <div className="px-5 grid grid-cols-2 gap-4 pb-10">
        <button className="bg-white py-5 rounded-[24px] border border-gray-100 font-black text-[11px] shadow-sm active-scale flex items-center justify-center gap-2 uppercase tracking-widest">
          <MessageSquare size={16} /> 咨询在线客服
        </button>
        <button onClick={onBack} className="bg-black text-white py-5 rounded-[24px] font-black text-[11px] shadow-xl active-scale flex items-center justify-center gap-2 uppercase tracking-widest">
          <ChevronLeft size={16} /> 返回菜单
        </button>
      </div>

      {/* 底部状态刷新提示 */}
      <div className="text-center pb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white rounded-full border border-gray-100 shadow-sm animate-pulse">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
          <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Auto Refreshing...</span>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
