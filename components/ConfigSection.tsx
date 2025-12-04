import React, { useState } from 'react';
import { STYLES, EXPRESSIONS } from '../constants';
import { Check, Square, CheckSquare, FolderOpen, ChevronDown, Plus, Palette } from 'lucide-react';
import { StickerPackInfo } from '../types';

interface ConfigSectionProps {
  selectedStyle: string;
  onStyleChange: (id: string) => void;
  selectedExpressions: string[];
  onExpressionToggle: (id: string) => void;
  onSelectAllExpressions: (select: boolean) => void;
  customExpressionText: string;
  onCustomExpressionChange: (text: string) => void;
  themeText: string;
  onThemeChange: (text: string) => void;
  
  // Pack Management
  existingPacks: StickerPackInfo[];
  targetPackId: string; // 'new' or UUID
  onTargetPackIdChange: (id: string) => void;
  newPackName: string;
  onNewPackNameChange: (name: string) => void;
}

export const ConfigSection: React.FC<ConfigSectionProps> = ({
  selectedStyle,
  onStyleChange,
  selectedExpressions,
  onExpressionToggle,
  onSelectAllExpressions,
  customExpressionText,
  onCustomExpressionChange,
  themeText,
  onThemeChange,
  existingPacks,
  targetPackId,
  onTargetPackIdChange,
  newPackName,
  onNewPackNameChange
}) => {
  const [isPackDropdownOpen, setIsPackDropdownOpen] = useState(false);
  const [isStyleDropdownOpen, setIsStyleDropdownOpen] = useState(false);
  
  const allSelected = selectedExpressions.length === EXPRESSIONS.length;

  // Calculate counts
  const customLines = customExpressionText.split('\n').filter(line => line.trim() !== '');
  const customCount = customLines.length;
  const totalCount = selectedExpressions.length + customCount;

  // Helper to get display name for custom dropdown
  const getSelectedPackName = () => {
    if (targetPackId === 'new') return '建立新貼圖包 (New Pack)';
    const pack = existingPacks.find(p => p.id === targetPackId);
    return pack ? pack.name : '選擇貼圖包';
  };

  const selectedStyleName = STYLES.find(s => s.id === selectedStyle)?.name || '選擇風格';

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
       <div className="flex justify-between items-center mb-4">
         <h2 className="text-lg font-bold flex items-center">
          <span className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">2</span>
          設定風格與表情
        </h2>
        {totalCount > 0 && (
          <span className="text-sm font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            預計生成 {totalCount} 張
          </span>
        )}
       </div>

      {/* Target Pack Selection - Custom Modern Dropdown */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
            <FolderOpen size={16} className="text-amber-500" />
            存放位置 (貼圖包)
        </label>
        
        <div className="relative">
            {/* Trigger Button */}
            <button 
                type="button"
                onClick={() => {
                  setIsPackDropdownOpen(!isPackDropdownOpen);
                  setIsStyleDropdownOpen(false); // Close other dropdown
                }}
                className={`w-full bg-white border rounded-xl p-3 text-sm flex items-center justify-between transition-all duration-200 ${
                    isPackDropdownOpen 
                        ? 'border-amber-400 ring-4 ring-amber-100' 
                        : 'border-gray-300 hover:border-amber-300 hover:shadow-sm'
                }`}
            >
                <span className={`truncate font-medium ${targetPackId === 'new' ? 'text-blue-600' : 'text-gray-700'}`}>
                    {getSelectedPackName()}
                </span>
                <ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${isPackDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Backdrop */}
            {isPackDropdownOpen && (
                <div className="fixed inset-0 z-10 cursor-default" onClick={() => setIsPackDropdownOpen(false)} />
            )}

            {/* Dropdown Menu */}
            {isPackDropdownOpen && (
                <div className="absolute z-20 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl max-h-60 overflow-y-auto animate-in fade-in zoom-in-95 duration-100 scrollbar-thin">
                    <button
                        type="button"
                        onClick={() => {
                            onTargetPackIdChange('new');
                            setIsPackDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-sm flex items-center gap-2 hover:bg-blue-50 transition-colors border-b border-gray-50 ${
                            targetPackId === 'new' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-blue-600'
                        }`}
                    >
                        <div className="bg-blue-100 p-1 rounded-md">
                            <Plus size={14} />
                        </div>
                        建立新貼圖包 (New Pack)
                        {targetPackId === 'new' && <Check size={14} className="ml-auto" />}
                    </button>
                    
                    {existingPacks.length > 0 && (
                        <div className="py-2">
                            <div className="px-4 py-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider">現有貼圖包</div>
                            {existingPacks.map(pack => (
                                <button
                                    key={pack.id}
                                    type="button"
                                    onClick={() => {
                                        onTargetPackIdChange(pack.id);
                                        setIsPackDropdownOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 transition-colors ${
                                        targetPackId === pack.id 
                                            ? 'bg-amber-50 text-amber-900 font-bold' 
                                            : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    <FolderOpen size={14} className={targetPackId === pack.id ? 'text-amber-500' : 'text-gray-400'} />
                                    <span className="truncate flex-1">{pack.name}</span>
                                    {targetPackId === pack.id && <Check size={14} className="text-amber-600" />}
                                </button>
                            ))}
                        </div>
                    )}
                    
                    {existingPacks.length === 0 && (
                         <div className="px-4 py-3 text-sm text-gray-400 text-center italic">
                            尚無歷史貼圖包
                         </div>
                    )}
                </div>
            )}
        </div>

        {targetPackId === 'new' && (
            <div className="animate-in fade-in slide-in-from-top-1 duration-200 mt-3">
                <input 
                    type="text"
                    value={newPackName}
                    onChange={(e) => onNewPackNameChange(e.target.value)}
                    placeholder="輸入新貼圖包名稱 (例: 龍年賀歲)"
                    className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:border-amber-400 focus:ring-4 focus:ring-amber-100 outline-none bg-white placeholder-gray-400 transition-all shadow-sm"
                    autoFocus
                />
            </div>
        )}
      </div>

      {/* Style Selection - Custom Modern Dropdown */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">藝術風格</label>
        
        <div className="relative">
            {/* Trigger Button */}
            <button 
                type="button"
                onClick={() => {
                  setIsStyleDropdownOpen(!isStyleDropdownOpen);
                  setIsPackDropdownOpen(false); // Close other dropdown
                }}
                className={`w-full bg-white border rounded-xl p-3 text-sm flex items-center justify-between transition-all duration-200 ${
                    isStyleDropdownOpen 
                        ? 'border-amber-400 ring-4 ring-amber-100' 
                        : 'border-gray-300 hover:border-amber-300 hover:shadow-sm'
                }`}
            >
                <div className="flex items-center gap-2">
                   <Palette size={16} className="text-gray-400" />
                   <span className="truncate font-medium text-gray-700">
                      {selectedStyleName}
                   </span>
                </div>
                <ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${isStyleDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Backdrop */}
            {isStyleDropdownOpen && (
                <div className="fixed inset-0 z-10 cursor-default" onClick={() => setIsStyleDropdownOpen(false)} />
            )}

            {/* Dropdown Menu */}
            {isStyleDropdownOpen && (
                <div className="absolute z-20 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl max-h-60 overflow-y-auto animate-in fade-in zoom-in-95 duration-100 scrollbar-thin">
                    <div className="py-2">
                        {STYLES.map((style) => (
                            <button
                                key={style.id}
                                type="button"
                                onClick={() => {
                                    onStyleChange(style.id);
                                    setIsStyleDropdownOpen(false);
                                }}
                                className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 transition-colors ${
                                    selectedStyle === style.id 
                                        ? 'bg-amber-50 text-amber-900 font-bold' 
                                        : 'text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                <span className="truncate flex-1">{style.name}</span>
                                {selectedStyle === style.id && <Check size={14} className="text-amber-600" />}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
      </div>

      {/* Expression Selection */}
      <div className="mb-6">
        <div className="flex justify-between items-end mb-2">
            <div className="flex items-center gap-2">
                <label className="block text-sm font-medium text-gray-700">預設表情動作</label>
                <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                    {selectedExpressions.length} 張
                </span>
            </div>
            <button 
                onClick={() => onSelectAllExpressions(!allSelected)}
                className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 font-medium transition-colors"
            >
                {allSelected ? <CheckSquare size={14} /> : <Square size={14} />}
                {allSelected ? '取消全選' : '全選'}
            </button>
        </div>
        
        <div className="grid grid-cols-2 gap-2 max-h-80 overflow-y-auto pr-1 custom-scrollbar">
          {EXPRESSIONS.map((exp) => {
            const isSelected = selectedExpressions.includes(exp.id);
            return (
              <button
                key={exp.id}
                onClick={() => onExpressionToggle(exp.id)}
                className={`text-left px-3 py-2.5 rounded-lg text-xs transition-all flex items-center justify-between border shadow-sm duration-200 ${
                  isSelected 
                    ? 'bg-amber-50 border-amber-400 text-amber-900 font-bold shadow-amber-100' 
                    : 'bg-white border-gray-100 text-gray-600 hover:bg-gray-50 hover:border-gray-300'
                }`}
              >
                <span className="truncate mr-1">{exp.name}</span>
                {isSelected && <Check size={14} className="text-amber-600" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom Expressions */}
      <div className="mb-6 p-4 bg-amber-50 rounded-xl border border-amber-100">
        <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-bold text-amber-900">✨ 自訂台詞 / 動作</label>
            {customCount > 0 && (
                <span className="text-xs font-bold text-amber-700 bg-white/60 px-2 py-0.5 rounded-full shadow-sm">
                    {customCount} 張
                </span>
            )}
        </div>
        <textarea
          value={customExpressionText}
          onChange={(e) => onCustomExpressionChange(e.target.value)}
          placeholder="輸入想要貼圖說的話或是動作&#10;寶寶成交！&#10;車還在嗎？&#10;開心跳躍"
          className="w-full h-24 p-3 text-sm border border-amber-200 rounded-lg focus:border-amber-400 focus:ring-4 focus:ring-amber-100/50 outline-none resize-none bg-white placeholder-gray-400 transition-all"
        />
        <p className="text-xs text-amber-700/70 mt-2">直接寫出貼圖的對白或動作，一行 = 一張貼圖</p>
      </div>

      {/* Theme */}
      <div className="mb-0">
        <label className="block text-sm font-medium text-gray-700 mb-2">🎁 特輯企劃 / 主題 (選填)</label>
        <input
          type="text"
          value={themeText}
          onChange={(e) => onThemeChange(e.target.value)}
          placeholder="例如：聖誕節、新年、職場厭世..."
          className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:border-amber-400 focus:ring-4 focus:ring-amber-100 outline-none bg-white transition-all hover:border-amber-300"
        />
        <p className="text-xs text-gray-400 mt-1">AI 會自動為角色添加相關的服裝或道具。</p>
      </div>

    </div>
  );
};