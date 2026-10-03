import React, { useState, useEffect } from 'react';
import { Topic, LearningFormat } from '../types';
import { ChevronRight, ChevronLeft, ZoomIn, ZoomOut, RotateCcw, ChevronsUpDown, ChevronsDownUp } from 'lucide-react';

interface MindMapViewerProps {
  topic: Topic;
  targetNodeId?: string | null;
  onJumpToFormat?: (format: LearningFormat) => void;
}

interface MindLeaf {
  id: string;
  explanation: string;
}

interface MindBranch {
  id: string;
  title: string;
  collapsed: boolean;
  explanations: MindLeaf[];
}

export const MindMapViewer: React.FC<MindMapViewerProps> = ({ topic }) => {
  const [zoomLevel, setZoomLevel] = useState<number>(0.85);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 20, y: 15 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Generate authentic network concept nodes & direct explanations without boilerplate labels
  const generateBranches = (top: Topic): MindBranch[] => {
    if (top.id === 'informatika' || top.id === 'informatika-berpikir-komputasional') {
      return [
        {
          id: 'b-dekomposisi',
          title: 'Dekomposisi Masalah',
          collapsed: false,
          explanations: [
            {
              id: 'l-dek-1',
              explanation: 'Memecah persoalan kompleks menjadi sub-masalah kecil yang mandiri dan terarah.'
            },
            {
              id: 'l-dek-2',
              explanation: 'Membantu penyelesaian bertahap tanpa kewalahan oleh skala masalah yang besar.'
            }
          ]
        },
        {
          id: 'b-pola',
          title: 'Pengenalan Pola',
          collapsed: false,
          explanations: [
            {
              id: 'l-pol-1',
              explanation: 'Mengidentifikasi kesamaan karakteristik atau keteraturan dalam kumpulan data.'
            },
            {
              id: 'l-pol-2',
              explanation: 'Memanfaatkan solusi permasalahan masa lalu untuk memecahkan problem serupa.'
            }
          ]
        },
        {
          id: 'b-abstraksi',
          title: 'Abstraksi Konsep',
          collapsed: false,
          explanations: [
            {
              id: 'l-abs-1',
              explanation: 'Menyaring informasi esensial dan mengeliminasi detail teknis yang tidak relevan.'
            },
            {
              id: 'l-abs-2',
              explanation: 'Membangun model konseptual umum yang dapat diterapkan pada berbagai konteks.'
            }
          ]
        },
        {
          id: 'b-algoritma',
          title: 'Algoritma & Pencarian',
          collapsed: false,
          explanations: [
            {
              id: 'l-alg-1',
              explanation: 'Menyusun urutan langkah logis, teratur, dan sistematis hingga menemukan solusi.'
            },
            {
              id: 'l-alg-2',
              explanation: 'Pencarian biner (Binary Search) membagi dua ruang data terurut secara efisien O(log N).'
            }
          ]
        }
      ];
    }

    if (top.id === 'jejak-bermedia-digital') {
      return [
        {
          id: 'b-aktif',
          title: 'Jejak Digital Aktif',
          collapsed: false,
          explanations: [
            {
              id: 'l-akt-1',
              explanation: 'Data yang sengaja diunggah pengguna: postingan media sosial, komentar, foto, dan email.'
            },
            {
              id: 'l-akt-2',
              explanation: 'Bersifat permanen dan membentuk reputasi digital jangka panjang di ranah publik.'
            }
          ]
        },
        {
          id: 'b-pasif',
          title: 'Jejak Digital Pasif',
          collapsed: false,
          explanations: [
            {
              id: 'l-pas-1',
              explanation: 'Data terekam otomatis di server: alamat IP, riwayat pencarian, cookie, dan lokasi GPS.'
            },
            {
              id: 'l-pas-2',
              explanation: 'Digunakan oleh sistem untuk pelacakan perilaku daring dan pemetaan profil pengguna.'
            }
          ]
        },
        {
          id: 'b-pii',
          title: 'Privasi & Data Pribadi',
          collapsed: false,
          explanations: [
            {
              id: 'l-pii-1',
              explanation: 'Perlindungan informasi sensitif (PII) seperti NIK, nomor telepon, dan kode rahasia OTP.'
            },
            {
              id: 'l-pii-2',
              explanation: 'Mencegah ancaman pencurian identitas, rekayasa sosial, dan penyalahgunaan data siber.'
            }
          ]
        },
        {
          id: 'b-etika',
          title: 'Etika & Kewarganegaraan Digital',
          collapsed: false,
          explanations: [
            {
              id: 'l-eti-1',
              explanation: 'Penerapan prinsip berpikir sebelum mengunggah (Think Before You Post) dan verifikasi fakta.'
            },
            {
              id: 'l-eti-2',
              explanation: 'Menghindari perundungan siber (cyberbullying) dan menjaga jejak digital yang berintegritas.'
            }
          ]
        }
      ];
    }

    if (top.id === 'analisis-data') {
      return [
        {
          id: 'b-siklus',
          title: 'Siklus Pengolahan Data',
          collapsed: false,
          explanations: [
            {
              id: 'l-sik-1',
              explanation: 'Tahapan sistematis: pengumpulan data mentah, pembersihan, validasi, dan agregasi.'
            },
            {
              id: 'l-sik-2',
              explanation: 'Memastikan data bebas dari nilai ganda atau keliru sebelum ditarik kesimpulan.'
            }
          ]
        },
        {
          id: 'b-formula',
          title: 'Formula & Fungsi Lembar Kerja',
          collapsed: false,
          explanations: [
            {
              id: 'l-for-1',
              explanation: 'Fungsi kalkulasi otomatis: =SUM() untuk penjumlahan total dan =AVERAGE() untuk nilai rata-rata.'
            },
            {
              id: 'l-for-2',
              explanation: 'Fungsi pencacahan =COUNT() dan pengolahan rentang sel tabel secara efisien.'
            }
          ]
        },
        {
          id: 'b-visualisasi',
          title: 'Visualisasi Grafik & Pola',
          collapsed: false,
          explanations: [
            {
              id: 'l-vis-1',
              explanation: 'Diagram batang (Bar Chart) untuk membandingkan jumlah kuantitas antar kategori.'
            },
            {
              id: 'l-vis-2',
              explanation: 'Diagram garis (Line Chart) untuk tren perubahan data berkala dari waktu ke waktu.'
            }
          ]
        },
        {
          id: 'b-keputusan',
          title: 'Pengambilan Keputusan Berbasis Data',
          collapsed: false,
          explanations: [
            {
              id: 'l-kep-1',
              explanation: 'Menafsirkan ringkasan informasi faktual untuk memecahkan persoalan nyata.'
            },
            {
              id: 'l-kep-2',
              explanation: 'Menyajikan rekomendasi solusi yang didukung bukti data yang valid dan terukur.'
            }
          ]
        }
      ];
    }

    // Default dynamic generator from topic sections
    return top.sections.map((sec, idx) => ({
      id: `b-sec-${idx}`,
      title: sec.title,
      collapsed: false,
      explanations: [
        {
          id: `l-sec-${idx}-1`,
          explanation: sec.leadParagraph || sec.content[0] || 'Prinsip konsep mendasar yang menghubungkan materi.'
        },
        {
          id: `l-sec-${idx}-2`,
          explanation: sec.content[1] || sec.realWorldAnalogy?.description || 'Penerapan konsep dalam sistem nyata.'
        }
      ]
    }));
  };

  const [branches, setBranches] = useState<MindBranch[]>(() => generateBranches(topic));

  useEffect(() => {
    setBranches(generateBranches(topic));
    setPanOffset({ x: 20, y: 15 });
    setZoomLevel(0.85);
  }, [topic.id]);

  const handleExpandAll = () => {
    setBranches(prev => prev.map(b => ({ ...b, collapsed: false })));
  };

  const handleCollapseAll = () => {
    setBranches(prev => prev.map(b => ({ ...b, collapsed: true })));
  };

  const handleToggleBranch = (branchId: string) => {
    setBranches(prev =>
      prev.map(b => (b.id === branchId ? { ...b, collapsed: !b.collapsed } : b))
    );
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleResetView = () => {
    setZoomLevel(0.85);
    setPanOffset({ x: 20, y: 15 });
  };

  // Node Geometry Coordinates
  const rootX = 40;
  const rootWidth = 220;
  const rootHeight = 54;

  const midX = 330;
  const midWidth = 220;
  const midHeight = 44;

  const leafX = 630;
  const leafWidth = 320;

  const branchSpacingY = 135;
  const totalBranchesHeight = (branches.length - 1) * branchSpacingY;
  const startBranchY = 30;
  const rootY = startBranchY + totalBranchesHeight / 2 - rootHeight / 2;

  return (
    <div className="w-full bg-white border-2 border-[#111113] shadow-[6px_6px_0_#111113] p-2 sm:p-2.5 relative overflow-hidden select-none">
      {/* Interactive Map Canvas */}
      <div
        className={`w-full h-[min(64vh,500px)] sm:h-[470px] lg:h-[490px] overflow-hidden relative cursor-grab bg-[#F8F7F4] border-2 border-[#111113] ${
          isDragging ? 'cursor-grabbing' : ''
        }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Floating Canvas Navigation Tools (Bottom-Left inside frame) */}
        <div className="absolute left-3.5 bottom-3.5 z-20 flex flex-col items-center gap-1.5">
          <button
            onClick={handleResetView}
            className="w-7 h-7 sm:w-8 sm:h-8 bg-white hover:bg-[#111113] hover:text-white border-2 border-[#111113] text-[#111113] shadow-[2px_2px_0_#111113] flex items-center justify-center transition-all cursor-pointer"
            title="Pusatkan Tampilan"
            aria-label="Pusatkan Tampilan"
          >
            <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          <button
            onClick={() => setZoomLevel(prev => Math.min(prev + 0.15, 1.4))}
            className="w-7 h-7 sm:w-8 sm:h-8 bg-white hover:bg-[#111113] hover:text-white border-2 border-[#111113] text-[#111113] shadow-[2px_2px_0_#111113] flex items-center justify-center transition-all cursor-pointer"
            title="Perbesar Peta"
            aria-label="Perbesar Peta"
          >
            <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          <button
            onClick={() => setZoomLevel(prev => Math.max(prev - 0.15, 0.65))}
            className="w-7 h-7 sm:w-8 sm:h-8 bg-white hover:bg-[#111113] hover:text-white border-2 border-[#111113] text-[#111113] shadow-[2px_2px_0_#111113] flex items-center justify-center transition-all cursor-pointer"
            title="Perkecil Peta"
            aria-label="Perkecil Peta"
          >
            <ZoomOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>

        {/* Floating Branch Expand / Collapse Controls (Bottom-Right inside frame) */}
        <div className="absolute right-3.5 bottom-3.5 z-20 flex items-center gap-1.5">
          <button
            onClick={handleExpandAll}
            className="w-7 h-7 sm:w-8 sm:h-8 bg-white hover:bg-[#111113] hover:text-white border-2 border-[#111113] text-[#111113] shadow-[2px_2px_0_#111113] flex items-center justify-center transition-all cursor-pointer"
            title="Buka Semua Ranting"
            aria-label="Buka Semua Ranting"
          >
            <ChevronsUpDown className="w-4 h-4" />
          </button>
          <button
            onClick={handleCollapseAll}
            className="w-7 h-7 sm:w-8 sm:h-8 bg-white hover:bg-[#111113] hover:text-white border-2 border-[#111113] text-[#111113] shadow-[2px_2px_0_#111113] flex items-center justify-center transition-all cursor-pointer"
            title="Ciutkan Ranting"
            aria-label="Ciutkan Ranting"
          >
            <ChevronsDownUp className="w-4 h-4" />
          </button>
        </div>

        <div
          className="w-full h-full transition-transform duration-75 origin-top-left"
          style={{
            transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`
          }}
        >
          {/* SVG Connecting Branch Lines */}
          <svg className="w-[1200px] h-[800px] pointer-events-none" viewBox="0 0 1200 800" fill="none">
            {branches.map((branch, bIdx) => {
              const currentMidY = startBranchY + bIdx * branchSpacingY;

              const startX = rootX + rootWidth;
              const startY = rootY + rootHeight / 2;
              const targetMidX = midX;
              const targetMidY = currentMidY + midHeight / 2;
              const controlMidX = (startX + targetMidX) / 2;

              return (
                <g key={`curves-${branch.id}`}>
                  {/* Root to Branch Line */}
                  <path
                    d={`M ${startX} ${startY} C ${controlMidX} ${startY}, ${controlMidX} ${targetMidY}, ${targetMidX} ${targetMidY}`}
                    stroke="#111113"
                    strokeWidth="2.5"
                    fill="none"
                  />

                  {/* Branch to Explanation Nodes Lines */}
                  {!branch.collapsed &&
                    branch.explanations.map((_, lIdx) => {
                      const leafStartY = targetMidY;
                      const leafStartX = midX + midWidth;
                      const targetLeafX = leafX;
                      const targetLeafY = currentMidY - 16 + lIdx * 54 + 20;
                      const controlLeafX = (leafStartX + targetLeafX) / 2;

                      return (
                        <path
                          key={`curve-${branch.id}-${lIdx}`}
                          d={`M ${leafStartX} ${leafStartY} C ${controlLeafX} ${leafStartY}, ${controlLeafX} ${targetLeafY}, ${targetLeafX} ${targetLeafY}`}
                          stroke="#EA580C"
                          strokeWidth="2"
                          fill="none"
                        />
                      );
                    })}
                </g>
              );
            })}
          </svg>

          {/* HTML Nodes Network */}
          <div className="absolute top-0 left-0 w-[1200px] h-[800px] pointer-events-none">
            {/* Root Concept Node */}
            <div
              style={{
                left: `${rootX}px`,
                top: `${rootY}px`,
                width: `${rootWidth}px`,
                height: `${rootHeight}px`
              }}
              className="absolute pointer-events-auto flex items-center justify-center p-3 bg-[#111113] text-white border-2 border-[#111113] font-display uppercase font-bold text-xs sm:text-sm tracking-wide shadow-[4px_4px_0_#EA580C] text-center leading-tight"
            >
              <span>{topic.title}</span>
            </div>

            {/* Branches & Explanation Nodes */}
            {branches.map((branch, bIdx) => {
              const currentMidY = startBranchY + bIdx * branchSpacingY;

              return (
                <div key={branch.id}>
                  {/* Branch Main Node */}
                  <div
                    style={{
                      left: `${midX}px`,
                      top: `${currentMidY}px`,
                      width: `${midWidth}px`,
                      height: `${midHeight}px`
                    }}
                    className="absolute pointer-events-auto flex items-center justify-between px-3 bg-white border-2 border-[#111113] text-[#111113] font-display uppercase text-xs font-bold shadow-[3px_3px_0_#111113]"
                  >
                    <span className="truncate pr-2">{branch.title}</span>

                    <button
                      onClick={() => handleToggleBranch(branch.id)}
                      className="w-5 h-5 border border-[#111113] bg-[#F8F7F4] text-[#111113] hover:bg-[#EA580C] hover:text-white flex items-center justify-center shrink-0 text-[10px] font-bold cursor-pointer"
                      title={branch.collapsed ? 'Buka Penjelasan' : 'Ciutkan Penjelasan'}
                    >
                      {branch.collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Direct Explanation Nodes (No pop-up, directly visible in network) */}
                  {!branch.collapsed &&
                    branch.explanations.map((leaf, lIdx) => {
                      const leafY = currentMidY - 16 + lIdx * 54;

                      return (
                        <div
                          key={leaf.id}
                          style={{
                            left: `${leafX}px`,
                            top: `${leafY}px`,
                            width: `${leafWidth}px`,
                            minHeight: '44px'
                          }}
                          className="absolute pointer-events-auto flex items-start gap-2 p-2 bg-white border-2 border-[#111113] text-[#111113] text-[11px] font-light shadow-[2px_2px_0_#111113] leading-snug transition-all hover:bg-[#F8F7F4]"
                        >
                          <span className="w-1.5 h-1.5 bg-[#EA580C] shrink-0 mt-1" />
                          <p className="m-0 text-[#111113] font-normal">
                            {leaf.explanation}
                          </p>
                        </div>
                      );
                    })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
