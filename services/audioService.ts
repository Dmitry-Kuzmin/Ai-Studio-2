

// SINGLETON AUDIO CONTEXT FOR SFX
let audioContext: AudioContext | null = null;

const getAudioContext = async (): Promise<AudioContext> => {
  if (!audioContext) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    audioContext = new AudioContext();
  }
  if (audioContext.state === 'suspended') {
    await audioContext.resume();
  }
  return audioContext;
};

// --- SFX FUNCTIONS (Synthesized for UI interaction) ---

export const playEngineSound = async () => {
  try {
    const ctx = await getAudioContext();
    const t = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.4, t);
    masterGain.connect(ctx.destination);

    // Turbine Effect
    const oscTurbine = ctx.createOscillator();
    const gainTurbine = ctx.createGain();
    oscTurbine.type = 'sine';
    oscTurbine.frequency.setValueAtTime(200, t);
    oscTurbine.frequency.exponentialRampToValueAtTime(800, t + 1.5);
    gainTurbine.gain.setValueAtTime(0, t);
    gainTurbine.gain.linearRampToValueAtTime(0.4, t + 0.5);
    gainTurbine.gain.exponentialRampToValueAtTime(0.01, t + 1.8);
    oscTurbine.connect(gainTurbine);
    gainTurbine.connect(masterGain);
    oscTurbine.start(t);
    oscTurbine.stop(t + 2.0);
  } catch (e) {
    console.warn("Audio play failed", e);
  }
};

export const playBiometricSound = async () => {
  try {
    const ctx = await getAudioContext();
    const t = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.value = 0.3;
    masterGain.connect(ctx.destination);
    const notes = [523.25, 659.25, 783.99]; 
    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      const startTime = t + (index * 0.08);
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.3, startTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start(startTime);
      osc.stop(startTime + 0.5);
    });
  } catch (e) {
    console.warn("Audio play failed", e);
  }
};

export const playClickSound = async () => {
  try {
    const ctx = await getAudioContext();
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, t);
    osc.frequency.exponentialRampToValueAtTime(1200, t + 0.05);
    gain.gain.setValueAtTime(0.1, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.05);
  } catch (e) {
    console.warn("Audio play failed", e);
  }
};

export const playHoverSound = async () => {
  try {
    const ctx = await getAudioContext();
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine'; 
    osc.frequency.setValueAtTime(2000, t);
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.02, t + 0.01); 
    gain.gain.linearRampToValueAtTime(0, t + 0.05);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.1);
  } catch (e) {
    // Silent fail for hover to prevent log spam
  }
};

export const playTabSwitchSound = async () => {
  try {
    const ctx = await getAudioContext();
    const t = ctx.currentTime;
    const gain = ctx.createGain();
    gain.gain.value = 0.2;
    gain.connect(ctx.destination);
    const osc = ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(200, t);
    osc.frequency.exponentialRampToValueAtTime(600, t + 0.15);
    const localGain = ctx.createGain();
    localGain.gain.setValueAtTime(0, t);
    localGain.gain.linearRampToValueAtTime(0.3, t + 0.05);
    localGain.gain.linearRampToValueAtTime(0, t + 0.15);
    osc.connect(localGain);
    localGain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.2);
  } catch (e) {
    console.warn("Audio play failed", e);
  }
};

export const playAlertSound = async () => {
  try {
    const ctx = await getAudioContext();
    const t = ctx.currentTime;
    const gain = ctx.createGain();
    gain.gain.value = 0.3;
    gain.connect(ctx.destination);
    const playTone = (time: number) => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, time); 
      osc.connect(gain);
      const localGain = ctx.createGain();
      localGain.gain.setValueAtTime(0, time);
      localGain.gain.linearRampToValueAtTime(0.5, time + 0.05);
      localGain.gain.exponentialRampToValueAtTime(0.001, time + 0.3);
      osc.connect(localGain);
      localGain.connect(ctx.destination);
      osc.start(time);
      osc.stop(time + 0.3);
    };
    playTone(t);
    playTone(t + 0.15);
  } catch (e) {
    console.warn("Audio play failed", e);
  }
};

export const playErrorSound = async () => {
  try {
    const ctx = await getAudioContext();
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(150, t);
    osc.frequency.linearRampToValueAtTime(100, t + 0.2);
    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.25);
  } catch (e) {
    console.warn("Audio play failed", e);
  }
};

