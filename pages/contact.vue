<template>
     <h1>Feel free to contact me:</h1>
<Contactar/>
    <Pintar/>
</template>
<script setup>
import interact from "interactjs";
import "../assets/styles.css"; // Asegúrate de que este archivo esté configurado correctamente

const colorMode = useColorMode();

</script>

<style scoped>
h1{
  color: #9e99f8;
    margin: 3rem;
    margin-bottom: 0;
    display: flex;
    justify-content: center;
    font-size: 2rem;

}
.dark-mode h1{
  color: #6e3bfc;
   

}

</style>