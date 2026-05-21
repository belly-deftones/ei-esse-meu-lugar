// Níveis do jogo "Ei! Esse é meu lugar"
// Cada nível define a temática, o layout dos assentos, elementos especiais e as regras dos personagens.

window.LEVELS = [
  {
    id: 1,
    titulo: "Fase 01: O Ônibus Escolar",
    cenario: "onibus",
    descricao: "Ajude a turma a se acomodar para a excursão escolar! O lado esquerdo tem assentos azuis da janela (lado do time de futebol da escola), e o lado direito tem assentos amarelos do corredor.",
    // Matriz 3x2: 3 fileiras, 2 colunas.
    // Coluna 0: Esquerda (Janela - Azul). Coluna 1: Direita (Corredor - Amarela).
    grid: {
      rows: 3,
      cols: 2,
      corridorAfterCol: 0 // desenha um corredor visual após a coluna 0
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
          { tipo: "coluna", alvo: 0, texto: "Eu torço para o time da casa! Quero sentar no lado esquerdo (azul)." },
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
          { tipo: "linha", alvo: 0, texto: "Quero sentar na fileira da frente para ver o motorista!" }
        ]
      }
    ]
  },
  {
    id: 2,
    titulo: "Fase 02: O Cinema Cozy",
    cenario: "cinema",
    descricao: "As luzes vão se apagar! Acomode o grupo no cinema. A fileira superior (Frente) fica bem perto da tela gigante, e a fileira inferior (Fundo) é perfeita para quem quer sossego.",
    // Matriz 2x4: 2 fileiras, 4 colunas.
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
          { tipo: "linha", alvo: 0, texto: "Quero ver a tela gigante de perto (fileira da frente)!" }
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
          { tipo: "ponta", texto: "Quero sentar em uma das pontas do cinema para poder apoiar a cabeça." }
        ]
      },
      {
        id: "zizi",
        nome: "Zizi",
        categoria: "Leitora",
        genero: "Jovem",
        avatar: "zizi",
        regras: [
          { tipo: "meio", texto: "Prefiro os assentos do meio para ter a melhor simetria visual da tela." }
        ]
      },
      {
        id: "munch",
        nome: "Munch",
        categoria: "Glutão",
        genero: "Adulto",
        avatar: "munch",
        regras: [
          { tipo: "longe_de", alvo: "bebeto", texto: "Quero comer pipoca longe do Bebeto para não acordá-lo." }
        ]
      }
    ]
  },
  {
    id: 3,
    titulo: "Fase 03: A Loja de Doces do Munch",
    cenario: "doceria",
    descricao: "Hora do lanche doce! Temos duas mesas no estilo Booth Americano. A Mesa da Esquerda serve deliciosos Donuts Coloridos e a Mesa da Direita serve Sorvetes Gigantes.",
    // Matriz 2x4.
    // Colunas 0 e 1 pertencem à Mesa 1 (Donuts). Colunas 2 e 3 pertencem à Mesa 2 (Sorvete).
    grid: {
      rows: 2,
      cols: 4,
      tableGapAfterCol: 1 // gap especial para separar as mesas
    },
    assentos: [
      { id: "s00", row: 0, col: 0, mesa: 1, classe: "banco-donuts", label: "Mesa Donuts (Canto Superior Esquerdo)" },
      { id: "s01", row: 0, col: 1, mesa: 1, classe: "banco-donuts", label: "Mesa Donuts (Canto Superior Direito)" },
      { id: "s10", row: 1, col: 0, mesa: 1, classe: "banco-donuts", label: "Mesa Donuts (Canto Inferior Esquerdo)" },
      { id: "s11", row: 1, col: 1, mesa: 1, classe: "banco-donuts", label: "Mesa Donuts (Canto Inferior Direito)" },
      { id: "s02", row: 0, col: 2, mesa: 2, classe: "banco-sorvete", label: "Mesa Sorvete (Canto Superior Esquerdo)" },
      { id: "s03", row: 0, col: 3, mesa: 2, classe: "banco-sorvete", label: "Mesa Sorvete (Canto Superior Direito)" },
      { id: "s12", row: 1, col: 2, mesa: 2, classe: "banco-sorvete", label: "Mesa Sorvete (Canto Inferior Esquerdo)" },
      { id: "s13", row: 1, col: 3, mesa: 2, classe: "banco-sorvete", label: "Mesa Sorvete (Canto Inferior Direito)" }
    ],
    elementos: [
      { type: "donut", row: 0, col: 0.5, text: "🍩 Donut Colorido" },
      { type: "icecream", row: 0, col: 2.5, text: "🍦 Sorvete de Casquinha" }
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
          { tipo: "mesma_mesa_que", alvo: 2, texto: "Quero muito tomar um sorvete! Quero a mesa do sorvete." }
        ]
      },
      {
        id: "zizi",
        nome: "Zizi",
        categoria: "Leitora",
        genero: "Jovem",
        avatar: "zizi",
        regras: [
          { tipo: "frente_a_frente", alvo: "pipoca", texto: "Quero sentar de frente para o Pipoca para conversarmos." }
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
          { tipo: "longe_de", alvo: "munch", texto: "Não quero sentar ao lado do Munch. Ele come doces fazendo muito barulho!" }
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
  {
    id: 4,
    titulo: "Fase 04: Piquenique no Parque",
    cenario: "parque",
    descricao: "O dia está lindo no parque! Espalhe as toalhas na grama verde. Mas cuidado: há uma árvore com uma sombra deliciosa e também uma colmeia com abelhas zumbindo!",
    // Matriz 3x3.
    // Célula (0,0) é a árvore (Obstáculo). Célula (2,2) é a colmeia (Obstáculo).
    // As outras 7 células são toalhas de piquenique livres para sentar.
    grid: {
      rows: 3,
      cols: 3
    },
    obstaculos: [
      { id: "arvore", row: 0, col: 0, sprite: "🌳", label: "Árvore (Sombra)" },
      { id: "colmeia", row: 2, col: 2, sprite: "🐝", label: "Colmeia (Cuidado!)" }
    ],
    assentos: [
      { id: "s01", row: 0, col: 1, classe: "toalha-picnic", label: "Toalha da Frente (Meio)" },
      { id: "s02", row: 0, col: 2, classe: "toalha-flores", label: "Toalha Florida (Direita)" },
      { id: "s10", row: 1, col: 0, classe: "toalha-picnic", label: "Toalha do Meio (Esquerda)" },
      { id: "s11", row: 1, col: 1, classe: "toalha-picnic", label: "Toalha Central" },
      { id: "s12", row: 1, col: 2, classe: "toalha-picnic", label: "Toalha do Meio (Direita)" },
      { id: "s20", row: 2, col: 0, classe: "toalha-flores", label: "Toalha Florida (Esquerda)" },
      { id: "s21", row: 2, col: 1, classe: "toalha-picnic", label: "Toalha de Trás (Meio)" }
    ],
    personagens: [
      {
        id: "fuzz",
        nome: "Fuzz",
        categoria: "Tímido",
        genero: "Criança",
        avatar: "fuzz",
        regras: [
          { tipo: "longe_obstaculo", alvo: "colmeia", texto: "Tenho medo de abelhas! Não quero sentar adjacente à Colmeia." }
        ]
      },
      {
        id: "zizi",
        nome: "Zizi",
        categoria: "Leitora",
        genero: "Jovem",
        avatar: "zizi",
        regras: [
          { tipo: "perto_obstaculo", alvo: "arvore", texto: "Quero sentar bem perto da árvore para ler na sombra." }
        ]
      },
      {
        id: "gloop",
        nome: "Gloop",
        categoria: "Esportista",
        genero: "Adulto",
        avatar: "gloop",
        regras: [
          { tipo: "perto_de", alvo: "zizi", texto: "Quero sentar bem ao lado ou de frente para a Zizi." }
        ]
      },
      {
        id: "pipoca",
        nome: "Pipoca",
        categoria: "Pet",
        genero: "Bichinho",
        avatar: "pipoca",
        regras: [
          { tipo: "longe_obstaculo", alvo: "arvore", texto: "Não quero sentar perto da árvore (muito úmido)." },
          { tipo: "longe_obstaculo", alvo: "colmeia", texto: "Não quero sentar perto da colmeia de jeito nenhum!" }
        ]
      },
      {
        id: "munch",
        nome: "Munch",
        categoria: "Glutão",
        genero: "Adulto",
        avatar: "munch",
        regras: [
          { tipo: "posicao_especifica", alvo: { row: 1, col: 1 }, texto: "Quero sentar exatamente na toalha bem no centro do parque." }
        ]
      },
      {
        id: "bebeto",
        nome: "Bebeto",
        categoria: "Dorminhoco",
        genero: "Adulto",
        avatar: "bebeto",
        regras: [
          { tipo: "longe_de", alvo: "munch", texto: "Quero tirar um cochilo longe das mastigações do Munch." }
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
  }
];
