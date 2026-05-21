// Níveis do jogo "Ei! Esse é meu lugar"
// Cada nível define a temática, o layout dos assentos, elementos especiais e as regras dos personagens.

window.LEVELS = [
  // --- FASE 1 ---
  {
    id: 1,
    titulo: "Fase 01: O Ônibus Escolar",
    cenario: "onibus",
    descricao: "Ajude a turma a se acomodar para a excursão escolar! O lado esquerdo tem assentos azuis da janela (lado do time de futebol da escola), e o lado direito tem assentos amarelos do corredor.",
    grid: {
      rows: 3,
      cols: 2,
      corridorAfterCol: 0
    },
    assentos: [
      { id: "s00", row: 0, col: 0, classe: "azul-janela", label: "Janela Azul (Frente)" },
      { id: "s01", row: 0, col: 1, classe: "amarela-corredor", label: "Corredor Amarelo (Frente)" },
      { id: "s10", row: 1, col: 0, classe: "azul-janela", label: "Janela Azul (Meio)" },
      { id: "s11", row: 1, col: 1, classe: "amarela-corredor", label: "Corredor Amarelo (Meio)" },
      { id: "s20", row: 2, col: 0, classe: "azul-janela", label: "Janela Azul (Fundo)" },
      { id: "s21", row: 2, col: 1, classe: "amarela-corredor", label: "Corredor Amarelo (Fundo)" }
    ],
    personagens: [
      {
        id: "gloop",
        nome: "Gloop",
        categoria: "Esportista",
        genero: "Adulto",
        avatar: "gloop",
        regras: [
          { tipo: "coluna", alvo: 0, texto: "Quero sentar no lado esquerdo (azul) para ver a paisagem." },
          { tipo: "nao_atras_de", alvo: "fuzz", texto: "Não quero sentar logo atrás do Fuzz." }
        ]
      },
      {
        id: "fuzz",
        nome: "Fuzz",
        categoria: "Tímido",
        genero: "Criança",
        avatar: "fuzz",
        regras: [
          { tipo: "classe_negativa", alvo: "azul-janela", texto: "Não gosto de azul. Prefiro as cadeiras amarelas." },
          { tipo: "perto_de", alvo: "pipoca", texto: "Quero ficar pertinho do Pipoca." }
        ]
      },
      {
        id: "pipoca",
        nome: "Pipoca",
        categoria: "Pet",
        genero: "Bichinho",
        avatar: "pipoca",
        regras: [
          { tipo: "linha", alvo: 0, texto: "Quero sentar na fileira da frente!" }
        ]
      }
    ]
  },

  // --- FASE 2 ---
  {
    id: 2,
    titulo: "Fase 02: O Cinema Cozy",
    cenario: "cinema",
    descricao: "As luzes vão se apagar! Acomode o grupo no cinema. A fileira superior (Frente) fica bem perto da tela gigante, e a fileira inferior (Fundo) é perfeita para quem quer sossego.",
    grid: {
      rows: 2,
      cols: 4
    },
    assentos: [
      { id: "s00", row: 0, col: 0, classe: "poltrona-vermelha", label: "Frente (Ponta Esquerda)" },
      { id: "s01", row: 0, col: 1, classe: "poltrona-vermelha", label: "Frente (Meio Esquerdo)" },
      { id: "s02", row: 0, col: 2, classe: "poltrona-vermelha", label: "Frente (Meio Direito)" },
      { id: "s03", row: 0, col: 3, classe: "poltrona-vermelha", label: "Frente (Ponta Direita)" },
      { id: "s10", row: 1, col: 0, classe: "poltrona-vermelha", label: "Fundo (Ponta Esquerda)" },
      { id: "s11", row: 1, col: 1, classe: "poltrona-vermelha", label: "Fundo (Meio Esquerdo)" },
      { id: "s12", row: 1, col: 2, classe: "poltrona-vermelha", label: "Fundo (Meio Direito)" },
      { id: "s13", row: 1, col: 3, classe: "poltrona-vermelha", label: "Fundo (Ponta Direita)" }
    ],
    personagens: [
      {
        id: "gloop",
        nome: "Gloop",
        categoria: "Esportista",
        genero: "Adulto",
        avatar: "gloop",
        regras: [
          { tipo: "linha", alvo: 1, texto: "Quero sentar na fileira do fundo." }
        ]
      },
      {
        id: "pipoca",
        nome: "Pipoca",
        categoria: "Pet",
        genero: "Bichinho",
        avatar: "pipoca",
        regras: [
          { tipo: "linha", alvo: 0, texto: "Quero ver a tela de perto (fileira da frente)!" }
        ]
      },
      {
        id: "fuzz",
        nome: "Fuzz",
        categoria: "Tímido",
        genero: "Criança",
        avatar: "fuzz",
        regras: [
          { tipo: "perto_de", alvo: "pipoca", texto: "Quero sentar ao lado ou de frente para o Pipoca." }
        ]
      },
      {
        id: "bebeto",
        nome: "Bebeto",
        categoria: "Dorminhoco",
        genero: "Adulto",
        avatar: "bebeto",
        regras: [
          { tipo: "ponta", texto: "Quero sentar em uma das pontas do cinema." }
        ]
      },
      {
        id: "zizi",
        nome: "Zizi",
        categoria: "Leitora",
        genero: "Jovem",
        avatar: "zizi",
        regras: [
          { tipo: "meio", texto: "Prefiro os assentos do meio para ter a melhor simetria." }
        ]
      },
      {
        id: "munch",
        nome: "Munch",
        categoria: "Glutão",
        genero: "Adulto",
        avatar: "munch",
        regras: [
          { tipo: "longe_de", alvo: "bebeto", texto: "Quero comer pipoca bem longe do Bebeto para não acordá-lo." }
        ]
      }
    ]
  },

  // --- FASE 3 ---
  {
    id: 3,
    titulo: "Fase 03: A Loja de Doces do Munch",
    cenario: "doceria",
    descricao: "Hora do lanche doce! Temos duas mesas no estilo Booth Americano. A Mesa da Esquerda serve Donuts e a Mesa da Direita serve Sorvetes Gigantes.",
    grid: {
      rows: 2,
      cols: 4,
      tableGapAfterCol: 1
    },
    assentos: [
      { id: "s00", row: 0, col: 0, mesa: 1, classe: "banco-donuts", label: "Mesa Donuts (Sup Esq)" },
      { id: "s01", row: 0, col: 1, mesa: 1, classe: "banco-donuts", label: "Mesa Donuts (Sup Dir)" },
      { id: "s10", row: 1, col: 0, mesa: 1, classe: "banco-donuts", label: "Mesa Donuts (Inf Esq)" },
      { id: "s11", row: 1, col: 1, mesa: 1, classe: "banco-donuts", label: "Mesa Donuts (Inf Dir)" },
      { id: "s02", row: 0, col: 2, mesa: 2, classe: "banco-sorvete", label: "Mesa Sorvete (Sup Esq)" },
      { id: "s03", row: 0, col: 3, mesa: 2, classe: "banco-sorvete", label: "Mesa Sorvete (Sup Dir)" },
      { id: "s12", row: 1, col: 2, mesa: 2, classe: "banco-sorvete", label: "Mesa Sorvete (Inf Esq)" },
      { id: "s13", row: 1, col: 3, mesa: 2, classe: "banco-sorvete", label: "Mesa Sorvete (Inf Dir)" }
    ],
    elementos: [
      { type: "donut", row: 0, col: 0.5, text: "🍩 Donut Colorido" },
      { type: "icecream", row: 0, col: 2.5, text: "🍦 Sorvete" }
    ],
    personagens: [
      {
        id: "munch",
        nome: "Munch",
        categoria: "Glutão",
        genero: "Adulto",
        avatar: "munch",
        regras: [
          { tipo: "mesma_mesa_que", alvo: 1, texto: "Quero sentar na mesa do donut!" }
        ]
      },
      {
        id: "gloop",
        nome: "Gloop",
        categoria: "Esportista",
        genero: "Adulto",
        avatar: "gloop",
        regras: [
          { tipo: "mesma_mesa_que", alvo: 2, texto: "Quero sorvete! Me coloque na mesa do sorvete." }
        ]
      },
      {
        id: "zizi",
        nome: "Zizi",
        categoria: "Leitora",
        genero: "Jovem",
        avatar: "zizi",
        regras: [
          { tipo: "frente_a_frente", alvo: "pipoca", texto: "Quero sentar bem de frente para o Pipoca." }
        ]
      },
      {
        id: "pipoca",
        nome: "Pipoca",
        categoria: "Pet",
        genero: "Bichinho",
        avatar: "pipoca",
        regras: [
          { tipo: "mesma_mesa_que", alvo: 1, texto: "Amo donuts! Quero a mesa do donut." }
        ]
      },
      {
        id: "fuzz",
        nome: "Fuzz",
        categoria: "Tímido",
        genero: "Criança",
        avatar: "fuzz",
        regras: [
          { tipo: "longe_de", alvo: "munch", texto: "Não quero sentar ao lado do Munch." }
        ]
      },
      {
        id: "bebeto",
        nome: "Bebeto",
        categoria: "Dorminhoco",
        genero: "Adulto",
        avatar: "bebeto",
        regras: [
          { tipo: "mesmo_grupo_que", alvo: "gloop", texto: "Quero sentar na mesma mesa que o Gloop." }
        ]
      }
    ]
  },

  // --- FASE 4 ---
  {
    id: 4,
    titulo: "Fase 04: Piquenique no Parque",
    cenario: "parque",
    descricao: "O dia está lindo no parque! Mas cuidado: há uma árvore com sombra fresca e uma colmeia cheia de abelhas zumbindo!",
    grid: {
      rows: 3,
      cols: 3
    },
    obstaculos: [
      { id: "arvore", row: 0, col: 0, sprite: "🌳", label: "Árvore (Sombra)" },
      { id: "colmeia", row: 2, col: 2, sprite: "🐝", label: "Colmeia (Abelhas!)" }
    ],
    assentos: [
      { id: "s01", row: 0, col: 1, classe: "toalha-picnic", label: "Frente (Meio)" },
      { id: "s02", row: 0, col: 2, classe: "toalha-flores", label: "Florida (Sup Dir)" },
      { id: "s10", row: 1, col: 0, classe: "toalha-picnic", label: "Meio (Esq)" },
      { id: "s11", row: 1, col: 1, classe: "toalha-picnic", label: "Centro" },
      { id: "s12", row: 1, col: 2, classe: "toalha-picnic", label: "Meio (Dir)" },
      { id: "s20", row: 2, col: 0, classe: "toalha-flores", label: "Florida (Inf Esq)" },
      { id: "s21", row: 2, col: 1, classe: "toalha-picnic", label: "Fundo (Meio)" }
    ],
    personagens: [
      {
        id: "fuzz",
        nome: "Fuzz",
        categoria: "Tímido",
        genero: "Criança",
        avatar: "fuzz",
        regras: [
          { tipo: "longe_obstaculo", alvo: "colmeia", texto: "Tenho medo de abelhas! Não quero sentar perto da Colmeia." }
        ]
      },
      {
        id: "zizi",
        nome: "Zizi",
        categoria: "Leitora",
        genero: "Jovem",
        avatar: "zizi",
        regras: [
          { tipo: "perto_obstaculo", alvo: "arvore", texto: "Quero sentar perto da árvore para ler na sombra." }
        ]
      },
      {
        id: "gloop",
        nome: "Gloop",
        categoria: "Esportista",
        genero: "Adulto",
        avatar: "gloop",
        regras: [
          { tipo: "perto_de", alvo: "zizi", texto: "Quero sentar pertinho da Zizi." }
        ]
      },
      {
        id: "pipoca",
        nome: "Pipoca",
        categoria: "Pet",
        genero: "Bichinho",
        avatar: "pipoca",
        regras: [
          { tipo: "longe_obstaculo", alvo: "arvore", texto: "Não quero sombra (muito úmido)." },
          { tipo: "longe_obstaculo", alvo: "colmeia", texto: "Não quero zumbido de abelhas por perto!" }
        ]
      },
      {
        id: "munch",
        nome: "Munch",
        categoria: "Glutão",
        genero: "Adulto",
        avatar: "munch",
        regras: [
          { tipo: "posicao_especifica", alvo: { row: 1, col: 1 }, texto: "Quero sentar exatamente no centro do parque." }
        ]
      },
      {
        id: "bebeto",
        nome: "Bebeto",
        categoria: "Dorminhoco",
        genero: "Adulto",
        avatar: "bebeto",
        regras: [
          { tipo: "longe_de", alvo: "munch", texto: "Vou tirar um cochilo longe do Munch mastigador." }
        ]
      },
      {
        id: "flora",
        nome: "Flora",
        categoria: "Jardinheira",
        genero: "Criança",
        avatar: "flora",
        regras: [
          { tipo: "classe", alvo: "toalha-flores", texto: "Quero sentar em uma das toalhas com flores!" }
        ]
      }
    ]
  },

  // --- FASE 5: NOVO SCENARIO PRAIA & PERSONAGEM FEDIDO ---
  {
    id: 5,
    titulo: "Fase 05: Calor na Praia Cozy",
    cenario: "praia",
    descricao: "Primeira vez na praia! O sol está radiante. Mas cuidado: Fuzz brincou no mar o dia inteiro e está com cheiro forte de alga marinha estragada (fedido)!",
    grid: {
      rows: 2,
      cols: 4
    },
    assentos: [
      { id: "s00", row: 0, col: 0, classe: "toalha-azul", label: "Toldo Azul (Sup Esq)" },
      { id: "s01", row: 0, col: 1, classe: "toalha-azul", label: "Toldo Azul (Sup Meio Esq)" },
      { id: "s02", row: 0, col: 2, classe: "toalha-amarela", label: "Toldo Amarelo (Sup Meio Dir)" },
      { id: "s03", row: 0, col: 3, classe: "toalha-amarela", label: "Toldo Amarelo (Sup Dir)" },
      { id: "s10", row: 1, col: 0, classe: "toalha-azul", label: "Toldo Azul (Inf Esq)" },
      { id: "s11", row: 1, col: 1, classe: "toalha-azul", label: "Toldo Azul (Inf Meio Esq)" },
      { id: "s12", row: 1, col: 2, classe: "toalha-amarela", label: "Toldo Amarelo (Inf Meio Dir)" },
      { id: "s13", row: 1, col: 3, classe: "toalha-amarela", label: "Toldo Amarelo (Inf Dir)" }
    ],
    personagens: [
      {
        id: "fuzz",
        nome: "Fuzz",
        categoria: "Tímido",
        genero: "Criança",
        avatar: "fuzz",
        fedido: true, // FEDIDO!
        regras: [
          { tipo: "classe", alvo: "toalha-azul", texto: "Quero deitar na toalha listrada azul." }
        ]
      },
      {
        id: "pipoca",
        nome: "Pipoca",
        categoria: "Pet",
        genero: "Bichinho",
        avatar: "pipoca",
        regras: [
          { tipo: "evitar_fedido", texto: "Tenho o faro sensível! Não sento ao lado de ninguém fedido." },
          { tipo: "classe", alvo: "toalha-azul", texto: "Prefiro toalha azul." }
        ]
      },
      {
        id: "zizi",
        nome: "Zizi",
        categoria: "Leitora",
        genero: "Jovem",
        avatar: "zizi",
        regras: [
          { tipo: "evitar_fedido", texto: "Não dá para concentrar no meu livro com esse cheiro de alga!" },
          { tipo: "linha", alvo: 0, texto: "Quero sentar na fileira de cima perto da brisa do mar." }
        ]
      },
      {
        id: "gloop",
        nome: "Gloop",
        categoria: "Esportista",
        genero: "Adulto",
        avatar: "gloop",
        regras: [
          { tipo: "classe", alvo: "toalha-amarela", texto: "Quero a toalha amarela perto do quiosque de coco." }
        ]
      }
    ]
  },

  // --- FASE 6 ---
  {
    id: 6,
    titulo: "Fase 06: De Volta ao Ônibus",
    cenario: "onibus",
    descricao: "O ônibus vai partir! Zizi está com um livro volumoso e Munch está de olho na janela.",
    grid: {
      rows: 3,
      cols: 2,
      corridorAfterCol: 0
    },
    assentos: [
      { id: "s00", row: 0, col: 0, classe: "azul-janela", label: "Janela Azul (Sup)" },
      { id: "s01", row: 0, col: 1, classe: "amarela-corredor", label: "Corredor Amarelo (Sup)" },
      { id: "s10", row: 1, col: 0, classe: "azul-janela", label: "Janela Azul (Meio)" },
      { id: "s11", row: 1, col: 1, classe: "amarela-corredor", label: "Corredor Amarelo (Meio)" },
      { id: "s20", row: 2, col: 0, classe: "azul-janela", label: "Janela Azul (Inf)" },
      { id: "s21", row: 2, col: 1, classe: "amarela-corredor", label: "Corredor Amarelo (Inf)" }
    ],
    personagens: [
      {
        id: "zizi",
        nome: "Zizi",
        categoria: "Leitora",
        genero: "Jovem",
        avatar: "zizi",
        regras: [
          { tipo: "linha", alvo: 1, texto: "Quero sentar na fileira do meio para ler com luz equilibrada." }
        ]
      },
      {
        id: "munch",
        nome: "Munch",
        categoria: "Glutão",
        genero: "Adulto",
        avatar: "munch",
        regras: [
          { tipo: "classe", alvo: "azul-janela", texto: "Adoro ver a rua passar! Quero janela azul." },
          { tipo: "nao_atras_de", alvo: "zizi", texto: "Não quero sentar atrás da Zizi, ela reclina muito a cadeira." }
        ]
      },
      {
        id: "bebeto",
        nome: "Bebeto",
        categoria: "Dorminhoco",
        genero: "Adulto",
        avatar: "bebeto",
        regras: [
          { tipo: "linha", alvo: 2, texto: "Quero a fileira de trás para dormir em paz." },
          { tipo: "classe", alvo: "amarela-corredor", texto: "Quero assento do corredor amarelo." }
        ]
      },
      {
        id: "pipoca",
        nome: "Pipoca",
        categoria: "Pet",
        genero: "Bichinho",
        avatar: "pipoca",
        regras: [
          { tipo: "perto_de", alvo: "bebeto", texto: "Quero sentar do lado ou em frente ao Bebeto." }
        ]
      }
    ]
  },

  // --- FASE 7 ---
  {
    id: 7,
    titulo: "Fase 07: Pipoca no Cinema",
    cenario: "cinema",
    descricao: "Munch trouxe um saco gigante de cebola frita fedida! Ninguém quer sentar perto dele.",
    grid: {
      rows: 2,
      cols: 4
    },
    assentos: [
      { id: "s00", row: 0, col: 0, classe: "poltrona-vermelha", label: "C1" },
      { id: "s01", row: 0, col: 1, classe: "poltrona-vermelha", label: "C2" },
      { id: "s02", row: 0, col: 2, classe: "poltrona-vermelha", label: "C3" },
      { id: "s03", row: 0, col: 3, classe: "poltrona-vermelha", label: "C4" },
      { id: "s10", row: 1, col: 0, classe: "poltrona-vermelha", label: "C5" },
      { id: "s11", row: 1, col: 1, classe: "poltrona-vermelha", label: "C6" },
      { id: "s12", row: 1, col: 2, classe: "poltrona-vermelha", label: "C7" },
      { id: "s13", row: 1, col: 3, classe: "poltrona-vermelha", label: "C8" }
    ],
    personagens: [
      {
        id: "munch",
        nome: "Munch",
        categoria: "Glutão",
        genero: "Adulto",
        avatar: "munch",
        fedido: true, // FEDIDO!
        regras: [
          { tipo: "linha", alvo: 0, texto: "Quero sentar na fileira da frente." }
        ]
      },
      {
        id: "flora",
        nome: "Flora",
        categoria: "Jardinheira",
        genero: "Criança",
        avatar: "flora",
        regras: [
          { tipo: "evitar_fedido", texto: "Minhas flores perfumadas não combinam com cebola fedida!" },
          { tipo: "ponta", texto: "Quero sentar em uma das pontas." }
        ]
      },
      {
        id: "zizi",
        nome: "Zizi",
        categoria: "Leitora",
        genero: "Jovem",
        avatar: "zizi",
        regras: [
          { tipo: "evitar_fedido", texto: "Quero assistir o documentário sem cheiros ruins." },
          { tipo: "meio", texto: "Prefiro os assentos centrais." }
        ]
      },
      {
        id: "bebeto",
        nome: "Bebeto",
        categoria: "Dorminhoco",
        genero: "Adulto",
        avatar: "bebeto",
        regras: [
          { tipo: "linha", alvo: 1, texto: "Quero dormir na fileira de trás." }
        ]
      }
    ]
  },

  // --- FASE 8 ---
  {
    id: 8,
    titulo: "Fase 08: Bagunça na Doceria",
    cenario: "doceria",
    descricao: "Bebeto está babando de sono e com cheiro de travesseiro mofado! Munch quer donuts e Flora quer companhia fofa.",
    grid: {
      rows: 2,
      cols: 4,
      tableGapAfterCol: 1
    },
    assentos: [
      { id: "s00", row: 0, col: 0, mesa: 1, classe: "banco-donuts", label: "Mesa 1-A" },
      { id: "s01", row: 0, col: 1, mesa: 1, classe: "banco-donuts", label: "Mesa 1-B" },
      { id: "s10", row: 1, col: 0, mesa: 1, classe: "banco-donuts", label: "Mesa 1-C" },
      { id: "s11", row: 1, col: 1, mesa: 1, classe: "banco-donuts", label: "Mesa 1-D" },
      { id: "s02", row: 0, col: 2, mesa: 2, classe: "banco-sorvete", label: "Mesa 2-A" },
      { id: "s03", row: 0, col: 3, mesa: 2, classe: "banco-sorvete", label: "Mesa 2-B" },
      { id: "s12", row: 1, col: 2, mesa: 2, classe: "banco-sorvete", label: "Mesa 2-C" },
      { id: "s13", row: 1, col: 3, mesa: 2, classe: "banco-sorvete", label: "Mesa 2-D" }
    ],
    elementos: [
      { type: "donut", row: 0, col: 0.5, text: "🍩 Donuts" },
      { type: "icecream", row: 0, col: 2.5, text: "🍦 Sorvete" }
    ],
    personagens: [
      {
        id: "bebeto",
        nome: "Bebeto",
        categoria: "Dorminhoco",
        genero: "Adulto",
        avatar: "bebeto",
        fedido: true, // FEDIDO!
        regras: [
          { tipo: "mesma_mesa_que", alvo: 2, texto: "Quero sentar na mesa do sorvete (mais fresca)." }
        ]
      },
      {
        id: "munch",
        nome: "Munch",
        categoria: "Glutão",
        genero: "Adulto",
        avatar: "munch",
        regras: [
          { tipo: "mesma_mesa_que", alvo: 1, texto: "Ficarei na mesa dos donuts." }
        ]
      },
      {
        id: "flora",
        nome: "Flora",
        categoria: "Jardinheira",
        genero: "Criança",
        avatar: "flora",
        regras: [
          { tipo: "evitar_fedido", texto: "Detesto cheiro de mofo! Longe do Bebeto." },
          { tipo: "mesma_mesa_que", alvo: 1, texto: "Quero sentar na mesa do donut." }
        ]
      },
      {
        id: "pipoca",
        nome: "Pipoca",
        categoria: "Pet",
        genero: "Bichinho",
        avatar: "pipoca",
        regras: [
          { tipo: "mesmo_grupo_que", alvo: "flora", texto: "Quero sentar na mesma mesa que a Flora." },
          { tipo: "evitar_fedido", texto: "Ai, que cheiro de mofo insuportável!" }
        ]
      }
    ]
  },

  // --- FASE 9 ---
  {
    id: 9,
    titulo: "Fase 09: Piquenique com Duplo Cheiro",
    cenario: "parque",
    descricao: "Oh não! Dois amigos andaram pisando em lama estragada: Gloop e Fuzz estão fedidos! Organize as toalhas.",
    grid: {
      rows: 3,
      cols: 3
    },
    obstaculos: [
      { id: "arvore", row: 0, col: 0, sprite: "🌳", label: "Árvore" },
      { id: "colmeia", row: 2, col: 2, sprite: "🐝", label: "Colmeia" }
    ],
    assentos: [
      { id: "s01", row: 0, col: 1, classe: "toalha-picnic", label: "T1" },
      { id: "s02", row: 0, col: 2, classe: "toalha-flores", label: "T2" },
      { id: "s10", row: 1, col: 0, classe: "toalha-picnic", label: "T3" },
      { id: "s11", row: 1, col: 1, classe: "toalha-picnic", label: "T4" },
      { id: "s12", row: 1, col: 2, classe: "toalha-picnic", label: "T5" },
      { id: "s20", row: 2, col: 0, classe: "toalha-flores", label: "T6" },
      { id: "s21", row: 2, col: 1, classe: "toalha-picnic", label: "T7" }
    ],
    personagens: [
      {
        id: "gloop",
        nome: "Gloop",
        categoria: "Esportista",
        genero: "Adulto",
        avatar: "gloop",
        fedido: true,
        regras: [
          { tipo: "linha", alvo: 0, texto: "Quero sentar na fileira de cima." }
        ]
      },
      {
        id: "fuzz",
        nome: "Fuzz",
        categoria: "Tímido",
        genero: "Criança",
        avatar: "fuzz",
        fedido: true,
        regras: [
          { tipo: "linha", alvo: 2, texto: "Quero sentar na fileira de baixo." }
        ]
      },
      {
        id: "flora",
        nome: "Flora",
        categoria: "Jardinheira",
        genero: "Criança",
        avatar: "flora",
        regras: [
          { tipo: "evitar_fedido", texto: "Quero toalhas cheirosas! Fique longe de Gloop e Fuzz." },
          { tipo: "classe", alvo: "toalha-flores", texto: "Quero toalha florida!" }
        ]
      },
      {
        id: "zizi",
        nome: "Zizi",
        categoria: "Leitora",
        genero: "Jovem",
        avatar: "zizi",
        regras: [
          { tipo: "evitar_fedido", texto: "Longe dos cheiros ruins!" },
          { tipo: "perto_obstaculo", alvo: "arvore", texto: "Gostaria de ler perto da árvore." }
        ]
      }
    ]
  },

  // --- FASE 10: LOTERIA ILUSTRE DISPONÍVEL ---
  {
    id: 10,
    titulo: "Fase 10: O Pôr do Sol na Praia",
    cenario: "praia",
    descricao: "O entardecer chegou! A partir desta fase, existe a chance de termos uma celebridade ilustre (⭐) no grupo!",
    grid: {
      rows: 2,
      cols: 4
    },
    assentos: [
      { id: "s00", row: 0, col: 0, classe: "toalha-azul", label: "Toldo A" },
      { id: "s01", row: 0, col: 1, classe: "toalha-azul", label: "Toldo B" },
      { id: "s02", row: 0, col: 2, classe: "toalha-amarela", label: "Toldo C" },
      { id: "s03", row: 0, col: 3, classe: "toalha-amarela", label: "Toldo D" },
      { id: "s10", row: 1, col: 0, classe: "toalha-azul", label: "Toldo E" },
      { id: "s11", row: 1, col: 1, classe: "toalha-azul", label: "Toldo F" },
      { id: "s12", row: 1, col: 2, classe: "toalha-amarela", label: "Toldo G" },
      { id: "s13", row: 1, col: 3, classe: "toalha-amarela", label: "Toldo H" }
    ],
    personagens: [
      {
        id: "flora",
        nome: "Flora",
        categoria: "Jardinheira",
        genero: "Criança",
        avatar: "flora",
        regras: [
          { tipo: "classe", alvo: "toalha-amarela", texto: "Quero sentar na toalha amarela." }
        ]
      },
      {
        id: "bebeto",
        nome: "Bebeto",
        categoria: "Dorminhoco",
        genero: "Adulto",
        avatar: "bebeto",
        regras: [
          { tipo: "linha", alvo: 1, texto: "Quero deitar nas toalhas da fileira de baixo." }
        ]
      },
      {
        id: "zizi",
        nome: "Zizi",
        categoria: "Leitora",
        genero: "Jovem",
        avatar: "zizi",
        regras: [
          { tipo: "perto_de", alvo: "flora", texto: "Quero ler conversando com a Flora." }
        ]
      },
      {
        id: "pipoca",
        nome: "Pipoca",
        categoria: "Pet",
        genero: "Bichinho",
        avatar: "pipoca",
        regras: [
          { tipo: "classe", alvo: "toalha-azul", texto: "Quero a toalha azul." }
        ]
      }
    ]
  },

  // --- FASE 11 ---
  {
    id: 11,
    titulo: "Fase 11: Ônibus de Dois Andares",
    cenario: "onibus",
    descricao: "Um ônibus maior com 4 fileiras! Bebeto quer dormir no fundo e Gloop quer a frente.",
    grid: {
      rows: 4,
      cols: 2,
      corridorAfterCol: 0
    },
    assentos: [
      { id: "s00", row: 0, col: 0, classe: "azul-janela", label: "F1-E" },
      { id: "s01", row: 0, col: 1, classe: "amarela-corredor", label: "F1-D" },
      { id: "s10", row: 1, col: 0, classe: "azul-janela", label: "F2-E" },
      { id: "s11", row: 1, col: 1, classe: "amarela-corredor", label: "F2-D" },
      { id: "s20", row: 2, col: 0, classe: "azul-janela", label: "F3-E" },
      { id: "s21", row: 2, col: 1, classe: "amarela-corredor", label: "F3-D" },
      { id: "s30", row: 3, col: 0, classe: "azul-janela", label: "F4-E" },
      { id: "s31", row: 3, col: 1, classe: "amarela-corredor", label: "F4-D" }
    ],
    personagens: [
      {
        id: "bebeto",
        nome: "Bebeto",
        categoria: "Dorminhoco",
        genero: "Adulto",
        avatar: "bebeto",
        regras: [
          { tipo: "linha", alvo: 3, texto: "Quero sentar na última fileira de trás." }
        ]
      },
      {
        id: "gloop",
        nome: "Gloop",
        categoria: "Esportista",
        genero: "Adulto",
        avatar: "gloop",
        regras: [
          { tipo: "linha", alvo: 0, texto: "Quero a primeira fileira da frente." }
        ]
      },
      {
        id: "zizi",
        nome: "Zizi",
        categoria: "Leitora",
        genero: "Jovem",
        avatar: "zizi",
        regras: [
          { tipo: "classe", alvo: "azul-janela", texto: "Quero assento azul na janela." },
          { tipo: "perto_de", alvo: "gloop", texto: "Quero sentar logo ao lado ou atrás do Gloop." }
        ]
      },
      {
        id: "fuzz",
        nome: "Fuzz",
        categoria: "Tímido",
        genero: "Criança",
        avatar: "fuzz",
        regras: [
          { tipo: "classe", alvo: "amarela-corredor", texto: "Prefiro corredor amarelo." }
        ]
      },
      {
        id: "pipoca",
        nome: "Pipoca",
        categoria: "Pet",
        genero: "Bichinho",
        avatar: "pipoca",
        regras: [
          { tipo: "perto_de", alvo: "fuzz", texto: "Quero ficar bem perto do Fuzz." }
        ]
      }
    ]
  },

  // --- FASE 12 ---
  {
    id: 12,
    titulo: "Fase 12: Estreia Especial",
    cenario: "cinema",
    descricao: "É a noite de estreia do filme Cozy! Temos muitos personagens. Pipoca quer o meio.",
    grid: {
      rows: 2,
      cols: 4
    },
    assentos: [
      { id: "s00", row: 0, col: 0, classe: "poltrona-vermelha", label: "Poltrona 1" },
      { id: "s01", row: 0, col: 1, classe: "poltrona-vermelha", label: "Poltrona 2" },
      { id: "s02", row: 0, col: 2, classe: "poltrona-vermelha", label: "Poltrona 3" },
      { id: "s03", row: 0, col: 3, classe: "poltrona-vermelha", label: "Poltrona 4" },
      { id: "s10", row: 1, col: 0, classe: "poltrona-vermelha", label: "Poltrona 5" },
      { id: "s11", row: 1, col: 1, classe: "poltrona-vermelha", label: "Poltrona 6" },
      { id: "s12", row: 1, col: 2, classe: "poltrona-vermelha", label: "Poltrona 7" },
      { id: "s13", row: 1, col: 3, classe: "poltrona-vermelha", label: "Poltrona 8" }
    ],
    personagens: [
      {
        id: "pipoca",
        nome: "Pipoca",
        categoria: "Pet",
        genero: "Bichinho",
        avatar: "pipoca",
        regras: [
          { tipo: "meio", texto: "Quero poltronas do meio." }
        ]
      },
      {
        id: "flora",
        nome: "Flora",
        categoria: "Jardinheira",
        genero: "Criança",
        avatar: "flora",
        regras: [
          { tipo: "ponta", texto: "Quero sentar na ponta esquerda ou direita." },
          { tipo: "linha", alvo: 1, texto: "Quero sentar na fileira de trás." }
        ]
      },
      {
        id: "gloop",
        nome: "Gloop",
        categoria: "Esportista",
        genero: "Adulto",
        avatar: "gloop",
        regras: [
          { tipo: "linha", alvo: 0, texto: "Quero a fileira da frente." }
        ]
      },
      {
        id: "zizi",
        nome: "Zizi",
        categoria: "Leitora",
        genero: "Jovem",
        avatar: "zizi",
        regras: [
          { tipo: "perto_de", alvo: "gloop", texto: "Quero ficar ao lado do Gloop." }
        ]
      },
      {
        id: "fuzz",
        nome: "Fuzz",
        categoria: "Tímido",
        genero: "Criança",
        avatar: "fuzz",
        regras: [
          { tipo: "longe_de", alvo: "gloop", texto: "Quero distância do energético Gloop." }
        ]
      }
    ]
  },

  // --- FASE 13 ---
  {
    id: 13,
    titulo: "Fase 13: Sorvetes e Mistérios",
    cenario: "doceria",
    descricao: "Mesa cheia de guloseimas! Munch quer donut e Gloop quer sorvete.",
    grid: {
      rows: 2,
      cols: 4,
      tableGapAfterCol: 1
    },
    assentos: [
      { id: "s00", row: 0, col: 0, mesa: 1, classe: "banco-donuts", label: "D1" },
      { id: "s01", row: 0, col: 1, mesa: 1, classe: "banco-donuts", label: "D2" },
      { id: "s10", row: 1, col: 0, mesa: 1, classe: "banco-donuts", label: "D3" },
      { id: "s11", row: 1, col: 1, mesa: 1, classe: "banco-donuts", label: "D4" },
      { id: "s02", row: 0, col: 2, mesa: 2, classe: "banco-sorvete", label: "S1" },
      { id: "s03", row: 0, col: 3, mesa: 2, classe: "banco-sorvete", label: "S2" },
      { id: "s12", row: 1, col: 2, mesa: 2, classe: "banco-sorvete", label: "S3" },
      { id: "s13", row: 1, col: 3, mesa: 2, classe: "banco-sorvete", label: "S4" }
    ],
    elementos: [
      { type: "donut", row: 0, col: 0.5, text: "🍩 Donuts" },
      { type: "icecream", row: 0, col: 2.5, text: "🍦 Sorvete" }
    ],
    personagens: [
      {
        id: "munch",
        nome: "Munch",
        categoria: "Glutão",
        genero: "Adulto",
        avatar: "munch",
        regras: [
          { tipo: "mesma_mesa_que", alvo: 1, texto: "Quero sentar na mesa do donut." }
        ]
      },
      {
        id: "gloop",
        nome: "Gloop",
        categoria: "Esportista",
        genero: "Adulto",
        avatar: "gloop",
        regras: [
          { tipo: "mesma_mesa_que", alvo: 2, texto: "Quero sentar na mesa do sorvete." }
        ]
      },
      {
        id: "flora",
        nome: "Flora",
        categoria: "Jardinheira",
        genero: "Criança",
        avatar: "flora",
        regras: [
          { tipo: "mesma_mesa_que", alvo: 1, texto: "Prefiro os donuts cheirosos." }
        ]
      },
      {
        id: "pipoca",
        nome: "Pipoca",
        categoria: "Pet",
        genero: "Bichinho",
        avatar: "pipoca",
        regras: [
          { tipo: "mesmo_grupo_que", alvo: "flora", texto: "Sentar na mesa da Flora." }
        ]
      },
      {
        id: "bebeto",
        nome: "Bebeto",
        categoria: "Dorminhoco",
        genero: "Adulto",
        avatar: "bebeto",
        regras: [
          { tipo: "frente_a_frente", alvo: "gloop", texto: "Sentar de frente para o Gloop na mesa 2." }
        ]
      }
    ]
  },

  // --- FASE 14 ---
  {
    id: 14,
    titulo: "Fase 14: A Colmeia Ativa",
    cenario: "parque",
    descricao: "Munch comeu doce de mel e ficou com as mãos grudentas e fedidas! Todos querem distância dele e da colmeia.",
    grid: {
      rows: 3,
      cols: 3
    },
    obstaculos: [
      { id: "colmeia", row: 2, col: 2, sprite: "🐝", label: "Colmeia" }
    ],
    assentos: [
      { id: "s00", row: 0, col: 0, classe: "toalha-picnic", label: "A1" },
      { id: "s01", row: 0, col: 1, classe: "toalha-picnic", label: "A2" },
      { id: "s02", row: 0, col: 2, classe: "toalha-flores", label: "A3" },
      { id: "s10", row: 1, col: 0, classe: "toalha-picnic", label: "A4" },
      { id: "s11", row: 1, col: 1, classe: "toalha-picnic", label: "A5" },
      { id: "s12", row: 1, col: 2, classe: "toalha-picnic", label: "A6" },
      { id: "s20", row: 2, col: 0, classe: "toalha-flores", label: "A7" },
      { id: "s21", row: 2, col: 1, classe: "toalha-picnic", label: "A8" }
    ],
    personagens: [
      {
        id: "munch",
        nome: "Munch",
        categoria: "Glutão",
        genero: "Adulto",
        avatar: "munch",
        fedido: true, // FEDIDO!
        regras: [
          { tipo: "posicao_especifica", alvo: { row: 1, col: 1 }, texto: "Quero sentar exatamente no centro." }
        ]
      },
      {
        id: "fuzz",
        nome: "Fuzz",
        categoria: "Tímido",
        genero: "Criança",
        avatar: "fuzz",
        regras: [
          { tipo: "evitar_fedido", texto: "Detesto mãos grudentas! Longe do Munch." },
          { tipo: "longe_obstaculo", alvo: "colmeia", texto: "Longe das abelhas!" }
        ]
      },
      {
        id: "pipoca",
        nome: "Pipoca",
        categoria: "Pet",
        genero: "Bichinho",
        avatar: "pipoca",
        regras: [
          { tipo: "evitar_fedido", texto: "Longe do mel fedido do Munch!" }
        ]
      },
      {
        id: "flora",
        nome: "Flora",
        categoria: "Jardinheira",
        genero: "Criança",
        avatar: "flora",
        regras: [
          { tipo: "classe", alvo: "toalha-flores", texto: "Quero deitar nas toalhas floridas." }
        ]
      }
    ]
  },

  // --- FASE 15 ---
  {
    id: 15,
    titulo: "Fase 15: O Segredo da Maré",
    cenario: "praia",
    descricao: "Fuzz e Bebeto dormiram no sol e estão exalando cheiro de protetor solar vencido (fedidos)!",
    grid: {
      rows: 2,
      cols: 4
    },
    assentos: [
      { id: "s00", row: 0, col: 0, classe: "toalha-azul", label: "A1" },
      { id: "s01", row: 0, col: 1, classe: "toalha-azul", label: "A2" },
      { id: "s02", row: 0, col: 2, classe: "toalha-amarela", label: "A3" },
      { id: "s03", row: 0, col: 3, classe: "toalha-amarela", label: "A4" },
      { id: "s10", row: 1, col: 0, classe: "toalha-azul", label: "A5" },
      { id: "s11", row: 1, col: 1, classe: "toalha-azul", label: "A6" },
      { id: "s12", row: 1, col: 2, classe: "toalha-amarela", label: "A7" },
      { id: "s13", row: 1, col: 3, classe: "toalha-amarela", label: "A8" }
    ],
    personagens: [
      {
        id: "fuzz",
        nome: "Fuzz",
        categoria: "Tímido",
        genero: "Criança",
        avatar: "fuzz",
        fedido: true,
        regras: [
          { tipo: "classe", alvo: "toalha-azul", texto: "Quero sentar na toalha azul." }
        ]
      },
      {
        id: "bebeto",
        nome: "Bebeto",
        categoria: "Dorminhoco",
        genero: "Adulto",
        avatar: "bebeto",
        fedido: true,
        regras: [
          { tipo: "classe", alvo: "toalha-amarela", texto: "Quero sentar na toalha amarela." }
        ]
      },
      {
        id: "zizi",
        nome: "Zizi",
        categoria: "Leitora",
        genero: "Jovem",
        avatar: "zizi",
        regras: [
          { tipo: "evitar_fedido", texto: "Longe desse protetor solar vencido!" },
          { tipo: "linha", alvo: 0, texto: "Quero a fileira de cima." }
        ]
      },
      {
        id: "pipoca",
        nome: "Pipoca",
        categoria: "Pet",
        genero: "Bichinho",
        avatar: "pipoca",
        regras: [
          { tipo: "evitar_fedido", texto: "Não suporto cheiro de química!" }
        ]
      }
    ]
  },

  // --- FASE 16 ---
  {
    id: 16,
    titulo: "Fase 16: Cinema com Formato 3x3",
    cenario: "cinema",
    descricao: "Um cinema quadrado 3x3! Flora quer a frente e Bebeto quer o fundo.",
    grid: {
      rows: 3,
      cols: 3
    },
    assentos: [
      { id: "s00", row: 0, col: 0, classe: "poltrona-vermelha", label: "P1" },
      { id: "s01", row: 0, col: 1, classe: "poltrona-vermelha", label: "P2" },
      { id: "s02", row: 0, col: 2, classe: "poltrona-vermelha", label: "P3" },
      { id: "s10", row: 1, col: 0, classe: "poltrona-vermelha", label: "P4" },
      { id: "s11", row: 1, col: 1, classe: "poltrona-vermelha", label: "P5" },
      { id: "s12", row: 1, col: 2, classe: "poltrona-vermelha", label: "P6" },
      { id: "s20", row: 2, col: 0, classe: "poltrona-vermelha", label: "P7" },
      { id: "s21", row: 2, col: 1, classe: "poltrona-vermelha", label: "P8" },
      { id: "s22", row: 2, col: 2, classe: "poltrona-vermelha", label: "P9" }
    ],
    personagens: [
      {
        id: "flora",
        nome: "Flora",
        categoria: "Jardinheira",
        genero: "Criança",
        avatar: "flora",
        regras: [
          { tipo: "linha", alvo: 0, texto: "Quero assistir na primeira fileira." }
        ]
      },
      {
        id: "bebeto",
        nome: "Bebeto",
        categoria: "Dorminhoco",
        genero: "Adulto",
        avatar: "bebeto",
        regras: [
          { tipo: "linha", alvo: 2, texto: "Ficarei na última fileira." }
        ]
      },
      {
        id: "gloop",
        nome: "Gloop",
        categoria: "Esportista",
        genero: "Adulto",
        avatar: "gloop",
        regras: [
          { tipo: "posicao_especifica", alvo: { row: 1, col: 1 }, texto: "Quero sentar na poltrona do centro absoluto." }
        ]
      },
      {
        id: "zizi",
        nome: "Zizi",
        categoria: "Leitora",
        genero: "Jovem",
        avatar: "zizi",
        regras: [
          { tipo: "perto_de", alvo: "gloop", texto: "Sentar ao lado ou à frente/atrás do Gloop." }
        ]
      }
    ]
  },

  // --- FASE 17 ---
  {
    id: 17,
    titulo: "Fase 17: Banquete Cheiroso na Doceria",
    cenario: "doceria",
    descricao: "Gloop e Munch comeram durian (a fruta fedida!) e estão com o hálito terrível. Flora e Zizi querem ar puro.",
    grid: {
      rows: 2,
      cols: 4,
      tableGapAfterCol: 1
    },
    assentos: [
      { id: "s00", row: 0, col: 0, mesa: 1, classe: "banco-donuts", label: "D1" },
      { id: "s01", row: 0, col: 1, mesa: 1, classe: "banco-donuts", label: "D2" },
      { id: "s10", row: 1, col: 0, mesa: 1, classe: "banco-donuts", label: "D3" },
      { id: "s11", row: 1, col: 1, mesa: 1, classe: "banco-donuts", label: "D4" },
      { id: "s02", row: 0, col: 2, mesa: 2, classe: "banco-sorvete", label: "S1" },
      { id: "s03", row: 0, col: 3, mesa: 2, classe: "banco-sorvete", label: "S2" },
      { id: "s12", row: 1, col: 2, mesa: 2, classe: "banco-sorvete", label: "S3" },
      { id: "s13", row: 1, col: 3, mesa: 2, classe: "banco-sorvete", label: "S4" }
    ],
    elementos: [
      { type: "donut", row: 0, col: 0.5, text: "🍩 Donuts" },
      { type: "icecream", row: 0, col: 2.5, text: "🍦 Sorvete" }
    ],
    personagens: [
      {
        id: "gloop",
        nome: "Gloop",
        categoria: "Esportista",
        genero: "Adulto",
        avatar: "gloop",
        fedido: true,
        regras: [
          { tipo: "mesma_mesa_que", alvo: 2, texto: "Quero sentar na mesa do sorvete." }
        ]
      },
      {
        id: "munch",
        nome: "Munch",
        categoria: "Glutão",
        genero: "Adulto",
        avatar: "munch",
        fedido: true,
        regras: [
          { tipo: "mesma_mesa_que", alvo: 1, texto: "Vou lanchar na mesa de donuts." }
        ]
      },
      {
        id: "flora",
        nome: "Flora",
        categoria: "Jardinheira",
        genero: "Criança",
        avatar: "flora",
        regras: [
          { tipo: "evitar_fedido", texto: "Socorro! Que hálito horrível de durian!" },
          { tipo: "mesma_mesa_que", alvo: 1, texto: "Ficarei na mesa do donut." }
        ]
      },
      {
        id: "zizi",
        nome: "Zizi",
        categoria: "Leitora",
        genero: "Jovem",
        avatar: "zizi",
        regras: [
          { tipo: "evitar_fedido", texto: "Quero respirar ar puro!" },
          { tipo: "mesma_mesa_que", alvo: 2, texto: "Ficarei na mesa do sorvete." }
        ]
      }
    ]
  },

  // --- FASE 18 ---
  {
    id: 18,
    titulo: "Fase 18: Lago e Parque",
    cenario: "parque",
    descricao: "O parque tem uma árvore agradável e uma colmeia. Bebeto e Fuzz caíram na lama e estão fedidos!",
    grid: {
      rows: 3,
      cols: 3
    },
    obstaculos: [
      { id: "arvore", row: 0, col: 0, sprite: "🌳", label: "Árvore" },
      { id: "colmeia", row: 2, col: 2, sprite: "🐝", label: "Colmeia" }
    ],
    assentos: [
      { id: "s01", row: 0, col: 1, classe: "toalha-picnic", label: "T1" },
      { id: "s02", row: 0, col: 2, classe: "toalha-flores", label: "T2" },
      { id: "s10", row: 1, col: 0, classe: "toalha-picnic", label: "T3" },
      { id: "s11", row: 1, col: 1, classe: "toalha-picnic", label: "T4" },
      { id: "s12", row: 1, col: 2, classe: "toalha-picnic", label: "T5" },
      { id: "s20", row: 2, col: 0, classe: "toalha-flores", label: "T6" },
      { id: "s21", row: 2, col: 1, classe: "toalha-picnic", label: "T7" }
    ],
    personagens: [
      {
        id: "bebeto",
        nome: "Bebeto",
        categoria: "Dorminhoco",
        genero: "Adulto",
        avatar: "bebeto",
        fedido: true,
        regras: [
          { tipo: "linha", alvo: 1, texto: "Dormirei na fileira do meio." }
        ]
      },
      {
        id: "fuzz",
        nome: "Fuzz",
        categoria: "Tímido",
        genero: "Criança",
        avatar: "fuzz",
        fedido: true,
        regras: [
          { tipo: "linha", alvo: 2, texto: "Quero a fileira de baixo." }
        ]
      },
      {
        id: "pipoca",
        nome: "Pipoca",
        categoria: "Pet",
        genero: "Bichinho",
        avatar: "pipoca",
        regras: [
          { tipo: "evitar_fedido", texto: "Ficarei longe da lama!" },
          { tipo: "longe_obstaculo", alvo: "colmeia", texto: "Medo de abelhas." }
        ]
      },
      {
        id: "flora",
        nome: "Flora",
        categoria: "Jardinheira",
        genero: "Criança",
        avatar: "flora",
        regras: [
          { tipo: "evitar_fedido", texto: "Cheiro de lama não entra nas minhas flores." },
          { tipo: "classe", alvo: "toalha-flores", texto: "Quero toalha florida." }
        ]
      }
    ]
  },

  // --- FASE 19 ---
  {
    id: 19,
    titulo: "Fase 19: Luau na Praia Cozy",
    cenario: "praia",
    descricao: "Munch e Fuzz comeram peixe defumado fedido! Organize o grupo no toldo.",
    grid: {
      rows: 2,
      cols: 4
    },
    assentos: [
      { id: "s00", row: 0, col: 0, classe: "toalha-azul", label: "TA1" },
      { id: "s01", row: 0, col: 1, classe: "toalha-azul", label: "TA2" },
      { id: "s02", row: 0, col: 2, classe: "toalha-amarela", label: "TA3" },
      { id: "s03", row: 0, col: 3, classe: "toalha-amarela", label: "TA4" },
      { id: "s10", row: 1, col: 0, classe: "toalha-azul", label: "TA5" },
      { id: "s11", row: 1, col: 1, classe: "toalha-azul", label: "TA6" },
      { id: "s12", row: 1, col: 2, classe: "toalha-amarela", label: "TA7" },
      { id: "s13", row: 1, col: 3, classe: "toalha-amarela", label: "TA8" }
    ],
    personagens: [
      {
        id: "munch",
        nome: "Munch",
        categoria: "Glutão",
        genero: "Adulto",
        avatar: "munch",
        fedido: true,
        regras: [
          { tipo: "classe", alvo: "toalha-amarela", texto: "Quero a toalha amarela." }
        ]
      },
      {
        id: "fuzz",
        nome: "Fuzz",
        categoria: "Tímido",
        genero: "Criança",
        avatar: "fuzz",
        fedido: true,
        regras: [
          { tipo: "classe", alvo: "toalha-azul", texto: "Quero a toalha azul." }
        ]
      },
      {
        id: "pipoca",
        nome: "Pipoca",
        categoria: "Pet",
        genero: "Bichinho",
        avatar: "pipoca",
        regras: [
          { tipo: "evitar_fedido", texto: "Cheiro forte de peixe! Fique longe." }
        ]
      },
      {
        id: "zizi",
        nome: "Zizi",
        categoria: "Leitora",
        genero: "Jovem",
        avatar: "zizi",
        regras: [
          { tipo: "evitar_fedido", texto: "Longe da fumaça de peixe!" },
          { tipo: "linha", alvo: 0, texto: "Ficarei na fileira de cima." }
        ]
      }
    ]
  },

  // --- FASE 20: O DESAFIO SUPREMO GERAL ---
  {
    id: 20,
    titulo: "Fase 20: A Grande Sessão de Gala Cozy",
    cenario: "cinema",
    descricao: "O Grande Encontro Geral no Cinema! 12 lugares, 8 personagens! Munch e Bebeto estão fedidos após um lanche pesado. Resolva o enigma final e zere o jogo!",
    grid: {
      rows: 3,
      cols: 4
    },
    assentos: [
      { id: "s00", row: 0, col: 0, classe: "poltrona-vermelha", label: "F1" },
      { id: "s01", row: 0, col: 1, classe: "poltrona-vermelha", label: "F2" },
      { id: "s02", row: 0, col: 2, classe: "poltrona-vermelha", label: "F3" },
      { id: "s03", row: 0, col: 3, classe: "poltrona-vermelha", label: "F4" },
      { id: "s10", row: 1, col: 0, classe: "poltrona-vermelha", label: "M1" },
      { id: "s11", row: 1, col: 1, classe: "poltrona-vermelha", label: "M2" },
      { id: "s12", row: 1, col: 2, classe: "poltrona-vermelha", label: "M3" },
      { id: "s13", row: 1, col: 3, classe: "poltrona-vermelha", label: "M4" },
      { id: "s20", row: 2, col: 0, classe: "poltrona-vermelha", label: "T1" },
      { id: "s21", row: 2, col: 1, classe: "poltrona-vermelha", label: "T2" },
      { id: "s22", row: 2, col: 2, classe: "poltrona-vermelha", label: "T3" },
      { id: "s23", row: 2, col: 3, classe: "poltrona-vermelha", label: "T4" }
    ],
    personagens: [
      {
        id: "munch",
        nome: "Munch",
        categoria: "Glutão",
        genero: "Adulto",
        avatar: "munch",
        fedido: true,
        regras: [
          { tipo: "linha", alvo: 0, texto: "Quero assistir bem da frente." },
          { tipo: "posicao_especifica", alvo: { row: 0, col: 0 }, texto: "Quero sentar especificamente no canto esquerdo da frente." }
        ]
      },
      {
        id: "bebeto",
        nome: "Bebeto",
        categoria: "Dorminhoco",
        genero: "Adulto",
        avatar: "bebeto",
        fedido: true,
        regras: [
          { tipo: "linha", alvo: 2, texto: "Dormirei na última fileira." }
        ]
      },
      {
        id: "zizi",
        nome: "Zizi",
        categoria: "Leitora",
        genero: "Jovem",
        avatar: "zizi",
        regras: [
          { tipo: "evitar_fedido", texto: "Detesto cheiros desagradáveis durante o filme!" },
          { tipo: "linha", alvo: 1, texto: "Quero sentar na fileira do meio." }
        ]
      },
      {
        id: "flora",
        nome: "Flora",
        categoria: "Jardinheira",
        genero: "Criança",
        avatar: "flora",
        regras: [
          { tipo: "evitar_fedido", texto: "Longe dos odores de pipoca estragada e sono!" },
          { tipo: "linha", alvo: 1, texto: "Prefiro a fileira do meio também." },
          { tipo: "perto_de", alvo: "zizi", texto: "Quero sentar ao lado da Zizi para dividirmos comentários." }
        ]
      },
      {
        id: "gloop",
        nome: "Gloop",
        categoria: "Esportista",
        genero: "Adulto",
        avatar: "gloop",
        regras: [
          { tipo: "linha", alvo: 0, texto: "Quero a fileira da frente para pular de alegria." },
          { tipo: "longe_de", alvo: "munch", texto: "Não quero sentar ao lado do Munch mastigador." }
        ]
      },
      {
        id: "fuzz",
        nome: "Fuzz",
        categoria: "Tímido",
        genero: "Criança",
        avatar: "fuzz",
        regras: [
          { tipo: "perto_de", alvo: "pipoca", texto: "Quero sentar ao lado do Pipoca." }
        ]
      },
      {
        id: "pipoca",
        nome: "Pipoca",
        categoria: "Pet",
        genero: "Bichinho",
        avatar: "pipoca",
        regras: [
          { tipo: "evitar_fedido", texto: "Nada de cheiros ruins no meu focinho fofo!" },
          { tipo: "linha", alvo: 2, texto: "Quero a fileira de trás." }
        ]
      }
    ]
  },

  // --- FASE 21 ---
  {
    id: 21,
    titulo: "Fase 21: A Praia Lotada",
    cenario: "praia",
    descricao: "Um dia super quente na praia com muita gente! Algumas pessoas comeram algo fedido e todos têm suas preferências.",
    grid: {
      rows: 2,
      cols: 4
    },
    assentos: [
      { id: "s00", row: 0, col: 0, classe: "toalha-azul", label: "T1" },
      { id: "s01", row: 0, col: 1, classe: "toalha-azul", label: "T2" },
      { id: "s02", row: 0, col: 2, classe: "toalha-amarela", label: "T3" },
      { id: "s03", row: 0, col: 3, classe: "toalha-amarela", label: "T4" },
      { id: "s10", row: 1, col: 0, classe: "toalha-azul", label: "T5" },
      { id: "s11", row: 1, col: 1, classe: "toalha-azul", label: "T6" },
      { id: "s12", row: 1, col: 2, classe: "toalha-amarela", label: "T7" },
      { id: "s13", row: 1, col: 3, classe: "toalha-amarela", label: "T8" }
    ],
    personagens: [
      {
        id: "munch",
        nome: "Munch",
        categoria: "Glutão",
        genero: "Adulto",
        avatar: "munch",
        fedido: true,
        regras: [
          { tipo: "classe", alvo: "toalha-azul", texto: "Quero sentar em uma toalha azul." }
        ]
      },
      {
        id: "bebeto",
        nome: "Bebeto",
        categoria: "Dorminhoco",
        genero: "Adulto",
        avatar: "bebeto",
        fedido: true,
        regras: [
          { tipo: "ponta", texto: "Quero ficar em uma das pontas para não me incomodarem." }
        ]
      },
      {
        id: "flora",
        nome: "Flora",
        categoria: "Jardinheira",
        genero: "Criança",
        avatar: "flora",
        regras: [
          { tipo: "evitar_fedido", texto: "Longe dos cheiros ruins!" },
          { tipo: "classe", alvo: "toalha-amarela", texto: "Gosto mais da toalha amarela." }
        ]
      },
      {
        id: "zizi",
        nome: "Zizi",
        categoria: "Leitora",
        genero: "Jovem",
        avatar: "zizi",
        regras: [
          { tipo: "evitar_fedido", texto: "Quero ler em paz, sem odores estranhos." },
          { tipo: "perto_de", alvo: "flora", texto: "Gosto de ficar perto da Flora." }
        ]
      },
      {
        id: "gloop",
        nome: "Gloop",
        categoria: "Esportista",
        genero: "Adulto",
        avatar: "gloop",
        regras: [
          { tipo: "meio", texto: "Quero sentar no meio para observar todos." },
          { tipo: "longe_de", alvo: "bebeto", texto: "Bebeto ronca, quero distância." }
        ]
      },
      {
        id: "pipoca",
        nome: "Pipoca",
        categoria: "Pet",
        genero: "Bichinho",
        avatar: "pipoca",
        regras: [
          { tipo: "linha", alvo: 0, texto: "Quero a fileira da frente para ver as ondas." },
          { tipo: "perto_de", alvo: "munch", texto: "Munch sempre derruba comida, quero ficar perto dele!" }
        ]
      }
    ]
  },

  // --- FASE 22 ---
  {
    id: 22,
    titulo: "Fase 22: O Mistério da Maré Alta",
    cenario: "praia",
    descricao: "O desafio final na praia! As posições exigem atenção máxima, e temos 2 personagens fedidos limitando as opções dos mais sensíveis.",
    grid: {
      rows: 2,
      cols: 4
    },
    assentos: [
      { id: "s00", row: 0, col: 0, classe: "toalha-azul", label: "T1" },
      { id: "s01", row: 0, col: 1, classe: "toalha-azul", label: "T2" },
      { id: "s02", row: 0, col: 2, classe: "toalha-amarela", label: "T3" },
      { id: "s03", row: 0, col: 3, classe: "toalha-amarela", label: "T4" },
      { id: "s10", row: 1, col: 0, classe: "toalha-azul", label: "T5" },
      { id: "s11", row: 1, col: 1, classe: "toalha-azul", label: "T6" },
      { id: "s12", row: 1, col: 2, classe: "toalha-amarela", label: "T7" },
      { id: "s13", row: 1, col: 3, classe: "toalha-amarela", label: "T8" }
    ],
    personagens: [
      {
        id: "gloop",
        nome: "Gloop",
        categoria: "Esportista",
        genero: "Adulto",
        avatar: "gloop",
        fedido: true,
        regras: [
          { tipo: "coluna", alvo: 0, texto: "Quero ficar logo na primeira coluna." }
        ]
      },
      {
        id: "fuzz",
        nome: "Fuzz",
        categoria: "Tímido",
        genero: "Criança",
        avatar: "fuzz",
        fedido: true,
        regras: [
          { tipo: "coluna", alvo: 3, texto: "Vou ficar na última coluna, escondidinho." }
        ]
      },
      {
        id: "zizi",
        nome: "Zizi",
        categoria: "Leitora",
        genero: "Jovem",
        avatar: "zizi",
        regras: [
          { tipo: "evitar_fedido", texto: "Longe dos cheiros ruins!" },
          { tipo: "linha", alvo: 0, texto: "Fileira de cima, por favor." }
        ]
      },
      {
        id: "flora",
        nome: "Flora",
        categoria: "Jardinheira",
        genero: "Criança",
        avatar: "flora",
        regras: [
          { tipo: "evitar_fedido", texto: "Também não gosto de odores desagradáveis." },
          { tipo: "linha", alvo: 1, texto: "Fileira de baixo para mim." }
        ]
      },
      {
        id: "bebeto",
        nome: "Bebeto",
        categoria: "Dorminhoco",
        genero: "Adulto",
        avatar: "bebeto",
        regras: [
          { tipo: "longe_de", alvo: "gloop", texto: "Quero ficar o mais longe possível do Gloop." },
          { tipo: "classe", alvo: "toalha-azul", texto: "A toalha azul é mais macia." }
        ]
      },
      {
        id: "pipoca",
        nome: "Pipoca",
        categoria: "Pet",
        genero: "Bichinho",
        avatar: "pipoca",
        regras: [
          { tipo: "perto_de", alvo: "zizi", texto: "Quero sentar ao lado da Zizi." },
          { tipo: "classe", alvo: "toalha-amarela", texto: "Prefiro toalha amarela." }
        ]
      },
      {
        id: "munch",
        nome: "Munch",
        categoria: "Glutão",
        genero: "Adulto",
        avatar: "munch",
        regras: [
          { tipo: "meio", texto: "Quero os assentos do meio, perto das caixas de lanche." }
        ]
      }
    ]
  }
];
