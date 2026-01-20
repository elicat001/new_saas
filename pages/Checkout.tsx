
import React, { useState } from 'react';
import { ChevronLeft, ShieldCheck, Wallet, Smartphone, CreditCard, Loader2, Check } from 'lucide-react';
import { StoreContext, CartItem, Order } from '../types';
import { api } from '../api';

interface CheckoutProps {
  onBack: () => void;
  store: StoreContext;
  items: CartItem[];
  onPaid: (orderId: string) => void;
}

const Checkout: React.FC<CheckoutProps> = ({ onBack, store, items, onPaid }) => {
  const [paying, setPaying] = useState(false);
  const total = items.reduce((sum, i) => sum + (i.price * i.quantity), 0);

  const handlePay = async () => {
    setPaying(true);
    try {
      // 1. 下单请求
      const order = await api.createOrder({ storeId: store.id, items, type: 'WECHAT' });
      // 2. 获取支付参数并调起支付
      const success = await api.requestPayment(order.id);
      if (success) {
        onPaid(order.id);
      }
    } catch (err) {
      alert('支付失败');
    } finally {
      setPaying(false);
    }
  };

  return (
    <div className="bg-[#F8F8F8] min-h-screen flex flex-col pb-40">
      <div className="bg-white px-5 pt-16 pb-4 flex items-center justify-between sticky top-0 z-50 border-b border-gray-50">
        <button onClick={onBack} className="w-10 h-10 bg-gray-50 border border-gray-200 rounded-[16px] flex items-center justify-center active-scale transition-all">
          <ChevronLeft size={22} />
        </button>
        <span className="font-black text-lg">确认订单</span>
        <div className="w-10"></div>
      </div>

      <div className="p-5 space-y-4">
        <div className="bg-white p-6 rounded-[32px] shadow-sm">
           <h3 className="font-black text-lg mb-4">{store.name}</h3>
           <div className="space-y-4">
              {items.map(item => (
                <div key={item.productId} className="flex justify-between items-center">
                  <div className="flex gap-3">
                    <img src={item.image} className="w-10 h-10 rounded-xl object-cover" />
                    <div>
                      <div className="text-sm font-black">{item.name}</div>
                      <div className="text-[10px] text-gray-400">x{item.quantity}</div>
                    </div>
                  </div>
                  <span className="font-black">¥{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
           </div>
           <div className="mt-6 pt-6 border-t border-gray-50 flex justify-end items-baseline gap-2">
              <span className="text-xs text-gray-400 font-bold">合计</span>
              <span className="text-2xl font-black">¥{total.toFixed(2)}</span>
           </div>
        </div>

        <div className="bg-white p-6 rounded-[32px] shadow-sm">
           <h4 className="text-sm font-black mb-6">支付方式</h4>
           <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-[#07C160] text-white p-1 rounded-full"><Check size={14} strokeWidth={4} /></div>
                  <span className="text-sm font-bold">微信支付</span>
                </div>
                <div className="w-5 h-5 rounded-full bg-brand border border-[var(--brand-secondary)] flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-black rounded-full"></div>
                </div>
              </div>
           </div>
        </div>
      </div>

      <div className="fixed bottom-0 inset-x-0 p-6 bg-white shadow-up flex items-center justify-between z-[60] pb-10">
         <div className="flex flex-col">
            <span className="text-[10px] text-gray-300 font-black tracking-widest uppercase">应付金额</span>
            <span className="text-2xl font-black">¥{total.toFixed(2)}</span>
         </div>
         <button 
           onClick={handlePay}
           disabled={paying}
           className="px-14 py-5 rounded-[24px] border border-[var(--brand-secondary)] font-black text-lg bg-brand shadow-xl active-scale flex items-center justify-center gap-2"
         >
            {paying ? <Loader2 className="animate-spin" /> : '立即支付'}
         </button>
      </div>
    </div>
  );
};

export default Checkout;
