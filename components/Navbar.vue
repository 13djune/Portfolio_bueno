<script setup lang="ts">
import { ref } from 'vue';


// Links para el menú
const links = ref([
  { label: 'About me', icon: 'i-pixelarticons-script', to: '/' },
  { label: 'Works', icon: 'i-pixelarticons-lightbulb-on', to: '/works' },
  { label: 'Contact', icon: 'i-pixelarticons-human-handsup', to: '/contact' },
]);

// Estado para controlar si el menú está abierto o cerrado
const isMenuOpen = ref(false);

// Función para alternar el estado del menú
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

</script>
<template>
  <div>
    <!-- Botón de menú hamburguesa -->
    <button 
      class="menu-icon"
      @click="toggleMenu"
      aria-label="Toggle Menu"
    >
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M4 6h16v2H4zm0 5h16v2H4zm16 5H4v2h16z"></path></svg>
    </button>

    <!-- Menú vertical -->
    <UVerticalNavigation
    highlight
    orientation="vertical"
    :links="links"
    class="menu"
    :class="{ 'menu--open': isMenuOpen }"

    />
  </div>
</template>

<style scoped>
/* Botón con icono de menú */
.menu-icon {
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 10000;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 2rem;
  color: #333;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.menu-icon:hover{
  cursor: pointer;
}

/* Estilos del menú */
.menu {
  width: 7rem;
  position: fixed;
  left: 0;
  top: 50%;
  transform: translateX(-100%); /* Ocultar menú inicialmente en pantallas pequeñas */
  transition: transform 0.3s ease;
  z-index: 9999;
}

/* Mostrar el menú cuando está abierto */
.menu--open {
  transform: translateX(0);
}

/* Media queries para pantallas grandes */
@media (min-width: 768px) {
  .menu-icon {
    display: none; /* Ocultar el icono en pantallas grandes */
  }

  .menu {
    transform: translateX(0); /* Mostrar siempre el menú en pantallas grandes */
  }
}
</style>
