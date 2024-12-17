<template>
  <div class="main-container">
    <div id="cursor"></div>
<div id="cursor-border"></div>
    <NuxtLoadingIndicator />
    <Navbar />
    <SwitchMode />
    <NuxtPage />

  </div>
</template><script setup>
import './assets/styles.css';
import { onMounted, onBeforeUnmount, ref } from 'vue';

const cursorPos = ref({ x: 0, y: 0 });
const cursorBorderPos = ref({ x: 0, y: 0 });
const cursorBorder = ref(null);
const cursor = ref(null);
const easting = 8; // Velocidad de movimiento del borde del cursor

// Función para actualizar la posición del cursor
function updateCursorPosition(event) {
  cursorPos.value.x = event.clientX;
  cursorPos.value.y = event.clientY;

  if (cursor.value) {
    // Mover el cursor principal, centrado
    cursor.value.style.transform = `translate(${cursorPos.value.x - cursor.value.offsetWidth / 2}px, ${cursorPos.value.y - cursor.value.offsetHeight / 2}px)`;
  }

  if (cursorBorder.value) {
    // Mover el borde del cursor, centrado
    cursorBorder.value.style.transform = `translate(${cursorPos.value.x - cursorBorder.value.offsetWidth / 2}px, ${cursorPos.value.y - cursorBorder.value.offsetHeight / 2}px)`;
    // Actualizar el fondo de gradiente, centrado en el borde
    cursorBorder.value.style.background = `radial-gradient(circle, #3ed9a6 0%, rgba(255, 255, 255, 0) 60%)`;
  }
}

// Función para la animación del borde del cursor
function animateCursorBorder() {
  requestAnimationFrame(() => {
    if (cursorBorder.value) {
      cursorBorderPos.value.x += (cursorPos.value.x - cursorBorderPos.value.x) / easting;
      cursorBorderPos.value.y += (cursorPos.value.y - cursorBorderPos.value.y) / easting;

      // Mantener el borde del cursor centrado
      cursorBorder.value.style.transform = `translate(${cursorBorderPos.value.x - cursorBorder.value.offsetWidth / 2}px, ${cursorBorderPos.value.y - cursorBorder.value.offsetHeight / 2}px)`;
    }
    animateCursorBorder(); // Llamada recursiva para mantener la animación
  });
}

// Montaje del componente
onMounted(() => {
  // Obtener los elementos del DOM
  cursor.value = document.querySelector("#cursor");
  cursorBorder.value = document.querySelector("#cursor-border");

  // Agregar el evento de movimiento del ratón
  document.addEventListener("mousemove", updateCursorPosition);

  // Iniciar la animación del borde del cursor
  animateCursorBorder();
});

// Desmontaje del componente
onBeforeUnmount(() => {
  document.removeEventListener("mousemove", updateCursorPosition);
});
</script>
<style lang="scss">
.main-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: auto;
}

#cursor {
  position: fixed;
  top: 0;
  left: 0;
  width: 10px;
  height: 10px;
  background-color: white;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
}

#cursor-border {
  --size: 50px;
  position: fixed;
  top: 0;
  left: 0;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  pointer-events: none;
  transition: top 0.15s ease-out, left 0.15s ease-out, width 0.15s ease-out,
    height 0.15s ease-out, background-color 0.15s ease-out;
  z-index: 9999;
  background: radial-gradient(circle, #3ed9a6 20%, #f7fdfb 60%);
}
</style>
