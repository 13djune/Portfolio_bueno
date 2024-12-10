<script setup lang="ts">
import { ref } from 'vue';
import Slideover from './Slideover.vue'; // Importa el componente Slideover

// Lista de proyectos de ejemplo
const projects = [
  { id: 1, title: 'TALSIE', description: 'Web that would meet the needs of a product brand', images: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150'], additionalText: 'This is additional text for TALSIE.' },
  { id: 2, title: 'ALPHEGOR', description: 'Web of the final degree project of a fashion design student', images: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150'], additionalText: 'This is additional text for ALPHEGOR.' },
  { id: 3, title: 'Serenyx', description: 'An app to address mental health and emotion management needs', images: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150'], additionalText: 'This is additional text for Serenyx.' },
  { id: 4, title: 'Project 4', description: 'Details about Project 4', images: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150'], additionalText: 'This is additional text for Project 4.' },
  { id: 5, title: 'Project 5', description: 'Details about Project 5', images: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150'], additionalText: 'This is additional text for Project 5.' },
  { id: 6, title: 'Project 6', description: 'Details about Project 6', images: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150'], additionalText: 'This is additional text for Project 6.' },
];

const activeProject = ref<{ id: number, title: string, description: string, images: string[], additionalText?: string } | null>(null);
const isSlideoverOpen = ref(false);

const openSlideover = (project: { id: number, title: string, description: string, images: string[], additionalText?: string }) => {
  activeProject.value = project;
  isSlideoverOpen.value = true;
};

const closeSlideover = () => {
  isSlideoverOpen.value = false;
  activeProject.value = null;
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
      <img :src="project.images[0]" alt="Project image" class="w-full h-32 object-cover rounded-md mb-4" />
      <UButton 
        class="info" 
        label="View more" 
        @click="openSlideover(project)" 
        icon="i-pixelarticons-bullseye-arrow" 
      />
    </div>
  </div>

  <!-- Llama al componente Slideover y pásale las propiedades necesarias -->
  <Slideover 
    v-model="isSlideoverOpen" 
    :project="activeProject" 
    @close="closeSlideover" 
  />
</template>



<style scoped>
.grid {
  margin: 5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.info {
  background-color: #9e99f8;
}

.dark-mode .info {
  background-color: #5229c2;
}
</style>
