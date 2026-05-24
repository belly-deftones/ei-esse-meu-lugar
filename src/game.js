// Gerenciador Principal do Jogo "Ei! Esse é meu lugar" — VERSÃO 2
// Inclui: Tela Inicial, Configurações, Sistema de Vidas, Pontuação,
// Loteria de Personagem Ilustre, Game Over, Fedidos e persistência localStorage.

class Game {
  constructor() {
    // --- Estado do Jogo ---
    this.currentLevelIndex = 0;
    this.placedMap = {};         // { [characterId]: seatObject | null }
    this.selectedCharId = null;  // para interação Click-to-Move no mobile
    this.isDragging = false;
    this.draggedEl = null;
    this.dragStartPos = { x: 0, y: 0 };
    this.draggedCharId = null;
    this.lastValidation = null;
    this.prevSatisfactionMap = {}; // snapshot dos estados ANTES do move

    // --- Sistema de Pontos e Vidas ---
    this.score = 0;
    this.lives = 3;
    this.gameOver = false;
    this.lastScore = parseInt(localStorage.getItem("eiEsseMeuLugar_lastScore") || "0", 10);

    // --- Personagem Ilustre ---
    this.illustriousCharId = null; // id do personagem ilustre nesta fase

    // --- Confetes ---
    this.confettiCanvas = null;
    this.confettiCtx = null;
    this.confettiParticles = [];
    this.confettiAnimationId = null;

    this.init();
  }

  // =========================================================
  //  INICIALIZAÇÃO
  // =========================================================
  init() {
    // Canvas de confetes
    this.confettiCanvas = document.getElementById("confetti-canvas");
    this.confettiCtx = this.confettiCanvas?.getContext("2d");
    window.addEventListener("resize", () => this.resizeConfettiCanvas());
    this.resizeConfettiCanvas();

    // --- Tela de Menu ---
    this._updateHighScoreDisplay();
    document.getElementById("btn-play").addEventListener("click", () => this.startGame());
    document.getElementById("btn-settings-menu").addEventListener("click", () => this.openSettings());

    // --- HUD In-Game ---
    document.getElementById("btn-next-level").addEventListener("click", () => this.nextLevel());
    document.getElementById("btn-restart").addEventListener("click", () => this.restartLevel());
    document.getElementById("btn-back").addEventListener("click", () => this.goToMenu());
    document.getElementById("btn-open-settings").addEventListener("click", () => this.openSettings());

    // --- Configurações ---
    document.getElementById("btn-close-settings").addEventListener("click", () => this.closeSettings());

    const sliderSound = document.getElementById("slider-sound");
    const labelSound  = document.getElementById("label-sound");
    sliderSound.addEventListener("input", () => {
      labelSound.innerText = sliderSound.value + "%";
      window.sounds.setSfxVolume(parseInt(sliderSound.value, 10));
    });

    const sliderMusic = document.getElementById("slider-music");
    const labelMusic  = document.getElementById("label-music");
    sliderMusic.addEventListener("input", () => {
      labelMusic.innerText = sliderMusic.value + "%";
      window.sounds.setMusicVolume(parseInt(sliderMusic.value, 10));
    });

    // --- Game Over ---
    document.getElementById("btn-retry").addEventListener("click", () => this.retryGame());

    // Mostrar tela de menu inicial
    this.showScreen("menu");
  }

  // =========================================================
  //  GERENCIAMENTO DE TELAS
  // =========================================================
  showScreen(screen) {
    // Esconde tudo de estado ativo
    document.getElementById("menu-screen").style.display     = "none";
    document.getElementById("settings-modal").style.display = "none";
    document.getElementById("gameover-modal").style.display = "none";
    document.getElementById("win-modal").style.display      = "none";
    document.getElementById("board-wrapper").style.display  = "flex";
    document.getElementById("reserves-section").style.display = "flex";
    document.getElementById("profile-card").style.display   = "flex";
    document.querySelector("header").style.display           = "flex";

    if (screen === "menu") {
      document.getElementById("menu-screen").style.display = "flex";
      // Ocultar HUD do jogo durante o menu
      document.getElementById("board-wrapper").style.display = "none";
      document.getElementById("reserves-section").style.display = "none";
      document.getElementById("profile-card").style.display = "none";
      document.querySelector("header").style.display = "none";
    }
    // Outros estados (game, settings, gameover) controlados por overlays
  }

