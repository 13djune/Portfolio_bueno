<template>
  <div class="error-container">
    <h1>Oops! Algo salió mal.</h1>
    <p v-if="error.statusCode">{{ error.statusCode }} - {{ error.message }}</p>
    <NuxtLink to="/">Volver al inicio</NuxtLink>
    <Billar />
  </div>
</template>

<script setup>
defineProps({ error: Object })
</script>

<style scoped>
.error-container {
  text-align: center;
  padding: 20px;
}
</style>
