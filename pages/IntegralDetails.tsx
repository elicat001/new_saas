
import React, { useState } from 'react';
import { ChevronLeft, Info, TrendingUp, TrendingDown, Clock } from 'lucide-react';
// Added MerchantConfig import
import { MerchantConfig } from '../types';

interface IntegralDetailsProps {
  onBack: () => void;
  // Added merchant prop
  merchant: MerchantConfig;
}

const MOCK_RECORDS = [
  {
    id: '1',
    type: 'ADD',
    reason: '订单完成奖励',
    amount: 15,
    date: '2025-09-04 19:35:12',
    orderId: '3662'
  },
  {
    id: '2',
    type: 'ADD',
    reason: '每日签到奖励',
    amount: 5,
    date: '2025-09-04 08:21:05'
  },
  {
    id: '3',
    type: 'SUB',
    reason: '礼品卡兑换消耗',
    amount: 10,
    date: '2025-08-25 14:10:33'
  },
  {
    id: '4',
    type: 'ADD',
    reason: '新用户注册奖励',
    amount: 9,
    date: '2025-08-20 10:00:00'
  }
];

// Updated component signature to accept merchant prop
const IntegralDetails: React.FC<IntegralDetailsProps> = ({ onBack, merchant }) => {
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'EARN' | 'SPENT'>('ALL');

  const filteredRecords = MOCK_RECORDS.filter(record => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'EARN') return record.type === 'ADD';
    if (activeFilter === 'SPENT') return record.type === 'SUB';
    return true;
  });

  return (
    <div className="bg-[#F8F8F8] min-h-full flex flex-col pb-10">
      {/* Header */}
      <div className="bg-white px-5 pt-16 pb-4 flex items-center justify-between sticky top-0 z-50 border-b border-gray-50">
        <button onClick={onBack} className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center active-scale-90 transition-transform">
          <ChevronLeft size={22} />
        </button>
        <span className="font-black text-lg tracking-tight">积分明细</span>
        <div className="w-10"></div>
      </div>

      {/* Hero Balance Summary */}
      <div className="bg-white p-8 flex flex-col items-center mb-4 shadow-sm">
         <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: `${merchant.theme.primary}33` }}>
            <TrendingUp style={{ color: merchant.theme.secondary }} size={28} />
         </div>
         <span className="text-[11px] text-gray-400 font-black uppercase tracking-widest mb-1">Available Points</span>
         <h2 className="text-4xl font-black text-black">19</h2>
         <div className="mt-4 flex gap-4">
            <div className="text-center px-4">
                <div className="text-xs text-gray-400 font-bold">累计获得</div>
                <div className="font-black text-sm">29</div>
            </div>
            <div className="w-px h-8 bg-gray-100"></div>
            <div className="text-center px-4">
                <div className="text-xs text-gray-400 font-bold">累计消耗</div>
                <div className="font-black text-sm">10</div>
            </div>
         </div>
      </div>

      {/* Tabs / Filters */}
      <div className="bg-white px-5 py-4 sticky top-[116px] z-40 border-b border-gray-50 flex gap-6">
         {(['ALL', 'EARN', 'SPENT'] as const).map(f => (
           <button 
             key={f}
             onClick={() => setActiveFilter(f)}
             className={`text-sm font-black transition-colors relative pb-1 ${activeFilter === f ? 'text-black' : 'text-gray-300'}`}
           >
             {f === 'ALL' ? '全部' : f === 'EARN' ? '获得' : '消耗'}
             {activeFilter === f && <div className="absolute bottom-0 left-0 w-full h-1 rounded-full" style={{ backgroundColor: merchant.theme.primary }}></div>}
           </button>
         ))}
      </div>

      {/* List */}
      <div className="flex-1 px-5 mt-4 space-y-3">
        {filteredRecords.map(record => (
          <div key={record.id} className="bg-white rounded-[24px] p-5 flex items-center justify-between shadow-sm active:scale-[0.98] transition-all border border-gray-50/50">
             <div className="flex items-center gap-4">
                <div className={`p-2.5 rounded-xl ${record.type === 'ADD' ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500'}`}>
                   {record.type === 'ADD' ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                </div>
                <div>
                   <h4 className="text-[13px] font-black text-gray-800 leading-tight mb-1">{record.reason}</h4>
                   <div className="flex items-center gap-1.5 text-[10px] text-gray-300 font-bold">
                      <Clock size={10} />
                      {record.date}
                   </div>
                </div>
             </div>
             <div className={`text-lg font-black ${record.type === 'ADD' ? 'text-green-500' : 'text-red-500'}`}>
                {record.type === 'ADD' ? '+' : '-'}{record.amount}
             </div>
          </div>
        ))}

        {filteredRecords.length === 0 && (
           <div className="py-20 flex flex-col items-center justify-center opacity-20">
              <Info size={40} strokeWidth={1} />
              <span className="text-xs font-black mt-4 uppercase tracking-widest">No records found</span>
           </div>
        )}
      </div>

      <div className="mt-12 mb-8 text-center text-[10px] text-gray-300 font-black tracking-widest uppercase">
         Points will expire after 1 year
      </div>
    </div>
  );
};

export default IntegralDetails;
