// Gerenciador Principal do Jogo "Ei! Esse é meu lugar"
// Gerencia a interface, os estados, a interação PointerEvents e as comemorações.

class Game {
  constructor() {
    this.currentLevelIndex = 0;
    this.placedMap = {}; // { [characterId]: seatObject }
    this.selectedCharId = null; // para interação "Click-to-Move" no mobile
    this.isDragging = false;
    this.draggedEl = null;
    this.dragStartPos = { x: 0, y: 0 };
    this.draggedCharId = null;
    
    // Confetes
    this.confettiCanvas = null;
    this.confettiCtx = null;
    this.confettiParticles = [];
    this.confettiAnimationId = null;

    this.init();
  }

  init() {
    // Referenciar Canvas de Confetes
    this.confettiCanvas = document.getElementById("confetti-canvas");
    this.confettiCtx = this.confettiCanvas?.getContext("2d");
    window.addEventListener("resize", () => this.resizeConfettiCanvas());
    this.resizeConfettiCanvas();

    // Eventos do Modal
    document.getElementById("btn-next-level").addEventListener("click", () => this.nextLevel());
    document.getElementById("btn-restart").addEventListener("click", () => this.restartLevel());
    document.getElementById("btn-back").addEventListener("click", () => this.backLevel());
    
    // Evento de desativação de som
    const btnSound = document.getElementById("btn-sound");
    btnSound.addEventListener("click", () => {
      const enabled = window.sounds.toggleSound();
      btnSound.innerHTML = enabled ? "🔊 Som" : "🔇 Mudo";
      btnSound.style.opacity = enabled ? "1" : "0.6";
    });

    // Iniciar primeira fase
    this.loadLevel(this.currentLevelIndex);
  }

  resizeConfettiCanvas() {
    if (this.confettiCanvas) {
      this.confettiCanvas.width = this.confettiCanvas.parentElement.clientWidth;
      this.confettiCanvas.height = this.confettiCanvas.parentElement.clientHeight;
    }
  }

  getCurrentLevel() {
    return window.LEVELS[this.currentLevelIndex];
  }

