<script setup lang="ts">
import { ref } from 'vue';
import Slideover from '../components/Slideover.vue'; // Importa tu componente

// Lista de proyectos de ejemplo
const projects = [
  { id: 1, title: 'TALSIE', description: 'Web that would meet the needs of a product brand', image: 'https://via.placeholder.com/150' },
  { id: 2, title: 'ALPHEGOR', description: 'Web of the final degree project of a fashion design student', image: 'https://via.placeholder.com/150' },
  { id: 3, title: 'Serenyx', description: 'An app to address mental health and emotion management needs', image: 'https://via.placeholder.com/150' },
  { id: 4, title: 'Project 4', description: 'Details about Project 4', image: 'https://via.placeholder.com/150' },
  { id: 5, title: 'Project 5', description: 'Details about Project 5', image: 'https://via.placeholder.com/150' },
  { id: 6, title: 'Project 6', description: 'Details about Project 6', image: 'https://via.placeholder.com/150' },
];

// Estados para controlar el Slideover
const activeProjectId = ref<number | null>(null);
const isSlideoverOpen = ref(false);

const openSlideover = (id: number) => {
  activeProjectId.value = id;
  isSlideoverOpen.value = true;
};

const closeSlideover = () => {
  isSlideoverOpen.value = false;
  activeProjectId.value = null;
};
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    <div 
      v-for="project in projects" 
      :key="project.id" 
      class="border rounded-lg p-4 flex flex-col items-center justify-between"
      style="width: 40vw;"
    >
      <h4 class="text-lg font-semibold">{{ project.title }}</h4>
      <p>{{ project.description }}</p>
      <img :src="project.image" alt="Project image" class="w-full h-32 object-cover rounded-md mb-4" />
      <Slideover/>
    </div>
  </div>

  
</template>

<style scoped>
.grid {
  margin: 5rem;
  display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
</style>
