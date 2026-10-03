import React, { useState } from 'react';
import { Topic, FlashcardItem } from '../types';
import {
  RotateCcw,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Shuffle,
  ChevronLeft,
  ChevronRight,
  Trophy
} from 'lucide-react';

interface FlashcardStudyViewerProps {
  topic: Topic;
}

export const FlashcardStudyViewer: React.FC<FlashcardStudyViewerProps> = ({ topic }) => {
  const initialCards: FlashcardItem[] = topic.flashcards && topic.flashcards.length > 0
    ? topic.flashcards
    : [
        {
          id: 'fc-1',
          frontQuestion: topic.coreQuestion,
          backAnswer: topic.shortDesc,
          category: 'Konsep Utama',
          hint: topic.analogyPreview || 'Pahami konteks permasalahan pokoknya!',
          keyTerm: 'Prinsip Dasar'
        },
        ...topic.sections.map((sec, idx) => ({
          id: `fc-sec-${idx + 2}`,
          frontQuestion: sec.miniQuiz ? sec.miniQuiz.question : `Apa inti dari pembahasan ${sec.title}?`,
          backAnswer: sec.miniQuiz ? sec.miniQuiz.explanation : sec.leadParagraph,
          category: `Sub-materi ${sec.sectionNumber}`,
          hint: sec.realWorldAnalogy ? sec.realWorldAnalogy.title : 'Perhatikan contoh nyata dalam kehidupan sehari-hari!',
          keyTerm: sec.title
        }))
      ];

  const [cards, setCards] = useState<FlashcardItem[]>(initialCards);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [understoodCards, setUnderstoodCards] = useState<Set<string>>(new Set());
  const [repeatCards, setRepeatCards] = useState<Set<string>>(new Set());
  const [showHint, setShowHint] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const currentCard = cards[currentIndex] || cards[0];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setIsFlipped(false);
    setShowHint(false);
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setShowHint(false);
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleMarkUnderstood = (e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedUnderstood = new Set(understoodCards);
    const updatedRepeat = new Set(repeatCards);

    updatedUnderstood.add(currentCard.id);
    updatedRepeat.delete(currentCard.id);

    setUnderstoodCards(updatedUnderstood);
    setRepeatCards(updatedRepeat);
    handleNext();
  };

  const handleMarkRepeat = (e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedUnderstood = new Set(understoodCards);
    const updatedRepeat = new Set(repeatCards);

    updatedRepeat.add(currentCard.id);
    updatedUnderstood.delete(currentCard.id);

    setUnderstoodCards(updatedUnderstood);
    setRepeatCards(updatedRepeat);
    handleNext();
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setShowHint(false);
    setIsFinished(false);
    setUnderstoodCards(new Set());
    setRepeatCards(new Set());
  };

  const handleShuffle = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    handleRestart();
  };

  const understoodCount = understoodCards.size;
  const repeatCount = repeatCards.size;

  return (
    <div className="w-full max-w-xl lg:max-w-2xl mx-auto bg-white border-2 border-[#111113] p-3.5 sm:p-5 shadow-[6px_6px_0_#111113] space-y-3">
      {/* Clean Top Bar: Only card counter and control buttons */}
      <div className="flex items-center justify-between gap-2 pb-2 border-b-2 border-[#111113]">
        <div className="label-mono text-xs text-[#111113] font-bold">
          KARTU {currentIndex + 1} DARI {cards.length}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShuffle}
            className="p-1 border-2 border-[#111113] bg-white hover:bg-[#111113] hover:text-white transition-colors cursor-pointer"
            title="Acak Urutan Kartu"
          >
            <Shuffle className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleRestart}
            className="p-1 border-2 border-[#111113] bg-white hover:bg-[#111113] hover:text-white transition-colors cursor-pointer"
            title="Ulangi Dari Awal"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {!isFinished ? (
        <div className="space-y-3">
          {/* Flip Container */}
          <div
            onClick={handleFlip}
            className="w-full h-56 sm:h-64 lg:h-60 cursor-pointer perspective-1000 select-none"
          >
            <div
              style={{
                transformStyle: 'preserve-3d',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                transition: 'transform 0.4s ease-out',
              }}
              className="relative w-full h-full"
            >
              {/* Front Face: Pertanyaan */}
              <div
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(0deg)',
                }}
                className={`absolute inset-0 w-full h-full bg-white border-2 border-[#111113] shadow-[4px_4px_0_#111113] p-3.5 sm:p-5 flex flex-col justify-between ${
                  isFlipped ? 'pointer-events-none' : ''
                }`}
              >
                <div className="flex items-center justify-between pb-1.5 border-b border-[#111113]/20">
                  <span className="font-display uppercase text-[11px] font-bold bg-[#111113] text-white px-2 py-0.5">
                    SISI DEPAN: PERTANYAAN
                  </span>
                </div>

                <div className="my-auto py-1 text-center space-y-2">
                  <h3 className="font-display text-lg sm:text-xl font-bold uppercase tracking-tight text-[#111113] leading-snug max-w-lg mx-auto m-0">
                    "{currentCard.frontQuestion}"
                  </h3>

                  {showHint && currentCard.hint && (
                    <div className="p-1.5 border border-[#111113] bg-[#F8F7F4] text-xs font-light text-[#111113] max-w-md mx-auto">
                      💡 <strong>Petunjuk:</strong> {currentCard.hint}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-1.5 border-t border-[#111113]/20 text-xs min-h-[28px]">
                  {currentCard.hint ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowHint(!showHint);
                      }}
                      className="font-mono text-xs text-[#111113] hover:text-[#EA580C] font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>{showHint ? 'Sembunyikan' : 'Petunjuk'}</span>
                    </button>
                  ) : <span />}
                </div>
              </div>

              {/* Back Face: Jawaban */}
              <div
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                }}
                className={`absolute inset-0 w-full h-full bg-[#F8F7F4] border-2 border-[#111113] shadow-[4px_4px_0_#EA580C] p-3.5 sm:p-5 flex flex-col justify-between ${
                  !isFlipped ? 'pointer-events-none' : ''
                }`}
              >
                <div className="flex items-center justify-between pb-1.5 border-b border-[#111113]/20">
                  <span className="font-display uppercase text-[11px] font-bold bg-[#EA580C] text-white px-2 py-0.5">
                    SISI BELAKANG: JAWABAN
                  </span>
                  {currentCard.keyTerm && (
                    <span className="label-mono text-[11px] font-bold text-[#111113]">
                      {currentCard.keyTerm}
                    </span>
                  )}
                </div>

                <div className="my-auto py-1 text-center space-y-1.5">
                  <p className="text-xs sm:text-sm font-medium text-[#111113] leading-relaxed max-w-lg mx-auto">
                    {currentCard.backAnswer}
                  </p>
                </div>

                <div className="pt-1.5 border-t border-[#111113]/20 text-xs min-h-[28px]" />
              </div>
            </div>
          </div>

          {/* Quick Flip Toggle */}
          <div className="flex justify-center">
            <button
              onClick={handleFlip}
              className="px-3 py-1 bg-white hover:bg-[#F8F7F4] text-[#111113] border-2 border-[#111113] font-display uppercase text-xs font-bold tracking-wider shadow-[2px_2px_0_#111113] cursor-pointer"
            >
              ↻ {isFlipped ? 'Lihat Sisi Pertanyaan' : 'Lihat Sisi Jawaban'}
            </button>
          </div>

          {/* Action & Navigation Controls: Previous and Next with icons only */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="p-2 bg-white hover:bg-[#111113] hover:text-white disabled:opacity-30 disabled:pointer-events-none text-[#111113] border-2 border-[#111113] shadow-[2px_2px_0_#111113] cursor-pointer transition-colors"
              title="Kembali"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleMarkRepeat}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-[#111113] hover:text-white text-[#111113] border-2 border-[#111113] font-display uppercase font-bold text-xs shadow-[2px_2px_0_#111113] cursor-pointer"
              >
                <XCircle className="w-3.5 h-3.5 text-[#EA580C]" />
                <span>Perlu Diulang</span>
              </button>

              <button
                onClick={handleMarkUnderstood}
                className="btn-primary-brutal flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold shadow-[2px_2px_0_#111113] cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Saya Sudah Paham</span>
              </button>
            </div>

            <button
              onClick={handleNext}
              className="p-2 bg-white hover:bg-[#111113] hover:text-white text-[#111113] border-2 border-[#111113] shadow-[2px_2px_0_#111113] cursor-pointer transition-colors"
              title="Lanjut"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Finished Review Screen without the distracting congratulatory headline paragraph */
        <div className="border-2 border-[#111113] bg-[#F8F7F4] p-6 sm:p-10 text-center space-y-6 shadow-[6px_6px_0_#111113]">
          <div className="w-14 h-14 bg-[#111113] text-white border-2 border-[#111113] flex items-center justify-center mx-auto shadow-[4px_4px_0_#EA580C]">
            <Trophy className="w-7 h-7 text-[#EA580C]" />
          </div>

          {/* Stats Box */}
          <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
            <div className="p-3 border-2 border-[#111113] bg-white shadow-[3px_3px_0_#111113]">
              <span className="font-display text-2xl font-bold text-[#EA580C] block">{understoodCount}</span>
              <span className="label-mono text-[10px] text-[#111113]/70 font-bold">SUDAH PAHAM</span>
            </div>

            <div className="p-3 border-2 border-[#111113] bg-white shadow-[3px_3px_0_#111113]">
              <span className="font-display text-2xl font-bold text-[#111113] block">{repeatCount}</span>
              <span className="label-mono text-[10px] text-[#111113]/70 font-bold">PERLU DIULANG</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
            <button
              onClick={handleRestart}
              className="btn-primary-brutal py-2.5 px-5 text-xs font-bold cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 inline mr-1.5" />
              <span>ULANGI SESI</span>
            </button>

            <button
              onClick={handleShuffle}
              className="px-5 py-2.5 bg-white text-[#111113] border-2 border-[#111113] font-display uppercase font-bold text-xs tracking-wider shadow-[3px_3px_0_#111113] hover:bg-[#111113] hover:text-white transition-all cursor-pointer"
            >
              <Shuffle className="w-4 h-4 inline mr-1.5" />
              <span>ACAK &amp; ULANGI</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
