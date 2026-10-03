import React, { useState } from 'react';
import { Topic, DiagnosticQuestion, LearningFormat } from '../types';
import { CheckCircle2, AlertTriangle, ArrowRight, RotateCcw, Award, Lightbulb, Compass, BookOpen, Volume2, Presentation, Network } from 'lucide-react';

interface DiagnosticQuizViewerProps {
  topic: Topic;
  onNavigateToRemediation: (format: LearningFormat, targetId: string) => void;
  onQuizCompleted?: (score: number, total: number) => void;
}

export const DiagnosticQuizViewer: React.FC<DiagnosticQuizViewerProps> = ({
  topic,
  onNavigateToRemediation,
  onQuizCompleted
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState<boolean>(false);

  const questions = topic.diagnosticQuestions;
  const currentQ = questions[currentQuestionIndex];

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (isQuizSubmitted) return;
    setAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const calculateScore = () => {
    let correctCount = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        correctCount += 1;
      }
    });
    return correctCount;
  };

  const handleSubmitQuiz = () => {
    setIsQuizSubmitted(true);
    const score = calculateScore();
    if (onQuizCompleted) {
      onQuizCompleted(score, questions.length);
    }
  };

  const handleResetQuiz = () => {
    setAnswers({});
    setIsQuizSubmitted(false);
    setCurrentQuestionIndex(0);
  };

  // Identify specific concept gaps from incorrect answers
  const identifiedGaps = questions
    .filter(q => answers[q.id] !== undefined && answers[q.id] !== q.correctAnswer)
    .map(q => ({
      questionId: q.id,
      questionText: q.question,
      userAnswer: q.options[answers[q.id]],
      correctAnswer: q.options[q.correctAnswer],
      conceptTarget: q.conceptTarget,
      feedback: q.gapFeedback
    }));

  const score = calculateScore();
  const percentage = Math.round((score / questions.length) * 100);

  const getFormatIcon = (format: LearningFormat) => {
    switch (format) {
      case 'text':
        return <BookOpen className="w-4 h-4 text-blue-600" />;
      case 'audio':
        return <Volume2 className="w-4 h-4 text-amber-600" />;
      case 'slides':
        return <Presentation className="w-4 h-4 text-emerald-600" />;
      case 'mindmap':
        return <Network className="w-4 h-4 text-purple-600" />;
      default:
        return <Compass className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-2">
      {/* Quiz Introduction Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#DEEADE] shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-[#2E8B57] mb-2 uppercase tracking-wide">
          <span>Umpan Balik & Deteksi Celah Pemahaman</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A] tracking-tight">
          Kuis Diagnostik Interaktif: {topic.title}
        </h1>

        <p className="text-xs sm:text-sm text-[#4A4238] mt-2 leading-relaxed">
          Kuis ini dirancang khusus untuk memetakan pemahamanmu. Jika ada soal yang salah, sistem akan secara otomatis menganalisis celah pemahaman dan merekomendasikan bagian materi (teks, audio, slide, atau peta konsep) untuk kamu pelajari ulang!
        </p>

        {/* Progress Tracker */}
        <div className="mt-6 flex items-center justify-between text-xs text-[#526D52] pb-2 border-b border-[#EDF2EB]">
          <span>Dijawab: {Object.keys(answers).length} dari {questions.length} Soal</span>
          <span className="font-bold text-[#14532D]">
            {isQuizSubmitted ? `Nilai Akhir: ${percentage}%` : `Soal ke-${currentQuestionIndex + 1}`}
          </span>
        </div>
      </div>

      {!isQuizSubmitted ? (
        /* Question Card Mode */
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#DEEADE] shadow-sm space-y-6">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[#6B876B] uppercase tracking-wider">
              Pertanyaan 0{currentQuestionIndex + 1}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#F0FDF4] border border-[#D1FAE5] text-[#14532D] font-bold">
              Konsep: {currentQ.conceptTarget}
            </span>
          </div>

          <h2 className="text-lg sm:text-xl font-bold text-[#1A1A1A] leading-snug">
            {currentQ.question}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt, optIdx) => {
              const isSelected = answers[currentQ.id] === optIdx;

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(currentQ.id, optIdx)}
                  className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-start gap-3 cursor-pointer ${
                    isSelected
                      ? 'border-[#2E8B57] bg-[#E6F8EF] text-[#14532D] ring-2 ring-[#2E8B57]/20 shadow-xs font-bold'
                      : 'border-[#DEEADE] hover:border-[#3CB371] hover:bg-[#F0FDF4] text-[#2C2520] bg-white'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center shrink-0 border ${
                    isSelected ? 'bg-[#2E8B57] text-white border-[#2E8B57]' : 'bg-[#E6F8EF] text-[#14532D] border-[#A7F3D0]'
                  }`}>
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <span className="mt-0.5 leading-relaxed">{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Question Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-[#EDF2EB]">
            <button
              onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
              disabled={currentQuestionIndex === 0}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#526D52] hover:bg-[#F0FDF4] disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
            >
              ← Soal Sebelumnya
            </button>

            <div className="flex items-center gap-1.5">
              {questions.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setCurrentQuestionIndex(dotIdx)}
                  className={`w-7 h-7 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    dotIdx === currentQuestionIndex
                      ? 'bg-[#2E8B57] text-white shadow-xs font-bold'
                      : answers[questions[dotIdx].id] !== undefined
                      ? 'bg-[#E6F8EF] text-[#14532D]'
                      : 'bg-[#F0FDF4] text-[#6B876B] hover:bg-[#E6F8EF]'
                  }`}
                >
                  {dotIdx + 1}
                </button>
              ))}
            </div>

            {currentQuestionIndex < questions.length - 1 ? (
              <button
                onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#1A1A1A] text-white hover:bg-black transition-colors cursor-pointer"
              >
                Soal Berikutnya →
              </button>
            ) : (
              <button
                onClick={handleSubmitQuiz}
                disabled={Object.keys(answers).length === 0}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#2E8B57] hover:bg-[#236C43] text-white shadow-md hover:shadow-lg transition-all disabled:opacity-50 cursor-pointer"
              >
                Lihat Hasil Diagnostik
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Results & Knowledge Gap Analysis Mode */
        <div className="space-y-6">
          {/* Summary Scorecard */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DEEADE] shadow-sm text-center">
            <div className="w-16 h-16 rounded-full bg-[#E6F8EF] text-[#2E8B57] flex items-center justify-center mx-auto mb-3">
              <Award className="w-8 h-8" />
            </div>

            <h2 className="text-2xl font-extrabold text-[#1A1A1A]">
              Hasil Diagnostik Pemahaman
            </h2>

            <p className="text-xs sm:text-sm text-[#526D52] mt-1">
              Kamu berhasil menjawab benar <strong className="text-[#1A1A1A]">{score}</strong> dari <strong className="text-[#1A1A1A]">{questions.length}</strong> pertanyaan ({percentage}%).
            </p>

            <div className="mt-5 flex items-center justify-center gap-3">
              <button
                onClick={handleResetQuiz}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#D1FAE5] text-[#14532D] text-xs font-bold hover:bg-[#E6F8EF] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Ulangi Kuis</span>
              </button>
            </div>
          </div>

          {/* Celah Pemahaman Terdeteksi (Interactive Remediation Section) */}
          {identifiedGaps.length > 0 ? (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-sm space-y-6">
              <div className="flex items-center gap-2 text-amber-800">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <h3 className="text-lg font-bold">
                  {identifiedGaps.length} Celah Pemahaman Terdeteksi
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-600">
                Jangan khawatir! Belajar adalah proses mengenali apa yang belum tuntas. Klik tombol rekomendasi di bawah untuk langsung membuka bagian materi yang perlu kamu perkuat:
              </p>

              <div className="space-y-4">
                {identifiedGaps.map((gap, gIdx) => (
                  <div
                    key={gIdx}
                    className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200 text-xs sm:text-sm space-y-3"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-amber-900 pb-2 border-b border-amber-200/60">
                      <span>Celah #{gIdx + 1}: {gap.conceptTarget}</span>
                      <span className="text-rose-600">Perlu Penguatan</span>
                    </div>

                    <p className="font-semibold text-slate-900">
                      "{gap.questionText}"
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="p-2 rounded-lg bg-rose-50 border border-rose-200/60 text-rose-900">
                        <strong className="block text-[11px] text-rose-700">Pilihanmu:</strong>
                        <span>{gap.userAnswer}</span>
                      </div>
                      <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200/60 text-emerald-900">
                        <strong className="block text-[11px] text-emerald-700">Konsep yang Benar:</strong>
                        <span>{gap.correctAnswer}</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-amber-200/80 text-slate-700 text-xs leading-relaxed">
                      <div className="font-semibold text-amber-950 flex items-center gap-1.5 mb-1">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                        <span>Analisis Kekeliruan Konsep:</span>
                      </div>
                      <p>{gap.feedback.misconception}</p>
                      <p className="mt-1 font-medium text-slate-800">{gap.feedback.explanation}</p>
                    </div>

                    {/* ACTIONABLE DEEP LINK BUTTON */}
                    <div className="pt-2">
                      <button
                        onClick={() => onNavigateToRemediation(gap.feedback.recommendedFormat, gap.feedback.recommendedTargetId)}
                        className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#2E8B57] hover:bg-[#236C43] text-white font-bold text-xs transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
                      >
                        {getFormatIcon(gap.feedback.recommendedFormat)}
                        <span>{gap.feedback.recommendedLabel}</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Perfect Score State */
            <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-8 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-xl font-bold text-emerald-950">
                Luar Biasa! Pemahamanmu Sempurna
              </h3>
              <p className="text-xs sm:text-sm text-emerald-900 max-w-md mx-auto">
                Tidak ada celah pemahaman yang terdeteksi untuk materi ini. Kamu telah menguasai seluruh konsep inti Kurikulum Merdeka!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
