import { useState, useEffect } from 'react';
import { SMP_TOPICS } from './data/smpCurriculum';
import { Topic, LearningFormat } from './types';
import { HomeLanding } from './components/HomeLanding';
import { InformaticsCatalogPage } from './components/InformaticsCatalogPage';
import { MaterialHeader } from './components/MaterialHeader';
import { MaterialModeBar } from './components/MaterialModeBar';
import { ImmersiveTextScope } from './components/ImmersiveTextScope';
import { PresentationSlideViewer } from './components/PresentationSlideViewer';
import { AudioPodcastViewer } from './components/AudioPodcastViewer';
import { VideoSummaryViewer } from './components/VideoSummaryViewer';
import { FlashcardStudyViewer } from './components/FlashcardStudyViewer';
import { MindMapViewer } from './components/MindMapViewer';
import { SourcePdfViewer } from './components/SourcePdfViewer';
import { X } from 'lucide-react';

export default function App() {
  // Current view: 'home' (landing hero), 'catalog' (dedicated informatics materials page), or 'material' (learning mode viewer)
  const [currentView, setCurrentView] = useState<'home' | 'catalog' | 'material'>('home');
  const [currentTopic, setCurrentTopic] = useState<Topic>(SMP_TOPICS[0]);
  const [activeFormat, setActiveFormat] = useState<LearningFormat>('text');
  const [isSourceModalOpen, setIsSourceModalOpen] = useState<boolean>(false);

  // Track completed sections in memory only (no persistence to localStorage so students sharing devices start fresh)
  const [completedSections, setCompletedSections] = useState<string[]>([]);

  useEffect(() => {
    // Clear any previous persistent progress to ensure shared devices stay clean
    try {
      localStorage.removeItem('smp_completed_sections');
    } catch {
      // ignore
    }
  }, []);

  const handleToggleCompleteSection = (sectionId: string) => {
    setCompletedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleCompleteSection = (sectionId: string) => {
    setCompletedSections(prev =>
      prev.includes(sectionId) ? prev : [...prev, sectionId]
    );
  };

  const handleSelectTopic = (topic: Topic, format?: LearningFormat) => {
    setCurrentTopic(topic);
    setActiveFormat(format || 'text');
    setCurrentView('material');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToCatalog = () => {
    setCurrentView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // View 1: Home Landing page (Membayangkan Kembali Buku Pelajaran Informatika)
  if (currentView === 'home') {
    return (
      <HomeLanding
        topics={SMP_TOPICS}
        onSelectTopic={handleSelectTopic}
        onGoToCatalog={() => {
          setCurrentView('catalog');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    );
  }

  // View 2: Dedicated Kumpulan Materi Informatika Page
  if (currentView === 'catalog') {
    return (
      <InformaticsCatalogPage
        topics={SMP_TOPICS}
        onBackToHome={handleBackToHome}
        onSelectTopic={handleSelectTopic}
      />
    );
  }

  // View 3: Material View Mode (Multi-Format Learning Experience)
  return (
    <div className="min-h-screen bg-[#F8F7F4] text-[#111113] flex flex-col font-sans selection:bg-[#EA580C] selection:text-[#F8F7F4]">
      {/* Material Header */}
      <MaterialHeader
        onBackToHome={handleBackToHome}
        onBackToCatalog={handleBackToCatalog}
        topicTitle={currentTopic.title}
        grade={currentTopic.grade}
        subject={currentTopic.subject}
        domain={currentTopic.domain}
        onOpenSourceModal={() => setIsSourceModalOpen(true)}
      />

      {/* Scooped Modality Tab Bar: Teks Imersif, Ringkasan Audio, Ringkasan Video, Slide Presentasi, Kartu Tanya Jawab, Peta Pikiran */}
      <MaterialModeBar
        activeFormat={activeFormat}
        onChangeFormat={(fmt) => setActiveFormat(fmt)}
      />

      {/* Main Material Container */}
      <main className="flex-1 w-full max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 pb-4 lg:pb-6">
        {activeFormat === 'text' && (
          <ImmersiveTextScope
            topic={currentTopic}
            completedSections={completedSections}
            onToggleCompleteSection={handleToggleCompleteSection}
            onCompleteSection={handleCompleteSection}
            onJumpToSlide={() => setActiveFormat('slides')}
            onJumpToAudio={() => setActiveFormat('audio')}
          />
        )}

        {activeFormat === 'audio' && (
          <AudioPodcastViewer
            topic={currentTopic}
          />
        )}

        {activeFormat === 'video' && (
          <VideoSummaryViewer
            topic={currentTopic}
          />
        )}

        {activeFormat === 'slides' && (
          <PresentationSlideViewer
            topic={currentTopic}
          />
        )}

        {activeFormat === 'flashcards' && (
          <FlashcardStudyViewer
            topic={currentTopic}
          />
        )}

        {activeFormat === 'mindmap' && (
          <MindMapViewer
            topic={currentTopic}
            onJumpToFormat={(fmt) => setActiveFormat(fmt)}
          />
        )}
      </main>

      {/* Modal Sumber Belajar (Buku PDF Resmi Kemendikbudristek) */}
      {isSourceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-none animate-in fade-in duration-100">
          <div className="bg-[#F8F7F4] border-2 border-[#111113] shadow-[12px_12px_0_#111113] w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b-2 border-[#111113] bg-white">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 bg-[#EA580C]" />
                <span className="font-display uppercase text-sm sm:text-base font-bold text-[#111113]">
                  Dokumen Buku Sumber Belajar Resmi Kemendikdasmen RI
                </span>
                <span className="label-mono text-xs text-[#EA580C] hidden sm:inline">
                  [KURIKULUM_MERDEKA_INFORMATIKA]
                </span>
              </div>

              <button
                onClick={() => setIsSourceModalOpen(false)}
                className="w-8 h-8 border-2 border-[#111113] bg-white hover:bg-[#EA580C] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Tutup Jendela"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body: PDF Viewer */}
            <div className="flex-1 overflow-y-auto p-2 sm:p-4 bg-[#F8F7F4]">
              <SourcePdfViewer
                topic={currentTopic}
                onOpenImmersiveText={() => {
                  setIsSourceModalOpen(false);
                  setActiveFormat('text');
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
