import React, { useState, useEffect, useRef } from 'react';
import { Topic } from '../types';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  AlertCircle,
  Video
} from 'lucide-react';

interface VideoSummaryViewerProps {
  topic: Topic;
}

export const VideoSummaryViewer: React.FC<VideoSummaryViewerProps> = ({ topic }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTimeSec, setCurrentTimeSec] = useState<number>(0);
  const [durationSec, setDurationSec] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [hasFileLoaded, setHasFileLoaded] = useState<boolean>(false);
  const [hasLoadError, setHasLoadError] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const videoFilePath = topic.videoFile || `/media/video/${topic.id}.mp4`;

  useEffect(() => {
    setIsPlaying(false);
    setCurrentTimeSec(0);
    setDurationSec(0);
    setHasFileLoaded(false);
    setHasLoadError(false);

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      videoRef.current.load();
    }
  }, [topic.id, topic.videoFile]);

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      const dur = videoRef.current.duration;
      if (!isNaN(dur) && isFinite(dur) && dur > 0) {
        setDurationSec(Math.floor(dur));
        setHasFileLoaded(true);
        setHasLoadError(false);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTimeSec(Math.floor(videoRef.current.currentTime));
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
    if (!hasFileLoaded || hasLoadError || !videoRef.current) {
      return; // Cannot play if file not loaded
    }

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setHasLoadError(true);
        setIsPlaying(false);
      });
    }
  };

  const handleRestart = () => {
    if (!videoRef.current || !hasFileLoaded) return;
    videoRef.current.currentTime = 0;
    setCurrentTimeSec(0);
    if (!isPlaying) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current || !hasFileLoaded) return;
    const newTime = Number(e.target.value);
    videoRef.current.currentTime = newTime;
    setCurrentTimeSec(newTime);
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

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

  const formatSeconds = (sec: number) => {
    if (isNaN(sec) || !isFinite(sec) || sec <= 0) return '00:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-3">
      {/* Video Container Frame */}
      <div
        ref={containerRef}
        className="relative w-full aspect-video bg-[#111113] border-2 border-[#111113] overflow-hidden shadow-[8px_8px_0_#111113] flex flex-col justify-between"
      >
        {/* Main Video Element or Empty Placeholder */}
        <div className="relative flex-1 w-full h-full bg-black flex items-center justify-center overflow-hidden">
          <video
            ref={videoRef}
            src={videoFilePath}
            onLoadedMetadata={handleLoadedMetadata}
            onCanPlay={handleLoadedMetadata}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleEnded}
            onError={handleError}
            muted={isMuted}
            playsInline
            className={`w-full h-full object-contain ${hasFileLoaded && !hasLoadError ? 'block' : 'hidden'}`}
          />

          {/* When Video is Loaded and Paused: Clickable Overlay with Play Button */}
          {hasFileLoaded && !hasLoadError && !isPlaying && (
            <div
              onClick={togglePlay}
              className="absolute inset-0 z-20 bg-black/40 flex items-center justify-center cursor-pointer transition-opacity"
            >
              <div className="w-16 h-16 bg-[#EA580C] hover:bg-white hover:text-[#111113] text-white border-2 border-white flex items-center justify-center shadow-[4px_4px_0_#111113] transition-all cursor-pointer">
                <Play className="w-8 h-8 ml-0.5 fill-current" />
              </div>
            </div>
          )}

          {/* When Video is NOT Loaded / Missing in Folder: Clean Placeholder */}
          {(!hasFileLoaded || hasLoadError) && (
            <div className="p-6 text-center max-w-md space-y-3 z-10 text-white">
              <div className="w-12 h-12 mx-auto bg-white/10 border-2 border-white/30 flex items-center justify-center text-white/60">
                <Video className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="font-display uppercase text-sm sm:text-base font-bold text-white tracking-wider flex items-center justify-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-[#EA580C]" />
                  <span>FILE VIDEO BELUM DIMASUKKAN</span>
                </div>
                <p className="text-xs text-white/70 font-light leading-relaxed">
                  Letakkan file rekaman video MP4 Anda ke dalam folder:
                </p>
                <code className="inline-block bg-white/10 border border-white/20 px-2.5 py-1 font-mono text-[11px] text-[#EA580C] font-bold">
                  public{videoFilePath}
                </code>
              </div>
              <p className="text-[11px] text-white/50 pt-1">
                Video akan otomatis tampil dan siap diputar setelah file diletakkan.
              </p>
            </div>
          )}
        </div>

        {/* Video Player Controls Bar */}
        <div className="relative z-30 bg-[#111113] border-t-2 border-[#111113] p-2.5 sm:p-3 text-white space-y-2">
          {/* Progress Timeline Slider */}
          <div className="space-y-0.5">
            <input
              type="range"
              min={0}
              max={durationSec || 100}
              value={currentTimeSec}
              onChange={handleSeek}
              disabled={!hasFileLoaded}
              className={`w-full h-1.5 rounded-none appearance-none accent-[#EA580C] ${
                hasFileLoaded
                  ? 'bg-white/20 cursor-pointer'
                  : 'bg-white/10 cursor-not-allowed opacity-50'
              }`}
            />
            <div className="flex items-center justify-between text-[10px] label-mono text-white/70">
              <span>{formatSeconds(currentTimeSec)}</span>
              <span className="text-white/80 font-display font-bold uppercase truncate max-w-[200px] sm:max-w-md">
                {topic.title}
              </span>
              <span>{hasFileLoaded ? formatSeconds(durationSec) : '--:--'}</span>
            </div>
          </div>

          {/* Action Buttons Row */}
          <div className="flex items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={togglePlay}
                disabled={!hasFileLoaded}
                className={`p-2 transition-colors border ${
                  hasFileLoaded
                    ? 'bg-[#EA580C] hover:bg-white hover:text-[#111113] text-white border-white cursor-pointer'
                    : 'bg-white/10 text-white/40 border-white/20 cursor-not-allowed'
                }`}
                title={isPlaying ? 'Jeda' : 'Putar'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              </button>

              <button
                onClick={handleRestart}
                disabled={!hasFileLoaded}
                className="p-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                title="Putar Ulang dari Awal"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={toggleMute}
                disabled={!hasFileLoaded}
                className="p-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                title={isMuted ? 'Nyalakan Suara' : 'Bisukan Suara'}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5 text-[#EA580C]" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
            </div>

            <div className="flex items-center gap-2">
              {/* Speed Buttons */}
              <div className="flex items-center bg-white/10 border border-white/20 p-0.5">
                {[1, 1.25, 1.5, 2].map((speed) => (
                  <button
                    key={speed}
                    onClick={() => handleSpeedChange(speed)}
                    disabled={!hasFileLoaded}
                    className={`px-1.5 py-0.5 font-mono text-[10px] font-bold transition-all ${
                      playbackSpeed === speed
                        ? 'bg-white text-[#111113]'
                        : 'text-white/70 hover:text-white'
                    } disabled:opacity-40 disabled:cursor-not-allowed`}
                  >
                    {speed}x
                  </button>
                ))}
              </div>

              {/* Fullscreen Button */}
              <button
                onClick={toggleFullscreen}
                className="p-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 transition-colors cursor-pointer"
                title="Layar Penuh"
              >
                {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
