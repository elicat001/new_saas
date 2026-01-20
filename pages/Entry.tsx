
import React from 'react';
import { Scan, Info } from 'lucide-react';

interface EntryProps {
  onScan: (scene: string) => void;
}

const Entry: React.FC<EntryProps> = ({ onScan }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center p-10 bg-white">
      <div className="w-32 h-32 bg-[#F8F8F8] rounded-[40px] flex items-center justify-center mb-8 shadow-sm">
        <Scan size={48} className="text-gray-300" />
      </div>
      <h1 className="text-2xl font-black mb-4">棠小一点餐系统</h1>
      <p className="text-center text-sm text-gray-400 font-bold leading-relaxed mb-12">
        欢迎使用。请扫描桌位码或门店码开始点餐。
      </p>
      
      <button 
        onClick={() => onScan('SCENE_888')}
        className="w-full bg-[#f7e28b] py-5 rounded-[24px] border border-[#d4b945] font-black text-lg shadow-xl active-scale flex items-center justify-center gap-3"
      >
        <Scan size={24} strokeWidth={3} />
        扫描桌码
      </button>

      <div className="mt-10 flex items-center gap-2 text-gray-300 text-[10px] font-black tracking-widest uppercase">
        <Info size={12} />
        <span>由 SaaS 系统加密保护</span>
      </div>
    </div>
  );
};

export default Entry;
