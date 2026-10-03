import React, { useState, useEffect, useRef } from 'react';
import { Topic, SlideItem } from '../types';
import { Play, Pause, Volume2, VolumeX, MoreVertical, SkipBack, SkipForward, Sparkles, BookOpen } from 'lucide-react';
import { playSlideTransitionChime } from '../utils/audioChimes';
import { playGoogleTTS, stopAllAudio, prefetchAudio } from '../utils/ttsClient';

interface SlidesNarrationViewerProps {
  topic: Topic;
  targetSlideId?: string | null;
}

export const SlidesNarrationViewer: React.FC<SlidesNarrationViewerProps> = ({
  topic,
  targetSlideId
}) => {
  const slides: SlideItem[] = topic.slides;
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showNotes, setShowNotes] = useState<boolean>(false);
  const slideDuration = 18; // Durasi per slide

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const playbackStopRef = useRef<(() => void) | null>(null);

  const currentSlide = slides[currentSlideIndex] || slides[0];

  // Jump to targeted slide if requested
  useEffect(() => {
    if (targetSlideId) {
      const slideNum = parseInt(targetSlideId.replace('slide-', ''), 10);
      if (!isNaN(slideNum) && slideNum >= 1 && slideNum <= slides.length) {
        setCurrentSlideIndex(slideNum - 1);
        setCurrentTime(0);
      }
    }
  }, [targetSlideId, slides.length]);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      stopAllAudio();
      if (playbackStopRef.current) {
        playbackStopRef.current();
      }
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Pre-fetch first slide audio on mount
  useEffect(() => {
    if (slides.length > 0) {
      const firstNarration = `${slides[0].title}. ${slides[0].subtitle}. ${slides[0].bulletPoints.join('. ')}. Kesimpulan: ${slides[0].takeaway}.`;
      prefetchAudio(firstNarration, 'guru', 1.0);
    }
  }, [slides]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  /**
   * Speak slide narration in clear Indonesian teacher educator dialect using Google Cloud TTS
   */
  const speakCurrentSlide = async () => {
    stopAllAudio();
    if (playbackStopRef.current) {
      playbackStopRef.current();
      playbackStopRef.current = null;
    }

    if (isMuted) return;

    const narration = `${currentSlide.title}. ${currentSlide.subtitle}. ${currentSlide.bulletPoints.join('. ')}. Kesimpulan: ${currentSlide.takeaway}.`;

    // Pre-fetch next slide
    if (currentSlideIndex + 1 < slides.length) {
      const nextSlide = slides[currentSlideIndex + 1];
      const nextNarration = `${nextSlide.title}. ${nextSlide.subtitle}. ${nextSlide.bulletPoints.join('. ')}. Kesimpulan: ${nextSlide.takeaway}.`;
      prefetchAudio(nextNarration, 'guru', 1.0);
    }

    const { stop } = await playGoogleTTS(
      narration,
      'guru',
      1.0,
      () => {
        // Step to next slide if available
        if (currentSlideIndex < slides.length - 1) {
          playSlideTransitionChime();
          setCurrentSlideIndex(prev => prev + 1);
          setCurrentTime(0);
        } else {
          setIsPlaying(false);
        }
      },
      () => {
        if (currentSlideIndex < slides.length - 1) {
          setCurrentSlideIndex(prev => prev + 1);
          setCurrentTime(0);
        } else {
          setIsPlaying(false);
        }
      }
    );

    playbackStopRef.current = stop;
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      stopAllAudio();
      if (playbackStopRef.current) {
        playbackStopRef.current();
        playbackStopRef.current = null;
      }
      if (timerRef.current) clearInterval(timerRef.current);
    } else {
      setIsPlaying(true);
      speakCurrentSlide();

      // Start live timer interval
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= slideDuration) {
            if (currentSlideIndex < slides.length - 1) {
              playSlideTransitionChime();
              setCurrentSlideIndex(c => c + 1);
              return 0;
            } else {
              setIsPlaying(false);
              return slideDuration;
            }
          }
          return prev + 1;
        });
      }, 1000);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlideIndex > 0) {
      playSlideTransitionChime();
      setCurrentSlideIndex(prev => prev - 1);
      setCurrentTime(0);
      if (isPlaying) {
        speakCurrentSlide();
      }
    }
  };

  const handleNextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      playSlideTransitionChime();
      setCurrentSlideIndex(prev => prev + 1);
      setCurrentTime(0);
      if (isPlaying) {
        speakCurrentSlide();
      }
    }
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    if (!isMuted) {
      stopAllAudio();
      if (playbackStopRef.current) {
        playbackStopRef.current();
        playbackStopRef.current = null;
      }
    } else if (isMuted && isPlaying) {
      speakCurrentSlide();
    }
  };

  // Get topic display title for the big chunky font matching screenshot ("Earth and Sky")
  const getDisplayHeroTitle = () => {
    if (topic.id === 'tata-surya') return 'Bumi dan Angkasa';
    if (topic.id === 'sistem-pencernaan') return 'Pencernaan Manusia';
    if (topic.id === 'teorema-pythagoras') return 'Geometri Pythagoras';
    if (topic.id === 'listrik-dinamis') return 'Kelistrikan Dinamis';
    return topic.title.length > 24 ? topic.title.slice(0, 22) + '...' : topic.title;
  };

  return (
    <div className="w-full bg-white border-x border-b border-[#DEEADE] rounded-b-[28px] sm:rounded-b-[32px] p-6 sm:p-10 shadow-xs flex flex-col items-center">
      {/* Big Chunky Title in Vibrant Emerald */}
      <div className="w-full text-center mb-6">
        <h1 className="text-3xl sm:text-5xl font-black text-[#2E8B57] tracking-tight font-serif select-none">
          {getDisplayHeroTitle()}
        </h1>
        <p className="text-xs sm:text-sm text-[#4E674E] mt-1 font-medium">
          Slide Presentasi & Narasi Suara Google Cloud TTS (Bahasa & Dialek Indonesia Asli)
        </p>
      </div>

      {/* Center 16:9 Media Display Stage Matching Screenshot */}
      <div className="w-full max-w-[820px] aspect-[16/9] rounded-2xl bg-[#030712] overflow-hidden shadow-xl border border-slate-900 relative flex items-center justify-center">
        {/* Topic 1: Tata Surya & Gravitasi - Earth Seen from Space with Shimmering Cosmic Stars (Matching Screenshot) */}
        {topic.id === 'tata-surya' ? (
          <div className="w-full h-full relative overflow-hidden bg-[#020617] flex items-center justify-center">
            {/* Background Starfield */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 450" fill="none">
              <circle cx="80" cy="60" r="1.2" fill="#fff" opacity="0.8" />
              <circle cx="210" cy="40" r="1" fill="#fff" opacity="0.5" />
              <circle cx="340" cy="90" r="1.5" fill="#fff" opacity="0.9" />
              <circle cx="490" cy="50" r="1" fill="#fff" opacity="0.6" />
              <circle cx="620" cy="80" r="1.5" fill="#fff" opacity="0.8" />
              <circle cx="710" cy="140" r="1" fill="#fff" opacity="0.5" />
              <circle cx="120" cy="180" r="1" fill="#fff" opacity="0.4" />
              <circle cx="680" cy="30" r="1.8" fill="#FDE047" opacity="0.8" />
              <circle cx="750" cy="220" r="1.2" fill="#fff" opacity="0.7" />
              <circle cx="560" cy="160" r="1" fill="#fff" opacity="0.5" />
              <circle cx="440" cy="130" r="1.3" fill="#67E8F9" opacity="0.7" />
            </svg>

            {/* Earth Sphere in bottom-left corner with blue atmospheric glow (Screenshot exact style) */}
            <div className="absolute -bottom-28 -left-20 w-[480px] sm:w-[580px] aspect-square rounded-full bg-gradient-to-tr from-[#0C4A6E] via-[#0284C7] to-[#38BDF8] shadow-[0_0_80px_rgba(56,189,248,0.5)] overflow-hidden border border-sky-400/30">
              <div className="absolute inset-0 bg-radial from-transparent via-[#0369A1]/30 to-[#082F49]/80" />
              <div className="absolute inset-0 opacity-40 mix-blend-screen bg-repeat bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="absolute top-1/4 right-1/4 w-40 h-28 bg-[#15803D]/60 rounded-full blur-md" />
              <div className="absolute bottom-1/3 left-1/3 w-48 h-32 bg-[#D97706]/40 rounded-full blur-lg" />
            </div>

            {/* Slide Text Title Overlay inside visual */}
            <div className="absolute top-6 right-6 max-w-sm text-right z-10 bg-black/50 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/10">
              <span className="text-[11px] font-bold tracking-widest text-[#38BDF8] uppercase block">
                Slide 0{currentSlideIndex + 1}
              </span>
              <h3 className="text-sm sm:text-base font-bold text-white mt-0.5">
                {currentSlide.title}
              </h3>
              <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                {currentSlide.subtitle}
              </p>
            </div>
          </div>
        ) : topic.id === 'sistem-pencernaan' ? (
          /* Digestive Anatomy Visual */
          <div className="w-full h-full relative bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#020617] flex items-center justify-center p-6">
            <div className="text-center text-white space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                Slide 0{currentSlideIndex + 1} · Anatomi Manusia
              </span>
              <h3 className="text-xl sm:text-2xl font-bold">{currentSlide.title}</h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">{currentSlide.takeaway}</p>
            </div>
          </div>
        ) : (
          /* Pythagoras & Geometry Visual */
          <div className="w-full h-full relative bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] flex items-center justify-center p-6">
            <div className="text-center text-white space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
                Slide 0{currentSlideIndex + 1} · Geometri Ruang
              </span>
              <h3 className="text-xl sm:text-2xl font-bold">{currentSlide.title}</h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">{currentSlide.takeaway}</p>
            </div>
          </div>
        )}
      </div>

      {/* Audio Player Bar Matching Screenshot */}
      <div className="w-full max-w-[820px] mt-6 bg-[#EFECE6] rounded-xl px-4 py-2.5 flex items-center gap-3 text-xs text-[#2C2520] shadow-xs">
        {/* Play/Pause Button */}
        <button
          onClick={handleTogglePlay}
          className="p-1 hover:text-black text-[#1A1A1A] transition-colors cursor-pointer"
          title={isPlaying ? 'Jeda Narasi' : 'Putar Narasi Guru (Google Cloud TTS)'}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 fill-current" />
          ) : (
            <Play className="w-4 h-4 fill-current ml-0.5" />
          )}
        </button>

        {/* Timestamp (e.g. 0:00 / 0:18) */}
        <span className="font-mono text-xs text-[#4A4238] whitespace-nowrap">
          {formatTime(currentTime)} / {formatTime(slideDuration)}
        </span>

        {/* Audio Progress Scrubber */}
        <div
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const newPct = Math.max(0, Math.min(1, clickX / rect.width));
            setCurrentTime(Math.round(newPct * slideDuration));
          }}
          className="flex-1 h-1.5 bg-[#D5CEC4] rounded-full overflow-hidden cursor-pointer relative"
        >
          <div
            className="h-full bg-[#374151] rounded-full transition-all duration-300"
            style={{ width: `${(currentTime / slideDuration) * 100}%` }}
          />
        </div>

        {/* Volume & Options */}
        <div className="flex items-center gap-2 text-[#4A4238]">
          <button
            onClick={handleToggleMute}
            className="p-1 hover:text-black cursor-pointer"
            title={isMuted ? 'Nyalakan Suara' : 'Bisukan Suara'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-[#EF4444]" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`p-1 hover:text-black cursor-pointer transition-colors ${
              showNotes ? 'text-[#2E8B57] font-bold' : ''
            }`}
            title="Catatan Penjelasan Slide"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Slide Navigation Scrubber Track Matching Screenshot */}
      <div className="w-full max-w-[820px] mt-4 bg-[#EFECE6] rounded-xl px-4 py-2.5 flex items-center justify-between gap-4 text-[#6F685E]">
        {/* Previous Button |< */}
        <button
          onClick={handlePrevSlide}
          disabled={currentSlideIndex === 0}
          className="hover:text-black disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
          title="Slide Sebelumnya"
        >
          <SkipBack className="w-4 h-4" />
        </button>

        {/* Track with Vibrant Emerald Circular Dot Marker */}
        <div
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const newIndex = Math.round((clickX / rect.width) * (slides.length - 1));
            playSlideTransitionChime();
            setCurrentSlideIndex(Math.max(0, Math.min(slides.length - 1, newIndex)));
            setCurrentTime(0);
          }}
          className="flex-1 h-1.5 bg-[#D5CEC4] rounded-full relative cursor-pointer flex items-center"
        >
          <div
            className="absolute w-4 h-4 rounded-full bg-[#2E8B57] shadow-md transform -translate-x-1/2 transition-all cursor-grab hover:scale-110"
            style={{
              left: `${(currentSlideIndex / Math.max(1, slides.length - 1)) * 100}%`
            }}
          />
        </div>

        {/* Next Button >| */}
        <button
          onClick={handleNextSlide}
          disabled={currentSlideIndex === slides.length - 1}
          className="hover:text-black disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
          title="Slide Berikutnya"
        >
          <SkipForward className="w-4 h-4" />
        </button>
      </div>

      {/* Centered Slide Counter Text Matching Screenshot ("Slide 1 / 27") */}
      <div className="mt-4 text-center font-medium text-xs sm:text-sm text-[#4A4238]">
        Slide {currentSlideIndex + 1} / {slides.length}
      </div>

      {/* Slide Notes / Educational Insights */}
      {showNotes && (
        <div className="w-full max-w-[820px] mt-6 p-5 rounded-2xl bg-[#F7FAF7] border border-[#DEEADE] text-xs sm:text-sm text-[#4A4238] space-y-3 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-[#E2ECE2]">
            <span className="font-bold text-[#1A1A1A] flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#2E8B57]" />
              <span>Poin Kunci & Catatan Slide {currentSlideIndex + 1}</span>
            </span>
            <span className="text-[11px] text-[#4E674E]">Kurikulum Merdeka SMP</span>
          </div>

          <ul className="space-y-1.5 list-disc pl-5">
            {currentSlide.bulletPoints.map((pt, i) => (
              <li key={i} className="leading-relaxed">
                {pt}
              </li>
            ))}
          </ul>

          <div className="p-3 rounded-xl bg-white border border-[#E5DBD0] text-xs text-[#065F46] flex items-center gap-2">
            <Sparkles className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>
              <strong>Intisari:</strong> {currentSlide.takeaway}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
