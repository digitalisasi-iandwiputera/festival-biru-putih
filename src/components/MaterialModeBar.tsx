import React from 'react';
import { LearningFormat } from '../types';
import { FileText, Headphones, Video, Presentation, Layers, GitBranch } from 'lucide-react';

interface MaterialModeBarProps {
  activeFormat: LearningFormat;
  onChangeFormat: (format: LearningFormat) => void;
}

export const MaterialModeBar: React.FC<MaterialModeBarProps> = ({
  activeFormat,
  onChangeFormat,
}) => {
  const tabs = [
    {
      id: 'text' as LearningFormat,
      label: 'Teks Imersif',
      icon: (isActive: boolean) => (
        <FileText className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#111113]'}`} />
      )
    },
    {
      id: 'audio' as LearningFormat,
      label: 'Podcast Materi',
      icon: (isActive: boolean) => (
        <Headphones className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#111113]'}`} />
      )
    },
    {
      id: 'video' as LearningFormat,
      label: 'Video Materi',
      icon: (isActive: boolean) => (
        <Video className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#111113]'}`} />
      )
    },
    {
      id: 'slides' as LearningFormat,
      label: 'Slide Materi',
      icon: (isActive: boolean) => (
        <Presentation className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#111113]'}`} />
      )
    },
    {
      id: 'flashcards' as LearningFormat,
      label: 'Kartu Tanya Jawab',
      icon: (isActive: boolean) => (
        <Layers className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#111113]'}`} />
      )
    },
    {
      id: 'mindmap' as LearningFormat,
      label: 'Peta Pikiran',
      icon: (isActive: boolean) => (
        <GitBranch className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#111113]'}`} />
      )
    }
  ];

  return (
    <nav aria-label="Format Belajar" className="w-full bg-[#F8F7F4] px-4 sm:px-8 lg:px-12 pt-2 pb-2.5 lg:pb-3">
      <div className="max-w-[1500px] mx-auto">
        <div className="bg-white border-2 border-[#111113] shadow-[3px_3px_0_#111113] p-1.5">
          <div className="flex items-center justify-center flex-wrap gap-1.5 sm:gap-2">
            {tabs.map((tab) => {
              const isActive = activeFormat === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onChangeFormat(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 font-display text-xs sm:text-[13px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#EA580C] text-white border-2 border-[#111113] shadow-[2px_2px_0_#111113]'
                      : 'text-[#111113] hover:bg-[#111113]/5 border-2 border-transparent'
                  }`}
                >
                  {tab.icon(isActive)}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};
