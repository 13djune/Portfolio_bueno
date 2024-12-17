<template>
  <div class="main-container">
    <NuxtLoadingIndicator />
    <Navbar />
    <SwitchMode />
    <NuxtPage />
    <!-- Componente de fondo de gradiente -->
    <GradientBackground class="gradiente"/>
  </div>
</template>

<script setup>
import './assets/styles.css';
import GradientBackground from '@/components/GradientBackground.vue';
import Navbar from '@/components/Navbar.vue';
import SwitchMode from '@/components/SwitchMode.vue';
</script>

<style lang="scss">
.main-container {
  position: relative;
  width: 100%;
  height: 100vh; /* Asegura que la página ocupe toda la pantalla */
  overflow: auto; /* Permite que el contenido se desplace sin bloquear el scroll */
}
*:not(.gradiente){
  z-index: 1;
}
</style>
