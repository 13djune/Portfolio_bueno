<template>
    <div
      :class="[
        'relative w-16 h-24 rounded-lg shadow-md cursor-pointer transition-transform transform',
        isFaceUp ? 'bg-white' : 'bg-gray-400',
        isSelected ? 'ring-2 ring-blue-500' : '',
        isFaceUp ? 'hover:scale-105' : ''
      ]"
      @click="handleClick"
    >
      <div
        v-if="isFaceUp"
        class="absolute inset-0 flex flex-col items-center justify-center text-center text-black"
      >
        <span class="text-lg font-bold">{{ rank }}</span>
        <span class="text-2xl" :style="{ color: suitColor }">{{ suitSymbol }}</span>
      </div>
      <div
        v-else
        class="absolute inset-0 flex items-center justify-center bg-gray-500 text-white"
      >
        <span class="text-lg font-bold">🂠</span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Carta",
    props: {
      rank: {
        type: String,
        required: true,
      },
      suit: {
        type: String,
        required: true,
      },
      isFaceUp: {
        type: Boolean,
        default: false,
      },
      isSelected: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      suitSymbol() {
        const suits = {
          hearts: "♥",
          diamonds: "♦",
          clubs: "♣",
          spades: "♠",
        };
        return suits[this.suit] || "";
      },
      suitColor() {
        return this.suit === "hearts" || this.suit === "diamonds"
          ? "red"
          : "black";
      },
    },
    methods: {
      handleClick() {
        this.$emit("card-click", { rank: this.rank, suit: this.suit });
      },
    },
  };
  </script>
  
  <style scoped>
  </style>