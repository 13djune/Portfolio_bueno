<template>
    <div class="pila-container" @dragover.prevent @drop="handleDrop">
      <div
        v-for="(card, index) in cards"
        :key="`${card.rank}-${card.suit}-${index}`"
        :style="{ top: `${index * 20}px` }"
        class="card-wrapper"
        draggable="true"
        @dragstart="startDrag(card, index)"
      >
        <Carta
          :rank="card.rank"
          :suit="card.suit"
          :isFaceUp="card.isFaceUp"
        />
      </div>
    </div>
  </template>
  
  <script>
  import Carta from "./Carta.vue";
  
  export default {
    name: "Pila",
    components: { Carta },
    props: {
      cards: Array,
      pileIndex: Number,
    },
    methods: {
      startDrag(card, index) {
        this.$emit("drag-start", { card, pileIndex: this.pileIndex, index });
      },
      handleDrop() {
        this.$emit("drop-card", this.pileIndex);
      },
    },
  };
  </script>
  
  <style scoped>
  .pila-container {
    position: relative;
    width: 4rem;
    min-height: 6rem;
    border: 1px dashed gray;
    background-color: #9e99f89c ;
  }
  .card-wrapper {
    position: absolute;
    transition: transform 0.3s ease;
    
  }
  </style>