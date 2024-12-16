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

</style>
