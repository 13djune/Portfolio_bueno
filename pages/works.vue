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

h1{
  position: relative;
  color: #9e99f8;
    margin: 3rem;
    margin-bottom: 0;
    display: flex;
    justify-content: center;
    font-size: 2rem;
    text-align: center;

}
.dark-mode h1{
  color: #6e3bfc;
}
</style>