// Synthesized Cinematic Audio Engine using Web Audio API
// Specifically engineered for the Netflix Intro sequence ONLY.
// 100% synthesized in Web Audio API - zero external MP3s, zero latency, offline ready.

class NetflixAudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.activeGains = [];
    this.activeSources = [];
  }

  init() {
    if (typeof window === 'undefined') return;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  isAudioAllowed() {
    if (typeof window === 'undefined') return false;
    return !!(this.ctx && this.ctx.state === 'running');
  }

  async unlockAudio() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      try {
        await this.ctx.resume();
      } catch (_) {}
    }
    return this.ctx?.state === 'running';
  }

  setMuted(muted) {
    this.isMuted = muted;
    if (muted) {
      this.stopAllAudio(0.1);
    }
  }

  registerGain(gainNode) {
    this.activeGains.push(gainNode);
    return gainNode;
  }

  registerSource(sourceNode) {
    this.activeSources.push(sourceNode);
    return sourceNode;
  }

  // Stop all audio completely (called when intro ends or is skipped)
  stopAllAudio(fadeOutTime = 0.25) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;

    this.activeGains.forEach((gain) => {
      try {
        gain.gain.cancelScheduledValues(t);
        gain.gain.setValueAtTime(gain.gain.value, t);
        gain.gain.linearRampToValueAtTime(0.0001, t + fadeOutTime);
      } catch (_) {}
    });

    setTimeout(() => {
      this.activeSources.forEach((source) => {
        try {
          source.stop();
          source.disconnect();
        } catch (_) {}
      });
      this.activeSources = [];
      this.activeGains = [];
    }, fadeOutTime * 1000 + 60);
  }

  // --- 1. INTRO ATMOSPHERIC BACKGROUND SOUND (Plays during the intro before & into TA-DUM) ---
  playIntroAtmosphere() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const t = this.ctx.currentTime;
    const master = this.ctx.createGain();
    master.gain.setValueAtTime(0.001, t);
    master.gain.linearRampToValueAtTime(0.42, t + 0.5); // Smooth background swell
    master.gain.setValueAtTime(0.42, t + 1.25);
    // Dim down subtly as the massive TA-DUM strikes at 1.35s
    master.gain.exponentialRampToValueAtTime(0.001, t + 1.5);
    master.connect(this.ctx.destination);
    this.registerGain(master);

    // Deep sub-bass theater rumble (48Hz)
    const subOsc = this.ctx.createOscillator();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(48, t);
    subOsc.frequency.linearRampToValueAtTime(56, t + 1.3);

    const subGain = this.ctx.createGain();
    subGain.gain.setValueAtTime(0.7, t);
    subOsc.connect(subGain);
    subGain.connect(master);
    this.registerSource(subOsc);
    subOsc.start(t);
    subOsc.stop(t + 1.6);

    // Ominous low drone (detuned pair: 96Hz & 98.5Hz)
    const drone1 = this.ctx.createOscillator();
    const drone2 = this.ctx.createOscillator();
    drone1.type = 'sawtooth';
    drone2.type = 'triangle';
    drone1.frequency.setValueAtTime(96, t);
    drone2.frequency.setValueAtTime(98.5, t);

    // Filter sweep from dark room to tension
    const droneFilter = this.ctx.createBiquadFilter();
    droneFilter.type = 'lowpass';
    droneFilter.frequency.setValueAtTime(160, t);
    droneFilter.frequency.linearRampToValueAtTime(460, t + 1.3);
    droneFilter.Q.setValueAtTime(3.0, t);

    const droneGain = this.ctx.createGain();
    droneGain.gain.setValueAtTime(0.25, t);

    drone1.connect(droneFilter);
    drone2.connect(droneFilter);
    droneFilter.connect(droneGain);
    droneGain.connect(master);

    this.registerSource(drone1);
    this.registerSource(drone2);
    drone1.start(t);
    drone2.start(t);
    drone1.stop(t + 1.6);
    drone2.stop(t + 1.6);

    // High suspense riser shimmer
    const riserOsc = this.ctx.createOscillator();
    riserOsc.type = 'sine';
    riserOsc.frequency.setValueAtTime(220, t + 0.3);
    riserOsc.frequency.exponentialRampToValueAtTime(880, t + 1.35);

    const riserGain = this.ctx.createGain();
    riserGain.gain.setValueAtTime(0.001, t + 0.3);
    riserGain.gain.linearRampToValueAtTime(0.18, t + 1.25);
    riserGain.gain.exponentialRampToValueAtTime(0.001, t + 1.4);

    riserOsc.connect(riserGain);
    riserGain.connect(master);

    this.registerSource(riserOsc);
    riserOsc.start(t + 0.3);
    riserOsc.stop(t + 1.5);
  }

  // --- 2. THE ICONIC "TA-DUM" SEQUENCE ---
  createDrumHit(dest, startTime, startFreq, endFreq, duration, peakVol) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(startFreq, startTime);
    osc.frequency.exponentialRampToValueAtTime(Math.max(20, endFreq), startTime + duration);

    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.linearRampToValueAtTime(peakVol, startTime + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(gain);
    gain.connect(dest);

    this.registerSource(osc);
    osc.start(startTime);
    osc.stop(startTime + duration + 0.05);
  }

  createClickTransient(dest, startTime, peakVol) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(3200, startTime);
    osc.frequency.exponentialRampToValueAtTime(300, startTime + 0.04);

    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.linearRampToValueAtTime(peakVol, startTime + 0.003);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.04);

    osc.connect(gain);
    gain.connect(dest);

    this.registerSource(osc);
    osc.start(startTime);
    osc.stop(startTime + 0.05);
  }

  createImpactNoise(dest, startTime, duration, vol) {
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0.0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = data[i];
      data[i] *= 3.5;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(140, startTime);
    filter.frequency.exponentialRampToValueAtTime(45, startTime + duration);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.linearRampToValueAtTime(vol, startTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(dest);

    this.registerSource(noise);
    noise.start(startTime);
    noise.stop(startTime + duration + 0.05);
  }

  createCinematicSwell(dest, startTime, duration) {
    if (!this.ctx) return;
    const freqs = [36.71, 55.00, 73.42, 92.50, 110.00, 146.83];

    const masterSwellGain = this.ctx.createGain();
    masterSwellGain.gain.setValueAtTime(0.0001, startTime);
    masterSwellGain.gain.linearRampToValueAtTime(0.55, startTime + 0.18);
    // Rings out and fades before the intro finishes
    masterSwellGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(280, startTime);
    filter.frequency.linearRampToValueAtTime(1200, startTime + 0.8);
    filter.frequency.exponentialRampToValueAtTime(160, startTime + duration);
    filter.Q.setValueAtTime(2.5, startTime);

    masterSwellGain.connect(filter);
    filter.connect(dest);
    this.registerGain(masterSwellGain);

    freqs.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();

      osc.type = i % 2 === 0 ? 'sawtooth' : 'triangle';
      const detune = (i - 2) * 6;
      osc.frequency.setValueAtTime(freq, startTime);
      osc.detune.setValueAtTime(detune, startTime);

      const harmGain = 0.22 / Math.sqrt(i + 1);
      oscGain.gain.setValueAtTime(harmGain, startTime);

      osc.connect(oscGain);
      oscGain.connect(masterSwellGain);

      this.registerSource(osc);
      osc.start(startTime);
      osc.stop(startTime + duration + 0.1);
    });
  }

  playTaDum() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const t = this.ctx.currentTime + 0.05;
    const master = this.ctx.createGain();
    master.gain.setValueAtTime(0.85, t);
    master.connect(this.ctx.destination);
    this.registerGain(master);

    // === 1. "TA" ===
    this.createClickTransient(master, t, 0.4);
    this.createDrumHit(master, t, 160, 68, 0.22, 0.65);
    this.createImpactNoise(master, t, 0.18, 0.2);

    // === 2. "DUM" (Massive Sub Impact + Strings Swell) ===
    const tDum = t + 0.28;
    this.createClickTransient(master, tDum, 0.55);
    this.createDrumHit(master, tDum, 95, 34, 1.2, 0.95);
    this.createImpactNoise(master, tDum, 1.8, 0.6);
    this.createCinematicSwell(master, tDum, 2.8);
  }

  // --- 3. WARP SPEED WHOOSH ---
  playWarpRush() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const t = this.ctx.currentTime;
    const duration = 1.9;

    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(150, t);
    filter.frequency.exponentialRampToValueAtTime(3600, t + 1.1);
    filter.frequency.exponentialRampToValueAtTime(350, t + duration);
    filter.Q.setValueAtTime(3.0, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.32, t + 0.8);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    this.registerGain(gain);
    this.registerSource(noise);

    noise.start(t);
    noise.stop(t + duration);
  }
}

export const netflixAudio = new NetflixAudioEngine();