  openSettings() {
    window.sounds.resume();
    document.getElementById("settings-modal").style.display = "flex";
  }

  closeSettings() {
    document.getElementById("settings-modal").style.display = "none";
  }

  goToMenu() {
    this._saveHighScore();
    this._updateHighScoreDisplay();
    this.showScreen("menu");
    this.stopConfetti();
  }

  startGame() {
    this.score = 0;
    this.lives = 3;
    this.gameOver = false;
    this.currentLevelIndex = 0;
    this.showScreen("game");
    this._renderHUD();
    this.loadLevel(0);
  }

  retryGame() {
    this._saveHighScore();
    document.getElementById("gameover-modal").style.display = "none";
    this.startGame();
  }

  triggerGameOver() {
    this.gameOver = true;
    this._saveHighScore();
    window.sounds.playGameOver();
    this.stopConfetti();

    const scoreBox = document.getElementById("gameover-score");
    scoreBox.innerText = `Pontos acumulados nesta rodada: ${this.score}`;
    document.getElementById("gameover-modal").style.display = "flex";
  }

  // =========================================================
  //  HUD
  // =========================================================
  _renderHUD() {
    document.getElementById("hud-score").innerHTML = `✨ Pontos: ${this.score}`;
    this._renderHearts();
  }

  _renderHearts() {
    const container = document.getElementById("lives-hearts");
    container.innerHTML = "";
    for (let i = 0; i < 3; i++) {
      const heart = document.createElement("span");
      heart.className = "heart";
      if (i < this.lives) {
        heart.classList.add("heart-full");
        heart.innerHTML = "❤️";
      } else {
        heart.classList.add("heart-empty");
        heart.innerHTML = "🖤";
      }
      container.appendChild(heart);
    }
  }

  _animateLostHeart() {
    const container = document.getElementById("lives-hearts");
    const hearts = container.querySelectorAll(".heart-full");
    // Encontra o último coração cheio
    if (hearts.length > 0) {
      const lastHeart = hearts[hearts.length - 1];
      lastHeart.classList.remove("heart-full");
      lastHeart.classList.add("heart-empty");
      lastHeart.classList.add("heart-lost");
      lastHeart.innerHTML = "🖤";
      setTimeout(() => this._renderHearts(), 500);
    } else {
      this._renderHearts();
    }
  }

  _updateHighScoreDisplay() {
    const hs = parseInt(localStorage.getItem("eiEsseMeuLugar_lastScore") || "0", 10);
    this.lastScore = hs;
    const el = document.getElementById("menu-highscore");
    if (hs > 0) {
      el.innerHTML = `⭐ Última Pontuação: <strong>${hs}</strong> pontos`;
    } else {
      el.innerHTML = `Ainda sem pontuação salva... Vamos jogar! 🎮`;
    }
  }

  _saveHighScore() {
    this.lastScore = this.score;
    localStorage.setItem("eiEsseMeuLugar_lastScore", String(this.score));
  }

  // =========================================================
  //  PONTUAÇÃO E VIDAS
  // =========================================================
  // Tira snapshot dos estados de satisfação ANTES de um move
  _snapshotSatisfaction() {
    const snap = {};
    if (!this.lastValidation) return snap;
    const level = this.getCurrentLevel();
    level.personagens.forEach(char => {
      const state = this.lastValidation.characterStates[char.id];
      snap[char.id] = state ? state.allSatisfied : false;
    });
    return snap;
  }