  loadLevel(index) {
    this.currentLevelIndex = index;
    const level = this.getCurrentLevel();
    this.placedMap = {};
    this.selectedCharId = null;
    
    // Resetar HUD e modal
    document.getElementById("level-title").innerText = level.titulo;
    document.getElementById("level-desc").innerText = level.descricao;
    document.getElementById("win-modal").style.display = "none";
    this.stopConfetti();

    // Renderizar Tabuleiro (Grid)
    const board = document.getElementById("game-board");
    board.className = `board scenario-${level.cenario}`;
    board.innerHTML = "";

    // Configurar Grid CSS do Tabuleiro
    board.style.gridTemplateRows = `repeat(${level.grid.rows}, 80px)`;
    board.style.gridTemplateColumns = `repeat(${level.grid.cols}, 80px)`;

    // Se houver corredor ou gap especial
    if (level.cenario === "onibus" && level.grid.corridorAfterCol !== undefined) {
      // Usaremos o grid area ou lacuna, mas com a nossa estilização CSS de gap já funciona!
      // Para o grid ficar perfeito com corredor central, podemos fazer colunas customizadas
      board.style.gridTemplateColumns = `80px 80px`;
    } else if (level.cenario === "doceria" && level.grid.tableGapAfterCol !== undefined) {
      // 2 mesas de 2 colunas separadas
      board.style.gridTemplateColumns = `80px 80px 80px 80px`;
    } else if (level.cenario === "parque") {
      board.style.gridTemplateColumns = `repeat(3, 80px)`;
    }

    // Posicionar elementos estáticos (como doces na doceria)
    if (level.cenario === "doceria" && level.elementos) {
      level.elementos.forEach(el => {
        const foodEl = document.createElement("div");
        foodEl.className = "doceria-food";
        foodEl.innerText = el.type === "donut" ? "🍩" : "🍦";
        
        // Estilo de posicionamento centralizado entre assentos
        const colOffset = el.col * 100; // col 0.5 -> 50px, col 2.5 -> 250px aprox
        foodEl.style.left = `calc(${el.col * 100}px - 21px)`;
        foodEl.style.top = "38px"; // Centro vertical aprox
        board.appendChild(foodEl);
      });
    }

    // Renderizar Obstáculos (Parque)
    if (level.obstaculos) {
      level.obstaculos.forEach(obs => {
        const obsEl = document.createElement("div");
        obsEl.className = "grid-obstacle";
        obsEl.style.gridRowStart = obs.row + 1;
        obsEl.style.gridColumnStart = obs.col + 1;
        obsEl.innerHTML = `<span class="sprite">${obs.sprite}</span><span class="label">${obs.label}</span>`;
        board.appendChild(obsEl);
      });
    }

    // Criar os Assentos
    level.assentos.forEach(seat => {
      const seatEl = document.createElement("div");
      seatEl.className = `seat empty ${seat.classe}`;
      seatEl.id = `seat-${seat.id}`;
      seatEl.dataset.seatId = seat.id;
      seatEl.style.gridRowStart = seat.row + 1;
      seatEl.style.gridColumnStart = seat.col + 1;
      seatEl.title = seat.label;
      
      // Permitir clique no assento (Mobile Click-to-Move)
      seatEl.addEventListener("click", () => this.handleSeatClick(seat));

      board.appendChild(seatEl);
    });

    // Renderizar Reservas
    const reservesBank = document.getElementById("reserves-bank");
    reservesBank.innerHTML = "";
    
    level.personagens.forEach(char => {
      const charEl = this.createCharacterDOM(char, "neutral");
      reservesBank.appendChild(charEl);
    });

    // Atualizar Ficha de Perfil com o primeiro personagem
    this.showProfile(level.personagens[0]);
    this.updateLogic();
  }

  // Cria o elemento HTML do Personagem com o SVG dinâmico correspondente
  createCharacterDOM(char, mood) {
    const charEl = document.createElement("div");
    charEl.className = "character";
    charEl.id = `char-${char.id}`;
    charEl.dataset.charId = char.id;
    charEl.innerHTML = this.getCharacterSVG(char.avatar, mood);

    // Adicionar eventos PointerEvents para Drag & Drop premium
    charEl.addEventListener("pointerdown", (e) => this.handlePointerDown(e, charEl, char.id));

    // Clique simples também seleciona para ver perfil
    charEl.addEventListener("click", (e) => {
      e.stopPropagation();
      this.showProfile(char);
      this.handleCharacterSelect(char.id);
    });

    return charEl;
  }

