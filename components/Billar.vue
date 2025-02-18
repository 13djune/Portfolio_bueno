<script setup>
import { ref, onMounted } from 'vue'
import planck from 'planck-js'

const pl = planck
const Vec2 = pl.Vec2

const canvasRef = ref(null)
let world

onMounted(() => {
  try {
    initBilliardGame()
  } catch (error) {
    console.error("Error en Billar.vue:", error)
  }
})

function initBilliardGame() {
  world = new pl.World(Vec2(0, 0))
  console.log("✅ Billar inicializado correctamente.")
}
</script>

<template>
  <client-only>
    <div>
      <h1>Mesa de Billar</h1>
      <canvas ref="canvasRef" width="800" height="400"></canvas>
    </div>
  </client-only>
</template>
<style scoped>
canvas {
  display: block;
  margin: auto;
  border: 2px solid black;
  background: green;
}
</style>