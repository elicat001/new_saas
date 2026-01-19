
import React, { useState } from 'react';
import { ChevronLeft, MapPin, Plus, Trash2, Edit2, Navigation } from 'lucide-react';

interface AddressesProps {
  onBack: () => void;
}

const Addresses: React.FC<AddressesProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'LOCAL' | 'EXPRESS'>('LOCAL');
  const [addresses, setAddresses] = useState([
    { id: 1, name: '粒', phone: '188****4331', city: '深圳市', detail: '南山区粤海街道软件产业基地4栋B座', tag: '公司', isDefault: true }
  ]);

  return (
    <div className="bg-[#F8F8F8] min-h-screen flex flex-col pb-32">
      {/* Header */}
      <div className="bg-white px-5 pt-16 pb-4 flex items-center justify-between sticky top-0 z-50 border-b border-gray-50">
        <button onClick={onBack} className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center active-scale"><ChevronLeft size={22} /></button>
        <span className="font-black text-lg tracking-tight text-black">我的地址</span>
        <div className="w-10"></div>
      </div>

      {/* Tabs */}
      <div className="px-5 py-6">
         <div className="bg-gray-200/50 flex rounded-[24px] p-1.5 backdrop-blur-md">
            <button 
              onClick={() => setActiveTab('LOCAL')}
              className={`flex-1 py-3.5 rounded-[20px] text-xs font-black transition-all ${activeTab === 'LOCAL' ? 'bg-white text-black shadow-sm' : 'text-gray-400'}`}
            >
              同城地址
            </button>
            <button 
              onClick={() => setActiveTab('EXPRESS')}
              className={`flex-1 py-3.5 rounded-[20px] text-xs font-black transition-all ${activeTab === 'EXPRESS' ? 'bg-[#f7e28b] text-black shadow-sm' : 'text-gray-400'}`}
            >
              快递地址
            </button>
         </div>
      </div>

      {/* List */}
      <div className="flex-1 px-5 space-y-4">
        {addresses.length > 0 ? (
          addresses.map(addr => (
            <div key={addr.id} className="bg-white rounded-[32px] p-8 shadow-soft border border-gray-50 group">
               <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                     {addr.isDefault && <span className="bg-[#f7e28b] text-black text-[9px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider">Default</span>}
                     {addr.tag && <span className="bg-gray-100 text-gray-400 text-[9px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider">{addr.tag}</span>}
                  </div>
                  <div className="flex gap-4">
                     <button className="text-gray-200 hover:text-gray-400 transition-colors"><Edit2 size={16} /></button>
                     <button className="text-gray-200 hover:text-red-400 transition-colors"><Trash2 size={16} /></button>
                  </div>
               </div>
               
               <div className="mb-2 flex items-center gap-3">
                  <span className="text-xl font-black text-black">{addr.name}</span>
                  <span className="text-sm font-bold text-gray-300">{addr.phone}</span>
               </div>
               <div className="text-[13px] text-gray-400 font-bold leading-relaxed mb-8">
                  {addr.city} {addr.detail}
               </div>

               <button className="w-full flex items-center justify-center gap-2 py-4 bg-gray-50 rounded-2xl text-[10px] font-black text-gray-400 hover:bg-gray-100 transition-colors uppercase tracking-widest">
                  <Navigation size={14} />
                  Navigate to this address
               </button>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-40 opacity-20">
             <MapPin size={60} strokeWidth={1} />
             <span className="mt-4 text-xs font-black tracking-widest uppercase">No Addresses Found</span>
          </div>
        )}
      </div>

      {/* Footer Action */}
      <div className="fixed bottom-0 inset-x-0 p-6 bg-white shadow-up pb-10">
        <button className="w-full bg-[#f7e28b] py-6 rounded-[28px] font-black text-lg shadow-xl shadow-brand-yellow/30 active-scale flex items-center justify-center gap-3">
            <Plus size={24} strokeWidth={3} />
            新增收货地址
        </button>
      </div>
    </div>
  );
};

export default Addresses;