  // Desenhos SVG de altíssima qualidade e fofura (Kawaii) para os avatares
  getCharacterSVG(avatar, mood) {
    let eyeColor = "#3a3b3c";
    let bodyColor = "#fcd34d"; // Padrão
    let blushColor = "#fca5a5";

    // Expressões oculares
    let eyesSVG = `<g class="eyes">
      <ellipse class="eye" cx="30" cy="45" rx="4" ry="6" fill="${eyeColor}" />
      <ellipse class="eye" cx="70" cy="45" rx="4" ry="6" fill="${eyeColor}" />
    </g>`;

    let mouthSVG = `<path d="M 45 55 Q 50 60 55 55" stroke="${eyeColor}" stroke-width="4" stroke-linecap="round" fill="none" />`;
    let detailSVG = "";

    if (avatar === "gloop") {
      bodyColor = "#fef08a"; // Amarelo Gloop
      // Faixa de esporte vermelha na cabeça
      detailSVG = `<rect x="15" y="22" width="70" height="12" rx="4" fill="#ef4444" stroke="#3a3b3c" stroke-width="3" />
                   <rect x="35" y="22" width="30" height="12" fill="#fff" />`;
    } else if (avatar === "fuzz") {
      bodyColor = "#fbcfe8"; // Rosa Fuzz
      // Cabelo de algodão doce texturizado e orelhinhas fofas
      detailSVG = `
        <circle cx="25" cy="25" r="14" fill="#fbcfe8" />
        <circle cx="50" cy="20" r="16" fill="#fbcfe8" />
        <circle cx="75" cy="25" r="14" fill="#fbcfe8" />
        <circle cx="15" cy="45" r="10" fill="#fbcfe8" />
        <circle cx="85" cy="45" r="10" fill="#fbcfe8" />
      `;
    } else if (avatar === "pipoca") {
      bodyColor = "#fed7aa"; // Laranja Pipoca
      // Orelhinhas caídas de cachorrinho
      detailSVG = `
        <ellipse cx="18" cy="35" rx="8" ry="16" fill="#78350f" transform="rotate(-15, 18, 35)" />
        <ellipse cx="82" cy="35" rx="8" ry="16" fill="#78350f" transform="rotate(15, 82, 35)" />
        <ellipse cx="28" cy="45" rx="10" ry="12" fill="#78350f" opacity="0.3" /> <!-- Mancha no olho -->
      `;
    } else if (avatar === "bebeto") {
      bodyColor = "#bfdbfe"; // Azul Bebeto
      // Gorrinho de dormir e orelhas redondas
      detailSVG = `
        <circle cx="22" cy="25" r="10" fill="#bfdbfe" stroke="#3a3b3c" stroke-width="3" />
        <circle cx="78" cy="25" r="10" fill="#bfdbfe" stroke="#3a3b3c" stroke-width="3" />
        <path d="M 30 24 L 60 10 L 75 22 Z" fill="#3b82f6" stroke="#3a3b3c" stroke-width="3" />
        <circle cx="75" cy="22" r="5" fill="#fff" />
      `;
    } else if (avatar === "zizi") {
      bodyColor = "#a7f3d0"; // Verde Mentolado Zizi
      // Óculos gigantes redondos super fofos
      detailSVG = `
        <circle cx="32" cy="45" r="15" fill="none" stroke="#1e293b" stroke-width="4" />
        <circle cx="68" cy="45" r="15" fill="none" stroke="#1e293b" stroke-width="4" />
        <line x1="47" y1="45" x2="53" y2="45" stroke="#1e293b" stroke-width="4" />
        <path d="M 20 20 Q 50 12 80 20" stroke="#3a3b3c" stroke-width="4" fill="none" />
      `;
    } else if (avatar === "munch") {
      bodyColor = "#ddd6fe"; // Roxo Munch
      // Bochechas gordinhas e chapéu de chef pequenininho
      detailSVG = `
        <path d="M 35 15 L 40 5 Q 50 2 60 5 L 65 15 Z" fill="#fff" stroke="#3a3b3c" stroke-width="3" />
        <circle cx="18" cy="60" r="12" fill="#ddd6fe" />
        <circle cx="82" cy="60" r="12" fill="#ddd6fe" />
      `;
    } else if (avatar === "flora") {
      bodyColor = "#ffffff"; // Branco Flora
      // Orelhas de coelho longas e uma florzinha rosa
      detailSVG = `
        <ellipse cx="30" cy="18" rx="8" ry="18" fill="#fff" stroke="#3a3b3c" stroke-width="3" transform="rotate(-10, 30, 18)" />
        <ellipse cx="70" cy="18" rx="8" ry="18" fill="#fff" stroke="#3a3b3c" stroke-width="3" transform="rotate(10, 70, 18)" />
        <ellipse cx="30" cy="18" rx="4" ry="12" fill="#fbcfe8" transform="rotate(-10, 30, 18)" />
        <ellipse cx="70" cy="18" rx="4" ry="12" fill="#fbcfe8" transform="rotate(10, 70, 18)" />
        <!-- Flor no cabelo -->
        <circle cx="78" cy="30" r="6" fill="#f472b6" />
        <circle cx="78" cy="30" r="2" fill="#fef08a" />
      `;
    }

    // Expressões Dinâmicas baseadas no Humor
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
        <!-- Lágrima pequena -->
        <path d="M 32 50 C 32 54 28 58 28 58 C 28 58 24 54 24 50 Z" fill="#60a5fa" />
      </g>`;
      mouthSVG = `<path d="M 44 58 Q 50 50 56 58" stroke="${eyeColor}" stroke-width="4" stroke-linecap="round" fill="none" />`;
    }

    // O corpo base fofo do blob Kawaii
    return `
      <svg class="avatar-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        ${detailSVG}
        <!-- Corpo Principal -->
        <path d="M 15 50 C 15 25 85 25 85 50 C 85 75 75 88 50 88 C 25 88 15 75 15 50 Z" fill="${bodyColor}" stroke="#3a3b3c" stroke-width="4.5" />
        
        <!-- Bochechas Coradas -->
        <circle class="blush" cx="24" cy="56" r="6" fill="${blushColor}" opacity="0.7" />
        <circle class="blush" cx="76" cy="56" r="6" fill="${blushColor}" opacity="0.7" />
        
        <!-- Olhos e Boca -->
        ${eyesSVG}
        ${mouthSVG}
      </svg>
    `;
  }

  // Mostra a Ficha de Perfil do personagem selecionado na parte inferior
  showProfile(char) {
    const avatarContainer = document.getElementById("profile-avatar-container");
    const charState = this.placedMap[char.id] ? "placed" : "neutral";
    const currentMood = (charState === "placed") ? (this.lastValidation?.characterStates[char.id]?.mood || "happy") : "neutral";
    
    avatarContainer.innerHTML = this.getCharacterSVG(char.avatar, currentMood);
    
    document.getElementById("profile-name").innerText = char.nome;
    document.getElementById("profile-badge-category").innerText = char.categoria;
    document.getElementById("profile-badge-gender").innerText = char.genero;

    const rulesUl = document.getElementById("profile-rules");
    rulesUl.innerHTML = "";

    // Renderizar regras lógicas
    char.regras.forEach((regra, idx) => {
      const li = document.createElement("li");
      
      // Obter o estado atual dessa regra específica
      let satisfied = false;
      if (this.lastValidation && this.lastValidation.characterStates[char.id]) {
        const state = this.lastValidation.characterStates[char.id];
        if (state.placed) {
          satisfied = state.rules[idx].satisfied;
        }
      }

      li.className = this.placedMap[char.id] ? (satisfied ? "satisfied" : "violated") : "";
      
      const checkbox = document.createElement("div");
      checkbox.className = "checkbox-cozy";
      checkbox.innerText = this.placedMap[char.id] ? (satisfied ? "✔" : "✖") : "";

      const textNode = document.createElement("span");
      textNode.innerText = regra.texto;

      li.appendChild(checkbox);
      li.appendChild(textNode);
      rulesUl.appendChild(li);
    });
  }

  // --- pointerevents Drag & Drop ---
  handlePointerDown(e, el, charId) {
    if (this.isDragging) return;
    
    e.preventDefault();
    window.sounds.resume();

    this.isDragging = true;
    this.draggedEl = el;
    this.draggedCharId = charId;
    this.dragStartPos = { x: e.clientX, y: e.clientY };

    // Efeitos visuais
    el.classList.add("dragging");
    el.style.touchAction = "none";
    el.setPointerCapture(e.pointerId);

    // Som de clique fofo
    window.sounds.playClick();

    // Eventos dinâmicos adicionados no próprio elemento para mover e soltar
    const onPointerMove = (moveEv) => this.handlePointerMove(moveEv);
    const onPointerUp = (upEv) => {
      this.handlePointerUp(upEv);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
    };

    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUp);
  }

  handlePointerMove(e) {
    if (!this.isDragging || !this.draggedEl) return;
    
    // Calcular delta e aplicar via transform
    const dx = e.clientX - this.dragStartPos.x;
    const dy = e.clientY - this.dragStartPos.y;
    this.draggedEl.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(1.15) rotate(4deg)`;
  }

