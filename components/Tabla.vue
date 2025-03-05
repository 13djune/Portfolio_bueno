<template>
  <div class="tableau-container">
    <Pila
      v-for="(pile, index) in tableau"
      :key="index"
      :cards="pile"
      :pileIndex="index"
      @drag-start="handleDragStart"
      @drop-card="handleDropCard"
    />
  </div>
</template>

<script>
import Pila from "./Pila.vue";

export default {
  name: "Tabla",
  components: { Pila },
  props: {
    tableau: Array,
  },
  data() {
    return {
      draggedCard: null,
      draggedFromPile: null,
    };
  },
  methods: {
    handleDragStart({ card, pileIndex, index }) {
      this.draggedCard = { card, pileIndex, index };
    },
    handleDropCard(targetPile) {
  if (!this.draggedCard) return;
  
  const { pileIndex, index } = this.draggedCard;
  const targetPileCards = this.tableau[targetPile];
  const cardsToMove = this.tableau[pileIndex].splice(index);

  if (
    (targetPileCards.length === 0 && cardsToMove[0].rank === "K") ||
    (targetPileCards.length > 0 && this.isValidMove(targetPileCards[targetPileCards.length - 1], cardsToMove[0]))
  ) {
    this.tableau[targetPile].push(...cardsToMove);

    // Revelar la carta superior de la pila de origen
    if (this.tableau[pileIndex].length > 0) {
      this.tableau[pileIndex][this.tableau[pileIndex].length - 1].isFaceUp = true;
    }
  } else {
    // Si el movimiento no es válido, regresar las cartas al lugar original
    this.tableau[pileIndex].push(...cardsToMove);
  }

  this.draggedCard = null;
}
,
    isValidMove(topCard, draggedCard) {
      const colors = { hearts: "red", diamonds: "red", clubs: "black", spades: "black" };
      const values = { A: 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10, J: 11, Q: 12, K: 13 };
      return colors[topCard.suit] !== colors[draggedCard.suit] && values[topCard.rank] === values[draggedCard.rank] + 1;
    },
  },
};
</script>

<style scoped>
.tableau-container {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}
</style>