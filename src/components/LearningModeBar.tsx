import React from 'react';
import { LearningFormat } from '../types';
import { BookOpen, Volume2, Presentation, Network, HelpCircle, AlertCircle } from 'lucide-react';

interface LearningModeBarProps {
  activeFormat: LearningFormat;
  onChangeFormat: (format: LearningFormat) => void;
  gapCount: number;
}

export const LearningModeBar: React.FC<LearningModeBarProps> = ({
  activeFormat,
  onChangeFormat,
  gapCount
}) => {
  const formats: {
    id: LearningFormat;
    label: string;
    description: string;
    icon: React.ReactNode;
    color: string;
  }[] = [
    {
      id: 'text',
      label: 'Teks Imersif',
      description: 'Baca bertahap dengan ilustrasi & mini kuis',
      icon: <BookOpen className="w-4 h-4" />,
      color: 'blue'
    },
    {
      id: 'audio',
      label: 'Pelajaran Audio',
      description: 'Simulasi percakapan santai Guru & Siswa',
      icon: <Volume2 className="w-4 h-4" />,
      color: 'amber'
    },
    {
      id: 'slides',
      label: 'Slide Bersuara',
      description: 'Presentasi visual poin inti berfasilitas narasi',
      icon: <Presentation className="w-4 h-4" />,
      color: 'emerald'
    },
    {
      id: 'mindmap',
      label: 'Peta Konsep',
      description: 'Eksplorasi jaring hubungan materi interaktif',
      icon: <Network className="w-4 h-4" />,
      color: 'purple'
    },
    {
      id: 'quiz',
      label: 'Uji Pemahaman',
      description: 'Deteksi & analisis celah materi yang sulit',
      icon: <HelpCircle className="w-4 h-4" />,
      color: 'rose'
    }
  ];

  return (
    <div className="w-full bg-white border-y border-slate-200 sticky top-16 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center overflow-x-auto no-scrollbar py-2.5 gap-2 sm:gap-3">
          {formats.map((fmt) => {
            const isActive = activeFormat === fmt.id;

            return (
              <button
                key={fmt.id}
                onClick={() => onChangeFormat(fmt.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-600/20'
                    : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700 hover:text-slate-900'
                }`}
              >
                <span className={`${isActive ? 'text-white' : 'text-slate-500'}`}>
                  {fmt.icon}
                </span>
                <span>{fmt.label}</span>

                {fmt.id === 'quiz' && gapCount > 0 && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold flex items-center gap-1 ${
                    isActive ? 'bg-white text-rose-600' : 'bg-rose-100 text-rose-700'
                  }`}>
                    <AlertCircle className="w-3 h-3" />
                    <span>{gapCount} celah</span>
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
