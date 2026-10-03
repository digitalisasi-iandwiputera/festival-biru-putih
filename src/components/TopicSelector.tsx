import React, { useState } from 'react';
import { Topic, Subject, GradeLevel } from '../types';
import { Search, Clock, BookOpen, Atom, Compass, X } from 'lucide-react';

interface TopicSelectorProps {
  topics: Topic[];
  currentTopicId: string;
  onSelectTopic: (topic: Topic) => void;
  isOpen: boolean;
  onClose: () => void;
  selectedGrade: string;
  onSelectGrade: (grade: string) => void;
}

export const TopicSelector: React.FC<TopicSelectorProps> = ({
  topics,
  currentTopicId,
  onSelectTopic,
  isOpen,
  onClose,
  selectedGrade,
  onSelectGrade
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('Semua');

  if (!isOpen) return null;

  const filteredTopics = topics.filter(topic => {
    const matchesSearch =
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.coreQuestion.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGrade = selectedGrade === 'Semua' || topic.grade === selectedGrade;
    const matchesSubject = selectedSubject === 'Semua' || topic.subject === selectedSubject;
    return matchesSearch && matchesGrade && matchesSubject;
  });

  const getSubjectIcon = (subject: Subject) => {
    switch (subject) {
      case 'IPA':
        return <Atom className="w-4 h-4 text-emerald-600" />;
      case 'Matematika':
        return <Compass className="w-4 h-4 text-blue-600" />;
      default:
        return <BookOpen className="w-4 h-4 text-amber-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Pilih Topik Belajar Siswa SMP</h2>
            <p className="text-xs text-slate-500 mt-1">
              Materi Kurikulum Merdeka SMP dengan 5 format belajar interaktif
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters and Search Bar */}
        <div className="p-6 pb-2 space-y-3 bg-slate-50/50 border-b border-slate-100">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari topik, rumus, konsep, atau kata kunci..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 placeholder:text-slate-400"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Grade Segmented Control */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
              {['Semua', 'Kelas 7', 'Kelas 8', 'Kelas 9'].map((grade) => (
                <button
                  key={grade}
                  onClick={() => onSelectGrade(grade)}
                  className={`px-3 py-1.5 font-medium rounded-md transition-colors whitespace-nowrap ${
                    selectedGrade === grade
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {grade}
                </button>
              ))}
            </div>

            {/* Subject Segmented Control */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
              {['Semua', 'IPA', 'Matematika'].map((subj) => (
                <button
                  key={subj}
                  onClick={() => setSelectedSubject(subj)}
                  className={`px-3 py-1.5 font-medium rounded-md transition-colors whitespace-nowrap ${
                    selectedSubject === subj
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {subj}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Topic Grid */}
        <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTopics.map((topic) => {
            const isCurrent = topic.id === currentTopicId;
            return (
              <div
                key={topic.id}
                onClick={() => {
                  onSelectTopic(topic);
                  onClose();
                }}
                className={`group cursor-pointer rounded-xl p-5 border text-left transition-all ${
                  isCurrent
                    ? 'border-blue-500 bg-blue-50/40 ring-2 ring-blue-500/20'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 bg-white'
                }`}
              >
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <div className="flex items-center gap-1.5">
                    {getSubjectIcon(topic.subject)}
                    <span className="font-semibold text-slate-700">{topic.subject}</span>
                    <span aria-hidden="true">·</span>
                    <span>{topic.grade}</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{topic.durationMinutes} mnt</span>
                  </div>
                </div>

                <h3 className="text-base font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {topic.title}
                </h3>

                <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                  {topic.shortDesc}
                </p>

                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 italic text-[11px] truncate max-w-[220px]">
                    "{topic.coreQuestion}"
                  </span>
                  <span className="text-blue-600 font-semibold group-hover:underline shrink-0">
                    {isCurrent ? 'Sedang Dipelajari' : 'Buka Topik →'}
                  </span>
                </div>
              </div>
            );
          })}

          {filteredTopics.length === 0 && (
            <div className="col-span-2 py-12 text-center text-slate-400">
              <p className="text-sm">Tidak ada topik yang cocok dengan pencarianmu.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  onSelectGrade('Semua');
                  setSelectedSubject('Semua');
                }}
                className="mt-2 text-xs text-blue-600 font-medium hover:underline"
              >
                Reset Semua Filter
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
