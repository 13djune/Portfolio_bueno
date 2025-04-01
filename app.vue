<template>
  <div class="main-container">
    <div id="cursor"></div>
<div id="cursor-border"></div>
    <NuxtLoadingIndicator />
    <Navbar />
    <SwitchMode />
    <NuxtPage />
    <div id="footer">
      <div>
        <p>Let's work together to create something unforgettable!</p>
        <br>  
        <p>All this web is programmed by me &lt;3 </p>
        <br>
        <p>Belén (June) Castillo · updated Abril 2025 ©</p>
        <br>
        <p>Pixel art: <a id="marina" href="https://marinamartinprieto.cargo.site/">Marina Martín (Concept Artist)</a></p>
      </div>
      <img src="assets/img/cerezas.gif" alt="Cherries in pixel art moving" class="cereza">
      </div>
  </div>

</template>

<script setup>
import './assets/styles.css';
import { onMounted, onBeforeUnmount, ref, nextTick } from 'vue';

const cursorPos = ref({ x: 0, y: 0 });
const cursorBorderPos = ref({ x: 0, y: 0 });
const cursorBorder = ref(null);
const cursor = ref(null);
const easting = 8; // Velocidad de movimiento del borde del cursor
useSeoMeta({
  ogImage: '/favicon.png'
})
// Función para actualizar la posición del cursor
function updateCursorPosition(event) {
  cursorPos.value.x = event.clientX;
  cursorPos.value.y = event.clientY;

  if (cursor.value) {
    cursor.value.style.transform = `translate(${cursorPos.value.x - cursor.value.offsetWidth / 2}px, ${cursorPos.value.y - cursor.value.offsetHeight / 2}px)`;
  }

  if (cursorBorder.value) {
    cursorBorder.value.style.transform = `translate(${cursorPos.value.x - cursorBorder.value.offsetWidth / 2}px, ${cursorPos.value.y - cursorBorder.value.offsetHeight / 2}px)`;
  }
}

// Función para la animación del borde del cursor
function animateCursorBorder() {
  requestAnimationFrame(() => {
    if (cursorBorder.value) {
      cursorBorderPos.value.x += (cursorPos.value.x - cursorBorderPos.value.x) / easting;
      cursorBorderPos.value.y += (cursorPos.value.y - cursorBorderPos.value.y) / easting;

      cursorBorder.value.style.transform = `translate(${cursorBorderPos.value.x - cursorBorder.value.offsetWidth / 2}px, ${cursorBorderPos.value.y - cursorBorder.value.offsetHeight / 2}px)`;
    }
    animateCursorBorder(); // Llamada recursiva para mantener la animación
  });
}

// Delegación de eventos para hover en elementos con clase "info", "soci" y "card"
function handleHover(event) {
  const target = event.target;

  if (target.classList.contains('info') || target.classList.contains('soci') || target.classList.contains('card')) {
    if (event.type === 'mouseenter') {
      cursorBorder.value.style.mixBlendMode = 'difference';
      cursorBorder.value.style.background = '#3ed9a6'; // Fondo sólido
    } else if (event.type === 'mouseleave') {
      cursorBorder.value.style.mixBlendMode = 'normal';
      cursorBorder.value.style.background = `radial-gradient(circle, #3ed9a6 0%, rgba(255, 255, 255, 0) 60%)`; // Restaurar gradiente
    }
  }
}

// Montaje del componente
onMounted(async () => {
  await nextTick();

  // Obtener los elementos del DOM
  cursor.value = document.querySelector("#cursor");
  cursorBorder.value = document.querySelector("#cursor-border");

  // Agregar el evento de movimiento del ratón
  document.addEventListener("mousemove", updateCursorPosition);

  // Delegar eventos hover en el documento
  document.addEventListener("mouseenter", handleHover, true);
  document.addEventListener("mouseleave", handleHover, true);

  // Iniciar la animación del borde del cursor
  animateCursorBorder();
});

// Desmontaje del componente
onBeforeUnmount(() => {
  document.removeEventListener("mousemove", updateCursorPosition);
  document.removeEventListener("mouseenter", handleHover, true);
  document.removeEventListener("mouseleave", handleHover, true);
});
</script>
<style lang="scss">
  body {
    background-color:#f7fdfb;
    color:#062016;
  }
  .dark-mode body {
    background-color: #05140f;
    color:#e1f9f0;
  }
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
  background-color: #26c08c;
  border-radius: 50%;
  pointer-events: none;
  z-index: 10000;
}

#cursor-border {
  --size: 70px;
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
  background: radial-gradient(circle, #3ed9a6 10%, #3ed9a500 60%);
}
#footer {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin: 3rem;
}
#footer>div>p {
    text-align: center;
}
#marina:hover{
  color: #3fe2f7;
  text-decoration: underline;
  cursor: pointer;
}
.dark-mode #marina:hover{
  color: #08aabf;
 
}
</style>