export const playSuccessSound = async () => {
  try {
    const ctx = await getAudioContext();
    const t = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.value = 0.3;
    masterGain.connect(ctx.destination);
    const freqs = [523.25, 659.25, 783.99, 987.77];
    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle'; 
      osc.frequency.setValueAtTime(f, t + i * 0.05);
      gain.gain.setValueAtTime(0, t + i * 0.05);
      gain.gain.linearRampToValueAtTime(0.1, t + i * 0.05 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.05 + 0.6);
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start(t + i * 0.05);
      osc.stop(t + i * 0.05 + 0.6);
    });
  } catch (e) {
    console.warn("Audio play failed", e);
  }
};

export const playRewardSound = async () => {
  try {
    const ctx = await getAudioContext();
    const t = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.value = 0.3;
    masterGain.connect(ctx.destination);

    // Randomize scale to create infinite variations (Major Pentatonic-ish)
    const baseFreq = 440 + Math.random() * 100; 
    const scale = [1, 1.125, 1.25, 1.5, 1.66];
    
    // Play a fast arpeggio
    for(let i=0; i<8; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = Math.random() > 0.5 ? 'sine' : 'triangle';
        
        // Pick a random note from scale, going up
        const multiplier = scale[i % scale.length] * (1 + Math.floor(i/scale.length));
        const freq = baseFreq * multiplier;

        osc.frequency.setValueAtTime(freq, t + i * 0.06);
        
        gain.gain.setValueAtTime(0, t + i * 0.06);
        gain.gain.linearRampToValueAtTime(0.2, t + i * 0.06 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.06 + 0.5);
        
        osc.connect(gain);
        gain.connect(masterGain);
        
        osc.start(t + i * 0.06);
        osc.stop(t + i * 0.06 + 0.6);
    }
  } catch (e) {
    console.warn("Audio play failed", e);
  }
};

export const playEpicRewardSound = async () => {
  try {
    const ctx = await getAudioContext();
    const t = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.4, t);
    masterGain.connect(ctx.destination);

    // 1. Heavy Low Thud (Impact)
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = 'triangle';
    subOsc.frequency.setValueAtTime(60, t);
    subOsc.frequency.exponentialRampToValueAtTime(30, t + 0.5);
    subGain.gain.setValueAtTime(1, t);
    subGain.gain.exponentialRampToValueAtTime(0.001, t + 0.8);
    subOsc.connect(subGain);
    subGain.connect(masterGain);
    subOsc.start(t);
    subOsc.stop(t + 0.8);

    // 2. High Shimmer Arpeggio (Gold Effect)
    const scale = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98, 2093.00];
    scale.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      
      const startTime = t + (i * 0.04);
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.2, startTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 1.2); // Long tail
      
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start(startTime);
      osc.stop(startTime + 1.2);
    });

    // 3. Noise Burst (Confetti/Scatter)
    const bufferSize = ctx.sampleRate * 0.5; // 0.5 seconds
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.value = 1000;
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.3, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(masterGain);
    noise.start(t);

    // 4. Uplifting Sweep (Excitement)
    const sweepOsc = ctx.createOscillator();
    const sweepGain = ctx.createGain();
    sweepOsc.type = 'sawtooth';
    sweepOsc.frequency.setValueAtTime(200, t);
    sweepOsc.frequency.exponentialRampToValueAtTime(800, t + 0.6);
    sweepGain.gain.setValueAtTime(0.05, t);
    sweepGain.gain.linearRampToValueAtTime(0, t + 0.6);
    sweepOsc.connect(sweepGain);
    sweepGain.connect(masterGain);
    sweepOsc.start(t);
    sweepOsc.stop(t + 0.6);

  } catch (e) {
    console.warn("Audio play failed", e);
  }
};

export const playLevelUpSound = async () => {
  try {
    const ctx = await getAudioContext();
    const t = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.value = 0.3;
    masterGain.connect(ctx.destination);
    const freqs = [440, 554.37, 659.25, 880, 1108.73, 1318.51]; 
    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 2000;
      osc.frequency.setValueAtTime(f, t + i * 0.08);
      gain.gain.setValueAtTime(0, t + i * 0.08);
      gain.gain.linearRampToValueAtTime(0.1, t + i * 0.08 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.08 + 0.4);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(masterGain);
      osc.start(t + i * 0.08);
      osc.stop(t + i * 0.08 + 0.5);
    });
  } catch (e) {
    console.warn("Audio play failed", e);
  }
};

