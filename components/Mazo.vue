<template>
    <div class="deck-container">
        <button class="shuffle-button" @click="$emit('restart-game')">Reiniciar</button>
        <div class="deck" @click="dealCards">
        <div v-if="deck.length > 0" class="card-back">🂠</div>
      </div>
      <div class="discard-pile">
        <Carta class="carta"
  v-for="(card, index) in wastePile"
  :key="`${card.rank}-${card.suit}`"
  :rank="card.rank"
  :suit="card.suit"
  :isFaceUp="true"
  :draggable="index === wastePile.slice(-3).length - 1" 
  @dragstart="() => startDrag(card, index)"
  />


      </div>
    </div>
  </template>
  
  <script>
  import Carta from "./Carta.vue";
  
  export default {
  name: "Mazo",
  components: { Carta },
  data() {
    return {
      deck: [],
      wastePile: []
    };
  },
  methods: {
    initializeDeck() {
      const suits = ["hearts", "diamonds", "clubs", "spades"];
      const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

      this.deck = suits.flatMap((suit) =>
        ranks.map((rank) => ({ suit, rank, isFaceUp: false }))
      );
      this.shuffleDeck();
    },
    setDeck(deck) {
      this.deck = deck || [];  // 🔥 Se asegura de que el mazo sea actualizado correctamente
  },
    shuffleDeck() {
      this.deck.sort(() => Math.random() - 0.5);
    },

    dealCards() {
    if (!this.deck.length && this.wastePile.length) {
        this.deck = this.wastePile.reverse().map(card => ({ ...card, isFaceUp: false }));
        this.wastePile = [];
        return;
    }

    if (this.deck.length === 0) return;

    const dealtCards = this.deck.splice(-3).map((card) => ({ ...card, isFaceUp: true }));
    this.wastePile.push(...dealtCards);
    this.$emit("cards-dealt", dealtCards);
},

    startDrag(card, index) {
      if (index === this.wastePile.length - 1) {
        this.$emit("drag-start", { card, pileIndex: "waste", index });
      }
    }
  },
  mounted() {
    this.initializeDeck();
  }
};

  </script>
  
  <style scoped>
  .deck-container {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
  .shuffle-button {
    background-color: #4caf50;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    cursor: pointer;
  }
  .deck {
    width: 4rem;
    height: 6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
  }
  .card-back {
    background-color: #08aabf;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
  }
  .discard-pile {
  position: relative;
  width: 4rem;
  height: 6rem;
}

.discard-pile .carta {
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.2s ease-in-out;
}

/* Ajustar la posición de cada carta para dar un efecto de apilamiento */
.discard-pile .carta:nth-child(1) {
  transform: translateX(0px);
}
.discard-pile .carta:nth-child(2) {
  transform: translateX(20px);
}
.discard-pile .carta:nth-child(3) {
  transform: translateX(40px);
}
  </style>