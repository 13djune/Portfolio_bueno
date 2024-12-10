<template>
    <h1>adios</h1>
    <Grid/>
</template>
<script setup>
import interact from "interactjs";
import "../assets/styles.css"; // Asegúrate de que este archivo esté configurado correctamente


const colorMode = useColorMode();
</script>

<style>
body {
  background-color: #f7fdfb;
  color: #062016;
}
.dark-mode body {
  background-color: #020806;
  color: #e1f9f0;
}
</style>