  // Calcula pontos com base na diferença antes/depois de um posicionamento
  _applyScoreDelta(prevSnap) {
    if (!this.lastValidation) return;
    const level = this.getCurrentLevel();
    let pointsDelta = 0;
    let shouldPlayError = false;

    level.personagens.forEach(char => {
      const wasOk = prevSnap[char.id] === true;
      const isOk  = this.lastValidation.characterStates[char.id]?.allSatisfied === true;

      const baseGain  = (char.id === this.illustriousCharId) ? 1000 : 100;
      const baseLoss  = (char.id === this.illustriousCharId) ? 500  : 50;

      if (!wasOk && isOk) {
        // Passou de insatisfeito → satisfeito: ganha pontos!
        pointsDelta += baseGain;
        if (char.id === this.illustriousCharId) {
          window.sounds.playIllustrious();
        }
      } else if (wasOk && !isOk) {
        // Passou de satisfeito → insatisfeito: perde pontos!
        pointsDelta -= baseLoss;
        shouldPlayError = true;
      }
    });

    if (pointsDelta !== 0) {
      this._adjustScore(pointsDelta, shouldPlayError);
    }
  }

  _adjustScore(delta, playError = false) {
    if (delta < 0) {
      const penalty = Math.abs(delta);
      if (this.score === 0) {
        // Sem pontos → perde uma vida
        this._loseLife();
      } else if (this.score - penalty < 0) {
        // Não fica negativo: zera o score e a diferença vira perda de vida
        this.score = 0;
        this._loseLife();
      } else {
        this.score -= penalty;
      }
      if (playError) window.sounds.playError();
    } else {
      this.score += delta;
    }

    document.getElementById("hud-score").innerHTML = `✨ Pontos: ${this.score}`;
  }

  _loseLife() {
    if (this.lives <= 0) return;
    this.lives--;
    window.sounds.playLifeLost();
    this._animateLostHeart();

    if (this.lives <= 0) {
      setTimeout(() => this.triggerGameOver(), 700);
    }
  }

  // =========================================================
  //  FASES
  // =========================================================
  resizeConfettiCanvas() {
    if (this.confettiCanvas) {
      this.confettiCanvas.width  = this.confettiCanvas.parentElement.clientWidth;
      this.confettiCanvas.height = this.confettiCanvas.parentElement.clientHeight;
    }
  }

  getCurrentLevel() {
    return window.LEVELS[this.currentLevelIndex];
  }

  // Loteria do Personagem Ilustre (30% de chance em fases >= 10)
  _rollIllustrious(level) {
    this.illustriousCharId = null;
    if (level.id < 10) return;
    if (Math.random() < 0.3) {
      const candidates = level.personagens;
      const chosen = candidates[Math.floor(Math.random() * candidates.length)];
      this.illustriousCharId = chosen.id;
    }
  }

  loadLevel(index) {
    if (this.gameOver) return;

    this.currentLevelIndex = index;
    const level = this.getCurrentLevel();
    this.placedMap = {};
    this.selectedCharId = null;
    this.prevSatisfactionMap = {};
    this.lastValidation = null;

    // Loteria do Ilustre
    this._rollIllustrious(level);

    // Resetar HUD e modais
    document.getElementById("level-title").innerText = level.titulo;
    document.getElementById("level-desc").innerText  = level.descricao;
    document.getElementById("win-modal").style.display = "none";
    this.stopConfetti();

    // Configurar o grid do tabuleiro
    const board = document.getElementById("game-board");
    board.className = `board scenario-${level.cenario}`;
    board.innerHTML = "";

    board.style.gridTemplateRows    = `repeat(${level.grid.rows}, 80px)`;
    board.style.gridTemplateColumns = `repeat(${level.grid.cols}, 80px)`;

    // Ajustes especiais de grid por cenário
    if (level.cenario === "cinema" && level.grid.rows === 3) {
      board.style.gridTemplateColumns = `repeat(${level.grid.cols}, 80px)`;
    }

    // Elementos decorativos da doceria
    if (level.cenario === "doceria" && level.elementos) {
      level.elementos.forEach(el => {
        const foodEl = document.createElement("div");
        foodEl.className = "doceria-food";
        foodEl.innerText = el.type === "donut" ? "🍩" : "🍦";
        const colOffset = el.col * 100;
        foodEl.style.left = `calc(${colOffset}px - 21px)`;
        foodEl.style.top  = "38px";
        board.appendChild(foodEl);
      });
    }

    // Obstáculos (parque)
    if (level.obstaculos) {
      level.obstaculos.forEach(obs => {
        const obsEl = document.createElement("div");
        obsEl.className = "grid-obstacle";
        obsEl.style.gridRowStart    = obs.row + 1;
        obsEl.style.gridColumnStart = obs.col + 1;
        obsEl.innerHTML = `<span class="sprite">${obs.sprite}</span><span class="label">${obs.label}</span>`;
        board.appendChild(obsEl);
      });
    }

    // Assentos
    level.assentos.forEach(seat => {
      const seatEl = document.createElement("div");
      seatEl.className = `seat empty ${seat.classe}`;
      seatEl.id = `seat-${seat.id}`;
      seatEl.dataset.seatId = seat.id;
      seatEl.style.gridRowStart    = seat.row + 1;
      seatEl.style.gridColumnStart = seat.col + 1;
      seatEl.title = seat.label;
      seatEl.addEventListener("click", () => this.handleSeatClick(seat));
      board.appendChild(seatEl);
    });

    // Banco de reservas
    const reservesBank = document.getElementById("reserves-bank");
    reservesBank.innerHTML = "";
    level.personagens.forEach(char => {
      const charEl = this.createCharacterDOM(char, "neutral");
      reservesBank.appendChild(charEl);
    });

    // Perfil inicial
    this.showProfile(level.personagens[0]);
    this.updateLogic();
    this._renderHUD();
  }

