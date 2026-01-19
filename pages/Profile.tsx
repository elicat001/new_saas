
import React from 'react';
import { ChevronRight, CreditCard, FileText, User, Headphones, MapPin, Gift } from 'lucide-react';

interface ProfileProps {
  onOrders: () => void;
  onUserInfo: () => void;
  onAddresses: () => void;
  onTopUp: () => void;
  onCoupons: () => void;
}

const Profile: React.FC<ProfileProps> = ({ onOrders, onUserInfo, onAddresses, onTopUp, onCoupons }) => {
  return (
    <div className="bg-gray-50 min-h-full">
      {/* Header with Gradient */}
      <div className="bg-[#f7e28b] pt-24 pb-16 px-6 flex flex-col items-center relative overflow-hidden">
        <div className="absolute top-10 left-6">
           <h1 className="text-3xl font-bold tracking-widest">棠小一<sup className="text-xs">®</sup></h1>
        </div>
        
        {/* User Card Overlay */}
        <div className="bg-white rounded-3xl p-6 w-full shadow-lg relative z-10 -mb-24 flex flex-col">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-gray-100 border-4 border-white shadow-sm overflow-hidden" onClick={onUserInfo}>
                        <img src="https://picsum.photos/seed/profile-user/200/200" alt="user" className="w-full h-full object-cover" />
                    </div>
                    <div onClick={onUserInfo}>
                        <div className="text-2xl font-bold">粒</div>
                        <div className="text-gray-400 text-sm mt-1">188****4331</div>
                    </div>
                </div>
                <div className="p-2 border border-gray-100 rounded-lg">
                    <div className="grid grid-cols-2 gap-1 w-8 h-8">
                        <div className="bg-gray-700"></div>
                        <div className="bg-gray-700"></div>
                        <div className="bg-gray-700"></div>
                        <div className="bg-gray-300"></div>
                    </div>
                </div>
            </div>

            <div className="flex justify-around items-center py-4 border-t border-gray-50">
                <div className="text-center cursor-pointer">
                    <div className="text-xs text-gray-500 font-bold mb-3">积分</div>
                    <div className="text-xl font-bold">19</div>
                </div>
                <div className="w-px h-12 bg-gray-100"></div>
                <div className="text-center cursor-pointer" onClick={onTopUp}>
                    <div className="text-xs text-gray-500 font-bold mb-3">余额</div>
                    <div className="text-xl font-bold">0.00</div>
                </div>
                <div className="w-px h-12 bg-gray-100"></div>
                <div className="text-center cursor-pointer" onClick={onCoupons}>
                    <div className="text-xs text-gray-500 font-bold mb-3">优惠券</div>
                    <div className="text-xl font-bold">0</div>
                </div>
            </div>
        </div>
      </div>

      {/* Menu List */}
      <div className="mt-20 px-4 space-y-3 pb-24">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <MenuItem icon={<FileText size={18} />} title="订单中心" onClick={onOrders} />
            <MenuItem icon={<User size={18} />} title="个人信息" onClick={onUserInfo} />
            <MenuItem icon={<Headphones size={18} />} title="客服中心" />
            <MenuItem icon={<MapPin size={18} />} title="我的地址" onClick={onAddresses} />
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <MenuItem icon={<Gift size={18} />} title="积分商城" />
        </div>
      </div>
    </div>
  );
};

const MenuItem = ({ icon, title, onClick }: { icon: React.ReactNode, title: string, onClick?: () => void }) => (
  <button 
    onClick={onClick}
    className="w-full px-5 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors border-b last:border-b-0 border-gray-50"
  >
    <div className="flex items-center gap-4 text-gray-700">
      <div className="text-gray-400">{icon}</div>
      <span className="font-bold text-sm">{title}</span>
    </div>
    <ChevronRight size={16} className="text-gray-300" />
  </button>
);

export default Profile;
