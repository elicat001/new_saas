
import React from 'react';
import { ChevronLeft, ChevronRight, Edit3 } from 'lucide-react';

interface UserInfoProps {
  onBack: () => void;
}

const UserInfo: React.FC<UserInfoProps> = ({ onBack }) => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col pb-10">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 flex items-center justify-between sticky top-0 z-10">
        <button onClick={onBack} className="p-2 -ml-2"><ChevronLeft size={24} /></button>
        <span className="font-bold">个人信息</span>
        <div className="w-8"></div>
      </div>

      <div className="flex-1 flex flex-col p-4">
        {/* Avatar Section */}
        <div className="relative mx-auto mt-6 mb-12">
            <div className="w-24 h-24 rounded-full bg-gray-200 border-4 border-white shadow-sm overflow-hidden">
                <img src="https://picsum.photos/seed/profile-user/200/200" className="w-full h-full object-cover" />
            </div>
            <button className="absolute bottom-0 right-0 bg-[#f7e28b] p-1.5 rounded-full border-2 border-white shadow-sm">
                <Edit3 size={14} />
            </button>
        </div>

        <div className="text-center text-sm font-bold text-gray-800 mb-8">ID:121580410</div>

        {/* Info Form */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-4">
            <div className="p-5 flex items-center justify-between border-b border-gray-50">
                <span className="text-sm font-medium text-gray-500">昵称</span>
                <span className="text-sm font-bold">粒</span>
            </div>
            <div className="p-5 flex items-center justify-between border-b border-gray-50">
                <span className="text-sm font-medium text-gray-500">性别</span>
                <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <div className="w-4 h-4 rounded-full border-2 border-gray-200"></div>
                        <span className="text-sm">男</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <div className="w-4 h-4 rounded-full border-2 border-[#f7e28b] flex items-center justify-center">
                            <div className="w-2 h-2 bg-[#f7e28b] rounded-full"></div>
                        </div>
                        <span className="text-sm">女</span>
                    </label>
                </div>
            </div>
            <div className="p-5 flex items-center justify-between border-b border-gray-50">
                <span className="text-sm font-medium text-gray-500">手机号码</span>
                <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">18826574331</span>
                    <button className="text-[10px] bg-gray-100 px-2 py-1 rounded border border-gray-200 font-bold">更换</button>
                </div>
            </div>
            <div className="p-5 flex items-center justify-between border-b border-gray-50">
                <span className="text-sm font-medium text-gray-500">生日</span>
                <span className="text-sm text-gray-400 font-bold">请设置</span>
            </div>
            <div className="p-5 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">我的地址</span>
                <ChevronRight size={16} className="text-gray-300" />
            </div>
        </div>

        <div className="bg-gray-100/50 p-4 rounded-xl text-[10px] text-gray-400 flex justify-between items-center mb-4">
           <span>生日仅设置一次，设置后可参与生日有礼</span>
           <span className="text-[#c7b25b] font-bold">去看看</span>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-4">
            <div className="p-5 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">当前余额</span>
                <div className="flex items-center gap-1 text-sm font-bold">
                    ¥ 0.00 <ChevronRight size={16} className="text-gray-300" />
                </div>
            </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
            <div className="p-5 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">安全设置</span>
                <ChevronRight size={16} className="text-gray-300" />
            </div>
        </div>

        <button className="w-full bg-[#f7e28b] py-4 rounded-full font-bold shadow-sm">
            保存
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