  // =========================================================
  //  CRIAÇÃO DE PERSONAGENS (DOM + SVG)
  // =========================================================
  createCharacterDOM(char, mood) {
    const charEl = document.createElement("div");
    charEl.className = "character";
    charEl.id = `char-${char.id}`;
    charEl.dataset.charId = char.id;

    // Efeitos especiais
    if (char.fedido) charEl.classList.add("smelly-effect");
    if (char.id === this.illustriousCharId) charEl.classList.add("illustrious-effect");

    charEl.innerHTML = this.getCharacterSVG(char.avatar, mood, char.fedido);

    charEl.addEventListener("pointerdown", (e) => this.handlePointerDown(e, charEl, char.id));
    charEl.addEventListener("click", (e) => {
      e.stopPropagation();
      const level = this.getCurrentLevel();
      const fullChar = level.personagens.find(c => c.id === char.id);
      this.showProfile(fullChar || char);
      this.handleCharacterSelect(char.id);
    });

    return charEl;
  }

  // SVG Kawaii dos personagens com variações de humor
  getCharacterSVG(avatar, mood, isFedido = false) {
    if (["gatinho_branco", "gatinho_cinza", "personagem_moranguinho"].includes(avatar)) {
      let state = "neutro";
      if (isFedido && avatar.startsWith("gatinho")) state = "fedido";
      else if (mood === "happy") state = avatar === "personagem_moranguinho" ? "feliz" : "neutro";
      else if (mood === "sad") state = "triste";
      
      return `<img src="assets/images/${avatar}_${state}.png" alt="${avatar}" style="width:100%;height:100%;object-fit:contain;pointer-events:none;">`;
    }

    let bodyColor  = "#fcd34d";
    let blushColor = "#fca5a5";
    let eyeColor   = "#3a3b3c";
    let detailSVG  = "";

    if (avatar === "gloop") {
      bodyColor = "#fef08a";
      detailSVG = `<rect x="15" y="22" width="70" height="12" rx="4" fill="#ef4444" stroke="#3a3b3c" stroke-width="3" />
                   <rect x="35" y="22" width="30" height="12" fill="#fff" />`;
    } else if (avatar === "fuzz") {
      bodyColor = "#fbcfe8";
      detailSVG = `
        <circle cx="25" cy="25" r="14" fill="#fbcfe8" />
        <circle cx="50" cy="20" r="16" fill="#fbcfe8" />
        <circle cx="75" cy="25" r="14" fill="#fbcfe8" />
        <circle cx="15" cy="45" r="10" fill="#fbcfe8" />
        <circle cx="85" cy="45" r="10" fill="#fbcfe8" />
      `;
    } else if (avatar === "pipoca") {
      bodyColor = "#fed7aa";
      detailSVG = `
        <ellipse cx="18" cy="35" rx="8" ry="16" fill="#78350f" transform="rotate(-15, 18, 35)" />
        <ellipse cx="82" cy="35" rx="8" ry="16" fill="#78350f" transform="rotate(15, 82, 35)" />
        <ellipse cx="28" cy="45" rx="10" ry="12" fill="#78350f" opacity="0.3" />
      `;
    } else if (avatar === "bebeto") {
      bodyColor = "#bfdbfe";
      detailSVG = `
        <circle cx="22" cy="25" r="10" fill="#bfdbfe" stroke="#3a3b3c" stroke-width="3" />
        <circle cx="78" cy="25" r="10" fill="#bfdbfe" stroke="#3a3b3c" stroke-width="3" />
        <path d="M 30 24 L 60 10 L 75 22 Z" fill="#3b82f6" stroke="#3a3b3c" stroke-width="3" />
        <circle cx="75" cy="22" r="5" fill="#fff" />
      `;
    } else if (avatar === "zizi") {
      bodyColor = "#a7f3d0";
      detailSVG = `
        <circle cx="32" cy="45" r="15" fill="none" stroke="#1e293b" stroke-width="4" />
        <circle cx="68" cy="45" r="15" fill="none" stroke="#1e293b" stroke-width="4" />
        <line x1="47" y1="45" x2="53" y2="45" stroke="#1e293b" stroke-width="4" />
        <path d="M 20 20 Q 50 12 80 20" stroke="#3a3b3c" stroke-width="4" fill="none" />
      `;
    } else if (avatar === "munch") {
      bodyColor = "#ddd6fe";
      detailSVG = `
        <path d="M 35 15 L 40 5 Q 50 2 60 5 L 65 15 Z" fill="#fff" stroke="#3a3b3c" stroke-width="3" />
        <circle cx="18" cy="60" r="12" fill="#ddd6fe" />
        <circle cx="82" cy="60" r="12" fill="#ddd6fe" />
      `;
    } else if (avatar === "flora") {
      bodyColor = "#ffffff";
      detailSVG = `
        <ellipse cx="30" cy="18" rx="8" ry="18" fill="#fff" stroke="#3a3b3c" stroke-width="3" transform="rotate(-10, 30, 18)" />
        <ellipse cx="70" cy="18" rx="8" ry="18" fill="#fff" stroke="#3a3b3c" stroke-width="3" transform="rotate(10, 70, 18)" />
        <ellipse cx="30" cy="18" rx="4" ry="12" fill="#fbcfe8" transform="rotate(-10, 30, 18)" />
        <ellipse cx="70" cy="18" rx="4" ry="12" fill="#fbcfe8" transform="rotate(10, 70, 18)" />
        <circle cx="78" cy="30" r="6" fill="#f472b6" />
        <circle cx="78" cy="30" r="2" fill="#fef08a" />
      `;
    }

    // Expressões dinâmicas
    let eyesSVG = `<g class="eyes">
      <ellipse class="eye" cx="30" cy="45" rx="4" ry="6" fill="${eyeColor}" />
      <ellipse class="eye" cx="70" cy="45" rx="4" ry="6" fill="${eyeColor}" />
    </g>`;
    let mouthSVG = `<path d="M 45 55 Q 50 60 55 55" stroke="${eyeColor}" stroke-width="4" stroke-linecap="round" fill="none" />`;

    if (mood === "happy") {
      eyesSVG = `<g class="eyes happy">
        <path d="M 24 46 Q 30 38 36 46" stroke="${eyeColor}" stroke-width="5" stroke-linecap="round" fill="none" />
        <path d="M 64 46 Q 70 38 76 46" stroke="${eyeColor}" stroke-width="5" stroke-linecap="round" fill="none" />
      </g>`;
      mouthSVG = `<path d="M 42 54 Q 50 64 58 54" stroke="${eyeColor}" stroke-width="4" stroke-linecap="round" fill="#f43f5e" />`;
    } else if (mood === "sad") {
      eyesSVG = `<g class="eyes sad">
        <path d="M 24 42 L 34 48" stroke="${eyeColor}" stroke-width="5" stroke-linecap="round" />
        <path d="M 34 42 L 24 48" stroke="${eyeColor}" stroke-width="5" stroke-linecap="round" />
        <path d="M 66 42 L 76 48" stroke="${eyeColor}" stroke-width="5" stroke-linecap="round" />
        <path d="M 76 42 L 66 48" stroke="${eyeColor}" stroke-width="5" stroke-linecap="round" />
        <path d="M 32 50 C 32 54 28 58 28 58 C 28 58 24 54 24 50 Z" fill="#60a5fa" />
      </g>`;
      mouthSVG = `<path d="M 44 58 Q 50 50 56 58" stroke="${eyeColor}" stroke-width="4" stroke-linecap="round" fill="none" />`;
    }

    return `
      <svg class="avatar-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        ${detailSVG}
        <path d="M 15 50 C 15 25 85 25 85 50 C 85 75 75 88 50 88 C 25 88 15 75 15 50 Z" fill="${bodyColor}" stroke="#3a3b3c" stroke-width="4.5" />
        <circle class="blush" cx="24" cy="56" r="6" fill="${blushColor}" opacity="0.7" />
        <circle class="blush" cx="76" cy="56" r="6" fill="${blushColor}" opacity="0.7" />
        ${eyesSVG}
        ${mouthSVG}
      </svg>
    `;
  }

