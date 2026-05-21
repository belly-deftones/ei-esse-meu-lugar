// Sintetizador de efeitos sonoros Cozy via Web Audio API
// Garante efeitos de som suaves (senóides/triângulos com envelopes ADSR limpos)
// Evita dependências de rede e torna o jogo 100% autônomo.
// VERSÃO 2: Suporte a controle de volume via GainNode Master.

class SoundController {
  constructor() {
    this.ctx = null;
    this.sfxGain = null;       // Nó mestre de volume para SFX
    this.musicGain = null;      // Nó mestre de volume para Música (preparado para futuro)
    this.sfxVolume = 0.8;       // 0.0 a 1.0
    this.musicVolume = 0.5;
    this.enabled = true;
  }

  init() {
    if (this.ctx) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();

      // Criar nós mestres de ganho
      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(this.sfxVolume, this.ctx.currentTime);
      this.sfxGain.connect(this.ctx.destination);

      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.setValueAtTime(this.musicVolume, this.ctx.currentTime);
      this.musicGain.connect(this.ctx.destination);

    } catch (e) {
      console.warn("Web Audio API não é suportada neste navegador.", e);
    }
  }

  resume() {
    this.init();
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  // Define o volume dos efeitos sonoros (0 a 100 -> mapeado para 0.0 a 1.0)
  setSfxVolume(value) {
    this.sfxVolume = value / 100;
    if (this.sfxGain) {
      this.sfxGain.gain.setValueAtTime(this.sfxVolume, this.ctx.currentTime);
    }
  }

  // Define o volume da música de fundo (0 a 100 -> mapeado para 0.0 a 1.0)
  setMusicVolume(value) {
    this.musicVolume = value / 100;
    if (this.musicGain) {
      this.musicGain.gain.setValueAtTime(this.musicVolume, this.ctx.currentTime);
    }
  }

  // Retorna o destino final correto para sons (respeita enabled)
  get sfxDestination() {
    if (!this.enabled || !this.sfxGain) return null;
    return this.sfxGain;
  }

  toggleSound() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  // Som suave de clique (seleção de personagem)
  playClick() {
    this.resume();
    const dest = this.sfxDestination;
    if (!dest) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(600, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(dest);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);
  }

  // Som de "pop" aconchegante ao soltar um personagem na cadeira
  playPop() {
    this.resume();
    const dest = this.sfxDestination;
    if (!dest) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(200, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(450, this.ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(dest);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.09);
  }

  // Som suave de descontentamento (quando uma regra é violada)
  playError() {
    this.resume();
    const dest = this.sfxDestination;
    if (!dest) return;

    const now = this.ctx.currentTime;

    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(220, now);
    gain1.gain.setValueAtTime(0.15, now);
    gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
    osc1.connect(gain1);
    gain1.connect(dest);
    osc1.start();
    osc1.stop(now + 0.15);

    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(180, now + 0.1);
    gain2.gain.setValueAtTime(0.15, now + 0.1);
    gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
    osc2.connect(gain2);
    gain2.connect(dest);
    osc2.start();
    osc2.stop(now + 0.25);
  }

  // Som especial de perder uma vida (descida dramática)
  playLifeLost() {
    this.resume();
    const dest = this.sfxDestination;
    if (!dest) return;

    const now = this.ctx.currentTime;
    const notes = [440, 330, 220, 165];

    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, now + i * 0.12);
      gain.gain.setValueAtTime(0.18, now + i * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.12 + 0.15);
      osc.connect(gain);
      gain.connect(dest);
      osc.start(now + i * 0.12);
      osc.stop(now + i * 0.12 + 0.2);
    });
  }

  // Som de personagem Ilustre colocado corretamente (fanfarra dourada)
  playIllustrious() {
    this.resume();
    const dest = this.sfxDestination;
    if (!dest) return;

    const now = this.ctx.currentTime;
    // Fanfarra: C5, E5, G5, C6 em rápida sequência, depois acorde final
    const fanfare = [523.25, 659.25, 783.99, 1046.5];
    fanfare.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(freq, now + i * 0.1);
      gain.gain.setValueAtTime(0.0, now + i * 0.1);
      gain.gain.linearRampToValueAtTime(0.12, now + i * 0.1 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.1 + 0.3);
      osc.connect(gain);
      gain.connect(dest);
      osc.start(now + i * 0.1);
      osc.stop(now + i * 0.1 + 0.3);
    });
  }

  // Arpejo de vitória (Cmaj7 ascendente)
  playSuccess() {
    this.resume();
    const dest = this.sfxDestination;
    if (!dest) return;

    const now = this.ctx.currentTime;
    const notes = [261.63, 329.63, 392.00, 493.88, 523.25, 659.25];

    notes.forEach((freq, idx) => {
      const delay = idx * 0.08;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + delay);

      gain.gain.setValueAtTime(0.0, now + delay);
      gain.gain.linearRampToValueAtTime(0.15, now + delay + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.01, now + delay + 0.6);

      osc.connect(gain);
      gain.connect(dest);

      osc.start(now + delay);
      osc.stop(now + delay + 0.6);
    });
  }

  // Jingle de Game Over (descida triste)
  playGameOver() {
    this.resume();
    const dest = this.sfxDestination;
    if (!dest) return;

    const now = this.ctx.currentTime;
    const notes = [392.00, 349.23, 311.13, 261.63];

    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + i * 0.18);
      gain.gain.setValueAtTime(0.2, now + i * 0.18);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.18 + 0.4);
      osc.connect(gain);
      gain.connect(dest);
      osc.start(now + i * 0.18);
      osc.stop(now + i * 0.18 + 0.5);
    });
  }
}

// Expõe como uma instância única na janela global
window.sounds = new SoundController();
