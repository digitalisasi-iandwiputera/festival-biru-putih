import React, { useState, useEffect, useRef } from 'react';
import { Topic, AudioTurn } from '../types';
import {
  Play,
  Pause,
  RotateCcw,
  User,
  GraduationCap,
  FastForward,
  Loader2
} from 'lucide-react';
import { playTeacherChime, playStudentChime } from '../utils/audioChimes';
import { playGoogleTTS, stopAllAudio, prefetchAudio } from '../utils/ttsClient';

interface AudioLessonViewerProps {
  topic: Topic;
  targetTurnId?: string | null;
  onJumpToSection?: (sectionId: string) => void;
}

export const AudioLessonViewer: React.FC<AudioLessonViewerProps> = ({
  topic,
  targetTurnId,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTurnIndex, setCurrentTurnIndex] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isLoadingAudio, setIsLoadingAudio] = useState<boolean>(false);

  const playbackStopRef = useRef<(() => void) | null>(null);
  const turns = topic.audioTurns;
  const currentTurn = turns[currentTurnIndex] || turns[0];

  // Jump to targeted turn if requested from Diagnostic Gap Analysis
  useEffect(() => {
    if (targetTurnId) {
      const matchIndex = turns.findIndex(
        t => `audio-turn-${t.id}` === targetTurnId || t.relatedSectionId === targetTurnId
      );
      if (matchIndex !== -1) {
        setCurrentTurnIndex(matchIndex);
        const el = document.getElementById(`audio-turn-card-${matchIndex}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }
  }, [targetTurnId, turns]);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      stopAllAudio();
      if (playbackStopRef.current) {
        playbackStopRef.current();
      }
    };
  }, []);

  // Pre-fetch the first two turns on mount
  useEffect(() => {
    if (turns.length > 0) {
      prefetchAudio(turns[0].text, turns[0].speaker, playbackSpeed);
      if (turns.length > 1) {
        prefetchAudio(turns[1].text, turns[1].speaker, playbackSpeed);
      }
    }
  }, [turns, playbackSpeed]);

  /**
   * Speak a dialogue turn with Google Cloud Text-to-Speech (id-ID)
   */
  const playCurrentTurn = async (index: number) => {
    const turn = turns[index];
    if (!turn) return;

    if (playbackStopRef.current) {
      playbackStopRef.current();
      playbackStopRef.current = null;
    }

    // Play subtle acoustic transition sound effect
    if (turn.speaker === 'guru') {
      playTeacherChime();
    } else {
      playStudentChime();
    }

    setIsLoadingAudio(true);

    // Pre-fetch next turn in background
    if (index + 1 < turns.length) {
      prefetchAudio(turns[index + 1].text, turns[index + 1].speaker, playbackSpeed);
    }

    const { stop } = await playGoogleTTS(
      turn.text,
      turn.speaker,
      playbackSpeed,
      () => {
        setIsLoadingAudio(false);
        // Step to next turn if currently playing
        if (index < turns.length - 1) {
          setCurrentTurnIndex(prev => prev + 1);
        } else {
          setIsPlaying(false);
        }
      },
      (err) => {
        setIsLoadingAudio(false);
        console.warn('Playback notice:', err);
      }
    );

    setIsLoadingAudio(false);
    playbackStopRef.current = stop;
  };

  const handlePlay = () => {
    setIsPlaying(true);
    playCurrentTurn(currentTurnIndex);
  };

  const handlePause = () => {
    setIsPlaying(false);
    stopAllAudio();
    if (playbackStopRef.current) {
      playbackStopRef.current();
      playbackStopRef.current = null;
    }
  };

  // When currentTurnIndex changes during auto play, trigger speech for next turn
  useEffect(() => {
    if (isPlaying) {
      playCurrentTurn(currentTurnIndex);
    }
  }, [currentTurnIndex]);

  const handleSelectTurn = (index: number) => {
    setCurrentTurnIndex(index);
    if (isPlaying) {
      playCurrentTurn(index);
    }
  };

  const handleRestart = () => {
    handlePause();
    setCurrentTurnIndex(0);
  };

  const handleToggleSpeed = () => {
    const speeds = [0.9, 1, 1.25, 1.5];
    const nextSpeed = speeds[(speeds.indexOf(playbackSpeed) + 1) % speeds.length];
    setPlaybackSpeed(nextSpeed);
    if (isPlaying) {
      playCurrentTurn(currentTurnIndex);
    }
  };

  return (
    <div className="w-full bg-white border-x border-b border-[#DEE7DB] rounded-b-[28px] sm:rounded-b-[32px] p-6 sm:p-10 shadow-xs space-y-6">
      {/* Audio Controls Bar: Tombol Putar Suara, Ulangi, Kecepatan */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 sm:p-5 bg-[#F9FAF9] border border-[#DEEADE] rounded-2xl shadow-xs">
        <div className="flex flex-wrap items-center gap-3">
          {/* Tombol Putar Suara / Jeda Suara */}
          <button
            onClick={isPlaying ? handlePause : handlePlay}
            disabled={isLoadingAudio}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#2E8B57] hover:bg-[#236C43] disabled:opacity-50 text-white rounded-full text-xs sm:text-sm font-bold transition-all active:scale-95 shadow-sm hover:shadow cursor-pointer"
          >
            {isLoadingAudio ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Memuat Suara...</span>
              </>
            ) : isPlaying ? (
              <>
                <Pause className="w-4 h-4" />
                <span>Jeda Suara</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>Putar Suara ({currentTurn.timestamp})</span>
              </>
            )}
          </button>

          {/* Tombol Ulangi */}
          <button
            onClick={handleRestart}
            title="Ulangi dari awal"
            className="px-4 py-2.5 rounded-full bg-white hover:bg-[#E6F8EF] text-[#14532D] border border-[#D1FAE5] font-semibold transition-colors cursor-pointer flex items-center gap-1.5 text-xs sm:text-sm shadow-2xs"
          >
            <RotateCcw className="w-4 h-4 text-[#2E8B57]" />
            <span>Ulangi</span>
          </button>

          {/* Tombol Kecepatan */}
          <button
            onClick={handleToggleSpeed}
            className="px-4 py-2.5 rounded-full bg-white hover:bg-[#E6F8EF] text-[#14532D] border border-[#D1FAE5] font-semibold transition-colors flex items-center gap-1.5 text-xs sm:text-sm tabular-nums cursor-pointer shadow-2xs"
          >
            <FastForward className="w-4 h-4 text-[#2E8B57]" />
            <span>{playbackSpeed}x Kecepatan</span>
          </button>
        </div>

        <div className="text-xs font-semibold text-[#526D52]">
          Bagian {currentTurnIndex + 1} dari {turns.length}
        </div>
      </div>

      {/* Bagian Transkrip Dialog Percakapan Lengkap */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Transkrip Dialog Lengkap Guru & Siswa SMP
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Klik pada baris percakapan mana saja untuk memutar suara pada bagian tersebut.
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-600">
            {turns.length} Giliran Bicara
          </span>
        </div>

        <div className="space-y-4">
          {turns.map((turn, idx) => {
            const isActive = idx === currentTurnIndex;
            const isTeacher = turn.speaker === 'guru';

            return (
              <div
                key={turn.id}
                id={`audio-turn-card-${idx}`}
                onClick={() => handleSelectTurn(idx)}
                className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                  isActive
                    ? isTeacher
                      ? 'border-blue-500 bg-blue-50/50 ring-2 ring-blue-500/20 shadow-xs'
                      : 'border-amber-500 bg-amber-50/50 ring-2 ring-amber-500/20 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/60'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${
                      isTeacher
                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                        : 'bg-amber-100 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {isTeacher ? (
                      <GraduationCap className="w-5 h-5" />
                    ) : (
                      <User className="w-5 h-5" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">
                          {turn.speakerName}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            isTeacher
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {isTeacher ? 'Guru SMP' : 'Murid SMP'}
                        </span>
                        {isActive && (
                          <span className="px-2.5 py-0.5 rounded-full bg-[#2E8B57] text-white text-[10px] font-bold shadow-xs animate-pulse">
                            Sedang Berbicara
                          </span>
                        )}
                      </div>
                      <span className="text-slate-400 font-mono text-[11px] tabular-nums">
                        {turn.timestamp}
                      </span>
                    </div>

                    <p
                      className={`text-sm sm:text-base leading-relaxed ${
                        isActive ? 'text-slate-900 font-medium' : 'text-slate-700'
                      }`}
                    >
                      {turn.text}
                    </p>

                    {turn.keyTakeaway && (
                      <div className="mt-2.5 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                        <strong>Intisari Materi:</strong> {turn.keyTakeaway}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

