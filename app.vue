<template>
  <div>
    <div>

      <NuxtLoadingIndicator />
  
        <Navbar/>
        <SwitchMode />

    </div>
   
    
  
  <NuxtPage/>



  </div>
</template>
<script setup>
import './assets/styles.css'; // Ruta al archivo CSS


const colorMode = useColorMode()
  
</script>

<style lang="scss" scoped>
@import './assets/styles.css'; /* Ruta al archivo CSS */
  body {
    background-color: #f7fdfb;
    color: #062016;
  }
  .dark-mode body {
    background-color: #05140f;
    color: #e1f9f0;
  }

</style>
