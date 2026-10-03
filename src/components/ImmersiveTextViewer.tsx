import React, { useState, useEffect } from 'react';
import { Topic, TextSection } from '../types';
import { ConceptIllustration } from './ConceptIllustration';
import { CheckCircle2, HelpCircle, Lightbulb, Compass, ArrowRight, Sparkles } from 'lucide-react';

interface ImmersiveTextViewerProps {
  topic: Topic;
  targetSectionId?: string | null;
  onCompleteSection?: (sectionId: string) => void;
  onJumpToFormat: (format: 'audio' | 'slides' | 'mindmap' | 'quiz') => void;
}

export const ImmersiveTextViewer: React.FC<ImmersiveTextViewerProps> = ({
  topic,
  targetSectionId,
  onCompleteSection,
  onJumpToFormat
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showExplanations, setShowExplanations] = useState<Record<string, boolean>>({});

  // Auto-scroll if a targetSectionId was passed from Gap Analysis
  useEffect(() => {
    if (targetSectionId) {
      const el = document.getElementById(targetSectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [targetSectionId]);

  const handleSelectOption = (sectionId: string, optionIndex: number) => {
    setSelectedAnswers(prev => ({ ...prev, [sectionId]: optionIndex }));
    setShowExplanations(prev => ({ ...prev, [sectionId]: true }));
    if (onCompleteSection) {
      onCompleteSection(sectionId);
    }
  };

  const getIllustrationType = () => {
    if (topic.id === 'tata-surya') return 'solar';
    if (topic.id === 'sistem-pencernaan') return 'digestive';
    if (topic.id === 'teorema-pythagoras') return 'pythagoras';
    return 'circuit';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 py-2">
      {/* Visual Header & Big Interactive Graphic */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
          <span>{topic.subject}</span>
          <span aria-hidden="true">·</span>
          <span>{topic.grade}</span>
          <span aria-hidden="true">·</span>
          <span>{topic.durationMinutes} menit estimasi baca</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight text-balance">
          {topic.title}
        </h1>

        <p className="mt-3 text-base text-slate-600 leading-relaxed max-w-2xl">
          {topic.shortDesc}
        </p>

        {/* Big Interactive Visual Stage */}
        <div className="mt-6">
          <ConceptIllustration type={getIllustrationType()} />
        </div>

        {/* Quick Format Switcher Bar */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <span>Suka belajar lewat format lain? Coba:</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onJumpToFormat('audio')}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors flex items-center gap-1.5"
            >
              <span>🎙️ Pelajaran Audio Guru-Siswa</span>
            </button>
            <button
              onClick={() => onJumpToFormat('slides')}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors flex items-center gap-1.5"
            >
              <span>🎞️ Slide Presentasi</span>
            </button>
            <button
              onClick={() => onJumpToFormat('mindmap')}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors flex items-center gap-1.5"
            >
              <span>🧠 Peta Konsep</span>
            </button>
          </div>
        </div>
      </div>

      {/* Structured Text Sections */}
      <div className="space-y-8">
        {topic.sections.map((section, idx) => {
          const isTargeted = targetSectionId === section.id;
          const selectedAns = selectedAnswers[section.id];
          const hasAnswered = selectedAns !== undefined;
          const isCorrect = hasAnswered && selectedAns === section.miniQuiz.correctAnswer;

          return (
            <article
              key={section.id}
              id={section.id}
              className={`bg-white rounded-2xl p-6 sm:p-8 border transition-all ${
                isTargeted
                  ? 'border-blue-500 ring-4 ring-blue-500/10 shadow-md'
                  : 'border-slate-200 shadow-sm'
              }`}
            >
              {/* Target Banner if jumped here */}
              {isTargeted && (
                <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>Rekomendasi Celah Pemahaman: Tinjau Bagian Ini</span>
                </div>
              )}

              {/* Natural Editorial Numbering */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-bold tracking-wider text-blue-600 uppercase">
                  Bagian 0{section.sectionNumber}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                <span className="text-xs text-slate-400">Kurikulum Merdeka</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {section.title}
              </h2>

              <p className="mt-3 text-base font-medium text-slate-700 leading-relaxed border-l-2 border-blue-500 pl-4 py-0.5">
                {section.leadParagraph}
              </p>

              {/* Main Content Paragraphs */}
              <div className="mt-5 space-y-3.5 text-sm sm:text-base text-slate-600 leading-relaxed">
                {section.content.map((paragraph, pIdx) => (
                  <p key={pIdx}>{paragraph}</p>
                ))}
              </div>

              {/* Real World Analogy Box */}
              {section.realWorldAnalogy && (
                <div className="mt-6 rounded-xl bg-amber-50/70 border border-amber-200/70 p-4 sm:p-5">
                  <div className="flex items-center gap-2 text-amber-900 font-bold text-sm mb-1.5">
                    <Compass className="w-4 h-4 text-amber-600" />
                    <span>{section.realWorldAnalogy.title}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-amber-950 leading-relaxed">
                    {section.realWorldAnalogy.description}
                  </p>
                </div>
              )}

              {/* Fun Fact Callout */}
              {section.funFact && (
                <div className="mt-4 rounded-xl bg-emerald-50/70 border border-emerald-200/70 p-4 sm:p-5 flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
                    <Lightbulb className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wide">
                      Tahukah Kamu?
                    </h4>
                    <p className="text-xs sm:text-sm text-emerald-950 mt-1 leading-relaxed">
                      {section.funFact}
                    </p>
                  </div>
                </div>
              )}

              {/* Section Checkpoint / Mini-Quiz */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-2 mb-3">
                  <HelpCircle className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-bold text-slate-900 tracking-wide uppercase">
                    Cek Pemahaman Bagian 0{section.sectionNumber}
                  </span>
                </div>

                <p className="text-sm font-semibold text-slate-900 mb-3">
                  {section.miniQuiz.question}
                </p>

                <div className="space-y-2">
                  {section.miniQuiz.options.map((opt, optIdx) => {
                    const isSelected = selectedAns === optIdx;
                    const isAnsCorrect = optIdx === section.miniQuiz.correctAnswer;
                    let btnStyle = 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 bg-white';

                    if (hasAnswered) {
                      if (isAnsCorrect) {
                        btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-medium';
                      } else if (isSelected) {
                        btnStyle = 'border-rose-400 bg-rose-50 text-rose-900';
                      } else {
                        btnStyle = 'border-slate-100 text-slate-400 bg-slate-50/50 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(section.id, optIdx)}
                        disabled={hasAnswered}
                        className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {hasAnswered && isAnsCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {showExplanations[section.id] && (
                  <div className={`mt-3 p-3.5 rounded-xl text-xs sm:text-sm leading-relaxed ${
                    isCorrect ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-rose-50 text-rose-900 border border-rose-200'
                  }`}>
                    <p className="font-semibold mb-1">
                      {isCorrect ? '🎉 Jawaban Tepat!' : '💡 Penjelasan Koreksi:'}
                    </p>
                    <p>{section.miniQuiz.explanation}</p>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* Bottom CTA to Diagnostic Quiz */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 sm:p-8 border border-blue-200/80 text-center">
        <h3 className="text-lg font-bold text-slate-900">
          Sudah Memahami Konsep di Atas?
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-lg mx-auto">
          Cari tahu apakah masih ada celah pemahaman yang terlewat melalui kuis diagnostik interaktif.
        </p>
        <button
          onClick={() => onJumpToFormat('quiz')}
          className="mt-4 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors shadow-sm inline-flex items-center gap-2"
        >
          <span>Mulai Kuis Diagnostik & Cek Celah Pemahaman</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