  // =========================================================
  //  PERFIL DO PERSONAGEM
  // =========================================================
  showProfile(char) {
    if (!char) return;
    const avatarContainer = document.getElementById("profile-avatar-container");
    const charState  = this.placedMap[char.id] ? "placed" : "neutral";
    const currentMood = (charState === "placed")
      ? (this.lastValidation?.characterStates[char.id]?.mood || "happy")
      : "neutral";

    avatarContainer.innerHTML = this.getCharacterSVG(char.avatar, currentMood, char.fedido);

    // Nome com tags especiais
    let displayName = char.nome;
    if (char.fedido) displayName += " fedido";
    if (char.id === this.illustriousCharId) displayName = `${displayName} ⭐ ilustre`;
    document.getElementById("profile-name").innerText = displayName;
    document.getElementById("profile-badge-category").innerText = char.categoria;
    document.getElementById("profile-badge-gender").innerText   = char.genero;

    const rulesUl = document.getElementById("profile-rules");
    rulesUl.innerHTML = "";
    char.regras.forEach((regra, idx) => {
      const li = document.createElement("li");
      let satisfied = false;
      if (this.lastValidation?.characterStates[char.id]) {
        const state = this.lastValidation.characterStates[char.id];
        if (state.placed) satisfied = state.rules[idx]?.satisfied;
      }
      li.className = this.placedMap[char.id] ? (satisfied ? "satisfied" : "violated") : "";

      const checkbox  = document.createElement("div");
      checkbox.className = "checkbox-cozy";
      checkbox.innerText = this.placedMap[char.id] ? (satisfied ? "✔" : "✖") : "";

      const textNode  = document.createElement("span");
      textNode.innerText = regra.texto;

      li.appendChild(checkbox);
      li.appendChild(textNode);
      rulesUl.appendChild(li);
    });
  }

