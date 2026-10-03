import React, { useState } from 'react';
import { Topic, TextSection, ParagraphQuiz } from '../types';
import {
  Check,
  ArrowLeft,
  ArrowRight,
  HelpCircle,
  X,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  Award
} from 'lucide-react';
import { EvaluationModal } from './EvaluationModal';

interface ImmersiveTextScopeProps {
  topic: Topic;
  completedSections: string[];
  onToggleCompleteSection: (sectionId: string) => void;
  onCompleteSection?: (sectionId: string) => void;
  onJumpToSlide?: (slideId: string) => void;
  onJumpToAudio?: (turnId: string) => void;
}

export const ImmersiveTextScope: React.FC<ImmersiveTextScopeProps> = ({
  topic,
  completedSections,
  onToggleCompleteSection,
  onCompleteSection,
  onJumpToSlide,
  onJumpToAudio
}) => {
  const [activeSectionIndex, setActiveSectionIndex] = useState<number>(0);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState<boolean>(false);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [showQuizResult, setShowQuizResult] = useState<boolean>(false);

  // Multiple Choice Paragraph Quiz Modal triggered by clicking the '?' symbol
  const [activeParagraphQuiz, setActiveParagraphQuiz] = useState<{
    paragraphIdx: number;
    paragraphText: string;
    quiz: ParagraphQuiz;
  } | null>(null);
  const [paraQuizAnswer, setParaQuizAnswer] = useState<number | null>(null);
  const [showParaQuizResult, setShowParaQuizResult] = useState<boolean>(false);

  // Track correct answers for both paragraph quizzes and section quizzes
  const [passedParaQuizzes, setPassedParaQuizzes] = useState<Record<string, Set<number>>>({});
  const [passedSectionQuizzes, setPassedSectionQuizzes] = useState<Set<string>>(new Set());

  // Evaluation & Reflection Modal State
  const [isEvaluationModalOpen, setIsEvaluationModalOpen] = useState<boolean>(false);

  const sections = topic.sections;
  const currentSection: TextSection = sections[activeSectionIndex] || sections[0];
  const isCompleted = completedSections.includes(currentSection.id);

  // Check if student has passed all sections in this topic
  const allSectionsCompleted = sections.length > 0 && sections.every(sec => completedSections.includes(sec.id));
  const completedCount = completedSections.filter(id => sections.some(s => s.id === id)).length;

  const checkAndCompleteSection = (secId: string, paraSet: Set<number>, secSet: Set<string>) => {
    const hasPassedPara = (paraSet?.size || 0) > 0;
    const hasPassedSection = secSet.has(secId);

    if (hasPassedPara && hasPassedSection) {
      if (onCompleteSection) {
        onCompleteSection(secId);
      } else if (!completedSections.includes(secId)) {
        onToggleCompleteSection(secId);
      }
    }
  };

  const handleNextSection = () => {
    if (activeSectionIndex < sections.length - 1) {
      setActiveSectionIndex(prev => prev + 1);
      setQuizAnswer(null);
      setShowQuizResult(false);
      setIsQuizModalOpen(false);
      setActiveParagraphQuiz(null);
    }
  };

  const handlePrevSection = () => {
    if (activeSectionIndex > 0) {
      setActiveSectionIndex(prev => prev - 1);
      setQuizAnswer(null);
      setShowQuizResult(false);
      setIsQuizModalOpen(false);
      setActiveParagraphQuiz(null);
    }
  };

  const handleOpenQuiz = () => {
    setQuizAnswer(null);
    setShowQuizResult(false);
    setIsQuizModalOpen(true);
  };

  const handleAnswerQuiz = (optionIdx: number) => {
    setQuizAnswer(optionIdx);
    setShowQuizResult(true);
    if (optionIdx === currentSection.miniQuiz.correctAnswer) {
      const updatedSecSet = new Set(passedSectionQuizzes);
      updatedSecSet.add(currentSection.id);
      setPassedSectionQuizzes(updatedSecSet);

      const curParaSet = passedParaQuizzes[currentSection.id] || new Set();
      checkAndCompleteSection(currentSection.id, curParaSet, updatedSecSet);
    }
  };

  const handleOpenParagraphQuiz = (pIdx: number, paragraph: string) => {
    const existing = currentSection.paragraphQuizzes?.find(q => q.paragraphIndex === pIdx);
    const quiz: ParagraphQuiz = existing || {
      paragraphIndex: pIdx,
      question: `Berdasarkan kalimat/paragraf ini, manakah simpulan konsep yang paling akurat?`,
      options: [
        paragraph.length > 70 ? paragraph.slice(0, 70) + '...' : paragraph,
        'Pernyataan ini tidak memiliki keterkaitan dengan materi pokok.',
        'Informasi ini hanya berupa asumsi tanpa data ilmiah terukur.',
        'Prinsip ini berlawanan dengan materi yang sedang dipelajari.'
      ],
      correctAnswer: 0,
      explanation: `Paragraf tersebut secara spesifik menjelaskan: "${paragraph}" sebagai pokok bahasan penting.`
    };

    setActiveParagraphQuiz({
      paragraphIdx: pIdx,
      paragraphText: paragraph,
      quiz
    });
    setParaQuizAnswer(null);
    setShowParaQuizResult(false);
  };

  const handleAnswerParaQuiz = (optionIdx: number) => {
    setParaQuizAnswer(optionIdx);
    setShowParaQuizResult(true);
    if (activeParagraphQuiz && optionIdx === activeParagraphQuiz.quiz.correctAnswer) {
      const curSet = new Set(passedParaQuizzes[currentSection.id] || []);
      curSet.add(activeParagraphQuiz.paragraphIdx);
      const updatedPara = {
        ...passedParaQuizzes,
        [currentSection.id]: curSet
      };
      setPassedParaQuizzes(updatedPara);
      checkAndCompleteSection(currentSection.id, curSet, passedSectionQuizzes);
    }
  };

  return (
    <div className="w-full bg-white border-2 border-[#111113] shadow-[8px_8px_0_#111113] p-5 sm:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
        {/* Left Sidebar */}
        <aside className="lg:col-span-4 xl:col-span-3 space-y-3">
          <div className="space-y-2">
            {sections.map((sec, idx) => {
              const isActive = idx === activeSectionIndex;
              const completed = completedSections.includes(sec.id);

              return (
                <div
                  key={sec.id}
                  className={`border-2 transition-all ${
                    isActive
                      ? 'bg-[#F8F7F4] border-[#111113] shadow-[3px_3px_0_#111113] p-3'
                      : 'border-transparent hover:border-[#111113]/30 hover:bg-[#F8F7F4]/50 p-2.5 cursor-pointer'
                  }`}
                  onClick={() => {
                    setActiveSectionIndex(idx);
                    setQuizAnswer(null);
                    setShowQuizResult(false);
                    setIsQuizModalOpen(false);
                  }}
                >
                  <div className="flex items-start gap-2.5">
                    {/* Status Centang Otomatis */}
                    <div
                      className={`w-5 h-5 mt-0.5 flex items-center justify-center shrink-0 border-2 select-none ${
                        completed
                          ? 'bg-[#EA580C] border-[#111113] text-white shadow-[1px_1px_0_#111113]'
                          : 'border-[#111113] bg-white'
                      }`}
                      title={completed ? 'Pemahaman bagian telah teruji & tercentang' : 'Tercentang otomatis setelah kuis'}
                    >
                      {completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className={`text-xs sm:text-sm leading-snug ${
                        isActive ? 'font-bold font-display uppercase text-[#111113]' : 'font-medium text-[#111113]/80'
                      }`}>
                        {sec.title}
                      </p>

                      {isActive && (
                        <div className="mt-2.5">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenQuiz();
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#111113] text-white hover:bg-[#EA580C] border-2 border-[#111113] font-display text-[11px] font-bold tracking-wider transition-all shadow-[2px_2px_0_#111113] cursor-pointer"
                          >
                            <HelpCircle className="w-3.5 h-3.5" />
                            <span>
                              {completed ? '✓ Kuis Terjawab' : 'Jawab Kuis'}
                            </span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tombol Evaluasi di Bawah Daftar Bagian */}
          <div className="pt-2">
            {allSectionsCompleted ? (
              <button
                onClick={() => setIsEvaluationModalOpen(true)}
                className="w-full p-2.5 sm:p-3 bg-[#EA580C] hover:bg-[#111113] text-white border-2 border-[#111113] shadow-[4px_4px_0_#111113] flex items-center justify-between font-display uppercase font-bold text-xs tracking-wider transition-all cursor-pointer hover:translate-x-0.5 hover:translate-y-0.5 animate-pulse"
                title="Buka Evaluasi Pemahaman Teks Imersif"
              >
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>EVALUASI MATERI</span>
                </span>
                <span className="font-mono text-sm">&rarr;</span>
              </button>
            ) : (
              <div className="p-2 border-2 border-dashed border-[#111113]/30 bg-[#F8F7F4]/60 text-[#111113]/60 text-xs font-mono flex items-center justify-between">
                <span>evaluasi</span>
                <span className="font-bold">[{completedCount}/{sections.length} Bagian]</span>
              </div>
            )}
          </div>

          {/* Quick info card */}
          <div className="mt-4 p-3 bg-[#F8F7F4] border-2 border-[#111113] text-xs text-[#111113] space-y-1.5">
            <span className="font-display font-bold uppercase text-[#EA580C] block tracking-wide">
              Panduan Pemahaman &amp; Evaluasi
            </span>
            <p className="font-light text-[11px] leading-relaxed text-[#111113]/85 m-0">
              Setiap paragraf memiliki simbol <span className="inline-flex items-center justify-center w-3.5 h-3.5 bg-[#EA580C] text-white font-mono text-[9px] font-bold">?</span> berupa soal pemahaman konsep.
            </p>
            <p className="font-light text-[11px] leading-relaxed text-[#111113]/85 m-0">
              Untuk menyelesaikan setiap bagian, jawab pertanyaan pada kalimat/paragraf dan selesaikan <strong>Jawab Kuis</strong>. Soal evaluasi dapat dikerjakan setelah seluruh bagian terselesaikan.
            </p>
          </div>
        </aside>

        {/* Right Main Text Area */}
        <main className="lg:col-span-8 xl:col-span-9 space-y-6 relative">
          {/* Top Controls (Next/Prev) */}
          <div className="flex items-center justify-end pb-3 border-b-2 border-[#111113]">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevSection}
                disabled={activeSectionIndex === 0}
                className="p-1 border-2 border-[#111113] bg-white hover:bg-[#111113] hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                title="Bagian Sebelumnya"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <span className="text-xs label-mono font-bold px-2">
                {activeSectionIndex + 1} / {sections.length}
              </span>
              <button
                onClick={handleNextSection}
                disabled={activeSectionIndex === sections.length - 1}
                className="p-1 border-2 border-[#111113] bg-white hover:bg-[#111113] hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                title="Bagian Berikutnya"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main Section Header */}
          <div>
            <div className="label-mono text-xs font-bold text-[#EA580C] mb-1">
              BAGIAN {currentSection.sectionNumber}.0
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#111113] leading-tight m-0">
              {currentSection.title}
            </h2>

            <p className="mt-3 text-sm sm:text-base font-light text-[#111113]/90 leading-relaxed border-l-4 border-[#EA580C] pl-4 py-0.5">
              {currentSection.leadParagraph}
            </p>
          </div>

          {/* Content Paragraphs with Brutalist '?' Badges */}
          <div className="space-y-4 text-sm sm:text-base text-[#111113] leading-relaxed font-light">
            {currentSection.content.map((paragraph, pIdx) => (
              <div key={pIdx} className="relative group">
                <p className="pr-10 sm:pr-12">{paragraph}</p>

                <button
                  onClick={() => handleOpenParagraphQuiz(pIdx, paragraph)}
                  className="absolute right-0 top-0.5 w-6 h-6 border-2 border-[#111113] bg-[#EA580C] hover:bg-[#111113] text-white flex items-center justify-center font-mono text-xs font-bold shadow-[2px_2px_0_#111113] transition-all hover:translate-x-0.5 hover:translate-y-0.5 cursor-pointer"
                  title="Klik simbol ? untuk soal pemahaman pilihan ganda kalimat ini"
                >
                  ?
                </button>
              </div>
            ))}
          </div>

          {/* Analogy & Fun Fact */}
          {currentSection.realWorldAnalogy && (
            <div className="p-4 sm:p-5 border-2 border-[#111113] bg-[#F8F7F4] shadow-[4px_4px_0_#111113]">
              <div className="flex items-center gap-2 font-display uppercase font-bold text-xs tracking-wider text-[#EA580C] mb-1">
                <Lightbulb className="w-4 h-4 text-[#EA580C]" />
                <span>{currentSection.realWorldAnalogy.title}</span>
              </div>
              <p className="text-xs sm:text-sm text-[#111113]/90 leading-relaxed font-light">
                {currentSection.realWorldAnalogy.description}
              </p>
            </div>
          )}

          {/* Section Bottom Checkpoint Button */}
          <div className="pt-4 border-t-2 border-[#111113] flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2.5">
              <button
                onClick={handleOpenQuiz}
                className="btn-primary-brutal py-2.5 px-5 text-xs font-bold flex items-center gap-2 cursor-pointer shadow-[3px_3px_0_#111113]"
              >
                <HelpCircle className="w-4 h-4" />
                <span>
                  {isCompleted ? 'Jawab Ulang Kuis' : 'Jawab Kuis'}
                </span>
              </button>
            </div>

            {activeSectionIndex < sections.length - 1 && (
              <button
                onClick={handleNextSection}
                className="font-display uppercase text-xs font-bold tracking-wider text-[#111113] hover:text-[#EA580C] flex items-center gap-1 cursor-pointer"
              >
                <span>Bagian Berikutnya</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </main>
      </div>

      {/* ======================================================== */}
      {/* SECTION QUIZ MODAL: Designed for 0-scroll on desktop screens */}
      {/* ======================================================== */}
      {isQuizModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-none animate-in fade-in duration-100">
          <div className="bg-[#F8F7F4] border-2 border-[#111113] shadow-[10px_10px_0_#111113] w-full max-w-3xl max-h-[92vh] flex flex-col justify-between overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 border-b-2 border-[#111113] bg-white shrink-0">
              <div className="flex items-center gap-2">
                <span className="label-mono text-xs font-bold text-[#EA580C]">[JAWAB KUIS]</span>
                <span className="text-[#111113]/40">·</span>
                <h3 className="font-display text-xs sm:text-sm font-bold uppercase tracking-tight text-[#111113] m-0">
                  Bagian 0{currentSection.sectionNumber}: {currentSection.title}
                </h3>
              </div>
              <button
                onClick={() => setIsQuizModalOpen(false)}
                className="w-7 h-7 border-2 border-[#111113] bg-white hover:bg-[#EA580C] hover:text-white flex items-center justify-center cursor-pointer font-bold transition-colors"
                title="Tutup"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Body: Question + Options + Compact Feedback */}
            <div className="p-4 sm:p-5 flex flex-col justify-between overflow-hidden flex-1 space-y-3">
              {/* Question */}
              <h4 className="text-sm sm:text-base font-bold text-[#111113] leading-snug m-0 shrink-0">
                "{currentSection.miniQuiz.question}"
              </h4>

              {/* Options in 2x2 Grid on sm/desktop (Takes minimal vertical space) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 shrink-0">
                {currentSection.miniQuiz.options.map((opt, oIdx) => {
                  const isSelected = quizAnswer === oIdx;
                  const isCorrect = oIdx === currentSection.miniQuiz.correctAnswer;

                  let optClass = 'border-[#111113] bg-white hover:bg-[#111113]/5 text-[#111113] cursor-pointer';
                  if (showQuizResult) {
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
                      onClick={() => handleAnswerQuiz(oIdx)}
                      disabled={showQuizResult}
                      className={`text-left p-2.5 border-2 text-xs sm:text-[13px] leading-snug transition-all flex items-start gap-2 ${optClass}`}
                    >
                      <span className={`w-5 h-5 border-2 border-[#111113] text-[10px] font-mono font-bold flex items-center justify-center shrink-0 ${
                        showQuizResult && isCorrect
                          ? 'bg-[#EA580C] text-white'
                          : showQuizResult && isSelected
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

              {/* Compact Feedback Box: Displayed without scrolling */}
              {showQuizResult && (() => {
                const isCorrect = quizAnswer === currentSection.miniQuiz.correctAnswer;
                const correctIdx = currentSection.miniQuiz.correctAnswer;
                const correctLetter = String.fromCharCode(65 + correctIdx);
                const cleanedExplanation = currentSection.miniQuiz.explanation.replace(/^(Tepat sekali!|Benar sekali!|Benar!|Tepat!)\s*/i, '');

                return (
                  <div className="p-3 border-2 border-[#111113] bg-white text-xs leading-relaxed space-y-1.5 shadow-[3px_3px_0_#111113] shrink-0">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 font-bold font-display uppercase tracking-wide">
                        {isCorrect ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-[#EA580C] shrink-0" />
                            <span className="text-[#EA580C]">Hebat! Jawabanmu Benar</span>
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="w-4 h-4 text-[#EA580C] shrink-0" />
                            <span className="text-[#EA580C]">
                              Jawaban Belum Tepat — Yang Benar: Opsi {correctLetter}
                            </span>
                          </>
                        )}
                      </div>

                      {!isCorrect && (
                        <div className="flex items-center gap-1.5 text-[11px]">
                          {onJumpToSlide && (
                            <button
                              onClick={() => {
                                setIsQuizModalOpen(false);
                                onJumpToSlide('slide-2');
                              }}
                              className="px-2 py-0.5 bg-white text-[#111113] font-bold border border-[#111113] hover:bg-[#EA580C] hover:text-white cursor-pointer uppercase font-display"
                            >
                              Slide Materi &rarr;
                            </button>
                          )}
                          {onJumpToAudio && (
                            <button
                              onClick={() => {
                                setIsQuizModalOpen(false);
                                onJumpToAudio(currentSection.id);
                              }}
                              className="px-2 py-0.5 bg-white text-[#111113] font-bold border border-[#111113] hover:bg-[#EA580C] hover:text-white cursor-pointer uppercase font-display"
                            >
                              Audio &rarr;
                            </button>
                          )}
                        </div>
                      )}
                    </div>

                    <p className="text-xs text-[#111113]/90 pt-1 border-t border-[#111113]/10 m-0">
                      <strong>Pembahasan:</strong> {cleanedExplanation}
                    </p>
                  </div>
                );
              })()}
            </div>

            {/* Modal Footer Controls */}
            <div className="px-4 sm:px-6 py-2.5 border-t-2 border-[#111113] bg-white flex items-center justify-between gap-3 shrink-0">
              {showQuizResult && quizAnswer !== currentSection.miniQuiz.correctAnswer ? (
                <button
                  onClick={() => {
                    setQuizAnswer(null);
                    setShowQuizResult(false);
                  }}
                  className="px-3.5 py-1.5 border-2 border-[#111113] bg-white hover:bg-[#111113]/5 text-[#111113] text-xs font-bold font-display uppercase tracking-wider cursor-pointer"
                >
                  ↺ Coba Lagi
                </button>
              ) : (
                <div />
              )}

              <button
                onClick={() => setIsQuizModalOpen(false)}
                className="btn-primary-brutal py-1.5 px-6 text-xs font-bold cursor-pointer"
              >
                {showQuizResult ? 'Tutup & Lanjut' : 'Batal'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* PARAGRAPH QUIZ MODAL: Designed for 0-scroll on desktop screens */}
      {/* ======================================================== */}
      {activeParagraphQuiz && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-none animate-in fade-in duration-100">
          <div className="bg-[#F8F7F4] border-2 border-[#111113] shadow-[10px_10px_0_#111113] w-full max-w-3xl max-h-[92vh] flex flex-col justify-between overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 border-b-2 border-[#111113] bg-white shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 border-2 border-[#111113] bg-[#EA580C] text-white flex items-center justify-center text-[11px] font-mono font-bold shadow-[1px_1px_0_#111113]">
                  ?
                </span>
                <span className="text-xs font-bold uppercase font-display tracking-wider text-[#EA580C]">
                  Soal Pemahaman Paragraf
                </span>
              </div>
              <button
                onClick={() => {
                  setActiveParagraphQuiz(null);
                  setParaQuizAnswer(null);
                  setShowParaQuizResult(false);
                }}
                className="w-7 h-7 border-2 border-[#111113] bg-white hover:bg-[#EA580C] hover:text-white flex items-center justify-center cursor-pointer font-bold transition-colors"
                title="Tutup"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Body: Question + Options + Direct Feedback */}
            <div className="p-4 sm:p-5 flex flex-col justify-between overflow-hidden flex-1 space-y-3">
              {/* Question */}
              <h4 className="text-sm sm:text-base font-bold text-[#111113] leading-snug m-0 shrink-0">
                "{activeParagraphQuiz.quiz.question}"
              </h4>

              {/* Options in 2x2 Grid on sm/desktop */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 shrink-0">
                {activeParagraphQuiz.quiz.options.map((opt, oIdx) => {
                  const isSelected = paraQuizAnswer === oIdx;
                  const isCorrect = oIdx === activeParagraphQuiz.quiz.correctAnswer;

                  let optClass = 'border-[#111113] bg-white hover:bg-[#111113]/5 text-[#111113] cursor-pointer';
                  if (showParaQuizResult) {
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
                      onClick={() => handleAnswerParaQuiz(oIdx)}
                      disabled={showParaQuizResult}
                      className={`text-left p-2.5 border-2 text-xs sm:text-[13px] leading-snug transition-all flex items-start gap-2 ${optClass}`}
                    >
                      <span className={`w-5 h-5 border-2 border-[#111113] text-[10px] font-mono font-bold flex items-center justify-center shrink-0 ${
                        showParaQuizResult && isCorrect
                          ? 'bg-[#EA580C] text-white'
                          : showParaQuizResult && isSelected
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

              {/* Compact Feedback Box: Displayed without scrolling */}
              {showParaQuizResult && (
                <div className="p-3 border-2 border-[#111113] bg-white text-xs leading-relaxed space-y-1 shadow-[3px_3px_0_#111113] shrink-0">
                  <div className="flex items-center gap-1.5 font-bold font-display uppercase tracking-wide">
                    {paraQuizAnswer === activeParagraphQuiz.quiz.correctAnswer ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-[#EA580C] shrink-0" />
                        <span className="text-[#EA580C]">Benar Sekali!</span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-4 h-4 text-[#EA580C] shrink-0" />
                        <span className="text-[#EA580C]">
                          Jawaban Kurang Tepat — Yang Benar: Opsi {String.fromCharCode(65 + activeParagraphQuiz.quiz.correctAnswer)}
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-xs text-[#111113]/90 pt-1 border-t border-[#111113]/10 m-0">
                    <strong>Penjelasan:</strong> {activeParagraphQuiz.quiz.explanation}
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-4 sm:px-6 py-2.5 border-t-2 border-[#111113] bg-white flex items-center justify-between gap-3 shrink-0">
              {showParaQuizResult && paraQuizAnswer !== activeParagraphQuiz.quiz.correctAnswer ? (
                <button
                  onClick={() => {
                    setParaQuizAnswer(null);
                    setShowParaQuizResult(false);
                  }}
                  className="px-3.5 py-1.5 border-2 border-[#111113] bg-white text-[#111113] text-xs font-bold font-display uppercase tracking-wider cursor-pointer"
                >
                  ↺ Coba Lagi
                </button>
              ) : (
                <div />
              )}

              <button
                onClick={() => {
                  setActiveParagraphQuiz(null);
                  setParaQuizAnswer(null);
                  setShowParaQuizResult(false);
                }}
                className="btn-primary-brutal py-1.5 px-6 text-xs font-bold cursor-pointer"
              >
                {showParaQuizResult ? 'Paham, Lanjut Membaca →' : 'Tutup'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* EVALUATION MODAL (All Sections Completed)                */}
      {/* ======================================================== */}
      <EvaluationModal
        isOpen={isEvaluationModalOpen}
        onClose={() => setIsEvaluationModalOpen(false)}
        topic={topic}
      />
    </div>
  );
};
