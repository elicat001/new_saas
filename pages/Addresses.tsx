
import React, { useState } from 'react';
import { ChevronLeft, MapPin } from 'lucide-react';

interface AddressesProps {
  onBack: () => void;
}

const Addresses: React.FC<AddressesProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'LOCAL' | 'EXPRESS'>('LOCAL');

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 flex items-center justify-between sticky top-0 z-10">
        <button onClick={onBack} className="p-2 -ml-2"><ChevronLeft size={24} /></button>
        <span className="font-bold">我的地址</span>
        <div className="w-8"></div>
      </div>

      {/* Tabs */}
      <div className="px-4 py-2">
         <div className="bg-[#f7e28b]/20 flex rounded-xl overflow-hidden p-1">
            <button 
              onClick={() => setActiveTab('LOCAL')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'LOCAL' ? 'bg-white text-[#c7b25b]' : 'text-gray-400'}`}
            >
              同城地址
            </button>
            <button 
              onClick={() => setActiveTab('EXPRESS')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'EXPRESS' ? 'bg-[#f7e28b] text-white' : 'text-gray-400'}`}
            >
              快递地址
            </button>
         </div>
      </div>

      {/* Empty State */}
      <div className="flex-1 flex flex-col items-center justify-center p-10">
        <div className="relative w-64 h-64 flex items-center justify-center">
            <div className="absolute inset-0 bg-gray-50 rounded-full opacity-50 scale-90"></div>
            <img src="https://picsum.photos/seed/empty-address/400/400" className="w-48 h-48 opacity-20 grayscale" />
            <div className="absolute bg-white p-6 rounded-3xl shadow-xl flex items-center justify-center">
                <MapPin size={48} className="text-gray-100" />
            </div>
        </div>
        <p className="mt-8 text-gray-400 text-sm font-medium">暂无地址</p>
      </div>

      {/* Footer Button */}
      <div className="p-8">
        <button className="w-full bg-[#f7e28b] py-4 rounded-full font-bold text-lg shadow-sm">
            新增地址
        </button>
      </div>
    </div>
  );
};

export default Addresses;
