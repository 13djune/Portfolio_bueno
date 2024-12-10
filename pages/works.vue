<template>
    <h1>You can take a look at my projects:</h1>
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
h1{
  color: #9e99f8;
    margin: 3rem;
    margin-bottom: 0;
    display: flex;
    justify-content: center;
    font-size: 2rem;
    text-align: center;
}
</style>