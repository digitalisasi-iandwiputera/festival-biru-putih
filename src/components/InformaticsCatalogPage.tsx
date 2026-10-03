import React, { useState } from 'react';
import { Topic, LearningFormat } from '../types';
import { ArrowLeft, Home, Search, X } from 'lucide-react';
import { TopicThumbnailIllustration } from './TopicThumbnailIllustration';

interface InformaticsCatalogPageProps {
  topics: Topic[];
  onBackToHome: () => void;
  onSelectTopic: (topic: Topic, format?: LearningFormat) => void;
}

export const InformaticsCatalogPage: React.FC<InformaticsCatalogPageProps> = ({
  topics,
  onBackToHome,
  onSelectTopic
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<string>('Semua');

  // Filter specifically to Informatics topics
  const informaticsTopics = topics.filter(t => t.subject === 'Informatika');

  const filteredTopics = informaticsTopics.filter(t => {
    if (activeFilter !== 'Semua') {
      if (activeFilter === 'Berpikir Komputasional' && !t.title.toLowerCase().includes('berpikir')) {
        return false;
      }
      if (activeFilter === 'Jejak Bermedia Digital' && !t.title.toLowerCase().includes('jejak')) {
        return false;
      }
      if (activeFilter === 'Analisis Data' && !t.title.toLowerCase().includes('analisis')) {
        return false;
      }
    }

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      t.title.toLowerCase().includes(q) ||
      t.shortDesc.toLowerCase().includes(q) ||
      t.coreQuestion.toLowerCase().includes(q) ||
      t.conceptTag.toLowerCase().includes(q)
    );
  });

  const filterOptions = [
    'Semua',
    'Berpikir Komputasional',
    'Jejak Bermedia Digital',
    'Analisis Data'
  ];

  return (
    <div className="min-h-screen bg-[#F8F7F4] text-[#111113] flex flex-col font-sans selection:bg-[#EA580C] selection:text-[#F8F7F4]">
      {/* Top Navigation Bar - Neo-Brutalist Header */}
      <header className="sticky top-0 z-30 w-full bg-[#F8F7F4] border-b-2 border-[#111113] py-3 px-6 sm:px-10 lg:px-12">
        <div className="max-w-[1500px] mx-auto flex items-center justify-between gap-4">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white text-[#111113] border-2 border-[#111113] shadow-[3px_3px_0_#111113] hover:bg-[#EA580C] hover:border-[#111113] hover:text-white transition-all cursor-pointer active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            title="Kembali ke Beranda"
            aria-label="Kembali ke Beranda"
          >
            <ArrowLeft className="w-4 h-4" />
            <Home className="w-4 h-4" />
          </button>

          <div className="label-mono text-xs font-bold text-[#111113]/70">
            SMP KURIKULUM MERDEKA
          </div>
        </div>
      </header>

      {/* Main Content Container - Compact Desktop Viewport Friendly */}
      <main className="flex-1 w-full max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-12 py-4 sm:py-6 space-y-4 sm:space-y-5">
        {/* Filter Buttons & Search Input */}
        <div className="space-y-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Filter buttons in Neo-Brutalist buttons */}
            <div className="flex flex-wrap items-center gap-2">
              {filterOptions.map(option => {
                const isSelected = activeFilter === option;
                return (
                  <button
                    key={option}
                    onClick={() => setActiveFilter(option)}
                    className={`px-3.5 py-1.5 border-2 border-[#111113] font-display text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#EA580C] text-white border-[#111113] shadow-[3px_3px_0_#111113]'
                        : 'bg-white text-[#111113] hover:bg-[#111113]/5'
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-[#111113]/60 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="CARI MATERI..."
                className="w-full pl-8 pr-8 py-1.5 border-2 border-[#111113] bg-white font-display text-xs sm:text-[13px] font-bold uppercase tracking-wider text-[#111113] placeholder-[#111113]/40 focus:outline-none focus:bg-[#FFF] shadow-[3px_3px_0_#111113] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-black cursor-pointer font-bold"
                  title="Hapus pencarian"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] label-mono text-[#111113]/70 px-0.5">
            <span>TERSEDIA: {filteredTopics.length} MODUL PEMBELAJARAN</span>
          </div>
        </div>

        {/* 3 Informatics Topic Cards - Scaled & Compact Frame */}
        {filteredTopics.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {filteredTopics.map((topic) => (
              <div
                key={topic.id}
                className="card-brutal-sm group flex flex-col justify-between overflow-hidden bg-white hover:shadow-[8px_8px_0_#EA580C] hover:border-[#111113] transition-all"
              >
                <div>
                  {/* Card Thumbnail / Illustrated Graphic (Compact height) */}
                  <div
                    onClick={() => onSelectTopic(topic)}
                    className="relative w-full h-32 sm:h-36 overflow-hidden bg-slate-900 cursor-pointer border-b-2 border-[#111113]"
                  >
                    <TopicThumbnailIllustration
                      thumbnailKey={topic.thumbnailKey}
                      coverImage={topic.coverImage}
                      className="w-full h-full group-hover:scale-103 transition-transform duration-300"
                    />

                    {/* Badge Grade on top-right */}
                    <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 bg-white border-2 border-[#111113] shadow-[2px_2px_0_#111113] text-[#111113] text-[11px] font-display font-bold uppercase tracking-wider">
                      {topic.grade}
                    </div>
                  </div>

                  {/* Card Body - Compact spacing */}
                  <div className="p-4 space-y-2">
                    {/* Title */}
                    <h2
                      onClick={() => onSelectTopic(topic)}
                      className="font-display text-lg sm:text-xl font-bold uppercase tracking-tight text-[#111113] group-hover:text-[#EA580C] transition-colors leading-tight cursor-pointer"
                    >
                      {topic.title}
                    </h2>

                    {/* Short Description */}
                    <p className="text-xs text-[#111113]/80 font-light line-clamp-2 leading-relaxed">
                      {topic.shortDesc}
                    </p>
                  </div>
                </div>

                {/* Card Primary Action Footer */}
                <div className="p-4 pt-0">
                  <button
                    onClick={() => onSelectTopic(topic)}
                    className="btn-primary-brutal w-full py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-[3px_3px_0_#111113]"
                  >
                    <span>MULAI BELAJAR</span>
                    <span aria-hidden="true">&rarr;</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border-2 border-[#111113] bg-white p-6 space-y-3 shadow-[6px_6px_0_#111113]">
            <p className="font-display uppercase text-base font-bold text-[#111113]">
              TIDAK ADA MATERI YANG SESUAI DENGAN PENCARIAN "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveFilter('Semua');
              }}
              className="px-5 py-2 bg-[#111113] text-white font-display text-xs uppercase font-bold tracking-wider hover:bg-[#EA580C] cursor-pointer"
            >
              RESET FILTER
            </button>
          </div>
        )}
      </main>
    </div>
  );
};
