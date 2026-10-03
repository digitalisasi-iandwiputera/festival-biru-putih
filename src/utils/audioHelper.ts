/**
 * Audio synthesis helper specialized for Indonesian educational dialects
 * Distinguishes Teacher (Guru: authoritative, warm, clear cadence)
 * and Teen Student (Siswa Remaja: energetic, youthful pitch, natural teenage inflection).
 */

export interface IndonesianVoiceProfile {
  voice: SpeechSynthesisVoice | null;
  pitch: number;
  rate: number;
  label: string;
}

// Play soft gentle audio tone when speaker switches (educational podcast aesthetic)
export const playSpeakerSwitchTone = (speaker: 'guru' | 'siswa') => {
  if (typeof window === 'undefined') return;
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    // Guru has a lower warm tone (392Hz - G4), Siswa has a bright higher tone (587Hz - D5)
    const freq = speaker === 'guru' ? 392 : 587.33;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.18);
  } catch {
    // Ignore audio context errors if browser blocks autoplay
  }
};

// Retrieve best matching Indonesian voice from browser
export const getIndonesianVoices = (): {
  teacherVoice: SpeechSynthesisVoice | null;
  studentVoice: SpeechSynthesisVoice | null;
  allIndonesian: SpeechSynthesisVoice[];
} => {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    return { teacherVoice: null, studentVoice: null, allIndonesian: [] };
  }

  const allVoices = window.speechSynthesis.getVoices();

  // Find Indonesian voices (id, id-ID, Indonesian, Bahasa)
  const idVoices = allVoices.filter(
    v =>
      v.lang.toLowerCase().startsWith('id') ||
      v.lang.toLowerCase().includes('indonesia') ||
      v.name.toLowerCase().includes('indonesia') ||
      v.name.toLowerCase().includes('gadis') ||
      v.name.toLowerCase().includes('ardi') ||
      v.name.toLowerCase().includes('damayanti')
  );

  // If multiple Indonesian voices exist, separate male/female or teacher/student
  let teacherVoice: SpeechSynthesisVoice | null = null;
  let studentVoice: SpeechSynthesisVoice | null = null;

  if (idVoices.length > 1) {
    // Look for male/deeper voice for teacher or first
    const maleVoice = idVoices.find(v => v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('ardi') || v.name.toLowerCase().includes('andika'));
    const femaleVoice = idVoices.find(v => v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('gadis') || v.name.toLowerCase().includes('damayanti'));

    teacherVoice = maleVoice || idVoices[0];
    studentVoice = femaleVoice || (idVoices.length > 1 ? idVoices[1] : idVoices[0]);
  } else if (idVoices.length === 1) {
    teacherVoice = idVoices[0];
    studentVoice = idVoices[0];
  } else {
    // Fallback to default or any Southeast Asian / general voice
    teacherVoice = allVoices.find(v => v.default) || allVoices[0] || null;
    studentVoice = teacherVoice;
  }

  return {
    teacherVoice,
    studentVoice,
    allIndonesian: idVoices
  };
};

/**
 * Configure voice utterance with natural Indonesian teacher vs. teenage student cadence
 */
export const createIndonesianUtterance = (
  text: string,
  speaker: 'guru' | 'siswa',
  playbackSpeed: number = 1.0,
  preferredVoice?: SpeechSynthesisVoice | null
): SpeechSynthesisUtterance => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'id-ID';

  const { teacherVoice, studentVoice } = getIndonesianVoices();
  const selectedVoice = preferredVoice || (speaker === 'guru' ? teacherVoice : studentVoice);

  if (selectedVoice) {
    utterance.voice = selectedVoice;
  }

  if (speaker === 'guru') {
    // Khas Guru: Suara hangat, berwibawa, tempo tenang dan jelas untuk pengajaran
    utterance.pitch = 0.88;
    utterance.rate = 0.92 * playbackSpeed;
  } else {
    // Khas Siswa Remaja: Nada lebih tinggi, ceria, dinamis, gaya bertanya remaja SMP
    utterance.pitch = 1.32;
    utterance.rate = 1.08 * playbackSpeed;
  }

  return utterance;
};