  handlePointerUp(e) {
    if (!this.isDragging || !this.draggedEl) return;

    this.isDragging = false;
    const el = this.draggedEl;
    const charId = this.draggedCharId;
    
    el.classList.remove("dragging");
    el.style.transform = "";
    el.releasePointerCapture(e.pointerId);

    // Identificar elemento abaixo usando document.elementFromPoint
    // Escondemos o elemento arrastado temporariamente para não capturar ele mesmo
    el.style.visibility = "hidden";
    const elemBelow = document.elementFromPoint(e.clientX, e.clientY);
    el.style.visibility = "visible";

    // Encontrar se caiu dentro de um Assento (.seat)
    const seatEl = elemBelow?.closest(".seat");

    if (seatEl) {
      const seatId = seatEl.dataset.seatId;
      const level = this.getCurrentLevel();
      const seat = level.assentos.find(s => s.id === seatId);
      
      this.placeCharacter(charId, seat);
    } else {
      // Se soltar fora, retorna para as reservas
      this.returnToReserves(charId);
    }

    this.draggedEl = null;
    this.draggedCharId = null;
  }

  // --- Click-to-Move (Mobile Alternative) ---
  handleCharacterSelect(charId) {
    // Desmarcar anterior
    if (this.selectedCharId) {
      const prevEl = document.getElementById(`char-${this.selectedCharId}`);
      if (prevEl) prevEl.classList.remove("selected");
    }

    if (this.selectedCharId === charId) {
      // Clicou de novo, cancela seleção
      this.selectedCharId = null;
      return;
    }

    this.selectedCharId = charId;
    const el = document.getElementById(`char-${charId}`);
    if (el) el.classList.add("selected");
    
    window.sounds.playClick();
  }

