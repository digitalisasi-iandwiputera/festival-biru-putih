import React, { useState } from 'react';
import { Topic } from '../types';
import { Download, ZoomIn, ZoomOut, Search, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface SourcePdfViewerProps {
  topic: Topic;
  onOpenImmersiveText?: () => void;
}

export const SourcePdfViewer: React.FC<SourcePdfViewerProps> = ({
  topic,
  onOpenImmersiveText
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [downloadNotice, setDownloadNotice] = useState<boolean>(false);
  const totalPages = 4;

  const pdfFileName = `Buku_Siswa_${topic.subject.replace(/\s+/g, '_')}_${topic.grade.replace(/\s+/g, '')}_Bab_${topic.id}.pdf`;

  const handleDownload = () => {
    setDownloadNotice(true);
    setTimeout(() => setDownloadNotice(false), 4000);
  };

  return (
    <div className="w-full bg-white border-2 border-[#111113] p-4 sm:p-6 shadow-[8px_8px_0_#111113] space-y-4">
      {downloadNotice && (
        <div className="p-3 bg-[#E53935] text-white border-2 border-[#111113] text-xs font-bold flex items-center gap-2 shadow-[2px_2px_0_#111113]">
          <Sparkles className="w-4 h-4 shrink-0" />
          <span>Mengunduh: <strong>{pdfFileName}</strong> (Buku Resmi Kurikulum Merdeka Kemendikdasmen RI)</span>
        </div>
      )}

      {/* PDF Viewer Top Bar */}
      <div className="bg-[#F8F7F4] p-3 sm:p-3.5 border-2 border-[#111113] flex flex-wrap items-center justify-between gap-3 text-xs shadow-[2px_2px_0_#111113]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#E53935] text-white border-2 border-[#111113] flex items-center justify-center font-bold font-display text-xs shadow-[1px_1px_0_#111113]">
            PDF
          </div>
          <div>
            <span className="font-bold text-[#111113] block font-mono text-xs">
              {pdfFileName}
            </span>
            <span className="label-mono text-[10px] text-[#111113]/70">
              SUMBER BUKU SISWA RESMI KEMENDIKDASMEN RI
            </span>
          </div>
        </div>

        {/* Page Nav & Zoom */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Page controls */}
          <div className="flex items-center gap-1.5 bg-white border-2 border-[#111113] px-2 py-0.5 shadow-[2px_2px_0_#111113]">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-1 hover:text-[#E53935] text-[#111113] disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              title="Halaman Sebelumnya"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-xs font-bold text-[#111113]">
              HAL {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="p-1 hover:text-[#E53935] text-[#111113] disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              title="Halaman Selanjutnya"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Zoom controls */}
          <div className="hidden sm:flex items-center gap-1 bg-white border-2 border-[#111113] px-2 py-0.5 shadow-[2px_2px_0_#111113]">
            <button
              onClick={() => setZoomLevel(prev => Math.max(70, prev - 15))}
              className="p-1 text-[#111113] hover:text-[#E53935] cursor-pointer"
              title="Perkecil"
            >
              <ZoomOut className="w-3 h-3" />
            </button>
            <span className="font-mono text-[11px] font-bold text-[#111113] px-1">
              {zoomLevel}%
            </span>
            <button
              onClick={() => setZoomLevel(prev => Math.min(130, prev + 15))}
              className="p-1 text-[#111113] hover:text-[#E53935] cursor-pointer"
              title="Perbesar"
            >
              <ZoomIn className="w-3 h-3" />
            </button>
          </div>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-[#111113] hover:text-white border-2 border-[#111113] font-display uppercase font-bold text-xs shadow-[2px_2px_0_#111113] transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>UNDUH PDF</span>
          </button>
        </div>
      </div>

      {/* PDF Document Canvas Page */}
      <div className="border-2 border-[#111113] bg-[#E8E6DF] p-3 sm:p-6 overflow-x-auto flex justify-center">
        <div
          style={{ width: `${Math.round(760 * (zoomLevel / 100))}px` }}
          className="bg-white border-2 border-[#111113] shadow-[8px_8px_0_#111113] p-6 sm:p-10 transition-all text-[#111113] min-h-[700px] flex flex-col justify-between"
        >
          {/* Page 1: Bab & Sampul */}
          {currentPage === 1 && (
            <div className="space-y-6">
              <div className="border-b-4 border-[#111113] pb-4">
                <span className="label-mono text-xs font-bold text-[#E53935]">
                  KURIKULUM MERDEKA · FASE D · KELAS 7
                </span>
                <h1 className="font-display text-2xl sm:text-4xl font-bold uppercase tracking-tight text-[#111113] mt-1 m-0">
                  {topic.title}
                </h1>
                <p className="label-mono text-xs text-[#111113]/70 mt-1">
                  Mata Pelajaran: {topic.subject} ({topic.domain})
                </p>
              </div>

              <div className="p-4 border-2 border-[#111113] bg-[#F8F7F4] shadow-[3px_3px_0_#111113]">
                <span className="font-display font-bold uppercase text-xs text-[#E53935] block mb-1">
                  Pertanyaan Pemantik:
                </span>
                <p className="font-medium text-sm text-[#111113]">"{topic.coreQuestion}"</p>
              </div>

              <div className="space-y-3 font-serif text-sm sm:text-base leading-relaxed text-[#111113]">
                <p className="text-justify indent-6">
                  {topic.shortDesc}
                </p>
                <p className="text-justify indent-6">
                  Dalam bab ini, peserta didik diajak untuk memahami prinsip mendasar yang melandasi materi melalui pengamatan kontekstual serta pemecahan masalah bertahap.
                </p>
              </div>
            </div>
          )}

          {/* Page 2: Sub-Bab 1 */}
          {currentPage === 2 && (
            <div className="space-y-6">
              <div className="border-b-2 border-[#111113] pb-3">
                <span className="label-mono text-xs font-bold text-[#E53935]">
                  SUB-BAB 1 · PEMBAHASAN KONSEP
                </span>
                <h2 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#111113] mt-1 m-0">
                  {topic.sections[0]?.title || 'Konsep Dasar'}
                </h2>
              </div>

              <div className="space-y-4 font-serif text-sm sm:text-base leading-relaxed text-[#111113]">
                {topic.sections[0]?.content.map((p, idx) => (
                  <p key={idx} className="text-justify indent-6">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Page 3: Sub-Bab 2 */}
          {currentPage === 3 && (
            <div className="space-y-6">
              <div className="border-b-2 border-[#111113] pb-3">
                <span className="label-mono text-xs font-bold text-[#E53935]">
                  SUB-BAB 2 · PENDALAMAN MATERI
                </span>
                <h2 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#111113] mt-1 m-0">
                  {topic.sections[1]?.title || 'Eksplorasi Lanjutan'}
                </h2>
              </div>

              <div className="space-y-4 font-serif text-sm sm:text-base leading-relaxed text-[#111113]">
                <p className="text-justify indent-6">
                  {topic.sections[1]?.leadParagraph || 'Dalam kehidupan sehari-hari, fenomena ini dapat diamati melalui berbagai pergerakan teratur yang saling memengaruhi satu sama lain.'}
                </p>

                {topic.sections[1]?.content.map((p, idx) => (
                  <p key={idx} className="text-justify indent-6">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Page 4: Uji Kompetensi */}
          {currentPage === 4 && (
            <div className="space-y-6 font-sans">
              <div className="border-b-2 border-[#111113] pb-3">
                <span className="label-mono text-xs font-bold text-[#E53935]">
                  AKTIVITAS EVALUASI
                </span>
                <h2 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#111113] mt-1 m-0">
                  Uji Kompetensi &amp; Asesmen
                </h2>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-[#111113]">
                {topic.diagnosticQuestions.map((q, qIdx) => (
                  <div key={q.id} className="p-3 border-2 border-[#111113] bg-[#F8F7F4] space-y-1.5 shadow-[2px_2px_0_#111113]">
                    <span className="font-bold text-[#111113] block">
                      {qIdx + 1}. {q.question}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 pl-2">
                      {q.options.map((opt, optIdx) => (
                        <div key={optIdx} className="text-xs text-[#111113]/85 font-light">
                          <strong>{String.fromCharCode(65 + optIdx)}.</strong> {opt}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer of PDF Page */}
          <div className="mt-8 pt-3 border-t-2 border-[#111113] flex items-center justify-between text-[11px] label-mono text-[#111113]/70">
            <span>Pusat Perbukuan Kemendikdasmen RI</span>
            <span className="font-bold text-[#111113]">
              Halaman {140 + currentPage}
            </span>
          </div>
        </div>
      </div>

      {/* Floating CTA */}
      {onOpenImmersiveText && (
        <div className="p-3.5 border-2 border-[#111113] bg-[#F8F7F4] flex flex-wrap items-center justify-between gap-3 text-xs shadow-[3px_3px_0_#111113]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#E53935]" />
            <span className="font-bold font-display uppercase tracking-wider text-[#111113]">
              Ingin belajar lebih interaktif?
            </span>
          </div>
          <button
            onClick={onOpenImmersiveText}
            className="btn-primary-brutal py-2 px-4 text-xs font-bold cursor-pointer"
          >
            Buka Teks Imersif &rarr;
          </button>
        </div>
      )}
    </div>
  );
};
