export type GradeLevel = 'Kelas 7' | 'Kelas 8' | 'Kelas 9';

export type Subject =
  | 'Informatika'
  | 'Matematika'
  | 'IPA'
  | 'IPS'
  | 'PKn'
  | 'Bahasa Indonesia';

export type LearningFormat =
  | 'text'
  | 'audio'
  | 'video'
  | 'slides'
  | 'flashcards'
  | 'mindmap'
  | 'quiz'
  | 'source';

export interface FlashcardItem {
  id: string;
  frontQuestion: string;
  backAnswer: string;
  category: string;
  hint?: string;
  keyTerm?: string;
}

export interface VideoChapter {
  id: string;
  title: string;
  timestamp: string; // e.g. "00:00"
  timeSeconds: number;
  durationSeconds: number;
  narrationText: string;
  keyTakeaway: string;
  conceptTag: string;
}

export interface ConceptNode {
  id: string;
  label: string;
  category: 'core' | 'subconcept' | 'application' | 'formula';
  x: number;
  y: number;
  description: string;
  example: string;
  relatedIds: string[];
}

export interface MindMapData {
  rootLabel: string;
  nodes: ConceptNode[];
}

export interface SlideItem {
  id: number;
  title: string;
  subtitle: string;
  bulletPoints: string[];
  takeaway: string;
  speakerNotes?: string;
  imageFile?: string; // Path ke file gambar slide offline, cth: '/media/slides/informatika-slide-1.png'
  audioFile?: string; // Opsional: file audio narasi per slide
  diagramType?:
    | 'solar'
    | 'digestive'
    | 'pythagoras'
    | 'circuit'
    | 'aljabar'
    | 'litosfer'
    | 'algorithm'
    | 'trade'
    | 'civics'
    | 'observation'
    | 'cyber'
    | 'analytics';
}

export interface AudioTurn {
  id: number;
  speaker: 'guru' | 'siswa';
  speakerName: string;
  timestamp: string; // e.g. "00:15"
  timeInSeconds: number;
  text: string;
  keyTakeaway?: string;
  relatedSectionId?: string;
}

export interface SectionMiniQuiz {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface ParagraphQuiz {
  paragraphIndex: number;
  targetSentence?: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface TextSection {
  id: string;
  sectionNumber: number;
  title: string;
  leadParagraph: string;
  content: string[];
  funFact?: string;
  realWorldAnalogy?: {
    title: string;
    description: string;
  };
  miniQuiz: SectionMiniQuiz;
  paragraphQuizzes?: ParagraphQuiz[];
}

export interface DiagnosticQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  conceptTarget: string; // Concept being tested
  gapFeedback: {
    misconception: string;
    explanation: string;
    recommendedFormat: LearningFormat;
    recommendedTargetId: string; // e.g. section-2 or slide-3 or audio-turn-4
    recommendedLabel: string; // e.g. "Teks Imersif Bagian 2: Hukum Keppler & Gravitasi"
  };
}

export type ExplorationDomain =
  | 'Semua'
  | 'Informatika'
  | 'Matematika'
  | 'IPA'
  | 'IPS'
  | 'PKn'
  | 'Bahasa Indonesia';

export interface Topic {
  id: string;
  title: string;
  shortDesc: string;
  subject: Subject;
  grade: GradeLevel;
  domain: string;
  conceptTag: string;
  analogyPreview: string;
  durationMinutes: number;
  coreQuestion: string;
  curriculumCompetency: string; // Capaian Pembelajaran Kurikulum Merdeka
  thumbnailKey:
    | 'informatika'
    | 'matematika'
    | 'ipa'
    | 'ips'
    | 'pkn'
    | 'bahasa-indonesia'
    | 'jejak-digital'
    | 'analisis-data';
  coverImage?: string; // Path ke file gambar sampul offline, cth: '/media/images/sampul-informatika.png'
  audioFile?: string; // Path ke file audio MP3 offline, cth: '/media/audio/informatika.mp3'
  videoFile?: string; // Path ke file video MP4 offline, cth: '/media/video/informatika.mp4'
  sections: TextSection[];
  audioTurns: AudioTurn[];
  slides: SlideItem[];
  mindMap: MindMapData;
  diagnosticQuestions: DiagnosticQuestion[];
  flashcards?: FlashcardItem[];
  videoChapters?: VideoChapter[];
}

export interface LearningProgress {
  topicId: string;
  completedSections: string[];
  quizScore?: number;
  identifiedGaps: {
    questionId: string;
    conceptTarget: string;
    misconception: string;
    recommendedFormat: LearningFormat;
    recommendedTargetId: string;
    recommendedLabel: string;
  }[];
  activeFormat: LearningFormat;
}
