// Sintetizador de efeitos sonoros Cozy via Web Audio API
// Garante efeitos de som suaves (senóides/triângulos com envelopes ADSR limpos)
// Evita dependências de rede e torna o jogo 100% autônomo.

class SoundController {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (this.ctx) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
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

  toggleSound() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  // Som suave de clique (seleção de personagem)
  playClick() {
    if (!this.enabled) return;
    this.resume();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(600, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);
  }

  // Som de "pop" aconchegante ao soltar um personagem na cadeira
  playPop() {
    if (!this.enabled) return;
    this.resume();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(200, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(450, this.ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.09);
  }

  // Som suave de descontentamento (quando uma regra é violada)
  playError() {
    if (!this.enabled) return;
    this.resume();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    
    // Primeiro tom
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(220, now);
    gain1.gain.setValueAtTime(0.15, now);
    gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
    osc1.connect(gain1);
    gain1.connect(this.ctx.destination);
    osc1.start();
    osc1.stop(now + 0.15);

    // Segundo tom ligeiramente desafinado (efeito fofo de 'oh oh')
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(180, now + 0.1);
    gain2.gain.setValueAtTime(0.15, now + 0.1);
    gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
    osc2.connect(gain2);
    gain2.connect(this.ctx.destination);
    osc2.start();
    osc2.stop(now + 0.25);
  }

  // Lindo arpejo ascendente de harpa/sino em Dó Maior com Sétima Maior (Cmaj7)
  playSuccess() {
    if (!this.enabled) return;
    this.resume();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Frequências correspondentes a C4, E4, G4, B4, C5, E5
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
      gain.connect(this.ctx.destination);
      
      osc.start(now + delay);
      osc.stop(now + delay + 0.6);
    });
  }
}

// Expõe como uma instância única na janela global
window.sounds = new SoundController();
