
import React, { useState, useRef } from 'react';
import { ChevronLeft, Camera, Check, Loader2, X, RotateCw } from 'lucide-react';
import { MerchantConfig } from '../types';

interface UserInfoProps {
  onBack: () => void;
  merchant: MerchantConfig;
}

const UserInfo: React.FC<UserInfoProps> = ({ onBack, merchant }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [avatar, setAvatar] = useState("https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&h=300&fit=crop");
  const [formData, setFormData] = useState({
    nickname: '粒',
    gender: '女',
    phone: '188****4331',
    birthday: ''
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    setShowCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' }, 
        audio: false 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("无法访问相机，请检查权限设置。");
      setShowCamera(false);
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    stream?.getTracks().forEach(track => track.stop());
    setShowCamera(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        const imageData = canvasRef.current.toDataURL('image/png');
        setAvatar(imageData);
        stopCamera();
      }
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      onBack();
    }, 1500);
  };

  return (
    <div className="bg-[#F8F8F8] min-h-screen flex flex-col pb-10 relative">
      <div className="bg-white px-5 pt-16 pb-4 flex items-center justify-between sticky top-0 z-50 border-b border-gray-50">
        <button onClick={onBack} className="w-10 h-10 bg-gray-50 border border-gray-200 rounded-[16px] hover:bg-gray-100 flex items-center justify-center active-scale transition-all">
          <ChevronLeft size={22} />
        </button>
        <span className="font-black text-lg tracking-tight text-black">个人信息</span>
        <div className="w-10"></div>
      </div>

      <div className="flex-1 flex flex-col p-6">
        <div className="flex flex-col items-center mt-8 mb-12">
            <div className="relative active-scale" onClick={startCamera}>
                <div className="w-28 h-28 rounded-full bg-white border-[6px] border-white shadow-xl overflow-hidden">
                    <img src={avatar} className="w-full h-full object-cover" alt="Avatar" />
                </div>
                <button className="absolute bottom-1 right-1 text-black p-2.5 rounded-full border-4 border-white shadow-lg" style={{ backgroundColor: merchant.theme.primary }}>
                    <Camera size={16} />
                </button>
            </div>
            <div className="mt-6 text-[10px] text-gray-300 font-black tracking-[0.2em] uppercase">Member ID: 88120410</div>
        </div>

        <div className="bg-white rounded-[40px] shadow-soft overflow-hidden mb-6">
            <InfoItem label="昵称" value={formData.nickname} />
            
            <div className="px-8 py-6 flex items-center justify-between border-b border-gray-50">
                <span className="text-[13px] font-black text-gray-400 uppercase tracking-wider">性别</span>
                <div className="flex gap-4">
                    {['男', '女'].map(g => (
                      <button 
                        key={g}
                        onClick={() => setFormData({...formData, gender: g})}
                        className={`px-6 py-2 rounded-full text-xs font-black transition-all ${formData.gender === g ? 'text-black shadow-md' : 'bg-gray-50 border border-gray-200 hover:bg-gray-100 text-gray-300'}`}
                        style={formData.gender === g ? { backgroundColor: merchant.theme.primary } : {}}
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
           <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${merchant.theme.primary}33`, color: merchant.theme.secondary }}>
              <Check size={20} strokeWidth={3} />
           </div>
           <p className="text-[10px] text-gray-400 font-bold leading-relaxed flex-1">
             生日仅可设置一次，设置后可参与<span className="text-black font-black">生日有礼</span>活动。
           </p>
        </div>

        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="w-full py-6 rounded-[24px] border border-[var(--brand-secondary)] font-black text-lg bg-brand text-black shadow-xl active-scale flex items-center justify-center gap-3 transition-all"
          style={{ backgroundColor: merchant.theme.primary, boxShadow: `0 15px 30px -5px ${merchant.theme.primary}40` }}
        >
            {isSaving ? <Loader2 size={24} className="animate-spin" /> : '保存修改'}
        </button>
      </div>

      {showCamera && (
        <div className="fixed inset-0 bg-black z-[200] flex flex-col items-center justify-between py-20 animate-in fade-in duration-300">
          <div className="w-full px-6 flex justify-between items-center text-white">
            <button onClick={stopCamera} className="p-4 bg-white/10 rounded-full backdrop-blur-md active-scale">
              <X size={24} />
            </button>
            <span className="font-black tracking-widest uppercase text-xs">Capture Photo</span>
            <div className="w-12"></div>
          </div>

          <div className="relative w-[80vw] aspect-square rounded-[48px] overflow-hidden border-4 border-white/20 shadow-2xl">
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              className="w-full h-full object-cover scale-x-[-1]"
            />
            <div className="absolute inset-0 border-[24px] border-black/40 pointer-events-none"></div>
          </div>

          <div className="flex flex-col items-center gap-8">
            <button 
              onClick={capturePhoto}
              className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl active-scale"
            >
              <div className="w-16 h-16 rounded-full border-4 border-black"></div>
            </button>
            <p className="text-white/40 text-[10px] font-black tracking-[0.2em] uppercase">Center your face in the frame</p>
          </div>
          
          <canvas ref={canvasRef} className="hidden" />
        </div>
      )}
    </div>
  );
};

const InfoItem = ({ label, value, canChange }: any) => (
  <div className="px-8 py-6 flex items-center justify-between border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
      <span className="text-[13px] font-black text-gray-400 uppercase tracking-wider">{label}</span>
      <div className="flex items-center gap-3">
          <span className="text-sm font-black text-black">{value}</span>
          {canChange && <button className="text-[9px] bg-gray-50 border border-gray-200 hover:bg-gray-100 px-2.5 py-1 rounded-lg font-black text-gray-400 active-scale transition-all">更换</button>}
      </div>
  </div>
);

export default UserInfo;
