<template>
  <div class="fundaciones">
 
    <div
        v-for="(pila, index) in fundaciones"
        :key="index"
        class="fundacion"
        @click="handleDrop(index)"
      >
        <Carta
          v-if="pila.length > 0"
          :rank="pila[pila.length - 1].rank"
          :suit="pila[pila.length - 1].suit"
          :isFaceUp="true"
        />
        <div v-else class="vacio">
          <span class="">Empty</span>
        </div>
      </div>
  </div>
</template>

<script>
import Carta from "./Carta.vue";

export default {
  name: "Fundacion",
  components: { Carta },
  props: ["fundaciones"],
  methods: {
    handleDrop(index) {
      this.$emit("drop-card", index);
    },
  },
};
</script>

<style>
.fundaciones {
  display: flex;
  gap: 10px;
}
.fundacion {
  width: 80px;
  height: 120px;
  background: rgba(255, 255, 255, 0.578);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid gray;
}
.vacio {
  color: gray;
}
</style>