
import React, { useState } from 'react';
import { ChevronLeft, Loader2, ShieldCheck, Check } from 'lucide-react';
import { StoreContext, CartItem } from '../types';
import { api } from '../api';

interface CheckoutProps {
  onBack: () => void;
  store: StoreContext;
  items: CartItem[];
  onPaid: (id: string) => void;
}

const Checkout: React.FC<CheckoutProps> = ({ onBack, store, items, onPaid }) => {
  const [submitting, setSubmitting] = useState(false);
  const total = items.reduce((s, i) => s + (i.price * i.quantity), 0);

  const handleOrder = async () => {
    setSubmitting(true);
    try {
      // 1. 下单
      const order = await api.createOrder({ storeId: store.id, storeName: store.name, items, total });
      // 2. 调起支付
      const success = await api.requestPayment(order.id);
      if (success) onPaid(order.id);
      else alert('订单已创建，请在订单中心支付');
    } catch (e) {
      alert('下单失败，请重试');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8] flex flex-col pb-32">
      <div className="bg-white px-5 pt-16 pb-4 flex items-center justify-between sticky top-0 z-50 border-b border-gray-50">
        <button onClick={onBack} className="w-10 h-10 bg-gray-50 border border-gray-200 rounded-2xl flex items-center justify-center active-scale transition-all">
          <ChevronLeft size={22} />
        </button>
        <span className="font-black text-lg tracking-tight">确认订单</span>
        <div className="w-10"></div>
      </div>

      <div className="p-5 space-y-4">
        <div className="bg-white p-6 rounded-[32px] shadow-sm">
          <h3 className="font-black text-lg mb-6">{store.name}</h3>
          <div className="space-y-4 mb-8">
            {items.map(item => (
              <div key={item.cart_item_id} className="flex justify-between items-center">
                <div className="flex gap-4">
                  <img src={item.image} className="w-12 h-12 rounded-xl object-cover border border-gray-50" />
                  <div className="flex flex-col justify-center">
                    <div className="text-[13px] font-black">{item.name}</div>
                    <div className="text-[10px] text-gray-400 font-bold">x{item.quantity}</div>
                  </div>
                </div>
                <span className="font-black text-sm">¥{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="pt-6 border-t border-gray-50 flex justify-between items-center">
            <span className="text-sm font-bold text-gray-400">订单备注</span>
            <span className="text-xs font-black text-gray-300">选填 <ChevronLeft size={14} className="inline rotate-180" /></span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[32px] shadow-sm">
          <h4 className="text-sm font-black mb-6">支付方式</h4>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-[#07C160] text-white p-1 rounded-full"><Check size={14} strokeWidth={4} /></div>
              <span className="text-sm font-bold">微信支付</span>
            </div>
            <div className="w-5 h-5 rounded-full bg-brand border border-brand/50 flex items-center justify-center" style={{ backgroundColor: store.theme.primary }}>
              <div className="w-2.5 h-2.5 bg-black rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 inset-x-0 p-6 bg-white shadow-up flex items-center justify-between z-50 pb-10">
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-300 font-black tracking-widest uppercase">Payable</span>
          <span className="text-3xl font-black">¥{total.toFixed(2)}</span>
        </div>
        <button 
          onClick={handleOrder}
          disabled={submitting}
          className="bg-brand px-14 py-5 rounded-[24px] border border-brand/50 font-black text-lg shadow-xl active-scale flex items-center justify-center gap-2 transition-all"
          style={{ backgroundColor: store.theme.primary }}
        >
          {submitting ? <Loader2 className="animate-spin" /> : '立即支付'}
        </button>
      </div>

      <div className="fixed bottom-32 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-[9px] text-gray-300 font-bold uppercase tracking-widest">
        <ShieldCheck size={12} /> 支付环境已由系统加密保护
      </div>
    </div>
  );
};

export default Checkout;
