import React from 'react';
import { Sparkles, GraduationCap } from 'lucide-react';

interface HeaderProps {
  onOpenTopicList: () => void;
  selectedGrade: string;
  onSelectGrade: (grade: string) => void;
  completedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenTopicList,
  selectedGrade,
  onSelectGrade,
  completedCount
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Google 4-color top hairline accent */}
      <div className="h-[3px] w-full flex">
        <div className="h-full flex-1 bg-[#4285F4]" />
        <div className="h-full flex-1 bg-[#EA4335]" />
        <div className="h-full flex-1 bg-[#FBBC05]" />
        <div className="h-full flex-1 bg-[#34A853]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Brand title, one line */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-2 text-slate-900 group">
            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 transition-transform group-hover:scale-105">
              <GraduationCap className="w-5 h-5 text-[#1A73E8]" />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900">
              Belajar Cara Kamu <span className="font-normal text-slate-500 text-sm">| SMP</span>
            </span>
          </a>
        </div>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => onSelectGrade('Semua')}
            className={`transition-colors hover:text-slate-900 ${selectedGrade === 'Semua' ? 'text-blue-600 font-semibold' : ''}`}
          >
            Semua Modul
          </button>
          <button
            onClick={() => onSelectGrade('Kelas 7')}
            className={`transition-colors hover:text-slate-900 ${selectedGrade === 'Kelas 7' ? 'text-blue-600 font-semibold' : ''}`}
          >
            Kelas 7
          </button>
          <button
            onClick={() => onSelectGrade('Kelas 8')}
            className={`transition-colors hover:text-slate-900 ${selectedGrade === 'Kelas 8' ? 'text-blue-600 font-semibold' : ''}`}
          >
            Kelas 8
          </button>
          <button
            onClick={() => onSelectGrade('Kelas 9')}
            className={`transition-colors hover:text-slate-900 ${selectedGrade === 'Kelas 9' ? 'text-blue-600 font-semibold' : ''}`}
          >
            Kelas 9
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-xs text-slate-600 font-medium">
            <span>Selesai:</span>
            <span className="font-bold text-slate-900 tabular-nums">{completedCount}</span>
            <span>materi</span>
          </div>

          <button
            onClick={onOpenTopicList}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#1A73E8] hover:bg-[#1557B0] transition-colors rounded-lg shadow-sm whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pilih Topik SMP</span>
          </button>
        </div>
      </div>
    </header>
  );
};
