import React from 'react';
import { LayoutGrid, BookOpen, Home } from 'lucide-react';

interface MaterialHeaderProps {
  onBackToHome: () => void;
  onBackToCatalog?: () => void;
  topicTitle: string;
  grade: string;
  subject: string;
  domain?: string;
  onOpenSourceModal?: () => void;
}

export const MaterialHeader: React.FC<MaterialHeaderProps> = ({
  onBackToHome,
  onBackToCatalog,
  topicTitle,
  grade,
  subject,
  domain,
  onOpenSourceModal
}) => {
  return (
    <header className="w-full bg-[#F8F7F4] py-2 sm:py-2.5 px-6 sm:px-10 lg:px-12 border-b-2 border-[#111113]">
      <div className="max-w-[1500px] mx-auto flex items-center justify-between gap-4">
        {/* Left: Topic Title (Clean, without INFORMATIKA.DEV //) */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToCatalog || onBackToHome}
            className="flex items-center gap-2 text-left group cursor-pointer focus:outline-none"
            title="Kembali ke Katalog Materi"
          >
            <h1 className="font-display text-lg sm:text-xl font-bold uppercase tracking-tight text-[#111113] group-hover:text-[#EA580C] transition-colors m-0">
              {topicTitle}
            </h1>
          </button>
        </div>

        {/* Center: Metadata */}
        <div className="hidden md:flex items-center gap-2">
          <span className="label-mono text-xs text-[#EA580C] font-bold">{domain || subject}</span>
          <span className="label-mono text-xs text-[#111113]/40">·</span>
          <span className="label-mono text-xs text-[#111113]/70 font-bold">{grade}</span>
        </div>

        {/* Right: Icon-only Navigation Actions (Minimal distraction) */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Ikon Katalog Materi */}
          <button
            onClick={onBackToCatalog || onBackToHome}
            className="p-2 bg-white border-2 border-[#111113] text-[#111113] hover:bg-[#EA580C] hover:text-white shadow-[2px_2px_0_#111113] transition-all active:translate-x-0.5 active:translate-y-0.5 cursor-pointer flex items-center justify-center"
            title="Katalog Materi"
            aria-label="Katalog Materi"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>

          {/* Ikon Buku Sumber */}
          <button
            onClick={onOpenSourceModal}
            className="p-2 bg-white border-2 border-[#111113] text-[#111113] hover:bg-[#111113] hover:text-[#F8F7F4] shadow-[2px_2px_0_#111113] transition-all active:translate-x-0.5 active:translate-y-0.5 cursor-pointer flex items-center justify-center"
            title="Buku Sumber Belajar Resmi (PDF)"
            aria-label="Buku Sumber Belajar Resmi"
          >
            <BookOpen className="w-4 h-4" />
          </button>

          {/* Ikon Beranda */}
          <button
            onClick={onBackToHome}
            className="p-2 bg-white border-2 border-[#111113] text-[#111113] hover:bg-[#111113] hover:text-[#F8F7F4] shadow-[2px_2px_0_#111113] transition-all active:translate-x-0.5 active:translate-y-0.5 cursor-pointer flex items-center justify-center"
            title="Beranda"
            aria-label="Beranda"
          >
            <Home className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
