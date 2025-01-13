<script setup lang="ts">
const items = [{
  label: 'Tech skills',
  icon: 'i-pixelarticons-device-laptop',
  defaultOpen: true,
  description: 'I know most of the Adobe Suite programs, I use Figma, Visual Studio Code and I´m learning to use Vue.js and Nuxt.'
}, {
  label: 'Education',
  icon: 'i-pixelarticons-book-open',
  description: '2024-2025: ESD Madrid-Master´s in Design for Interaction  | 2019-2024: UDIT-Degree in Graphic Design and Multimedia'
}, {
  label: 'Languages',
  icon: 'i-pixelarticons-volume-3',
  description: 'My mother tongue is Spanish. I have a native level of English, I studied at King´s College in Murcia.'
}, {
  label: 'Comunication',
  icon: 'i-pixelarticons-radio-signal',
  description: 'I am always interested in maintaining an active and dynamic conversation to be in the same line of thought.'
}, {
  label: 'Extras',
  icon: 'i-pixelarticons-power',
  description: 'I was born and raised in Cartagena, Murcia and currently live in Madrid. I love exploring the world around me, understanding how things work and thinking about how to improve people´s lives through innovation and creative problem solving.'
}]
</script>

<template>
  <UAccordion class="acordeon" :items="items"
  open-icon="i-pixelarticons-plus"
    close-icon="i-pixelarticons-minus">
    <template #item="{ item }">
      <p class="italic text-gray-900 dark:text-white text-center">
        {{ item.description }}
      </p>
    </template>

  </UAccordion>
</template>
<style scoped>

</style>

