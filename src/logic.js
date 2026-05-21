// Validador de Regras Lógicas de "Ei! Esse é meu lugar"
// Avalia as posições dos personagens no grid em tempo real e retorna o status de cada regra.

window.LogicEngine = {
  // Retorna a distância de Manhattan entre duas coordenadas
  getDistance(posA, posB) {
    if (!posA || !posB) return Infinity;
    return Math.abs(posA.row - posB.row) + Math.abs(posA.col - posB.col);
  },

  // Valida todas as regras de todos os personagens com base no estado atual do jogo
  // placedMap: mapa de { [personagemId]: assentoObjeto }
  validate(level, placedMap) {
    const result = {
      levelCompleted: false,
      characterStates: {}
    };

    let allCharactersPlaced = true;
    let allRulesSatisfied = true;
    const levelCharacters = level.personagens;

    // Primeiro, vamos verificar quais personagens estão posicionados
    levelCharacters.forEach(char => {
      const seat = placedMap[char.id];
      if (!seat) {
        allCharactersPlaced = false;
      }
    });

    // Validar regras para cada personagem
    levelCharacters.forEach(char => {
      const seat = placedMap[char.id];
      const rulesStatus = [];
      let charAllSatisfied = true;

      // Se o personagem não está sentado, suas regras não são consideradas satisfeitas
      if (!seat) {
        char.regras.forEach(rule => {
          rulesStatus.push({
            texto: rule.texto,
            satisfied: false
          });
        });
        result.characterStates[char.id] = {
          placed: false,
          allSatisfied: false,
          rules: rulesStatus,
          mood: "neutral" // Esperando nas reservas
        };
        allRulesSatisfied = false;
        return;
      }

      // Validar cada regra individualmente
      char.regras.forEach(rule => {
        let satisfied = false;

        switch (rule.tipo) {
          case "coluna":
            satisfied = (seat.col === rule.alvo);
            break;

          case "linha":
            satisfied = (seat.row === rule.alvo);
            break;

          case "classe":
            satisfied = (seat.classe === rule.alvo);
            break;

          case "classe_negativa":
            satisfied = (seat.classe !== rule.alvo);
            break;

          case "ponta":
            satisfied = (seat.col === 0 || seat.col === level.grid.cols - 1);
            break;

          case "meio":
            satisfied = (seat.col > 0 && seat.col < level.grid.cols - 1);
            break;

          case "posicao_especifica":
            satisfied = (seat.row === rule.alvo.row && seat.col === rule.alvo.col);
            break;

          case "perto_de": {
            const targetSeat = placedMap[rule.alvo];
            if (targetSeat) {
              satisfied = (this.getDistance(seat, targetSeat) === 1);
            } else {
              satisfied = false; // Se o amigo não foi posicionado, fica insatisfeito
            }
            break;
          }

          case "longe_de": {
            const targetSeat = placedMap[rule.alvo];
            if (targetSeat) {
              satisfied = (this.getDistance(seat, targetSeat) > 1);
            } else {
              satisfied = true; // Se o alvo não foi posicionado, está tecnicamente longe
            }
            break;
          }

          case "nao_atras_de": {
            const targetSeat = placedMap[rule.alvo];
            if (targetSeat) {
              // 'Atrás' significa mesma coluna e linha imediatamente posterior (+1)
              const isBehind = (targetSeat.col === seat.col && targetSeat.row === seat.row - 1);
              satisfied = !isBehind;
            } else {
              satisfied = true;
            }
            break;
          }

          case "mesma_mesa_que":
            // Compara com o ID da mesa física (1 ou 2)
            satisfied = (seat.mesa === rule.alvo);
            break;

          case "mesmo_grupo_que": {
            const targetSeat = placedMap[rule.alvo];
            if (targetSeat) {
              satisfied = (seat.mesa === targetSeat.mesa);
            } else {
              satisfied = false;
            }
            break;
          }

          case "frente_a_frente": {
            const targetSeat = placedMap[rule.alvo];
            if (targetSeat) {
              // Sentados na mesma mesa, mesma coluna (lado a lado no grid, ou seja, de frente no booth),
              // e em linhas diferentes (uma em cima, outra embaixo)
              satisfied = (seat.mesa === targetSeat.mesa && seat.col === targetSeat.col && seat.row !== targetSeat.row);
            } else {
              satisfied = false;
            }
            break;
          }

          case "longe_obstaculo": {
            const obstaculo = level.obstaculos ? level.obstaculos.find(o => o.id === rule.alvo) : null;
            if (obstaculo) {
              satisfied = (this.getDistance(seat, obstaculo) > 1);
            } else {
              satisfied = true;
            }
            break;
          }

          case "perto_obstaculo": {
            const obstaculo = level.obstaculos ? level.obstaculos.find(o => o.id === rule.alvo) : null;
            if (obstaculo) {
              satisfied = (this.getDistance(seat, obstaculo) === 1);
            } else {
              satisfied = false;
            }
            break;
          }

          default:
            satisfied = true;
            break;
        }

        if (!satisfied) {
          charAllSatisfied = false;
          allRulesSatisfied = false;
        }

        rulesStatus.push({
          texto: rule.texto,
          satisfied: satisfied
        });
      });

      result.characterStates[char.id] = {
        placed: true,
        allSatisfied: charAllSatisfied,
        rules: rulesStatus,
        mood: charAllSatisfied ? "happy" : "sad"
      };
    });

    // O nível só é resolvido se TODOS os personagens estiverem no tabuleiro E TODAS as regras estiverem cumpridas
    result.levelCompleted = allCharactersPlaced && allRulesSatisfied;

    return result;
  }
};
