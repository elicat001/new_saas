
import React, { useState } from 'react';
import { ChevronLeft, Camera, Check, Loader2 } from 'lucide-react';

interface UserInfoProps {
  onBack: () => void;
}

const UserInfo: React.FC<UserInfoProps> = ({ onBack }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    nickname: '粒',
    gender: '女',
    phone: '188****4331',
    birthday: ''
  });

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      onBack();
    }, 1500);
  };

  return (
    <div className="bg-[#F8F8F8] min-h-screen flex flex-col pb-10">
      {/* Header */}
      <div className="bg-white px-5 pt-16 pb-4 flex items-center justify-between sticky top-0 z-50 border-b border-gray-50">
        <button onClick={onBack} className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center active-scale"><ChevronLeft size={22} /></button>
        <span className="font-black text-lg tracking-tight text-black">个人信息</span>
        <div className="w-10"></div>
      </div>

      <div className="flex-1 flex flex-col p-6">
        {/* Avatar Section */}
        <div className="flex flex-col items-center mt-8 mb-12">
            <div className="relative active-scale">
                <div className="w-28 h-28 rounded-full bg-white border-[6px] border-white shadow-xl overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&h=300&fit=crop" className="w-full h-full object-cover" />
                </div>
                <button className="absolute bottom-1 right-1 bg-black text-[#f7e28b] p-2.5 rounded-full border-4 border-white shadow-lg">
                    <Camera size={16} />
                </button>
            </div>
            <div className="mt-6 text-[10px] text-gray-300 font-black tracking-[0.2em] uppercase">Member ID: 88120410</div>
        </div>

        {/* Info Form */}
        <div className="bg-white rounded-[40px] shadow-soft overflow-hidden mb-6">
            <InfoItem label="昵称" value={formData.nickname} />
            
            <div className="px-8 py-6 flex items-center justify-between border-b border-gray-50">
                <span className="text-[13px] font-black text-gray-400 uppercase tracking-wider">性别</span>
                <div className="flex gap-4">
                    {['男', '女'].map(g => (
                      <button 
                        key={g}
                        onClick={() => setFormData({...formData, gender: g})}
                        className={`px-6 py-2 rounded-full text-xs font-black transition-all ${formData.gender === g ? 'bg-[#f7e28b] text-black shadow-md' : 'bg-gray-50 text-gray-300'}`}
                      >
                        {g}
                      </button>
                    ))}
                </div>
            </div>

            <InfoItem label="手机号码" value={formData.phone} canChange />
            
            <div className="px-8 py-6 flex items-center justify-between">
                <span className="text-[13px] font-black text-gray-400 uppercase tracking-wider">生日</span>
                <input 
                  type="date" 
                  className="text-sm font-black text-right bg-transparent outline-none focus:text-[#d4b945]" 
                  placeholder="请设置"
                  onChange={(e) => setFormData({...formData, birthday: e.target.value})}
                />
            </div>
        </div>

        <div className="bg-white/60 border border-white rounded-[24px] p-5 flex items-center gap-4 mb-10">
           <div className="w-10 h-10 bg-[#f7e28b]/20 rounded-2xl flex items-center justify-center text-[#d4b945]">
              <Check size={20} strokeWidth={3} />
           </div>
           <p className="text-[10px] text-gray-400 font-bold leading-relaxed flex-1">
             生日仅可设置一次，设置后可参与<span className="text-black font-black">生日有礼</span>活动。
           </p>
        </div>

        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="w-full bg-[#f7e28b] py-6 rounded-[28px] font-black text-lg shadow-xl shadow-brand-yellow/30 active-scale flex items-center justify-center gap-3"
        >
            {isSaving ? <Loader2 size={24} className="animate-spin" /> : '保存修改'}
        </button>
      </div>
    </div>
  );
};

const InfoItem = ({ label, value, canChange }: any) => (
  <div className="px-8 py-6 flex items-center justify-between border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
      <span className="text-[13px] font-black text-gray-400 uppercase tracking-wider">{label}</span>
      <div className="flex items-center gap-3">
          <span className="text-sm font-black text-black">{value}</span>
          {canChange && <button className="text-[9px] bg-gray-100 px-2.5 py-1 rounded-lg font-black text-gray-400 border border-gray-200">更换</button>}
      </div>
  </div>
);

export default UserInfo;
