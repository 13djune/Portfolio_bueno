

<script setup lang="ts">
import { Icon } from '@iconify/vue';

const modules = [
  {
    title: 'Github',
    description: 'See more of my programmed projects.',
    to: 'https://github.com/13djune',
    icon: 'pixelarticons:github'
  },
  {
    title: 'LinkedIn',
    description: 'Let´s connect.',
    to: 'https://www.linkedin.com/in/bel%C3%A9n-castillo-chac%C3%B3n-11540925a/',
    icon: 'pixelarticons:users'
  },
  {
    title: 'Instagram',
    description: 'Follow my socials!',
    to: 'https://instagram.com/404.june',
    icon: 'pixelarticons:camera-alt'
  },
  {
    title: 'Email',
    description: 'Send me an email.',
    to: 'mailto:belencastillocha@gmail.com',
    icon: 'pixelarticons:mail-arrow-right'
  }
];
</script>

<template>
   
  <div class="socials grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
    
    <div
      v-for="(module, index) in modules"
      :key="index"
      class="soci border rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
    >
      <a :href="module.to" target="_blank" class="block p-4">
        <div class="flex items-center mb-2">
          <Icon :icon="module.icon" class="text-2xl mr-2" />
          <h2 class="text-lg font-bold">{{ module.title }}</h2>
        </div>
        <p class="text-gray-600 line-clamp-2">{{ module.description }}</p>
      </a>
    </div>
  </div>
</template>


<style scoped>
/* Optional styling for the grid and hover effect */
.socials {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    margin: 3rem 6rem    ;
}
.block{
    color: #9e99f8;
    background-color: #bcfeeb64 !important;
}

.soci:hover{
    border: #9e99f8 2px solid;
    border-radius: 0.5rem;
}
.dark-mode .block{
    color: #6e3bfc;
   
    background-color: #22866531  !important;
}
.dark-mode .soci:hover{
    border: #6e3bfc 2px solid;
    border-radius: 0.5rem;
}
</style>
