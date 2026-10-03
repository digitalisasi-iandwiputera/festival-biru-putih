import React, { useState, useEffect, useRef } from 'react';
import { Topic } from '../types';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  FileAudio,
  AlertCircle
} from 'lucide-react';

interface AudioPodcastViewerProps {
  topic: Topic;
  targetTurnId?: string | null;
}

export const AudioPodcastViewer: React.FC<AudioPodcastViewerProps> = ({ topic }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTimeSec, setCurrentTimeSec] = useState<number>(0);
  const [durationSec, setDurationSec] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [hasFileLoaded, setHasFileLoaded] = useState<boolean>(false);
  const [hasLoadError, setHasLoadError] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const audioFilePath = topic.audioFile || `/media/audio/${topic.id}.mp3`;

  useEffect(() => {
    // Reset state on topic change
    setIsPlaying(false);
    setCurrentTimeSec(0);
    setDurationSec(0);
    setHasFileLoaded(false);
    setHasLoadError(false);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.load();
    }
  }, [topic.id, topic.audioFile]);

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      const dur = audioRef.current.duration;
      if (!isNaN(dur) && isFinite(dur) && dur > 0) {
        setDurationSec(Math.floor(dur));
        setHasFileLoaded(true);
        setHasLoadError(false);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTimeSec(Math.floor(audioRef.current.currentTime));
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTimeSec(0);
  };

  const handleError = () => {
    setHasFileLoaded(false);
    setHasLoadError(true);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (!hasFileLoaded || hasLoadError || !audioRef.current) {
      return; // Cannot play if file not loaded
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setHasLoadError(true);
        setIsPlaying(false);
      });
    }
  };

  const handleRestart = () => {
    if (!audioRef.current || !hasFileLoaded) return;
    audioRef.current.currentTime = 0;
    setCurrentTimeSec(0);
    if (!isPlaying) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current || !hasFileLoaded) return;
    const newTime = Number(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTimeSec(newTime);
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const nextMuted = !isMuted;
    audioRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const formatSeconds = (sec: number) => {
    if (isNaN(sec) || !isFinite(sec) || sec <= 0) return '00:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Hidden Native Audio Element */}
      <audio
        ref={audioRef}
        src={audioFilePath}
        onLoadedMetadata={handleLoadedMetadata}
        onCanPlay={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onError={handleError}
        preload="metadata"
      />

      {/* Main Audio Player Frame */}
      <div className="bg-[#111113] text-[#F8F7F4] border-2 border-[#111113] p-5 sm:p-7 shadow-[8px_8px_0_#111113] space-y-5">
        {/* Header of Player */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/20">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 ${hasFileLoaded ? 'bg-[#EA580C] animate-pulse' : 'bg-white/40'}`} />
            <span className="font-display uppercase text-sm sm:text-base font-bold tracking-wider text-white">
              PEMUTAR PODCAST &amp; AUDIO MATERI
            </span>
          </div>

          <div className="flex items-center gap-2">
            {hasFileLoaded && !hasLoadError ? (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-emerald-500/20 border border-emerald-400 text-emerald-300 text-[10px] font-mono font-bold">
                <FileAudio className="w-3 h-3" /> FILE AUDIO TERSEDIA
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-white/10 border border-white/20 text-white/60 text-[10px] font-mono font-bold">
                MEDIA BELUM ADA
              </span>
            )}
          </div>
        </div>

        {/* State Notice if audio file is not found in folder */}
        {(!hasFileLoaded || hasLoadError) && (
          <div className="p-4 bg-white/5 border border-white/20 text-xs flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#EA580C] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="font-display uppercase tracking-wider text-white block text-xs">
                File Audio Belum Ditemukan di Folder
              </strong>
              <p className="font-light text-white/70 text-[11px] leading-relaxed">
                Letakkan file rekaman MP3 Anda ke dalam folder:
              </p>
              <code className="inline-block bg-black/50 border border-white/20 px-2 py-1 font-mono text-[11px] text-[#EA580C] font-bold">
                public{audioFilePath}
              </code>
              <p className="text-[10px] text-white/50 pt-0.5">
                Pemutar audio akan otomatis aktif dan dapat dimainkan setelah file diletakkan.
              </p>
            </div>
          </div>
        )}

        {/* Scrubber & Timeline */}
        <div className="space-y-2">
          <input
            type="range"
            min={0}
            max={durationSec || 100}
            value={currentTimeSec}
            onChange={handleSeek}
            disabled={!hasFileLoaded}
            className={`w-full h-2 rounded-none appearance-none accent-[#EA580C] ${
              hasFileLoaded
                ? 'bg-white/20 cursor-pointer'
                : 'bg-white/10 cursor-not-allowed opacity-50'
            }`}
          />
          <div className="flex items-center justify-between text-xs label-mono text-white/70">
            <span>{formatSeconds(currentTimeSec)}</span>
            <span className="text-white/80 font-display uppercase tracking-wide truncate max-w-xs sm:max-w-md">
              {topic.title}
            </span>
            <span>{hasFileLoaded ? formatSeconds(durationSec) : '--:--'}</span>
          </div>
        </div>

        {/* Controls Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleRestart}
              disabled={!hasFileLoaded}
              title="Mulai Dari Awal"
              className="p-2.5 bg-white text-[#111113] border-2 border-white hover:bg-[#EA580C] hover:text-white transition-all cursor-pointer shadow-[2px_2px_0_rgba(255,255,255,0.3)] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={togglePlay}
              disabled={!hasFileLoaded}
              className={`px-6 py-2.5 font-display text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2 transition-all border-2 ${
                hasFileLoaded
                  ? 'bg-[#EA580C] hover:bg-white hover:text-[#111113] text-white border-white cursor-pointer shadow-[3px_3px_0_rgba(255,255,255,0.3)]'
                  : 'bg-white/10 text-white/40 border-white/20 cursor-not-allowed'
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>JEDA</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>PUTAR AUDIO</span>
                </>
              )}
            </button>
          </div>

          {/* Speed Selector & Mute */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs label-mono text-white/70 hidden sm:inline mr-1">KECEPATAN:</span>
            {[1, 1.25, 1.5, 2].map((speed) => (
              <button
                key={speed}
                onClick={() => handleSpeedChange(speed)}
                disabled={!hasFileLoaded}
                className={`px-2 py-1 text-xs font-mono font-bold border-2 transition-all ${
                  playbackSpeed === speed
                    ? 'bg-white text-[#111113] border-white shadow-[2px_2px_0_#EA580C]'
                    : 'bg-white/10 text-white border-white/30 hover:bg-white/20'
                } disabled:opacity-40 disabled:cursor-not-allowed`}
              >
                {speed}x
              </button>
            ))}

            <button
              onClick={toggleMute}
              disabled={!hasFileLoaded}
              className="p-1.5 border-2 border-white/30 bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer ml-1 disabled:opacity-40 disabled:cursor-not-allowed"
              title={isMuted ? 'Nyalakan Suara' : 'Bisukan Suara'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-[#EA580C]" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
