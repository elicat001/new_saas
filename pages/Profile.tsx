
import React from 'react';
import { ChevronRight, CreditCard, FileText, User, Headphones, MapPin, Gift, Settings } from 'lucide-react';

interface ProfileProps {
  onOrders: () => void;
  onUserInfo: () => void;
  onAddresses: () => void;
  onTopUp: () => void;
  onCoupons: () => void;
  onIntegralDetails: () => void;
}

const Profile: React.FC<ProfileProps> = ({ onOrders, onUserInfo, onAddresses, onTopUp, onCoupons, onIntegralDetails }) => {
  return (
    <div className="bg-[#F8F8F8] min-h-full pb-40">
      {/* Dynamic Header */}
      <div className="bg-[#f7e28b] pt-24 pb-24 px-6 flex flex-col items-center relative overflow-hidden">
        <div className="absolute top-14 left-7 z-10">
           <h1 className="text-3xl font-black tracking-widest text-black">棠小一<sup className="text-[12px] font-black align-top ml-1">®</sup></h1>
        </div>
        
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
        <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
        
        {/* User Profile Card */}
        <div className="bg-white rounded-[48px] p-10 w-full shadow-soft relative z-20 -mb-32">
            <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-6">
                    <div 
                      className="w-20 h-20 rounded-full bg-gray-100 border-[6px] border-white shadow-xl overflow-hidden active-scale" 
                      onClick={onUserInfo}
                    >
                        <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop" alt="user" className="w-full h-full object-cover" />
                    </div>
                    <div onClick={onUserInfo} className="active-scale">
                        <div className="text-2xl font-black text-black tracking-tight leading-none mb-1.5">粒</div>
                        <div className="text-gray-300 text-[11px] font-black tracking-widest uppercase">Member ID: 8812</div>
                    </div>
                </div>
                <button className="p-3 bg-gray-50 rounded-2xl active-scale text-gray-400">
                    <Settings size={20} />
                </button>
            </div>

            <div className="grid grid-cols-3 gap-4 items-center py-2 border-t border-gray-50 pt-10">
                <StatItem label="积分" value="19" onClick={onIntegralDetails} />
                <StatItem label="余额" value="0.00" onClick={onTopUp} />
                <StatItem label="优惠券" value="0" onClick={onCoupons} />
            </div>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="mt-36 px-5 space-y-6">
        <div className="bg-white rounded-[40px] shadow-sm overflow-hidden border border-gray-50/50">
            <MenuItem icon={<FileText size={20} strokeWidth={2.5} />} title="订单中心" onClick={onOrders} />
            <MenuItem icon={<User size={20} strokeWidth={2.5} />} title="个人信息" onClick={onUserInfo} />
            <MenuItem icon={<Headphones size={20} strokeWidth={2.5} />} title="客服中心" />
            <MenuItem icon={<MapPin size={20} strokeWidth={2.5} />} title="我的地址" onClick={onAddresses} />
        </div>

        <div className="bg-white rounded-[40px] shadow-sm overflow-hidden border border-gray-50/50">
            <MenuItem icon={<Gift size={20} strokeWidth={2.5} />} title="积分商城" />
            <MenuItem icon={<CreditCard size={20} strokeWidth={2.5} />} title="积分明细" onClick={onIntegralDetails} />
        </div>
        
        <div className="py-10 text-center text-gray-300 text-[10px] font-black uppercase tracking-[0.3em]">
           Power by Tang Xiao Yi
        </div>
      </div>
    </div>
  );
};

const StatItem = ({ label, value, onClick }: any) => (
  <div className="text-center cursor-pointer group active-scale" onClick={onClick}>
    <div className="text-[10px] text-gray-300 font-black mb-2 uppercase tracking-widest">{label}</div>
    <div className="text-2xl font-black text-black tracking-tight">{value}</div>
  </div>
);

const MenuItem = ({ icon, title, onClick }: any) => (
  <button 
    onClick={onClick}
    className="w-full px-8 py-6 flex items-center justify-between group active:bg-gray-50 transition-colors border-b last:border-b-0 border-gray-50"
  >
    <div className="flex items-center gap-6">
      <div className="text-gray-300 group-hover:text-black transition-colors">{icon}</div>
      <span className="font-black text-sm tracking-tight text-gray-800">{title}</span>
    </div>
    <ChevronRight size={18} className="text-gray-200 group-hover:text-gray-400 transition-colors" />
  </button>
);

export default Profile;
