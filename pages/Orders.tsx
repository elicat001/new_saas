
import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const ORDERS_MOCK = [
  {
    id: '8085',
    shop: '棠小一',
    status: '已取消',
    date: '2025-11-19 17:45',
    price: 2445.00,
    count: 50,
    image: 'https://picsum.photos/seed/order1/200/200',
    type: '堂食'
  },
  {
    id: '3662',
    shop: '棠小一',
    status: '已支付',
    date: '2025-09-04 19:31',
    price: 54.40,
    count: 8,
    image: 'https://picsum.photos/seed/order2/200/200',
    type: '堂食'
  },
  {
    id: '6062',
    shop: '棠小一',
    status: '已支付',
    date: '2025-08-21 15:16',
    price: 19.45,
    count: 1,
    image: 'https://picsum.photos/seed/order3/200/200',
    type: '堂食'
  }
];

interface OrdersProps {
  onSelectOrder: (id: string) => void;
}

const Orders: React.FC<OrdersProps> = ({ onSelectOrder }) => {
  const [activeTab, setActiveTab] = useState('点单');
  const [activeFilter, setActiveFilter] = useState('全部');

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Page Header */}
      <div className="bg-white px-4 pt-12 pb-4 shadow-sm z-10">
        <h1 className="text-center font-bold mb-4">我的订单</h1>
        <div className="flex justify-around border-b border-gray-100">
          {['点单', '会员', '拼团'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 px-4 text-sm relative transition-all ${activeTab === tab ? 'text-black font-bold' : 'text-gray-400'}`}
            >
              {tab}
              {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#f7e28b]"></div>}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Chips */}
      <div className="px-4 py-3 flex gap-2 overflow-x-auto scrollbar-hide">
        {['全部', '堂食', '配送', '快递'].map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-1.5 rounded-full text-xs transition-all ${activeFilter === filter ? 'bg-[#f7e28b]/20 text-[#c7b25b] font-bold' : 'text-gray-500'}`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="flex-1 px-4 space-y-4 pb-8">
        {ORDERS_MOCK.map(order => (
          <div 
            key={order.id} 
            onClick={() => onSelectOrder(order.id)}
            className="bg-white rounded-2xl p-4 shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] bg-[#f7e28b]/20 text-[#c7b25b] px-1 rounded border border-[#f7e28b]/50">{order.type}</span>
                <span className="text-sm font-bold text-gray-800">{order.shop}</span>
                <ChevronRight size={14} className="text-gray-300" />
              </div>
              <div className="text-right">
                <div className={`text-sm font-medium ${order.status === '已取消' ? 'text-gray-400' : 'text-black'}`}>{order.status}</div>
                <div className="text-[10px] text-gray-400 mt-1">{order.date}</div>
              </div>
            </div>

            <div className="flex items-end justify-between">
              <div className="flex gap-4">
                 <img src={order.image} alt="product" className="w-14 h-14 rounded-lg object-cover bg-gray-50" />
                 <div className="flex flex-col justify-center">
                    <div className="text-xl font-bold text-[#f7e28b]">{order.id}</div>
                 </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold">¥ {order.price.toFixed(2)}</div>
                <div className="text-[10px] text-gray-400">共{order.count}件</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
