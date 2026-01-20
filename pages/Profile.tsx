
import React from 'react';
import { ChevronRight, FileText, User, MapPin, Settings, Layers, Wallet, Ticket, Gift } from 'lucide-react';
import { StoreContext, MerchantConfig } from '../types';

interface ProfileProps {
  onOrders: () => void;
  onUserInfo: () => void;
  onAddresses: () => void;
  onTopUp: () => void;
  onCoupons: () => void;
  onIntegralDetails: () => void;
  store: StoreContext;
  merchants?: MerchantConfig[];
  onSwitchMerchant?: (m: MerchantConfig) => void;
}

const Profile: React.FC<ProfileProps> = ({ 
  onOrders, onUserInfo, onAddresses, onTopUp, onCoupons, onIntegralDetails, store, merchants, onSwitchMerchant 
}) => {
  return (
    <div className="bg-[#F8F8F8] min-h-full pb-40 animate-in fade-in duration-500">
      {/* Header Container */}
      <div className="bg-brand pt-24 pb-28 px-6 flex flex-col items-center relative overflow-hidden transition-all duration-700" style={{ backgroundColor: 'var(--brand-primary)' }}>
        <div className="absolute top-14 left-8 z-10">
           <h1 className="text-3xl font-black tracking-widest text-black/90">
             {store.name}
             <sup className="text-[12px] font-black align-top ml-1 opacity-50">®</sup>
           </h1>
        </div>
        
        {/* Floating User Card */}
        <div className="bg-white p-8 w-full shadow-soft relative z-20 -mb-36 rounded-[40px] border border-white/50 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-5">
                    <div className="w-18 h-18 rounded-full bg-gray-50 border-[5px] border-white shadow-xl overflow-hidden active-scale" onClick={onUserInfo}>
                        <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop" alt="用户" className="w-full h-full object-cover" />
                    </div>
                    <div onClick={onUserInfo} className="active-scale cursor-pointer">
                        <div className="text-2xl font-black text-black leading-none mb-1.5 tracking-tight">粒</div>
                        <div className="bg-black text-brand text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest inline-block" style={{ color: 'var(--brand-primary)' }}>PLATINUM MEMBER</div>
                    </div>
                </div>
                <button className="p-3 bg-gray-50 rounded-2xl active-scale text-gray-400 hover:text-black transition-colors"><Settings size={20} /></button>
            </div>
            
            <div className="grid grid-cols-3 gap-2 py-2 border-t border-gray-50 pt-10">
                <StatItem label="积分" value="1,240" onClick={onIntegralDetails} icon={<Gift size={12} />} />
                <StatItem label="余额" value="¥128.5" onClick={onTopUp} icon={<Wallet size={12} />} />
                <StatItem label="券包" value="6" onClick={onCoupons} icon={<Ticket size={12} />} />
            </div>
        </div>
      </div>

      <div className="mt-44 px-6 space-y-5">
        <div className="bg-white shadow-soft overflow-hidden border border-white rounded-[32px]">
            <MenuItem icon={<FileText size={20} />} title="订单历史" onClick={onOrders} />
            <MenuItem icon={<User size={20} />} title="个人资料" onClick={onUserInfo} />
            <MenuItem icon={<MapPin size={20} />} title="收货地址" onClick={onAddresses} />
        </div>

        {/* SaaS Engine Switcher */}
        {merchants && onSwitchMerchant && (
          <div className="bg-white p-8 border border-brand/10 shadow-soft rounded-[32px]">
              <div className="flex items-center gap-3 mb-6 text-brand">
                  <div className="p-2 bg-brand/10 rounded-xl" style={{ backgroundColor: 'var(--brand-primary)33' }}>
                    <Layers size={18} style={{ color: 'var(--brand-secondary)' }} />
                  </div>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">SaaS Theme Engine</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                  {merchants.map(m => (
                      <button 
                        key={m.id} 
                        onClick={() => onSwitchMerchant(m)} 
                        className={`px-5 py-3 rounded-2xl text-[11px] font-black transition-all active-scale border-2 ${store.id === m.id ? 'bg-brand text-black border-brand' : 'bg-white text-gray-400 border-gray-50 hover:border-gray-100'}`}
                        style={store.id === m.id ? { backgroundColor: 'var(--brand-primary)', borderColor: 'var(--brand-primary)' } : {}}
                      >
                          {m.name}
                      </button>
                  ))}
              </div>
          </div>
        )}
        
        <div className="py-10 text-center">
           <p className="text-[9px] text-gray-300 font-black uppercase tracking-[0.4em]">Powered by SaaS Dining V1.0</p>
        </div>
      </div>
    </div>
  );
};

const StatItem = ({ label, value, onClick, icon }: any) => (
  <div className="text-center cursor-pointer active-scale group" onClick={onClick}>
    <div className="flex items-center justify-center gap-1.5 mb-2">
       <div className="text-gray-300 group-hover:text-black transition-colors">{icon}</div>
       <div className="text-[10px] text-gray-300 font-black uppercase tracking-widest">{label}</div>
    </div>
    <div className="text-xl font-black text-black tracking-tighter">{value}</div>
  </div>
);

const MenuItem = ({ icon, title, onClick }: any) => (
  <button onClick={onClick} className="w-full px-8 py-7 flex items-center justify-between group active:bg-gray-50 transition-all border-b last:border-b-0 border-gray-50">
    <div className="flex items-center gap-6">
      <div className="text-gray-200 group-hover:text-brand transition-all transform group-active:scale-110" style={{ color: 'var(--brand-secondary)' }}>{icon}</div>
      <span className="font-black text-sm tracking-tight text-gray-800">{title}</span>
    </div>
    <ChevronRight size={18} className="text-gray-200 group-hover:translate-x-1 transition-transform" />
  </button>
);

export default Profile;
