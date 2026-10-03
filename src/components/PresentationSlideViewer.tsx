import React, { useState, useEffect, useRef } from 'react';
import { Topic, SlideItem } from '../types';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2
} from 'lucide-react';

interface PresentationSlideViewerProps {
  topic: Topic;
  targetSlideId?: string | null;
}

export const PresentationSlideViewer: React.FC<PresentationSlideViewerProps> = ({
  topic,
  targetSlideId
}) => {
  const slides: SlideItem[] = topic.slides || [];
  const totalSlides = slides.length || 1;

  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [failedImages, setFailedImages] = useState<{ [index: number]: boolean }>({});

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentSlideIndex(0);
    setFailedImages({});
  }, [topic.id]);

  useEffect(() => {
    if (targetSlideId) {
      const slideNum = parseInt(targetSlideId.replace('slide-', ''), 10);
      if (!isNaN(slideNum) && slideNum >= 1 && slideNum <= totalSlides) {
        setCurrentSlideIndex(slideNum - 1);
      }
    }
  }, [targetSlideId, totalSlides]);

  const goToNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
  };

  const goToPrevSlide = () => {
    setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        goToNextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        goToPrevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex, totalSlides]);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  const currentSlide = slides[currentSlideIndex];
  const slideImageUrl = currentSlide?.imageFile;
  const isImageFailed = failedImages[currentSlideIndex] || !slideImageUrl;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-3">
      {/* Slide Presentation Frame */}
      <div
        ref={containerRef}
        className="relative w-full aspect-video bg-[#111113] border-2 border-[#111113] shadow-[8px_8px_0_#111113] overflow-hidden flex flex-col justify-between"
      >
        {/* Main Canvas: Displays ONLY the user's slide image */}
        <div className="relative flex-1 w-full h-full bg-[#111113] flex items-center justify-center overflow-hidden">
          {!isImageFailed && (
            <img
              src={slideImageUrl}
              alt={`Slide ${currentSlideIndex + 1}`}
              className="w-full h-full object-contain select-none"
              onError={() =>
                setFailedImages((prev) => ({ ...prev, [currentSlideIndex]: true }))
              }
            />
          )}

          {/* Left Arrow on Stage */}
          {currentSlideIndex > 0 && (
            <button
              onClick={goToPrevSlide}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-[#111113]/80 hover:bg-[#EA580C] text-white border border-white/40 transition-colors cursor-pointer shadow-md"
              title="Slide Sebelumnya (Panah Kiri)"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* Right Arrow on Stage */}
          {currentSlideIndex < totalSlides - 1 && (
            <button
              onClick={goToNextSlide}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-[#111113]/80 hover:bg-[#EA580C] text-white border border-white/40 transition-colors cursor-pointer shadow-md"
              title="Slide Selanjutnya (Panah Kanan)"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Bottom Control Bar: Slide Page Counter and Fullscreen */}
        <div className="relative z-20 bg-[#111113] border-t-2 border-[#111113] px-3 py-2 text-white flex items-center justify-between gap-3">
          {/* Page Counter: SLIDE X / TOTAL */}
          <div className="font-mono text-xs font-bold tracking-widest text-[#EA580C] bg-white/5 border border-white/20 px-3 py-1">
            SLIDE {currentSlideIndex + 1} / {totalSlides}
          </div>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="p-1.5 bg-white/10 hover:bg-white hover:text-[#111113] text-white border border-white/30 transition-colors cursor-pointer"
            title="Layar Penuh"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
