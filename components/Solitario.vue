<template>
    <div class="solitario-container">
        <Mazo @cards-dealt="handleCardsDealt" @drag-start="handleDragStart" @restart-game="restartGame" ref="mazo"  />
        <div class="game-area">
        <Fundacion
          :fundaciones="fundaciones"
          @fundaciones-click="handleFoundationClick"
          @drag-start="handleDragStart"
          @drop-card="handleDropCardToFoundation"
        />
        <Tabla
          :tableau="tableau"
          @card-click="handleTableauCardClick"
          @pile-click="handleTableauPileClick"
          @card-moved="handleCardMoved"
          @drag-start="handleDragStart"
          @drop-card="handleDropCard"
        />
      </div>
    </div>
  </template>
  
  <script>
  import Mazo from "./Mazo.vue";
  import Fundacion from "./Fundacion.vue";
  import Tabla from "./Tabla.vue";
  
  export default {
    name: "Solitario",
    components: {
      Mazo,
      Fundacion,
      Tabla,
    },
    data() {
      return {
        fundaciones: [[], [], [], []],
        tableau: [[], [], [], [], [], [], []],
        draggedCard: null,
        draggedFromPile: null,
      };
    },
    methods: {
        initializeGame() {
  this.fundaciones = [[], [], [], []];
  this.tableau = [[], [], [], [], [], [], []];

  const suits = ["hearts", "diamonds", "clubs", "spades"];
  const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  
  // Crear una baraja única sin duplicados
  let deck = suits.flatMap(suit =>
    ranks.map(rank => ({ suit, rank, isFaceUp: false }))
  );

  // Barajar las cartas (Fisher-Yates Shuffle)
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  // Repartir cartas al tableau
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j <= i; j++) {
      const card = deck.pop();
      card.isFaceUp = j === i;
      this.tableau[i].push(card);
    }
  }

  // Guardar el mazo restante en Mazo.vue
  this.$refs.mazo.setDeck(deck);
}
,
restartGame() {
    console.log("🔄 Reiniciando juego...");

    // Resetear fundaciones y tableau
    this.fundaciones = [[], [], [], []];
    this.tableau = [[], [], [], [], [], [], []];
    this.draggedCard = null;

    // Asegurar que el mazo y la pila de descarte se reinicien correctamente
    if (this.$refs.mazo) {
      this.$refs.mazo.deck = [];
      this.$refs.mazo.wastePile = [];
      this.$refs.mazo.initializeDeck();
    }

    // Inicializar el juego nuevamente
    this.initializeGame();
  },
      
      handleCardsDealt(cards) {
        console.log("Cards dealt:", cards);
      },
      handleFoundationClick(index) {
        console.log("Foundation clicked:", index);
      },
      handleTableauCardClick({ pileIndex, card, index }) {
        console.log("Tableau card clicked:", pileIndex, card, index);
      },
      handleTableauPileClick(pileIndex) {
        console.log("Tableau pile clicked:", pileIndex);
      },
      handleCardMoved({ fromPile, toPile, card }) {
        // Remove card from the source pile
        const fromIndex = this.tableau[fromPile].findIndex((c) => c === card);
        if (fromIndex > -1) {
          this.tableau[fromPile].splice(fromIndex, 1);
        }
  
        // Add card to the destination pile
        this.tableau[toPile].push(card);
  
        // Reveal the top card of the source pile
        if (this.tableau[fromPile].length > 0) {
          this.tableau[fromPile][this.tableau[fromPile].length - 1].isFaceUp = true;
        }
      },
      handleMoveCardToFoundation({ card, foundationIndex }) {
        this.foundations[foundationIndex].push(card);
      },
      handleDragStart({ card, pileIndex, index }) {
        this.draggedCard = { card, pileIndex, index };
      },
      handleDropCard(targetPile) {
  if (!this.draggedCard) return;

  const { card, pileIndex, index } = this.draggedCard;
  const targetPileCards = this.tableau[targetPile];

  if (
    (targetPileCards.length === 0 && card.rank === "K") || 
    (targetPileCards.length > 0 && this.isValidMove(targetPileCards[targetPileCards.length - 1], card))
  ) {
    if (pileIndex === "waste") {
      // 🔥 Remover la carta correctamente del wastePile
      const movedCard = this.$refs.mazo.wastePile.splice(index, 1)[0];
      this.tableau[targetPile].push(movedCard);
    } else {
      // Movimiento dentro del tableau
      const cardsToMove = this.tableau[pileIndex].splice(index);
      this.tableau[targetPile].push(...cardsToMove);
    }

    // Revelar la carta superior de la pila de origen
    if (pileIndex !== "waste" && this.tableau[pileIndex].length > 0) {
      this.tableau[pileIndex][this.tableau[pileIndex].length - 1].isFaceUp = true;
    }
  }

  this.draggedCard = null;
}
,
handleDropCardToFoundation(foundationIndex) {
  if (!this.draggedCard) return;

  const { card, pileIndex, index } = this.draggedCard;
  const foundationPile = this.fundaciones[foundationIndex];

  if (this.isValidFoundationMove(foundationPile, card)) {
    this.fundaciones[foundationIndex].push(card);

    if (pileIndex === "waste") {
      // 🔥 Remover la carta correctamente del wastePile
      this.$refs.mazo.wastePile.splice(index, 1);
    } else {
      // 🔥 Remover la carta correctamente del tableau
      this.tableau[pileIndex].splice(index, 1);

      // Revelar la carta superior de la pila de origen
      if (this.tableau[pileIndex].length > 0) {
        this.tableau[pileIndex][this.tableau[pileIndex].length - 1].isFaceUp = true;
      }
    }
  }

  this.draggedCard = null;
}
},
isValidMove(topCard, draggedCard) {
  const colors = { hearts: "red", diamonds: "red", clubs: "black", spades: "black" };
  const values = { A: 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10, J: 11, Q: 12, K: 13 };
  return colors[topCard.suit] !== colors[draggedCard.suit] && values[topCard.rank] === values[draggedCard.rank] + 1;
},
isValidFoundationMove(foundationPile, card) {
  const values = { A: 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10, J: 11, Q: 12, K: 13 };

  if (foundationPile.length === 0) {
    return card.rank === "A";  // Un As puede iniciar cualquier fundación
  } else {
    const topCard = foundationPile[foundationPile.length - 1];
    return topCard.suit === card.suit &&
           values[topCard.rank] === values[card.rank] - 1;
  }
},
mounted() {
  this.initializeGame();
  this.$nextTick(() => {
    if (this.$refs.mazo) {
      this.$refs.mazo.setDeck(this.deck);
    }
  });
},
  };
  </script>
  
  <style scoped>
  .solitario-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
  }
  
  .game-area {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }
  
  @media (min-width: 768px) {
    .game-area {
      flex-direction: row;
      justify-content: space-between;
    }
  }
  </style>