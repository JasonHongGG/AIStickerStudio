import React, { useRef } from 'react';
import { Upload, RefreshCw } from 'lucide-react';

interface UploadSectionProps {
  image: File | null;
  onUpload: (file: File) => void;
}

export const UploadSection: React.FC<UploadSectionProps> = ({ image, onUpload }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
      <h2 className="text-lg font-bold mb-4 flex items-center">
        <span className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">1</span>
        上傳參考照片
      </h2>

      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={inputRef} 
        className="hidden" 
        accept="image/png, image/jpeg, image/webp"
        onChange={handleFileChange}
      />

      {!image ? (
        <div 
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-10 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors h-64"
        >
          <Upload className="w-12 h-12 text-gray-400 mb-2" />
          <p className="text-gray-500 font-medium">點擊上傳照片</p>
          <p className="text-gray-400 text-sm mt-1">人物、寵物或物品</p>
        </div>
      ) : (
        <div 
          className="relative border border-gray-200 rounded-lg bg-gray-50 group overflow-hidden cursor-pointer h-64 flex items-center justify-center"
          onClick={() => inputRef.current?.click()}
        >
          <img 
            src={URL.createObjectURL(image)} 
            alt="Uploaded" 
            className="w-full h-full object-contain"
          />
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[2px]">
             <RefreshCw className="text-white w-8 h-8 mb-2 drop-shadow-lg" />
             <span className="text-white font-bold text-sm tracking-wide drop-shadow-md border border-white/50 px-3 py-1 rounded-full bg-white/10">
               更換照片
             </span>
          </div>
        </div>
      )}
      
      <div className="mt-3 text-center">
        <p className="text-gray-400 text-xs">請上傳角色圖片（僅限一張）</p>
      </div>
    </div>
  );
};