  // =========================================================
  //  DRAG & DROP — POINTER EVENTS
  // =========================================================
  handlePointerDown(e, el, charId) {
    if (this.isDragging || this.gameOver) return;
    e.preventDefault();
    window.sounds.resume();

    this.isDragging    = true;
    this.draggedEl     = el;
    this.draggedCharId = charId;
    this.dragStartPos  = { x: e.clientX, y: e.clientY };

    el.classList.add("dragging");
    el.setPointerCapture(e.pointerId);
    window.sounds.playClick();

    const onPointerMove = (ev) => this.handlePointerMove(ev);
    const onPointerUp   = (ev) => {
      this.handlePointerUp(ev);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup",   onPointerUp);
    };

    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup",   onPointerUp);
  }

  handlePointerMove(e) {
    if (!this.isDragging || !this.draggedEl) return;
    const dx = e.clientX - this.dragStartPos.x;
    const dy = e.clientY - this.dragStartPos.y;
    this.draggedEl.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(1.15) rotate(4deg)`;
  }

  handlePointerUp(e) {
    if (!this.isDragging || !this.draggedEl) return;

    this.isDragging = false;
    const el     = this.draggedEl;
    const charId = this.draggedCharId;

    el.classList.remove("dragging");
    el.style.transform = "";
    el.releasePointerCapture(e.pointerId);

    el.style.visibility = "hidden";
    const elemBelow = document.elementFromPoint(e.clientX, e.clientY);
    el.style.visibility = "visible";

    const seatEl = elemBelow?.closest(".seat");
    if (seatEl) {
      const seatId = seatEl.dataset.seatId;
      const level  = this.getCurrentLevel();
      const seat   = level.assentos.find(s => s.id === seatId);
      this.placeCharacter(charId, seat);
    } else {
      this.returnToReserves(charId);
    }

    this.draggedEl     = null;
    this.draggedCharId = null;
  }

  // =========================================================
  //  CLICK-TO-MOVE (Mobile)
  // =========================================================
  handleCharacterSelect(charId) {
    if (this.gameOver) return;
    if (this.selectedCharId) {
      const prevEl = document.getElementById(`char-${this.selectedCharId}`);
      if (prevEl) prevEl.classList.remove("selected");
    }
    if (this.selectedCharId === charId) {
      this.selectedCharId = null;
      return;
    }
    this.selectedCharId = charId;
    const el = document.getElementById(`char-${charId}`);
    if (el) el.classList.add("selected");
    window.sounds.playClick();
  }

  handleSeatClick(seat) {
    if (!this.selectedCharId || this.gameOver) return;
    const charId = this.selectedCharId;
    const el = document.getElementById(`char-${charId}`);
    if (el) el.classList.remove("selected");
    this.selectedCharId = null;
    this.placeCharacter(charId, seat);
  }

  // =========================================================
  //  POSICIONAMENTO
  // =========================================================
  placeCharacter(charId, targetSeat) {
    if (this.gameOver) return;
    const level   = this.getCurrentLevel();
    const oldSeat = this.placedMap[charId];

    // Snapshot ANTES do movimento para calcular delta de pontos
    const prevSnap = this._snapshotSatisfaction();

    // Verificar se já existe alguém no assento alvo
    let occupantId = null;
    for (const [id, s] of Object.entries(this.placedMap)) {
      if (s && s.id === targetSeat.id) {
        occupantId = id;
        break;
      }
    }

    if (occupantId) {
      if (oldSeat) {
        // Troca de lugar entre dois personagens
        this.placedMap[occupantId] = oldSeat;
        const occupantEl  = document.getElementById(`char-${occupantId}`);
        const oldSeatEl   = document.getElementById(`seat-${oldSeat.id}`);
        oldSeatEl.appendChild(occupantEl);
        oldSeatEl.classList.remove("empty");
      } else {
        // Personagem das reservas entra, antigo vai para reservas
        this.placedMap[occupantId] = null;
        const occupantEl = document.getElementById(`char-${occupantId}`);
        document.getElementById("reserves-bank").appendChild(occupantEl);
      }
    }

    // Colocar o personagem no assento alvo
    this.placedMap[charId] = targetSeat;
    const charEl  = document.getElementById(`char-${charId}`);
    const seatEl  = document.getElementById(`seat-${targetSeat.id}`);
    seatEl.appendChild(charEl);
    seatEl.classList.remove("empty");

    if (oldSeat && !occupantId) {
      document.getElementById(`seat-${oldSeat.id}`).classList.add("empty");
    }

    window.sounds.playPop();
    this.updateLogic();

    // Calcular e aplicar pontos
    this._applyScoreDelta(prevSnap);

    // Atualizar ficha do personagem
    const char = level.personagens.find(c => c.id === charId);
    if (char) this.showProfile(char);
  }

  returnToReserves(charId) {
    if (this.gameOver) return;
    const oldSeat = this.placedMap[charId];
    if (!oldSeat) return;

    const prevSnap = this._snapshotSatisfaction();

    this.placedMap[charId] = null;
    const charEl = document.getElementById(`char-${charId}`);
    document.getElementById("reserves-bank").appendChild(charEl);
    document.getElementById(`seat-${oldSeat.id}`).classList.add("empty");

    window.sounds.playPop();
    this.updateLogic();
    this._applyScoreDelta(prevSnap);

    const level = this.getCurrentLevel();
    const char  = level.personagens.find(c => c.id === charId);
    if (char) this.showProfile(char);
  }

  // =========================================================
  //  MOTOR DE REGRAS
  // =========================================================
  updateLogic() {
    const level = this.getCurrentLevel();
    const validation = window.LogicEngine.validate(level, this.placedMap);
    this.lastValidation = validation;

    // Atualizar SVG de todos os avatares no tabuleiro
    level.personagens.forEach(char => {
      const charEl = document.getElementById(`char-${char.id}`);
      if (!charEl) return;
      const mood = validation.characterStates[char.id]?.mood || "neutral";
      charEl.innerHTML = this.getCharacterSVG(char.avatar, mood, char.fedido);
    });

    // Atualizar ficha do personagem ativo
    const activeProfileName = document.getElementById("profile-name").innerText;
    const activeChar = level.personagens.find(c => {
      let name = c.nome;
      if (c.fedido) name += " fedido";
      if (c.id === this.illustriousCharId) name = `${name} ⭐ ilustre`;
      return name === activeProfileName || c.nome === activeProfileName;
    });
    if (activeChar) this.showProfile(activeChar);

    // Verificar vitória
    if (validation.levelCompleted) {
      setTimeout(() => this.triggerWin(), 600);
    }
  }

  // =========================================================
  //  VITÓRIA E NAVEGAÇÃO
  // =========================================================
  triggerWin() {
    if (this.gameOver) return;
    window.sounds.playSuccess();

    const modal   = document.getElementById("win-modal");
    const btnNext = document.getElementById("btn-next-level");

    if (this.currentLevelIndex === window.LEVELS.length - 1) {
      btnNext.innerText = "✨ Zerar Jogo! ✨";
    } else {
      btnNext.innerText = "Próxima Fase ➔";
    }
    modal.style.display = "flex";
    this._saveHighScore();
    this.startConfetti();
  }

  nextLevel() {
    if (this.currentLevelIndex < window.LEVELS.length - 1) {
      this.loadLevel(this.currentLevelIndex + 1);
    } else {
      // Zerou o jogo!
      this._saveHighScore();
      this._updateHighScoreDisplay();
      this.goToMenu();
    }
  }

  restartLevel() {
    if (this.gameOver) return;
    this.loadLevel(this.currentLevelIndex);
  }

  // =========================================================
  //  CONFETES
  // =========================================================
  startConfetti() {
    this.stopConfetti();
    this.resizeConfettiCanvas();
    const colors = ["#f43f5e", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"];
    this.confettiParticles = [];
    for (let i = 0; i < 100; i++) {
      this.confettiParticles.push({
        x: Math.random() * this.confettiCanvas.width,
        y: Math.random() * this.confettiCanvas.height - this.confettiCanvas.height,
        size:  Math.random() * 8 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: Math.random() * 4 - 2,
        speedY: Math.random() * 5 + 3,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 4 - 2
      });
    }
    const animate = () => {
      this.confettiCtx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);
      let alive = false;
      this.confettiParticles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;
        if (p.y < this.confettiCanvas.height) alive = true;
        this.confettiCtx.save();
        this.confettiCtx.translate(p.x, p.y);
        this.confettiCtx.rotate((p.rotation * Math.PI) / 180);
        this.confettiCtx.fillStyle = p.color;
        this.confettiCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        this.confettiCtx.restore();
      });
      if (alive) this.confettiAnimationId = requestAnimationFrame(animate);
    };
    animate();
  }

  stopConfetti() {
    if (this.confettiAnimationId) {
      cancelAnimationFrame(this.confettiAnimationId);
      this.confettiAnimationId = null;
    }
    if (this.confettiCtx) {
      this.confettiCtx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);
    }
  }
}

// Inicializar quando o DOM carregar
window.addEventListener("DOMContentLoaded", () => {
  window.game = new Game();
});
