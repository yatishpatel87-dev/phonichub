// Child-Friendly Audio Synthesizer and Speech Engine

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function unlockAudio() {
  const ctx = getAudioContext();
  if (ctx && ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }
}

// Synthesized Sound Effects (No external audio file dependencies!)
export function playChimeSuccess() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

    gain.gain.setValueAtTime(0.001, ctx.currentTime + idx * 0.08);
    gain.gain.exponentialRampToValueAtTime(0.22, ctx.currentTime + idx * 0.08 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.08 + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime + idx * 0.08);
    osc.stop(ctx.currentTime + idx * 0.08 + 0.4);
  });
}

export function playGentleBoing() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  // Playful warm cartoon boing (downward glide)
  osc.type = 'sine';
  osc.frequency.setValueAtTime(260, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(160, ctx.currentTime + 0.28);

  gain.gain.setValueAtTime(0.18, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.32);
}

export function playPop() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(420, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(780, ctx.currentTime + 0.06);

  gain.gain.setValueAtTime(0.15, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.1);
}

export function playStarEarned() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const freqs = [880, 1174.66, 1760]; // A5, D6, A6
  freqs.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.09);

    gain.gain.setValueAtTime(0.16, ctx.currentTime + idx * 0.09);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.09 + 0.4);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime + idx * 0.09);
    osc.stop(ctx.currentTime + idx * 0.09 + 0.42);
  });
}

export function playVictoryFanfare() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const melody = [
    { freq: 523.25, time: 0, dur: 0.15 },    // C5
    { freq: 659.25, time: 0.16, dur: 0.15 }, // E5
    { freq: 783.99, time: 0.32, dur: 0.15 }, // G5
    { freq: 1046.5, time: 0.48, dur: 0.4 },  // C6
    { freq: 880.0, time: 0.9, dur: 0.18 },   // A5
    { freq: 1046.5, time: 1.1, dur: 0.6 },   // C6 long
  ];

  melody.forEach((item) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(item.freq, ctx.currentTime + item.time);

    gain.gain.setValueAtTime(0.001, ctx.currentTime + item.time);
    gain.gain.exponentialRampToValueAtTime(0.24, ctx.currentTime + item.time + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + item.time + item.dur);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime + item.time);
    osc.stop(ctx.currentTime + item.time + item.dur + 0.05);
  });
}

// Firecracker / Firework Audio Synthesizer (Realistic & child-friendly)
export function playCrackerBurst() {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    // 1. Noise crackle/snap
    const bufferSize = Math.floor(ctx.sampleRate * 0.09);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1600 + Math.random() * 800, ctx.currentTime);
    filter.Q.setValueAtTime(3.0, ctx.currentTime);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.22, ctx.currentTime);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.085);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    // 2. Low gentle thump pop
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(55, ctx.currentTime + 0.09);

    oscGain.gain.setValueAtTime(0.18, ctx.currentTime);
    oscGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);

    noise.start(ctx.currentTime);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.095);
  } catch (err) {
    console.warn('Cracker sound error:', err);
  }
}

export function playSparkleDing() {
  const ctx = getAudioContext();
  if (!ctx) return;
  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1400 + Math.random() * 800, ctx.currentTime);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.19);
  } catch (err) {
    console.warn('Sparkle sound error:', err);
  }
}

// Text-to-Speech Phonics Engine
let voices: SpeechSynthesisVoice[] = [];

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  const updateVoices = () => {
    voices = window.speechSynthesis.getVoices();
  };
  updateVoices();
  window.speechSynthesis.onvoiceschanged = updateVoices;
}

export function getAvailableVoices(): SpeechSynthesisVoice[] {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return [];
  if (voices.length === 0) {
    voices = window.speechSynthesis.getVoices();
  }
  return voices.filter((v) => v.lang.startsWith('en'));
}

export function speakText(
  text: string,
  options: {
    rate?: number;
    pitch?: number;
    preferredVoiceURI?: string;
    onEnd?: () => void;
  } = {}
) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (options.onEnd) options.onEnd();
    return;
  }

  try {
    window.speechSynthesis.cancel(); // Stop ongoing speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = options.rate ?? 0.92; // Slightly relaxed for young preschool clarity
    utterance.pitch = options.pitch ?? 1.15; // Cheerful friendly pitch

    const voiceList = getAvailableVoices();
    if (options.preferredVoiceURI) {
      const match = voiceList.find((v) => v.voiceURI === options.preferredVoiceURI);
      if (match) utterance.voice = match;
    } else {
      // Prioritize pleasant English voices
      const friendlyVoice = voiceList.find(
        (v) =>
          v.name.includes('Samantha') ||
          v.name.includes('Google US English') ||
          v.name.includes('Karen') ||
          v.name.includes('Zira') ||
          v.name.includes('Victoria') ||
          v.name.includes('Natural')
      ) || voiceList[0];
      if (friendlyVoice) utterance.voice = friendlyVoice;
    }

    if (options.onEnd) {
      utterance.onend = () => options.onEnd?.();
      utterance.onerror = () => options.onEnd?.();
    }

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn('Speech synthesis error:', err);
    if (options.onEnd) options.onEnd();
  }
}

// Special child-friendly phonetic pronunciation helper
export function speakPhoneme(
  item: { letter: string; phoneme: string; spokenPhoneme: string; soundDisplay: string },
  options?: { preferredVoiceURI?: string; onEnd?: () => void }
) {
  // Speech text is articulated cleanly: e.g. "sss", "ah", "tuh", "puh", "ih", "nnn"
  // Repeating with a tiny pause helps little ears identify the phoneme
  const phonemeAudioMap: Record<string, string> = {
    s: 'sss. sss.',
    a: 'ah. ah.',
    t: 't. t.',
    p: 'p. p.',
    i: 'ih. ih.',
    n: 'nnn. nnn.',
  };

  const textToSpeak = phonemeAudioMap[item.letter.toLowerCase()] || `${item.spokenPhoneme}. ${item.spokenPhoneme}.`;
  speakText(textToSpeak, {
    rate: 0.82,
    pitch: 1.1,
    preferredVoiceURI: options?.preferredVoiceURI,
    onEnd: options?.onEnd,
  });
}
