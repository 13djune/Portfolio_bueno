<template>
  <div class="cards">
    <GameCard
    v-for="(card, index) in cards"
      :key="card.id"
      :card="card"
      :is-current="index === 0"
      :style="{ zIndex: getCardZIndex(index) }"
      :zIndex="10"
      @cardAccepted="$emit('cardAccepted')"
      @cardRejected="$emit('cardRejected')"
      @cardSkipped="$emit('cardSkipped')"
      @hideCard="$emit('hideCard')"
    />
  </div>
</template>

<script>
import GameCard from "./GameCard.vue";
import "../assets/styles.css"; // Asegúrate de que tus variables CSS se importen correctamente

export default {
  components: {
    GameCard
  },

  props: {
    cards: {
      type: Array,
      required: true
    },
    zIndex: {
    type: [String, Number],
    default: 0 // o un valor por defecto como 0
  }
  },
  methods: {
    getCardZIndex(index) {
      if (this.cards[index].isCurrent) {
        return 3; // Z-index más alto para la tarjeta activa
      } else if (index === 0) {
        return 2; // Segunda tarjeta
      } else if (index === 1) {
        return 1; // Tercera tarjeta
      } else {
        return 0; // Otras tarjetas si es necesario
      }
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