export const playUnlockSound = async () => {
  try {
    const ctx = await getAudioContext();
    const t = ctx.currentTime;
    const createClick = (time: number, freq: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, time);
      gain.gain.setValueAtTime(0.1, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(time);
      osc.stop(time + 0.05);
    };
    createClick(t, 1200);
    createClick(t + 0.1, 1200);
  } catch (e) {
    console.warn("Audio play failed", e);
  }
};

export const playNotificationSound = async () => {
  try {
    const ctx = await getAudioContext();
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, t);
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.3, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 1.0);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 1.0);
  } catch (e) {
    console.warn("Audio play failed", e);
  }
};

export const playStartupSound = async () => {
  try {
    const ctx = await getAudioContext();
    const t = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.value = 0.3;
    masterGain.connect(ctx.destination);
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(100, t);
    osc.frequency.exponentialRampToValueAtTime(800, t + 1.0);
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.3, t + 0.5);
    gain.gain.linearRampToValueAtTime(0, t + 1.0);
    const oscHigh = ctx.createOscillator();
    const gainHigh = ctx.createGain();
    oscHigh.type = 'square';
    oscHigh.frequency.setValueAtTime(2000, t);
    gainHigh.gain.setValueAtTime(0, t);
    gainHigh.gain.linearRampToValueAtTime(0.05, t + 0.5);
    gainHigh.gain.linearRampToValueAtTime(0, t + 0.8);
    osc.connect(gain);
    oscHigh.connect(gainHigh);
    gain.connect(masterGain);
    gainHigh.connect(masterGain);
    osc.start(t);
    osc.stop(t + 1.0);
    oscHigh.start(t);
    oscHigh.stop(t + 1.0);
  } catch (e) {
    console.warn("Audio play failed", e);
  }
};

// =============================================================
// STREAMING MUSIC ENGINE (Using HTML5 Audio)
// =============================================================

export type MusicTrack = 'lofi' | 'piano' | 'ambient';

const TRACK_URLS = {
  // Public Domain / Royalty Free Stream URLs
  lofi: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3', 
  piano: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=relaxing-piano-music-2725.mp3',
  ambient: 'https://cdn.pixabay.com/download/audio/2022/02/07/audio_1b31d0c6e9.mp3?filename=ambient-piano-drone-2662.mp3'
};

class MusicEngine {
  private audio: HTMLAudioElement | null = null;
  public isPlaying: boolean = false;
  private currentTrack: MusicTrack = 'lofi';

  constructor() {
    if (typeof Audio !== "undefined") {
      this.audio = new Audio();
      this.audio.loop = true;
      this.audio.crossOrigin = "anonymous";
      this.audio.preload = 'auto';
      
      try {
        this.audio.volume = 0.4;
      } catch (e) {
        console.warn("Volume control not supported on this device");
      }
    }
  }

  public async setTrack(track: MusicTrack) {
    if (!this.audio) return;
    
    if (this.currentTrack !== track) {
      this.currentTrack = track;
      const wasPlaying = !this.audio.paused;
      
      try {
        // Safe switching sequence
        this.audio.pause();
        this.audio.src = TRACK_URLS[track];
        
        // Safari fix: load() can sometimes throw 'Operation not supported', 
        // but is needed to reset the element. We catch it just in case.
        try {
            this.audio.load(); 
        } catch (loadError) {
            console.warn("Audio load warning (safe to ignore):", loadError);
        }

        if (wasPlaying) {
          try {
            await this.audio.play();
            this.isPlaying = true;
          } catch (playError) {
            console.warn("Auto-resume play failed:", playError);
            this.isPlaying = false;
          }
        }
      } catch (e) {
        console.error("Error switching track:", e);
        this.isPlaying = false;
      }
    }
  }

  public async play() {
    if (!this.audio) return;
    
    try {
      if (!this.audio.src || this.audio.src === '') {
         this.audio.src = TRACK_URLS[this.currentTrack];
         this.audio.load();
      }
      
      await this.audio.play();
      this.isPlaying = true;
    } catch (e) {
      console.error("Playback failed:", e);
      this.isPlaying = false;
    }
  }

  public stop() {
    if (!this.audio) return;
    try {
      this.audio.pause();
      this.isPlaying = false;
    } catch (e) {
      console.error("Stop failed:", e);
    }
  }

  public async toggle() {
    if (this.isPlaying) {
      this.stop();
    } else {
      await this.play();
    }
    return this.isPlaying;
  }
}

export const musicEngine = new MusicEngine();
