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

const colorMode = useColorMode()
  
</script>

<style lang="scss" scoped>
  body {
    background-color: #f7fdfb;
    color: #062016;
  }
  .dark-mode body {
    background-color: #020806;
    color: #e1f9f0;
  }

</style>
