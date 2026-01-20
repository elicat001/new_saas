
import React, { useState } from 'react';
import { ChevronRight, Clock, Search, History, CheckCircle2, XCircle, AlertCircle, ShoppingBag } from 'lucide-react';
import { StoreContext } from '../types';

const ORDERS_MOCK = [
  {
    id: '8085',
    shop: '棠小一（总店）',
    status: '已取消',
    date: '2025-11-19 17:45:43',
    price: 2445.00,
    count: 50,
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=200&h=200&fit=crop',
    type: '堂食'
  },
  {
    id: '3662',
    shop: '棠小一（总店）',
    status: '已支付',
    date: '2025-09-04 19:31:12',
    price: 54.40,
    count: 8,
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=200&h=200&fit=crop',
    type: '自取'
  },
  {
    id: '6062',
    shop: '棠小一（分店）',
    status: '已支付',
    date: '2025-08-21 15:16:05',
    price: 19.45,
    count: 1,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=200&h=200&fit=crop',
    type: '堂食'
  }
];

interface OrdersProps {
  onSelectOrder: (id: string) => void;
  // Use store instead of merchant to match App.tsx usage
  store: StoreContext;
}

const Orders: React.FC<OrdersProps> = ({ onSelectOrder, store }) => {
  const [activeTab, setActiveTab] = useState('点单');
  const [activeFilter, setActiveFilter] = useState('全部');

  const getStatusConfig = (status: string) => {
    switch (status) {
      case '已支付':
        return {
          icon: <CheckCircle2 size={12} strokeWidth={3} />,
          bgColor: 'bg-emerald-500/10',
          textColor: 'text-emerald-600',
          borderColor: 'border-emerald-500',
          barColor: 'bg-emerald-500',
          label: '已支付',
          isCancelled: false
        };
      case '已取消':
        return {
          icon: <XCircle size={12} strokeWidth={3} />,
          bgColor: 'bg-slate-100',
          textColor: 'text-slate-400',
          borderColor: 'border-slate-200',
          barColor: 'bg-slate-300',
          label: '已取消',
          isCancelled: true
        };
      default:
        return {
          icon: <AlertCircle size={12} strokeWidth={3} />,
          bgColor: 'bg-amber-500/10',
          textColor: 'text-amber-600',
          borderColor: 'border-amber-400',
          barColor: 'bg-amber-400',
          label: status,
          isCancelled: false
        };
    }
  };

  return (
    <div className="flex flex-col min-h-full bg-[#F8F8F8] pb-40">
      {/* Navigation Header */}
      <div className="bg-white px-5 pt-16 pb-4 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center justify-between mb-8">
           <div className="w-10"></div>
           <h1 className="font-black text-xl tracking-tight">我的订单</h1>
           <button className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 active:scale-90 transition-transform">
             <Search size={20} />
           </button>
        </div>
        
        <div className="flex justify-around items-center px-4">
          {['点单', '会员', '拼团'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 px-2 text-[15px] font-black relative transition-all ${activeTab === tab ? 'text-black scale-105' : 'text-gray-300'}`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-black rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Chips Toolbar */}
      <div className="px-5 py-5 flex gap-3 overflow-x-auto scrollbar-hide bg-white/50 backdrop-blur-sm border-b border-gray-100">
        {['全部', '堂食', '自取', '配送', '快递'].map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-6 py-2.5 rounded-full text-xs font-black transition-all whitespace-nowrap active:scale-95 ${
              activeFilter === filter 
              ? 'bg-black text-white shadow-lg' 
              : 'bg-white text-gray-400 border border-gray-100'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Enhanced Orders List */}
      <div className="flex-1 px-5 mt-6 space-y-6">
        {ORDERS_MOCK.map(order => {
          const config = getStatusConfig(order.status);
          return (
            <div 
              key={order.id} 
              onClick={() => onSelectOrder(order.id)}
              className={`relative bg-white rounded-[32px] overflow-hidden shadow-soft active:scale-[0.98] transition-all border border-gray-50/50 flex ${config.isCancelled ? 'opacity-70' : ''}`}
            >
              {/* Status Accent Bar */}
              <div className={`w-1.5 shrink-0 ${config.barColor}`}></div>
              
              <div className="flex-1 p-6">
                <div className="flex justify-between items-start mb-5">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                       <span className={`text-[15px] font-black ${config.isCancelled ? 'text-gray-400' : 'text-gray-900'}`}>{order.shop}</span>
                       <ChevronRight size={14} className="text-gray-300" />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-[9px] font-black bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md uppercase tracking-wider">
                        {order.type}
                      </div>
                      <div className="text-[10px] text-gray-300 font-bold flex items-center gap-1">
                        <Clock size={10} />
                        {order.date}
                      </div>
                    </div>
                  </div>
                  
                  {/* Enhanced Status Badge */}
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${config.bgColor} ${config.textColor} text-[10px] font-black shadow-sm border border-white/20`}>
                    {config.icon}
                    {config.label}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex gap-5 items-center">
                     <div className="relative group">
                        <img 
                          src={order.image} 
                          alt="product" 
                          className={`w-14 h-14 rounded-[20px] object-cover bg-gray-50 border border-gray-100 shadow-sm transition-all ${config.isCancelled ? 'grayscale brightness-110 opacity-40' : ''}`} 
                        />
                        {order.count > 1 && (
                          <span className={`absolute -top-1.5 -right-1.5 text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm ${config.isCancelled ? 'bg-gray-200 text-gray-400' : 'bg-black text-white'}`}>
                            {order.count}
                          </span>
                        )}
                     </div>
                     <div className="flex flex-col">
                        <span className="text-[9px] text-gray-300 font-black tracking-widest uppercase mb-0.5">Queue ID</span>
                        <span className={`text-2xl font-black leading-none ${config.isCancelled ? 'text-gray-300' : 'text-gray-900'}`}>#{order.id}</span>
                     </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-gray-300 font-bold mb-0.5">实付金额</div>
                    <div className={`text-xl font-black leading-none ${config.isCancelled ? 'text-gray-300 line-through' : 'text-emerald-600'}`}>
                      ¥{order.price.toFixed(2)}
                    </div>
                  </div>
                </div>

                {/* Quick Actions for completed orders */}
                {!config.isCancelled && (
                  <div className="mt-5 pt-5 border-t border-gray-50 flex gap-3">
                     <button className="flex-1 py-2.5 rounded-xl border border-gray-100 text-[10px] font-black text-gray-400 active:bg-gray-50 transition-colors uppercase tracking-wider">查看发票</button>
                     <button className="flex-1 py-2.5 rounded-xl bg-black text-white text-[10px] font-black active:opacity-90 transition-opacity uppercase tracking-wider">再来一单</button>
                  </div>
                )}
                
                {config.isCancelled && (
                  <div className="mt-5 pt-5 border-t border-dashed border-gray-100 flex justify-end">
                    <button className="px-5 py-2 rounded-xl bg-gray-50 text-[10px] font-black text-gray-400 active:bg-gray-100 transition-colors uppercase tracking-wider">重新下单</button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        <div className="py-20 flex flex-col items-center justify-center gap-4 opacity-20">
           <ShoppingBag size={40} strokeWidth={1} className="text-gray-400" />
           <div className="flex flex-col items-center">
              <span className="text-[10px] font-black text-gray-400 tracking-[0.3em] uppercase">No more orders</span>
              <div className="w-12 h-0.5 bg-gray-200 rounded-full mt-3"></div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
