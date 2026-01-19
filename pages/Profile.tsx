
import React from 'react';
import { ChevronRight, FileText, User, MapPin, Settings, Layers } from 'lucide-react';
import { MerchantConfig } from '../types';

interface ProfileProps {
  onOrders: () => void;
  onUserInfo: () => void;
  onAddresses: () => void;
  onTopUp: () => void;
  onCoupons: () => void;
  onIntegralDetails: () => void;
  merchant: MerchantConfig;
  merchants: MerchantConfig[];
  onSwitchMerchant: (m: MerchantConfig) => void;
}

const Profile: React.FC<ProfileProps> = ({ 
  onOrders, onUserInfo, onAddresses, onTopUp, onCoupons, onIntegralDetails, merchant, merchants, onSwitchMerchant 
}) => {
  return (
    <div className="bg-[#F8F8F8] min-h-full pb-40">
      <div className="bg-brand pt-24 pb-24 px-6 flex flex-col items-center relative overflow-hidden transition-all duration-500">
        <div className="absolute top-14 left-7 z-10">
           <h1 className="text-3xl font-black tracking-widest text-black">
             {merchant.name}
             <sup className="text-[12px] font-black align-top ml-1">®</sup>
           </h1>
        </div>
        <div className="bg-white p-10 w-full shadow-soft relative z-20 -mb-32 rounded-main">
            <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-gray-100 border-[6px] border-white shadow-xl overflow-hidden active-scale" onClick={onUserInfo}>
                        <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop" alt="user" className="w-full h-full object-cover" />
                    </div>
                    <div onClick={onUserInfo} className="active-scale">
                        <div className="text-2xl font-black text-black leading-none mb-1.5">粒</div>
                        <div className="text-gray-300 text-[11px] font-black tracking-widest uppercase">Platinum Member</div>
                    </div>
                </div>
                <button className="p-3 bg-gray-50 rounded-inner active-scale text-gray-400"><Settings size={20} /></button>
            </div>
            <div className="grid grid-cols-3 gap-4 py-2 border-t border-gray-50 pt-10">
                <StatItem label="积分" value="19" onClick={onIntegralDetails} />
                <StatItem label="余额" value="0.00" onClick={onTopUp} />
                <StatItem label="优惠券" value="0" onClick={onCoupons} />
            </div>
        </div>
      </div>

      <div className="mt-36 px-5 space-y-6">
        <div className="bg-white shadow-sm overflow-hidden border border-gray-50/50 rounded-main">
            <MenuItem icon={<FileText size={20} />} title="订单中心" onClick={onOrders} />
            <MenuItem icon={<User size={20} />} title="个人信息" onClick={onUserInfo} />
            <MenuItem icon={<MapPin size={20} />} title="我的地址" onClick={onAddresses} />
        </div>

        <div className="bg-white p-8 border border-brand/20 shadow-soft rounded-main">
            <div className="flex items-center gap-3 mb-6 text-brand">
                <Layers size={20} />
                <h3 className="text-sm font-black uppercase tracking-widest">SaaS 装修引擎 (API 驱动)</h3>
            </div>
            <div className="flex flex-wrap gap-3">
                {merchants.map(m => (
                    <button key={m.id} onClick={() => onSwitchMerchant(m)} className={`px-4 py-2.5 rounded-inner text-[10px] font-black transition-all border-2 ${merchant.id === m.id ? 'bg-brand text-black border-brand' : 'bg-white text-gray-400 border-gray-100'}`}>
                        {m.name}
                    </button>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

const StatItem = ({ label, value, onClick }: any) => (
  <div className="text-center cursor-pointer active-scale" onClick={onClick}>
    <div className="text-[10px] text-gray-300 font-black mb-2 uppercase tracking-widest">{label}</div>
    <div className="text-2xl font-black text-black tracking-tight">{value}</div>
  </div>
);

const MenuItem = ({ icon, title, onClick }: any) => (
  <button onClick={onClick} className="w-full px-8 py-6 flex items-center justify-between group active:bg-gray-50 transition-colors border-b last:border-b-0 border-gray-50">
    <div className="flex items-center gap-6">
      <div className="text-gray-300 group-hover:text-brand transition-colors">{icon}</div>
      <span className="font-black text-sm tracking-tight text-gray-800">{title}</span>
    </div>
    <ChevronRight size={18} className="text-gray-200" />
  </button>
);

export default Profile;
