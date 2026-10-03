import React, { useState } from 'react';
import { Topic } from '../types';
import {
  X,
  CheckCircle2,
  AlertTriangle,
  Award,
  RotateCcw,
  ArrowRight,
  BookOpen,
  Check
} from 'lucide-react';

interface EvaluationQuestion {
  id: number;
  sectionTitle: string;
  scenario: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  masteryFeedback: string;
  reviewFeedback: string;
}

interface EvaluationModalProps {
  isOpen: boolean;
  onClose: () => void;
  topic: Topic;
}

export const EvaluationModal: React.FC<EvaluationModalProps> = ({
  isOpen,
  onClose,
  topic
}) => {
  // Synthesis evaluation questions mapped to distinct parts of each topic
  const getSynthesisQuestions = (top: Topic): EvaluationQuestion[] => {
    if (top.id === 'informatika' || top.id === 'informatika-berpikir-komputasional') {
      return [
        {
          id: 1,
          sectionTitle: 'Dekomposisi & Algoritma Pencarian',
          scenario: 'Kasus Pencarian Rekam Medis Pasien',
          question: 'Sebuah klinik memiliki 10.000 data pasien yang sudah terurut rapi menurut nomor rekam medis. Kombinasi pilar dan algoritma apa yang paling efisien untuk menemukan pasien dalam hitungan milidetik?',
          options: [
            'Dekomposisi memecah data & Binary Search membagi dua ruang pencarian secara teratur',
            'Abstraksi dan Linear Search memeriksa satu per satu dari urutan pertama sampai terakhir',
            'Pengenalan pola tanpa pengurutan dengan menebak nomor pasien secara acak',
            'Algoritma pengulangan manual dengan mencetak seluruh lembar ke kertas'
          ],
          correctAnswer: 0,
          explanation: 'Data yang terurut sangat optimal dicari dengan Binary Search (membagi dua ruang pencarian) berbasis dekomposisi logis dengan kompleksitas waktu O(log N).',
          masteryFeedback: 'Kamu telah memahami pilar Dekomposisi dan efisiensi Algoritma Pencarian Biner (Binary Search) dengan sangat tepat.',
          reviewFeedback: 'Perlu pengulangan pada pilar Dekomposisi & Algoritma Pencarian — tinjau kembali bagaimana membagi dua ruang pencarian terurut lebih cepat dibanding mencari satu per satu.'
        },
        {
          id: 2,
          sectionTitle: 'Abstraksi Konsep',
          scenario: 'Kasus Desain Aplikasi Peta Rute Transportasi',
          question: 'Dalam merancang aplikasi peta rute bus kota, programmer hanya menampilkan jalur, halte, dan estimasi waktu, serta sengaja mengabaikan warna cat bus atau nama supir. Konsep pilar berpikir komputasional apa yang diterapkan?',
          options: [
            'Dekomposisi berulang',
            'Abstraksi (menyaring detail yang tidak esensial)',
            'Algoritma antrean FIFO',
            'Pengenalan pola frekuensi suara'
          ],
          correctAnswer: 1,
          explanation: 'Abstraksi berfokus pada informasi penting yang dibutuhkan untuk mencapai tujuan (rute dan waktu) sambil menyaring detail yang tidak relevan (warna bus, nama supir).',
          masteryFeedback: 'Kamu menguasai pilar Abstraksi dengan sangat baik dalam memilah informasi esensial dan mengabaikan detail yang tidak relevan.',
          reviewFeedback: 'Perlu pengulangan pada pilar Abstraksi — pelajari kembali cara menyaring informasi agar fokus hanya pada hal penting dalam pemecahan masalah.'
        },
        {
          id: 3,
          sectionTitle: 'Pengenalan Pola (Pattern Recognition)',
          scenario: 'Kasus Pemecahan Masalah Serupa',
          question: 'Ketika seorang siswa menyadari bahwa cara mencari barang di gudang sekolah memiliki kemiripan struktur dengan cara mencari kata di kamus tebal, pilar apa yang dimanfaatkan?',
          options: [
            'Pengenalan Pola (Pattern Recognition)',
            'Penghapusan data sekunder',
            'Dekomposisi tanpa rencana',
            'Perulangan acak'
          ],
          correctAnswer: 0,
          explanation: 'Pengenalan Pola memungkinkan kita mengenali kesamaan struktur persoalan sehingga solusi yang terbukti efektif sebelumnya dapat langsung diadaptasi.',
          masteryFeedback: 'Kamu sangat memahami cara mengenali pola keteraturan untuk mengadaptasi solusi permasalahan yang serupa.',
          reviewFeedback: 'Perlu pengulangan pada pilar Pengenalan Pola — perhatikan bagaimana mengidentifikasi kesamaan karakteristik masalah untuk menemukan jalan pintas solusi.'
        }
      ];
    }

    if (top.id === 'jejak-bermedia-digital') {
      return [
        {
          id: 1,
          sectionTitle: 'Privasi & Perlindungan Data Pribadi (PII)',
          scenario: 'Kasus Keamanan Data Pribadi di Media Sosial',
          question: 'Rani menerima pesan di media sosial berisi tautan hadiah voucher game yang meminta NIK dan nomor telepon orang tua. Tindakan tepat apa yang harus dilakukan?',
          options: [
            'Segera mengisi formulir agar tidak kehabisan hadiah',
            'Menolak membagikan Informasi Identitas Pribadi (PII) dan memverifikasi kebenaran informasi',
            'Membagikan tautan tersebut ke grup kelas agar teman-temannya ikut mencoba',
            'Mengunggah tangkapan layar KTP orang tua ke kolom komentar'
          ],
          correctAnswer: 1,
          explanation: 'PII (Personally Identifiable Information) seperti NIK dan nomor telepon harus dijaga ketat untuk mencegah kejahatan siber, pencurian identitas, dan rekayasa sosial.',
          masteryFeedback: 'Kamu sangat paham pentingnya menjaga kerahasiaan Data Pribadi Sensitif (PII) dari ancaman penipuan siber.',
          reviewFeedback: 'Perlu pengulangan pada bagian Privasi & Data Pribadi — pelajari kembali jenis-jenis data sensitif yang pantang dibagikan di internet.'
        },
        {
          id: 2,
          sectionTitle: 'Jejak Digital Aktif vs Pasif',
          scenario: 'Kasus Jejak Digital Aktif vs Pasif',
          question: 'Manakah dari pernyataan berikut yang membedakan jejak digital aktif dan pasif secara akurat?',
          options: [
            'Jejak aktif sengaja diunggah oleh pengguna (postingan, komentar), sedangkan pasif terekam otomatis oleh sistem (alamat IP, lokasi GPS, cookie)',
            'Jejak pasif hanya muncul di komputer sekolah, sedangkan jejak aktif di gawai pribadi',
            'Jejak pasif akan terhapus otomatis setelah 10 menit tanpa jejak di server',
            'Jejak aktif tidak dapat dilihat oleh orang lain di internet'
          ],
          correctAnswer: 0,
          explanation: 'Jejak aktif ditinggalkan secara sadar melalui interaksi pengguna, sementara jejak pasif dikumpulkan tanpa tindakan langsung oleh server dan sensor perangkat.',
          masteryFeedback: 'Kamu mampu membedakan jejak digital aktif dan jejak digital pasif dengan sangat cermat.',
          reviewFeedback: 'Perlu pengulangan pada bagian Jejak Digital Aktif vs Pasif — ingat bahwa jejak aktif dibuat secara sadar, sedangkan pasif terekam otomatis oleh sistem.'
        },
        {
          id: 3,
          sectionTitle: 'Etika & Reputasi Digital',
          scenario: 'Kasus Reputasi Digital Jangka Panjang',
          question: 'Mengapa prinsip "Pikirkan Sebelum Mengunggah" (Think Before You Post) sangat penting bagi masa depan siswa?',
          options: [
            'Karena jejak digital bersifat permanen dan dapat memengaruhi peluang akademik serta karier di masa depan',
            'Agar kuota internet telepon pintar tidak cepat habis',
            'Supaya akun media sosial tidak dapat dicari oleh guru',
            'Agar jumlah followers langsung bertambah otomatis'
          ],
          correctAnswer: 0,
          explanation: 'Jejak digital membentuk reputasi daring yang dapat diakses dalam jangka panjang oleh institusi pendidikan, penyedia beasiswa, dan perekrut kerja.',
          masteryFeedback: 'Kamu memahami etika bermedia sosial dan dampak jangka panjang jejak digital bagi masa depan.',
          reviewFeedback: 'Perlu pengulangan pada bagian Etika & Kewarganegaraan Digital — pelajari kembali sifat permanen jejak digital di ranah publik.'
        }
      ];
    }

    if (top.id === 'analisis-data') {
      return [
        {
          id: 1,
          sectionTitle: 'Siklus Pengolahan & Pembersihan Data',
          scenario: 'Kasus Siklus Pengolahan Data Mentah',
          question: 'Sebelum membuat diagram laporan pengeluaran OSIS, bendahara menemukan sel kosong dan format angka yang tidak konsisten pada lembar kerja. Langkah apa yang wajib dilakukan?',
          options: [
            'Pembersihan dan validasi data (Data Cleaning) agar kesimpulan tidak bias atau keliru',
            'Langsung membuat diagram 3D tanpa memeriksa data',
            'Menghapus semua baris data dan menebak angka akhirnya',
            'Mengubah semua angka menjadi teks cerita panjang'
          ],
          correctAnswer: 0,
          explanation: 'Tahap pembersihan data (cleaning) memastikan data akurat, bebas duplikasi, dan valid sebelum dilakukan kalkulasi formula dan visualisasi grafik.',
          masteryFeedback: 'Kamu sangat paham tahapan penting pembersihan data (Data Cleaning) sebelum data diolah lebih lanjut.',
          reviewFeedback: 'Perlu pengulangan pada Siklus Pengolahan Data — ingat bahwa data mentah harus dibersihkan dan divalidasi terlebih dahulu agar hasilnya akurat.'
        },
        {
          id: 2,
          sectionTitle: 'Formula Spreadsheet (=SUM & =AVERAGE)',
          scenario: 'Kasus Penggunaan Formula Spreadsheet',
          question: 'Formula spreadsheet apa yang tepat digunakan untuk menghitung rata-rata nilai siswa dan total nilai kelas berturut-turut?',
          options: [
            '=AVERAGE() untuk nilai rata-rata dan =SUM() untuk total penjumlahan',
            '=COUNT() untuk nilai rata-rata dan =MAX() untuk total penjumlahan',
            '=MEDIAN() untuk nilai rata-rata dan =MIN() untuk total penjumlahan',
            '=IF() untuk nilai rata-rata dan =NOW() untuk total penjumlahan'
          ],
          correctAnswer: 0,
          explanation: 'Fungsi =AVERAGE() menghitung nilai mean rata-rata aritmetika, sedangkan =SUM() menjumlahkan seluruh rentang sel angka yang ditentukan.',
          masteryFeedback: 'Kamu menguasai penggunaan formula dasar lembar kerja spreadsheet untuk kalkulasi otomatis.',
          reviewFeedback: 'Perlu pengulangan pada fungsi formula spreadsheet — pelajari kembali perbedaan fungsi =AVERAGE(), =SUM(), dan =COUNT().'
        },
        {
          id: 3,
          sectionTitle: 'Visualisasi Grafik & Pola Data',
          scenario: 'Kasus Pemilihan Visualisasi Data yang Tepat',
          question: 'Diagram jenis apa yang paling tepat untuk menyajikan tren kenaikan suhu rata-rata bumi dari tahun 2010 hingga 2025?',
          options: [
            'Diagram Garis (Line Chart) karena memperlihatkan kontinuitas perubahan nilai dari waktu ke waktu',
            'Diagram Donat tanpa label persentase',
            'Peta geografi tanpa titik koordinat',
            'Tabel acak tanpa urutan kronologis tahun'
          ],
          correctAnswer: 0,
          explanation: 'Diagram garis (Line Chart) dirancang khusus untuk memvisualisasikan tren data berkala (time series) secara berkesinambungan dan mudah dibaca.',
          masteryFeedback: 'Kamu sangat cermat memilih bentuk visualisasi diagram garis (Line Chart) untuk data deret waktu.',
          reviewFeedback: 'Perlu pengulangan pada bagian Visualisasi Data — pelajari kembali peruntukan diagram batang, diagram garis, dan diagram lingkaran.'
        }
      ];
    }

    // Default dynamic questions
    return top.sections.slice(0, 3).map((sec, idx) => ({
      id: idx + 1,
      sectionTitle: sec.title,
      scenario: `Pemahaman ${sec.title}`,
      question: sec.miniQuiz ? sec.miniQuiz.question : `Apa simpulan inti dari pembahasan ${sec.title}?`,
      options: sec.miniQuiz ? sec.miniQuiz.options : [sec.leadParagraph, 'Konsep ini tidak relevan.', 'Informasi tanpa dasar.', 'Hanya berupa asumsi.'],
      correctAnswer: sec.miniQuiz ? sec.miniQuiz.correctAnswer : 0,
      explanation: sec.miniQuiz ? sec.miniQuiz.explanation : sec.leadParagraph,
      masteryFeedback: `Kamu menguasai konsep ${sec.title} dengan sangat baik.`,
      reviewFeedback: `Perlu pengulangan pada bagian ${sec.title} — luangkan waktu untuk membaca kembali poin-poin utamanya.`
    }));
  };

  const questions = getSynthesisQuestions(topic);

  // Component States
  const [currentQIdx, setCurrentQIdx] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentQ = questions[currentQIdx];
  const selectedAnswer = answers[currentQIdx] ?? null;

  const handleSelectAnswer = (optionIdx: number) => {
    if (showFeedback) return;
    setAnswers(prev => ({ ...prev, [currentQIdx]: optionIdx }));
    setShowFeedback(true);
  };

  const handleNext = () => {
    setShowFeedback(false);
    if (currentQIdx < questions.length - 1) {
      setCurrentQIdx(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handlePrev = () => {
    setShowFeedback(true);
    if (currentQIdx > 0) {
      setCurrentQIdx(prev => prev - 1);
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentQIdx(0);
    setShowFeedback(false);
    setIsFinished(false);
  };

  // Evaluation Metrics
  const correctQuestions: EvaluationQuestion[] = [];
  const incorrectQuestions: EvaluationQuestion[] = [];

  questions.forEach((q, idx) => {
    const userAns = answers[idx];
    if (userAns !== undefined && userAns === q.correctAnswer) {
      correctQuestions.push(q);
    } else {
      incorrectQuestions.push(q);
    }
  });

  const correctCount = correctQuestions.length;
  const totalCount = questions.length;
  const percentage = Math.round((correctCount / totalCount) * 100);

  // Tingkat Pemahaman Deskriptif
  const getUnderstandingLevel = () => {
    if (correctCount === totalCount) {
      return {
        level: 'Sangat Baik / Mahir',
        badge: 'Pemahaman Sempurna (100%)',
        color: 'text-[#EA580C]',
        summary: 'Selamat! Kamu telah menguasai seluruh konsep inti dalam materi ini dengan pemahaman yang utuh dan akurat.'
      };
    }
    if (correctCount >= 2) {
      return {
        level: 'Cukup Baik',
        badge: `Pemahaman Baik (${percentage}%)`,
        color: 'text-[#111113]',
        summary: 'Bagus! Sebagian besar konsep telah kamu pahami dengan baik, namun terdapat materi tertentu yang disarankan untuk ditinjau ulang.'
      };
    }
    if (correctCount === 1) {
      return {
        level: 'Perlu Peningkatan',
        badge: `Perlu Peningkatan (${percentage}%)`,
        color: 'text-[#EA580C]',
        summary: 'Kamu telah memahami salah satu bagian konsep, namun masih membutuhkan pengulangan membaca pada bagian lainnya.'
      };
    }
    return {
      level: 'Perlu Belajar Ulang',
      badge: 'Perlu Belajar Ulang (0%)',
      color: 'text-[#EA580C]',
      summary: 'Kamu belum menjawab soal dengan tepat pada sesi ini. Disarankan membaca kembali teks imersif secara seksama sebelum mengulang evaluasi.'
    };
  };

  const understanding = getUnderstandingLevel();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-none animate-in fade-in duration-100">
      <div className="bg-[#F8F7F4] border-2 border-[#111113] shadow-[10px_10px_0_#111113] w-full max-w-3xl max-h-[92vh] flex flex-col justify-between overflow-hidden">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 border-b-2 border-[#111113] bg-white shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#EA580C]" />
            <span className="font-display uppercase text-xs sm:text-sm font-bold tracking-wider text-[#111113]">
              EVALUASI PEMAHAMAN MATERI // {topic.title}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 border-2 border-[#111113] bg-white hover:bg-[#EA580C] hover:text-white flex items-center justify-center cursor-pointer font-bold transition-colors"
            title="Tutup"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ================= MODE MENGERJAKAN SOAL ================= */}
        {!isFinished ? (
          <div className="p-4 sm:p-6 flex flex-col justify-between overflow-hidden flex-1 space-y-3">
            {/* Header Soal & Indikator */}
            <div className="flex items-center justify-between pb-2 border-b-2 border-[#111113]/20 shrink-0">
              <div className="flex items-center gap-2">
                <span className="label-mono text-xs font-bold text-[#EA580C]">
                  SOAL {currentQIdx + 1} DARI {questions.length}
                </span>
                <span className="text-[#111113]/40">·</span>
                <span className="text-xs font-medium text-[#111113]/80">
                  {currentQ.sectionTitle}
                </span>
              </div>

              <div className="flex items-center gap-1">
                {questions.map((_, idx) => {
                  const isCurrent = idx === currentQIdx;
                  const answered = answers[idx] !== undefined;
                  const isAnsCorrect = answered && answers[idx] === questions[idx].correctAnswer;

                  return (
                    <div
                      key={idx}
                      className={`w-5 h-5 border-2 border-[#111113] text-[10px] font-mono font-bold flex items-center justify-center ${
                        isCurrent
                          ? 'bg-[#EA580C] text-white'
                          : answered
                          ? isAnsCorrect
                            ? 'bg-[#111113] text-white'
                            : 'bg-[#EA580C]/20 text-[#EA580C]'
                          : 'bg-white text-[#111113]/40'
                      }`}
                    >
                      {idx + 1}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pertanyaan */}
            <div className="shrink-0">
              <h3 className="font-display text-sm sm:text-base font-bold uppercase tracking-tight text-[#111113] leading-snug m-0">
                "{currentQ.question}"
              </h3>
            </div>

            {/* Opsi Kisi 2x2 (Zero-Scroll on Desktop) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 shrink-0">
              {currentQ.options.map((opt, oIdx) => {
                const isSelected = selectedAnswer === oIdx;
                const isCorrect = oIdx === currentQ.correctAnswer;

                let optClass = 'border-[#111113] bg-white hover:bg-[#111113]/5 text-[#111113] cursor-pointer';
                if (showFeedback) {
                  if (isCorrect) {
                    optClass = 'border-[#111113] bg-[#111113] text-white shadow-[2px_2px_0_#EA580C] font-bold';
                  } else if (isSelected) {
                    optClass = 'border-[#EA580C] bg-[#EA580C]/15 text-[#EA580C] font-bold';
                  } else {
                    optClass = 'border-[#111113]/30 text-[#111113]/40 bg-white opacity-40';
                  }
                }

                return (
                  <button
                    key={oIdx}
                    onClick={() => handleSelectAnswer(oIdx)}
                    disabled={showFeedback}
                    className={`text-left p-2.5 border-2 text-xs sm:text-[13px] leading-snug transition-all flex items-start gap-2 ${optClass}`}
                  >
                    <span className={`w-5 h-5 border-2 border-[#111113] text-[10px] font-mono font-bold flex items-center justify-center shrink-0 ${
                      showFeedback && isCorrect
                        ? 'bg-[#EA580C] text-white'
                        : showFeedback && isSelected
                        ? 'bg-[#EA580C] text-white'
                        : 'bg-[#F8F7F4] text-[#111113]'
                    }`}>
                      {String.fromCharCode(65 + oIdx)}
                    </span>
                    <span className="flex-1">{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Kotak Feedback Langsung */}
            {showFeedback && (
              <div className="p-3 border-2 border-[#111113] bg-white text-xs leading-relaxed space-y-1 shadow-[3px_3px_0_#111113] shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-bold font-display uppercase tracking-wide">
                    {selectedAnswer === currentQ.correctAnswer ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-[#EA580C] shrink-0" />
                        <span className="text-[#EA580C]">Jawaban Tepat!</span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-4 h-4 text-[#EA580C] shrink-0" />
                        <span className="text-[#EA580C]">
                          Belum Tepat — Yang Benar: Opsi {String.fromCharCode(65 + currentQ.correctAnswer)}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <p className="text-xs text-[#111113]/90 pt-1 border-t border-[#111113]/10 m-0">
                  <strong>Pembahasan:</strong> {currentQ.explanation}
                </p>
              </div>
            )}

            {/* Navigasi Soal */}
            <div className="pt-2 border-t-2 border-[#111113] flex items-center justify-between shrink-0">
              <button
                onClick={handlePrev}
                disabled={currentQIdx === 0}
                className="px-3 py-1.5 border-2 border-[#111113] bg-white hover:bg-[#111113] hover:text-white disabled:opacity-30 disabled:pointer-events-none text-xs font-bold font-display uppercase tracking-wider cursor-pointer"
              >
                &larr; Soal Sebelumnya
              </button>

              {showFeedback ? (
                <button
                  onClick={handleNext}
                  className="btn-primary-brutal py-1.5 px-5 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-[2px_2px_0_#111113]"
                >
                  <span>{currentQIdx === questions.length - 1 ? 'Lihat Hasil Evaluasi' : 'Soal Berikutnya'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <div className="text-[11px] label-mono text-[#111113]/60">
                  Pilih salah satu jawaban di atas
                </div>
              )}
            </div>
          </div>
        ) : (
          /* ================= MODE HASIL EVALUASI & FEEDBACK ================= */
          <div className="p-4 sm:p-6 flex flex-col justify-between overflow-hidden flex-1 space-y-3.5">
            {/* Kartu Ringkasan Tingkat Pemahaman */}
            <div className="border-2 border-[#111113] bg-white p-3.5 sm:p-4 shadow-[4px_4px_0_#111113] space-y-2 shrink-0">
              <div className="flex items-center justify-between pb-2 border-b-2 border-[#111113]">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 bg-[#111113] text-white border-2 border-[#111113] flex items-center justify-center shadow-[2px_2px_0_#EA580C]">
                    <Award className="w-5 h-5 text-[#EA580C]" />
                  </div>
                  <div>
                    <span className="label-mono text-[10px] text-[#EA580C] font-bold block uppercase">
                      HASIL EVALUASI PEMAHAMAN SISWA
                    </span>
                    <h3 className="font-display text-base sm:text-lg font-bold uppercase tracking-tight text-[#111113] m-0">
                      Tingkat Pemahaman: {understanding.level}
                    </h3>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-display text-xl sm:text-2xl font-bold text-[#EA580C] block">
                    {correctCount} / {totalCount} BENAR
                  </span>
                  <span className="label-mono text-[10px] text-[#111113]/70 font-bold">
                    {percentage}% KETEPATAN
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#111113]/85 leading-relaxed m-0 font-light">
                {understanding.summary}
              </p>
            </div>

            {/* Grid 2 Kolom: Bagian yang Paling Dipahami & Bagian yang Perlu Pengulangan */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 shrink-0">
              {/* Kolom 1: Bagian yang Paling Dipahami */}
              <div className="p-3 border-2 border-[#111113] bg-white shadow-[3px_3px_0_#111113] space-y-2">
                <div className="flex items-center gap-1.5 pb-1.5 border-b border-[#111113]/20">
                  <CheckCircle2 className="w-4 h-4 text-[#EA580C] shrink-0" />
                  <span className="font-display text-xs font-bold uppercase tracking-wide text-[#111113]">
                    Bagian yang Paling Dipahami ({correctQuestions.length})
                  </span>
                </div>

                {correctQuestions.length > 0 ? (
                  <div className="space-y-1.5">
                    {correctQuestions.map(q => (
                      <div key={q.id} className="p-2 border border-[#111113]/20 bg-[#F8F7F4] text-xs">
                        <span className="font-bold text-[#111113] block font-display uppercase text-[11px]">
                          ✓ {q.sectionTitle}
                        </span>
                        <p className="text-[#111113]/90 text-[11px] leading-relaxed m-0 mt-0.5">
                          {q.masteryFeedback}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-2.5 bg-[#F8F7F4] border border-dashed border-[#111113]/30 text-xs text-[#111113]/70 font-light">
                    Belum ada bagian yang terjawab benar pada sesi ini. Bacalah kembali bagian materi untuk memperkuat pemahaman.
                  </div>
                )}
              </div>

              {/* Kolom 2: Bagian yang Perlu Pengulangan */}
              <div className="p-3 border-2 border-[#111113] bg-white shadow-[3px_3px_0_#111113] space-y-2">
                <div className="flex items-center gap-1.5 pb-1.5 border-b border-[#111113]/20">
                  <AlertTriangle className="w-4 h-4 text-[#EA580C] shrink-0" />
                  <span className="font-display text-xs font-bold uppercase tracking-wide text-[#EA580C]">
                    Bagian yang Perlu Pengulangan ({incorrectQuestions.length})
                  </span>
                </div>

                {incorrectQuestions.length > 0 ? (
                  <div className="space-y-1.5">
                    {incorrectQuestions.map(q => (
                      <div key={q.id} className="p-2 border border-[#EA580C]/30 bg-[#EA580C]/5 text-xs">
                        <span className="font-bold text-[#EA580C] block font-display uppercase text-[11px]">
                          ⚠ {q.sectionTitle}
                        </span>
                        <p className="text-[#111113]/90 text-[11px] leading-relaxed m-0 mt-0.5">
                          {q.reviewFeedback}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-2.5 bg-[#F8F7F4] border border-[#111113]/20 text-xs text-[#111113] font-light">
                    🎉 <strong>Sempurna!</strong> Tidak ada bagian yang perlu diulang kembali. Seluruh konsep materi telah kamu kuasai secara tuntas.
                  </div>
                )}
              </div>
            </div>

            {/* Footer Aksi Hasil Evaluasi */}
            <div className="pt-2 border-t-2 border-[#111113] flex items-center justify-between shrink-0">
              <button
                onClick={handleRestart}
                className="px-3.5 py-1.5 border-2 border-[#111113] bg-white hover:bg-[#111113] hover:text-white text-xs font-bold font-display uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                title="Reset jawaban untuk evaluasi ulang atau siswa berikutnya"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Ulangi Evaluasi</span>
              </button>

              <button
                onClick={onClose}
                className="btn-primary-brutal py-1.5 px-6 text-xs font-bold cursor-pointer"
              >
                Tutup &amp; Kembali ke Materi &rarr;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
