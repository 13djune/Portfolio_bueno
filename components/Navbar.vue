<script setup lang="ts">
const links = ref([ {
  label: 'About me',
  icon: 'i-pixelarticons-script',
  to: '/'
}, {
  label: 'Works',
  icon: 'i-pixelarticons-lightbulb-on',
  to: '/works'
}, {
  label: 'Contact',
  icon: 'i-pixelarticons-human-handsup',
  to: '/contact'
}])

</script>

<template>
  <UVerticalNavigation
  highlight
  orientation="vertical"
    :links="links" 
    class="justify-center" style="width: 7rem; position: fixed; left: 0; top: 50%; z-index: 9999;"/>

</template>

<style scoped>

</style>