  handleSeatClick(seat) {
    if (!this.selectedCharId) return;

    const charId = this.selectedCharId;
    
    // Limpar seleção
    const el = document.getElementById(`char-${charId}`);
    if (el) el.classList.remove("selected");
    this.selectedCharId = null;

    this.placeCharacter(charId, seat);
  }

  // --- Lógica de Posicionamento e Troca ---
  placeCharacter(charId, targetSeat) {
    const level = this.getCurrentLevel();
    const oldSeat = this.placedMap[charId];
    
    // Verificar quem já estava no assento de destino
    let occupantId = null;
    for (const [id, s] of Object.entries(this.placedMap)) {
      if (s && s.id === targetSeat.id) {
        occupantId = id;
        break;
      }
    }

    if (occupantId) {
      // Troca de lugares!
      if (oldSeat) {
        // Se o arrastado já estava em um assento, os dois trocam de cadeira
        this.placedMap[occupantId] = oldSeat;
        const occupantEl = document.getElementById(`char-${occupantId}`);
        const oldSeatEl = document.getElementById(`seat-${oldSeat.id}`);
        oldSeatEl.appendChild(occupantEl);
        oldSeatEl.classList.remove("empty");
      } else {
        // Se o arrastado veio das reservas, o antigo ocupante vai para as reservas
        this.placedMap[occupantId] = null;
        const occupantEl = document.getElementById(`char-${occupantId}`);
        document.getElementById("reserves-bank").appendChild(occupantEl);
      }
    }

    // Posicionar novo personagem no assento alvo
    this.placedMap[charId] = targetSeat;
    const charEl = document.getElementById(`char-${charId}`);
    const seatEl = document.getElementById(`seat-${targetSeat.id}`);
    
    seatEl.appendChild(charEl);
    seatEl.classList.remove("empty");
    if (oldSeat && !occupantId) {
      document.getElementById(`seat-${oldSeat.id}`).classList.add("empty");
    }

    window.sounds.playPop();
    this.updateLogic();
    
    // Atualizar ficha técnica
    const char = level.personagens.find(c => c.id === charId);
    if (char) this.showProfile(char);
  }

