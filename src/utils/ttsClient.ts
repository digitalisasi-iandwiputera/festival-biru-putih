/**
 * Client service for Google Cloud Text-to-Speech & Gemini TTS Audio Playback
 */

import { playTeacherChime, playStudentChime, playSlideTransitionChime } from './audioChimes';

interface TTSResponse {
  audioContent: string;
  format: string;
  provider: string;
  speaker: string;
}

// In-memory client cache of synthesized audio blobs
const clientAudioCache = new Map<string, string>();
let currentAudio: HTMLAudioElement | null = null;

/**
 * Checks if browser has a native Indonesian voice
 */
export function hasNativeIndonesianVoice(): boolean {
  if (typeof window === 'undefined' || !window.speechSynthesis) return false;
  const voices = window.speechSynthesis.getVoices();
  return voices.some(v => v.lang.toLowerCase().includes('id') || v.name.toLowerCase().includes('indonesia'));
}

/**
 * Stop any ongoing audio playback immediately
 */
export function stopAllAudio() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}

/**
 * Pre-fetches audio for a turn to make playback instant
 */
export async function prefetchAudio(text: string, speaker: 'guru' | 'siswa', speed: number = 1.0) {
  const cleanText = text.replace(/^(\[.*?\]|bicaralah.*?:)\s*/i, '').trim();
  const cacheKey = `${speaker}_${speed}_${cleanText}`;
  if (clientAudioCache.has(cacheKey)) return;

  try {
    const res = await fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: cleanText, speaker, speed }),
    });

    if (res.ok) {
      const data = (await res.json()) as TTSResponse;
      if (data.audioContent) {
        const mime = data.format === 'wav' ? 'audio/wav' : 'audio/mp3';
        const dataUri = `data:${mime};base64,${data.audioContent}`;
        clientAudioCache.set(cacheKey, dataUri);
      }
    }
  } catch {
    // Background prefetch fail is non-blocking
  }
}

/**
 * Plays speech using Google Cloud Text-to-Speech API with authentic Indonesian dialek.
 * Strict rule: Never uses foreign language voices to read Indonesian words.
 */
export async function playGoogleTTS(
  text: string,
  speaker: 'guru' | 'siswa',
  speed: number = 1.0,
  onEnd?: () => void,
  onError?: (err: string) => void
): Promise<{ stop: () => void }> {
  stopAllAudio();

  const cleanText = text.replace(/^(\[.*?\]|bicaralah.*?:)\s*/i, '').trim();
  const cacheKey = `${speaker}_${speed}_${cleanText}`;

  // 1. Check client cache first
  if (clientAudioCache.has(cacheKey)) {
    const dataUri = clientAudioCache.get(cacheKey)!;
    const audio = new Audio(dataUri);
    audio.playbackRate = 1.0;
    currentAudio = audio;

    audio.onended = () => {
      currentAudio = null;
      if (onEnd) onEnd();
    };

    audio.onerror = () => {
      currentAudio = null;
      if (onError) onError('Gagal memutar audio');
    };

    audio.play().catch(() => {});
    return { stop: () => stopAllAudio() };
  }

  // 2. Fetch from Google Cloud Text-to-Speech backend endpoint
  try {
    const res = await fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: cleanText, speaker, speed }),
    });

    if (res.ok) {
      const data = (await res.json()) as TTSResponse;
      if (data.audioContent) {
        const mime = data.format === 'wav' ? 'audio/wav' : 'audio/mp3';
        const dataUri = `data:${mime};base64,${data.audioContent}`;
        clientAudioCache.set(cacheKey, dataUri);

        const audio = new Audio(dataUri);
        currentAudio = audio;

        audio.onended = () => {
          currentAudio = null;
          if (onEnd) onEnd();
        };

        audio.onerror = () => {
          currentAudio = null;
          if (onError) onError('Gagal memutar audio');
        };

        audio.play().catch(() => {});
        return { stop: () => stopAllAudio() };
      }
    }
  } catch (err) {
    console.warn('Backend TTS fetch failed:', err);
  }

  // 3. Fallback: Only use browser speech synthesis IF a genuine Indonesian voice exists!
  // We NEVER allow an English or foreign voice to read Indonesian text with a foreign accent!
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    const voices = window.speechSynthesis.getVoices();
    const indonesianVoice = voices.find(
      v => v.lang.toLowerCase().includes('id') || v.name.toLowerCase().includes('indonesia')
    );

    if (indonesianVoice) {
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.voice = indonesianVoice;
      utterance.lang = 'id-ID';
      utterance.rate = speaker === 'guru' ? 0.92 * speed : 1.08 * speed;
      utterance.pitch = speaker === 'guru' ? 0.85 : 1.34;

      utterance.onend = () => {
        if (onEnd) onEnd();
      };
      utterance.onerror = () => {
        if (onEnd) onEnd();
      };

      window.speechSynthesis.speak(utterance);
      return { stop: () => stopAllAudio() };
    }
  }

  // If no Indonesian voice is available and backend was offline, natural timer progression
  const readingDurationMs = Math.max(2500, (cleanText.split(' ').length / (2.5 * speed)) * 1000);
  const timer = setTimeout(() => {
    if (onEnd) onEnd();
  }, readingDurationMs);

  return {
    stop: () => {
      clearTimeout(timer);
      stopAllAudio();
    },
  };
}
