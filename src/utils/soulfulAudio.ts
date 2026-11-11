// Web Audio API synthesizer for soft, soulful, warm background chords
// Creates a soothing, warm neo-soul / lo-fi electric piano chord progression
// Perfectly fitting "Granny's warm homey kitchen" vibe without any external assets.

class SoulfulAudioPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private intervalId: number | null = null;
  private masterGain: GainNode | null = null;
  private currentVolume: number = 0.35;

  private chordProgression = [
    // EbMaj9 (warm, welcoming, homey)
    { root: 155.56, notes: [155.56, 196.00, 233.08, 293.66, 349.23], duration: 4.8 },
    // Cm9 (soulful, nostalgic, reflective)
    { root: 130.81, notes: [130.81, 196.00, 233.08, 261.63, 311.13], duration: 4.8 },
    // Fm9 (gentle, heartfelt, family warmth)
    { root: 174.61, notes: [174.61, 207.65, 261.63, 311.13, 392.00], duration: 4.8 },
    // Bb13 / Bb7sus (warm resolving chord)
    { root: 116.54, notes: [116.54, 174.61, 233.08, 293.66, 392.00], duration: 4.8 },
  ];

  private currentChordIndex: number = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.currentVolume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private playWarmNote(freq: number, startTime: number, duration: number, velocity: number = 0.25) {
    if (!this.ctx || !this.masterGain) return;

    // Dual oscillator for rich, warm Rhodes / electric piano timbre
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const noteGain = this.ctx.createGain();

    // Fundamental is warm sine, sub-harmonic is soft triangle
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, startTime);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 1.002, startTime); // gentle chorus detune

    // Warm low-pass filter to give that vintage soul record feel
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(650, startTime);
    filter.frequency.exponentialRampToValueAtTime(320, startTime + duration);

    // Warm mellow envelope with gentle attack and long decay
    noteGain.gain.setValueAtTime(0.0001, startTime);
    noteGain.gain.linearRampToValueAtTime(velocity, startTime + 0.35); // soft velvet attack
    noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc1.connect(noteGain);
    osc2.connect(noteGain);
    noteGain.connect(filter);
    filter.connect(this.masterGain);

    osc1.start(startTime);
    osc2.start(startTime);
    osc1.stop(startTime + duration + 0.1);
    osc2.stop(startTime + duration + 0.1);
  }

  private triggerChord() {
    if (!this.ctx || !this.isPlaying) return;

    const chord = this.chordProgression[this.currentChordIndex];
    const now = this.ctx.currentTime;

    // Stagger note arpeggiation slightly for natural finger-played soul touch
    chord.notes.forEach((freq, i) => {
      const stagger = i * 0.045;
      const vel = i === 0 ? 0.32 : 0.16 + (i * 0.02);
      this.playWarmNote(freq, now + stagger, chord.duration, vel);
    });

    this.currentChordIndex = (this.currentChordIndex + 1) % this.chordProgression.length;
  }

  public play() {
    try {
      this.initContext();
      if (this.isPlaying) return;
      this.isPlaying = true;
      this.triggerChord();
      this.intervalId = window.setInterval(() => {
        this.triggerChord();
      }, 4800);
    } catch {
      // Audio context might be restricted before user gesture
    }
  }

  public pause() {
    this.isPlaying = false;
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.ctx && this.masterGain) {
      this.masterGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.2);
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      if (this.ctx && this.masterGain) {
        this.masterGain.gain.setValueAtTime(this.currentVolume, this.ctx.currentTime);
      }
      this.play();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public setVolume(vol: number) {
    this.currentVolume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.currentVolume, this.ctx.currentTime, 0.1);
    }
  }
}

export const soulfulAudio = new SoulfulAudioPlayer();