  returnToReserves(charId) {
    const oldSeat = this.placedMap[charId];
    if (!oldSeat) return; // já estava nas reservas

    this.placedMap[charId] = null;
    const charEl = document.getElementById(`char-${charId}`);
    document.getElementById("reserves-bank").appendChild(charEl);
    document.getElementById(`seat-${oldSeat.id}`).classList.add("empty");

    window.sounds.playPop();
    this.updateLogic();

    // Atualizar perfil
    const level = this.getCurrentLevel();
    const char = level.personagens.find(c => c.id === charId);
    if (char) this.showProfile(char);
  }

  // --- Motor de Regras e Atualizações ---
  updateLogic() {
    const level = this.getCurrentLevel();
    const validation = window.LogicEngine.validate(level, this.placedMap);
    this.lastValidation = validation;

    // Atualizar expressões de todos os avatares no tabuleiro
    level.personagens.forEach(char => {
      const charEl = document.getElementById(`char-${char.id}`);
      if (!charEl) return;
      
      const charState = validation.characterStates[char.id];
      const mood = charState.mood;
      
      // Atualizar desenho SVG correspondente
      charEl.innerHTML = this.getCharacterSVG(char.avatar, mood);
    });

    // Se o personagem da ficha técnica atual mudou de humor, atualizamos a ficha
    const activeProfileName = document.getElementById("profile-name").innerText;
    const activeChar = level.personagens.find(c => c.nome === activeProfileName);
    if (activeChar) {
      this.showProfile(activeChar);
    }

    // Se completou a fase!
    if (validation.levelCompleted) {
      setTimeout(() => this.triggerWin(), 600);
    }
  }

  triggerWin() {
    window.sounds.playSuccess();
    
    // Exibir Modal de Vitória
    const modal = document.getElementById("win-modal");
    modal.style.display = "flex";

    // Mudar botão se for o último nível
    const btnNext = document.getElementById("btn-next-level");
    if (this.currentLevelIndex === window.LEVELS.length - 1) {
      btnNext.innerText = "✨ Zerar Jogo! ✨";
    } else {
      btnNext.innerText = "Próxima Fase ➔";
    }

    this.startConfetti();
  }

  nextLevel() {
    if (this.currentLevelIndex < window.LEVELS.length - 1) {
      this.loadLevel(this.currentLevelIndex + 1);
    } else {
      // Zerou! Recomeçar do primeiro
      alert("Parabéns! Você resolveu todos os enigmas e encontrou o lugar perfeito para todos! 🎉");
      this.loadLevel(0);
    }
  }

  restartLevel() {
    this.loadLevel(this.currentLevelIndex);
  }

  backLevel() {
    if (this.currentLevelIndex > 0) {
      this.loadLevel(this.currentLevelIndex - 1);
    }
  }

  // --- Efeito Especial de Confetes ---
  startConfetti() {
    this.stopConfetti();
    this.resizeConfettiCanvas();
    
    const colors = ["#f43f5e", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"];
    this.confettiParticles = [];
    
    for (let i = 0; i < 100; i++) {
      this.confettiParticles.push({
        x: Math.random() * this.confettiCanvas.width,
        y: Math.random() * this.confettiCanvas.height - this.confettiCanvas.height,
        size: Math.random() * 8 + 6,
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
        
        if (p.y < this.confettiCanvas.height) {
          alive = true;
        }

        this.confettiCtx.save();
        this.confettiCtx.translate(p.x, p.y);
        this.confettiCtx.rotate((p.rotation * Math.PI) / 180);
        this.confettiCtx.fillStyle = p.color;
        this.confettiCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        this.confettiCtx.restore();
      });

      if (alive) {
        this.confettiAnimationId = requestAnimationFrame(animate);
      }
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
