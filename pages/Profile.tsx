
import React from 'react';
import { ChevronRight, CreditCard, FileText, User, Headphones, MapPin, Gift } from 'lucide-react';

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
    <div className="bg-[#F8F8F8] min-h-full pb-32">
      {/* Header with Brand Gradient */}
      <div className="bg-[#f7e28b] pt-24 pb-20 px-6 flex flex-col items-center relative overflow-hidden">
        <div className="absolute top-12 left-6">
           <h1 className="text-3xl font-black tracking-widest text-black">棠小一<sup className="text-[10px] font-black align-top ml-0.5">®</sup></h1>
        </div>
        
        {/* Abstract shapes for visual flair */}
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/20 rounded-full blur-2xl"></div>
        <div className="absolute -left-10 top-0 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        
        {/* User Card Overlay */}
        <div className="bg-white rounded-[40px] p-8 w-full shadow-[0_20px_40px_rgba(0,0,0,0.06)] relative z-10 -mb-28 flex flex-col">
            <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-5">
                    <div className="w-20 h-20 rounded-full bg-gray-100 border-[6px] border-white shadow-lg overflow-hidden active:scale-95 transition-all" onClick={onUserInfo}>
                        <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop" alt="user" className="w-full h-full object-cover" />
                    </div>
                    <div onClick={onUserInfo}>
                        <div className="text-2xl font-black text-black">粒</div>
                        <div className="text-gray-400 text-xs font-bold mt-1 tracking-wider uppercase">188****4331</div>
                    </div>
                </div>
                <div className="p-2.5 border border-gray-100 rounded-2xl active:bg-gray-50">
                    <div className="grid grid-cols-2 gap-1 w-8 h-8">
                        <div className="bg-[#333] rounded-sm"></div>
                        <div className="bg-[#333] rounded-sm"></div>
                        <div className="bg-[#333] rounded-sm"></div>
                        <div className="bg-gray-200 rounded-sm"></div>
                    </div>
                </div>
            </div>

            <div className="flex justify-around items-center py-2 border-t border-gray-50 pt-8">
                <div className="text-center cursor-pointer group active:scale-95 transition-all" onClick={onIntegralDetails}>
                    <div className="text-[11px] text-gray-400 font-black mb-3 group-hover:text-black transition-colors">积分</div>
                    <div className="text-2xl font-black text-black">19</div>
                </div>
                <div className="w-px h-10 bg-gray-100"></div>
                <div className="text-center cursor-pointer group active:scale-95 transition-all" onClick={onTopUp}>
                    <div className="text-[11px] text-gray-400 font-black mb-3 group-hover:text-black transition-colors">余额</div>
                    <div className="text-2xl font-black text-black">0.00</div>
                </div>
                <div className="w-px h-10 bg-gray-100"></div>
                <div className="text-center cursor-pointer group active:scale-95 transition-all" onClick={onCoupons}>
                    <div className="text-[11px] text-gray-400 font-black mb-3 group-hover:text-black transition-colors">优惠券</div>
                    <div className="text-2xl font-black text-black">0</div>
                </div>
            </div>
        </div>
      </div>

      {/* Menu List */}
      <div className="mt-32 px-5 space-y-4">
        <div className="bg-white rounded-[32px] shadow-sm overflow-hidden border border-gray-50/50">
            <MenuItem icon={<FileText size={20} />} title="订单中心" onClick={onOrders} />
            <MenuItem icon={<User size={20} />} title="个人信息" onClick={onUserInfo} />
            <MenuItem icon={<Headphones size={20} />} title="客服中心" />
            <MenuItem icon={<MapPin size={20} />} title="我的地址" onClick={onAddresses} />
        </div>

        <div className="bg-white rounded-[32px] shadow-sm overflow-hidden border border-gray-50/50">
            <MenuItem icon={<Gift size={20} />} title="积分商城" />
            <MenuItem icon={<CreditCard size={20} />} title="积分明细" onClick={onIntegralDetails} />
        </div>
      </div>
    </div>
  );
};

const MenuItem = ({ icon, title, onClick }: { icon: React.ReactNode, title: string, onClick?: () => void }) => (
  <button 
    onClick={onClick}
    className="w-full px-7 py-6 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 transition-all border-b last:border-b-0 border-gray-50"
  >
    <div className="flex items-center gap-5 text-gray-700">
      <div className="text-gray-300">{icon}</div>
      <span className="font-black text-sm tracking-tight">{title}</span>
    </div>
    <ChevronRight size={18} className="text-gray-200" />
  </button>
);

export default Profile;
