import React, { useState } from 'react';
import { Topic, LearningFormat } from '../types';
import {
  X,
  FileText,
  Headphones,
  Video,
  Presentation,
  Layers,
  GitBranch,
  Info,
  User,
  Building2,
  Sparkles,
  BookOpen,
  Code
} from 'lucide-react';

interface HomeLandingProps {
  topics: Topic[];
  onSelectTopic: (topic: Topic, format?: LearningFormat) => void;
  onGoToCatalog: () => void;
}

interface ModalityItem {
  id: LearningFormat;
  name: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface LogoItem {
  id: string;
  title: string;
  shortLabel: string;
  src: string;
}

const LOGO_LIST: LogoItem[] = [
  {
    id: 'kemendikdasmen',
    title: 'Logo Kemendikdasmen',
    shortLabel: 'KEMENDIKDASMEN',
    src: '/media/logos/logo-kemendikdasmen.png'
  },
  {
    id: 'pendidikan-bermutu',
    title: 'Logo Pendidikan Bermutu',
    shortLabel: 'PENDIDIKAN BERMUTU',
    src: '/media/logos/logo-pendidikan-bermutu.png'
  },
  {
    id: 'kemendikdasmen-ramah',
    title: 'Logo Kemendikdasmen Ramah',
    shortLabel: 'KEMENDIKDASMEN RAMAH',
    src: '/media/logos/logo-kemendikdasmen-ramah.png'
  },
  {
    id: 'sobat-smp',
    title: 'Logo Sobat SMP',
    shortLabel: 'SOBAT SMP',
    src: '/media/logos/logo-sobat-smp.png'
  }
];

export const HomeLanding: React.FC<HomeLandingProps> = ({
  topics: _topics,
  onSelectTopic: _onSelectTopic,
  onGoToCatalog
}) => {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState<boolean>(false);
  const [isCreatorModalOpen, setIsCreatorModalOpen] = useState<boolean>(false);
  const [activeModalityIndex, setActiveModalityIndex] = useState<number>(4); // Default: Kartu Tanya Jawab
  const [failedLogos, setFailedLogos] = useState<{ [id: string]: boolean }>({});

  const modalities: ModalityItem[] = [
    {
      id: 'text',
      name: 'Teks Imersif',
      desc: 'Alur membaca terstruktur tanpa distraksi dengan kuis pemahaman konsep di setiap bagian.',
      icon: FileText
    },
    {
      id: 'audio',
      name: 'Podcast Materi',
      desc: 'Format audio podcast edukatif yang dirancang agar siswa fokus mendengarkan pemahaman materi tanpa distraksi visual.',
      icon: Headphones
    },
    {
      id: 'video',
      name: 'Video Materi',
      desc: 'Simulasi visual responsif dengan animasi konsep interaktif dan penunjuk bab materi.',
      icon: Video
    },
    {
      id: 'slides',
      name: 'Slide Materi',
      desc: 'Poin-poin utama materi dalam bentuk slide berurutan dengan diagram konsep interaktif.',
      icon: Presentation
    },
    {
      id: 'flashcards',
      name: 'Kartu Tanya Jawab',
      desc: 'Kartu interaktif bolak-balik untuk menguji ingatan, dilengkapi skor kendali pemahaman.',
      icon: Layers
    },
    {
      id: 'mindmap',
      name: 'Peta Pikiran',
      desc: 'Diagram jaringan konsep interaktif yang mendukung zoom in/out, pan geser, dan inspeksi simpul.',
      icon: GitBranch
    }
  ];

  const currentModality = modalities[activeModalityIndex];

  return (
    <div className="min-h-screen lg:h-screen lg:max-h-screen bg-[#F8F7F4] text-[#111113] flex flex-col justify-between font-sans selection:bg-[#EA580C] selection:text-[#F8F7F4] overflow-x-hidden">
      {/* Top Header */}
      <header className="w-full px-4 sm:px-8 lg:px-12 py-3 flex flex-wrap justify-between items-center gap-3 border-b-2 border-[#111113] shrink-0 bg-[#F8F7F4]">
        {/* Judul Header */}
        <div className="text-lg sm:text-2xl font-bold font-display uppercase tracking-tight text-[#111113]">
          Belajar dengan Gaya Kamu
        </div>

        {/* 4 Logos Container (Menggantikan teks 'SMP KURIKULUM MERDEKA') */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-wrap">
          {LOGO_LIST.map((logo) => {
            if (failedLogos[logo.id]) {
              return null;
            }

            return (
              <div
                key={logo.id}
                className="h-8 sm:h-9 md:h-10 flex items-center justify-center"
              >
                <img
                  src={logo.src}
                  alt={logo.title}
                  title={logo.title}
                  className="h-8 sm:h-9 md:h-10 max-h-10 w-auto object-contain transition-transform hover:scale-105"
                  onError={() =>
                    setFailedLogos((prev) => ({ ...prev, [logo.id]: true }))
                  }
                />
              </div>
            );
          })}
        </div>
      </header>

      {/* Main Grid: Compact single viewport layout on desktop */}
      <main className="flex-1 w-full max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_440px] gap-6 lg:gap-12 px-6 sm:px-10 lg:px-12 py-4 lg:py-6 items-center">
        {/* Left Section */}
        <section className="space-y-3.5 sm:space-y-4">
          <div className="label-mono text-xs sm:text-[13px] text-[#EA580C] tracking-[0.2em] font-bold">
            INFORMATIKA / FASE D
          </div>

          <h1 className="font-display font-bold uppercase tracking-[-0.02em] text-[clamp(2.1rem,4.1vw,4.25rem)] leading-[0.92] text-[#111113] m-0">
            Membayangkan Kembali Buku Pelajaran Informatika
          </h1>

          <p className="text-sm sm:text-base md:text-lg max-w-xl font-light leading-snug text-[#111113]/90 pt-1">
            Belajar informatika sesuai gaya belajarmu, bayangkan kembali buku pelajaran informatika menjadi pengalaman belajar yang disesuaikan khusus untukmu.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onGoToCatalog}
              className="py-3 px-6 sm:px-8 text-xs sm:text-sm font-display uppercase tracking-wider font-bold bg-[#EA580C] hover:bg-white text-white hover:text-[#111113] border-2 border-[#111113] shadow-[4px_4px_0_#111113] hover:shadow-[6px_6px_0_#111113] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_#111113] transition-all cursor-pointer"
            >
              MULAI BELAJAR &rarr;
            </button>

            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="px-5 py-3 border-2 border-[#111113] bg-white text-[#111113] font-display uppercase text-xs sm:text-sm font-bold tracking-wider hover:bg-[#111113] hover:text-[#F8F7F4] transition-all cursor-pointer shadow-[4px_4px_0_#111113] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            >
              LIHAT CARA KERJA &rarr;
            </button>
          </div>
        </section>

        {/* Right Aside Card */}
        <aside className="card-brutal p-5 sm:p-6 lg:p-7 relative bg-white shadow-[8px_8px_0_#111113]">
          <h2 className="font-display text-2xl sm:text-3xl m-0 mb-2 uppercase tracking-tight text-[#111113] leading-none">
            {currentModality.name}
          </h2>

          <p className="text-xs sm:text-[13px] leading-relaxed mb-4 text-[#111113]/85 font-light min-h-[2.75rem]">
            {currentModality.desc}
          </p>

          {/* 6 Modalities Grid: Icons & Text */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
            {modalities.map((mod, idx) => {
              const IconComp = mod.icon;
              const isSelected = activeModalityIndex === idx;
              return (
                <button
                  key={mod.id}
                  type="button"
                  onClick={() => setActiveModalityIndex(idx)}
                  className={`h-16 sm:h-17 border-2 transition-all cursor-pointer flex flex-col items-center justify-center p-1.5 text-center gap-1 relative ${
                    isSelected
                      ? 'bg-[#EA580C] border-[#111113] text-white shadow-[3px_3px_0_#111113] translate-x-[-1px] translate-y-[-1px]'
                      : 'border-[#111113] bg-white hover:bg-[#111113]/5 text-[#111113]'
                  }`}
                  title={`Pilih ${mod.name}`}
                >
                  <IconComp className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-[#111113]'}`} />
                  <span className="font-display uppercase text-[10px] sm:text-[11px] font-bold tracking-tight leading-tight text-center px-1">
                    {mod.name}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="border-t-2 border-[#111113] pt-2.5 mt-1 flex items-center gap-2 text-[11px] sm:text-xs font-mono text-[#111113]/80">
            <span className="w-2 h-2 rounded-full bg-[#EA580C] shrink-0" />
            <span>Klik ikon-ikon gaya belajar di atas untuk mengetahui penjelasan singkatnya.</span>
          </div>
        </aside>
      </main>

      {/* Footer */}
      <footer className="w-full px-6 py-3 sm:px-10 lg:px-12 border-t-2 border-[#111113] flex flex-wrap justify-between items-center gap-3 shrink-0 bg-[#F8F7F4]">
        <div className="label-mono text-xs text-[#111113]/70">
          PLATFORM PEMBELAJARAN SISWA SMP
        </div>

        {/* Link / Tombol Tentang Kreator & Media */}
        <button
          onClick={() => setIsCreatorModalOpen(true)}
          className="label-mono text-xs font-bold text-[#111113] hover:text-[#EA580C] border-b-2 border-transparent hover:border-[#EA580C] transition-all cursor-pointer flex items-center gap-1.5 py-1 px-2 hover:bg-[#111113]/5"
          title="Buka Informasi Tentang Kreator & Media"
        >
          <Info className="w-3.5 h-3.5 text-[#EA580C]" />
          <span>Tentang Kreator &amp; Media</span>
        </button>
      </footer>

      {/* Modal 1: "Lihat Cara Kerja" */}
      {isDemoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-none animate-in fade-in duration-100">
          <div className="bg-[#F8F7F4] border-2 border-[#111113] shadow-[10px_10px_0_#111113] w-full max-w-xl max-h-[90vh] flex flex-col p-6 sm:p-7 relative overflow-hidden">
            {/* Header */}
            <div className="flex items-start justify-between pb-3 border-b-2 border-[#111113] mb-4 shrink-0">
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#111113]">
                  Cara Kerja Belajar Sesuai Gaya Kamu
                </h3>
                <div className="text-xs sm:text-sm font-semibold text-[#EA580C] mt-0.5">
                  Belajar Sesuai Gaya Unik Setiap Siswa
                </div>
              </div>
              <button
                onClick={() => setIsDemoModalOpen(false)}
                className="w-8 h-8 border-2 border-[#111113] bg-white hover:bg-[#EA580C] hover:text-white transition-colors flex items-center justify-center cursor-pointer font-bold shrink-0 ml-3"
                title="Tutup"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="space-y-3.5 text-xs sm:text-sm leading-relaxed text-[#111113] overflow-y-auto pr-1">
              <p className="font-medium text-[#111113]/90">
                Platform ini mendemokratisasi pemahaman materi pelajaran dengan gaya belajar yang disesuaikan untukmu:
              </p>

              <div className="space-y-2.5 bg-white border-2 border-[#111113] p-3.5 sm:p-4 text-xs sm:text-[13px] leading-relaxed">
                <div className="flex items-start gap-2">
                  <span className="text-[#EA580C] font-bold text-base leading-none">•</span>
                  <span><strong>Teks Imersif &amp; Uji Pemahaman:</strong> Alur membaca terstruktur yang nyaman tanpa distraksi, dilengkapi kuis pemahaman konsep di setiap bagian.</span>
                </div>

                <div className="flex items-start gap-2">
                  <span className="text-[#EA580C] font-bold text-base leading-none">•</span>
                  <span><strong>Podcast Materi:</strong> Penjelasan materi dalam format audio interaktif yang fokus pada pengalaman mendengarkan dengan pemutar media dan kendali durasi.</span>
                </div>

                <div className="flex items-start gap-2">
                  <span className="text-[#EA580C] font-bold text-base leading-none">•</span>
                  <span><strong>Video Materi &amp; Simulasi Visual:</strong> Tampilan pemutar video responsif dengan animasi konsep interaktif, scrubber waktu, dan penunjuk bab materi.</span>
                </div>

                <div className="flex items-start gap-2">
                  <span className="text-[#EA580C] font-bold text-base leading-none">•</span>
                  <span><strong>Slide Materi:</strong> Poin-poin utama materi dalam bentuk slideshow berurutan dengan navigasi panah, nomor halaman, dan layar penuh.</span>
                </div>

                <div className="flex items-start gap-2">
                  <span className="text-[#EA580C] font-bold text-base leading-none">•</span>
                  <span><strong>Kartu Tanya Jawab:</strong> Kartu interaktif bolak-balik untuk menguji ingatan, dilengkapi skor kendali “Saya Sudah Paham vs Perlu Diulang”.</span>
                </div>

                <div className="flex items-start gap-2">
                  <span className="text-[#EA580C] font-bold text-base leading-none">•</span>
                  <span><strong>Peta Pikiran (Peta Konsep):</strong> Diagram jaringan konsep interaktif yang mendukung zoom in/out, pan geser canvas, dan klik simpul untuk melihat penjelasan detail.</span>
                </div>

                <div className="flex items-start gap-2">
                  <span className="text-[#EA580C] font-bold text-base leading-none">•</span>
                  <span><strong>Sumber Belajar:</strong> Sumber belajar dari materi Buku teks resmi Kurikulum Merdeka Kemendikdasmen RI yang dapat dilihat langsung di bagian atas.</span>
                </div>
              </div>
            </div>

            {/* Actions: "Tutup" button */}
            <div className="flex items-center justify-end pt-4 border-t-2 border-[#111113] mt-4 shrink-0">
              <button
                onClick={() => setIsDemoModalOpen(false)}
                className="px-6 py-2.5 border-2 border-[#111113] bg-white text-xs sm:text-sm font-bold font-display uppercase tracking-wider hover:bg-[#111113] hover:text-[#F8F7F4] transition-all cursor-pointer shadow-[3px_3px_0_#111113] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              >
                TUTUP
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: "Tentang Kreator & Media" */}
      {isCreatorModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-none animate-in fade-in duration-100">
          <div className="bg-[#F8F7F4] border-2 border-[#111113] shadow-[12px_12px_0_#111113] w-full max-w-2xl max-h-[92vh] flex flex-col p-6 sm:p-7 relative overflow-hidden">
            {/* Header */}
            <div className="flex items-start justify-between pb-3.5 border-b-2 border-[#111113] mb-4 shrink-0 bg-white -mx-6 -mt-6 sm:-mx-7 sm:-mt-7 p-5 sm:p-6 border-b-2">
              <div className="flex items-center gap-3">
                <span className="w-3.5 h-3.5 bg-[#EA580C]" />
                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#111113] m-0">
                    Tentang Kreator &amp; Media
                  </h3>
                  <div className="text-xs font-semibold text-[#EA580C] mt-0.5 font-mono">
                    [METADATA_PENGEMBANG_&amp;_KARYA]
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsCreatorModalOpen(false)}
                className="w-8 h-8 border-2 border-[#111113] bg-white hover:bg-[#EA580C] hover:text-white transition-colors flex items-center justify-center cursor-pointer font-bold shrink-0 ml-3 shadow-[2px_2px_0_#111113]"
                title="Tutup Jendela"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="space-y-4 text-xs sm:text-sm text-[#111113] overflow-y-auto pr-1">
              {/* Bagian 1: Identitas Pengembang */}
              <div className="bg-white border-2 border-[#111113] p-4 shadow-[4px_4px_0_#111113] space-y-2.5">
                <div className="flex items-center gap-2 pb-2 border-b border-[#111113]/20">
                  <User className="w-4 h-4 text-[#EA580C]" />
                  <span className="font-display uppercase text-xs sm:text-sm font-bold text-[#111113] tracking-wide">
                    Identitas Pengembang
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-xs">
                  <div>
                    <span className="text-[11px] font-mono text-[#111113]/60 block uppercase">
                      Nama Pengembang:
                    </span>
                    <strong className="text-sm font-display text-[#111113] block mt-0.5">
                      Ian Dwi Putera, S.Pd
                    </strong>
                  </div>

                  <div>
                    <span className="text-[11px] font-mono text-[#111113]/60 block uppercase">
                      Instansi:
                    </span>
                    <span className="font-semibold text-xs flex items-center gap-1.5 mt-0.5 text-[#111113]">
                      <Building2 className="w-3.5 h-3.5 text-[#EA580C] shrink-0" />
                      SMPN 2 Banawa
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-mono text-[#111113]/60 block uppercase">
                      Peran:
                    </span>
                    <span className="font-semibold text-xs text-[#111113] block mt-0.5">
                      Pengembang Konten &amp; Desain Antarmuka
                    </span>
                  </div>
                </div>
              </div>

              {/* Bagian 2: Informasi Metadata Karya */}
              <div className="bg-white border-2 border-[#111113] p-4 shadow-[4px_4px_0_#111113] space-y-2.5">
                <div className="flex items-center gap-2 pb-2 border-b border-[#111113]/20">
                  <BookOpen className="w-4 h-4 text-[#EA580C]" />
                  <span className="font-display uppercase text-xs sm:text-sm font-bold text-[#111113] tracking-wide">
                    Informasi Metadata Karya
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-[#111113]/10 pb-1.5">
                    <span className="font-mono text-[11px] text-[#111113]/70 uppercase">
                      Judul Karya:
                    </span>
                    <strong className="text-[#111113] font-display text-sm uppercase">
                      Membayangkan Kembali Buku Pelajaran Informatika
                    </strong>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 border-b border-[#111113]/10 pb-1.5">
                    <div>
                      <span className="font-mono text-[11px] text-[#111113]/70 uppercase block">
                        Mata Pelajaran:
                      </span>
                      <span className="font-bold text-xs text-[#111113]">Informatika</span>
                    </div>
                    <div>
                      <span className="font-mono text-[11px] text-[#111113]/70 uppercase block">
                        Fase / Tingkat:
                      </span>
                      <span className="font-bold text-xs text-[#111113]">Fase D (SMP)</span>
                    </div>
                  </div>

                  <div className="border-b border-[#111113]/10 pb-1.5">
                    <span className="font-mono text-[11px] text-[#111113]/70 uppercase block mb-1">
                      Unit / Topik Pembelajaran:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="px-2 py-0.5 bg-[#F8F7F4] border border-[#111113] text-[11px] font-mono font-semibold">
                        Berpikir Komputasional
                      </span>
                      <span className="px-2 py-0.5 bg-[#F8F7F4] border border-[#111113] text-[11px] font-mono font-semibold">
                        Jejak Bermedia Digital
                      </span>
                      <span className="px-2 py-0.5 bg-[#F8F7F4] border border-[#111113] text-[11px] font-mono font-semibold">
                        Analisis Data
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="font-mono text-[11px] text-[#111113]/70 uppercase block mb-1">
                      Deskripsi Karya:
                    </span>
                    <p className="font-light text-xs leading-relaxed text-[#111113]">
                      Platform pembelajaran mandiri interaktif yang mengadaptasi gaya belajar siswa (teks, audio, video, slide, kuis, peta pikiran) untuk memperdalam konsep Informatika secara mendalam.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bagian 3: Pernyataan Lisensi & Penggunaan AI */}
              <div className="bg-[#111113] text-white border-2 border-[#111113] p-4 shadow-[4px_4px_0_#111113] space-y-2">
                <div className="flex items-center gap-2 pb-2 border-b border-white/20">
                  <Sparkles className="w-4 h-4 text-[#EA580C]" />
                  <span className="font-display uppercase text-xs sm:text-sm font-bold text-white tracking-wide">
                    Pernyataan Lisensi &amp; Penggunaan AI
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[11px] font-mono text-[#EA580C] pb-1">
                  <Code className="w-3.5 h-3.5" />
                  <span>TEKNOLOGI: TYPESCRIPT · REACT · VITE · TAILWIND CSS</span>
                </div>

                <blockquote className="p-3 bg-white/5 border-l-4 border-[#EA580C] text-xs font-light leading-relaxed italic text-white/95">
                  &ldquo;Karya Media Interaktif ini dikembangkan secara mandiri berbasis <strong>TypeScript, React, Vite, dan Tailwind CSS</strong>. Proses penyusunan struktur kode dan ideasi visual dibantu oleh alat Kecerdasan Buatan (Gemini AI Studio) melalui metode prompt engineering.&rdquo;
                </blockquote>
              </div>
            </div>

            {/* Actions: "Tutup" button */}
            <div className="flex items-center justify-end pt-3.5 border-t-2 border-[#111113] mt-4 shrink-0">
              <button
                onClick={() => setIsCreatorModalOpen(false)}
                className="px-6 py-2.5 border-2 border-[#111113] bg-[#111113] text-white text-xs sm:text-sm font-bold font-display uppercase tracking-wider hover:bg-[#EA580C] hover:border-[#111113] transition-all cursor-pointer shadow-[3px_3px_0_#111113] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              >
                TUTUP
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
