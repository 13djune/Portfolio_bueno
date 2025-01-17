<script setup lang="ts">
import { ref, defineProps, watch, defineEmits } from 'vue';

// Definir las props
const props = defineProps<{
  project: { 
    id: number; 
    title: string; 
    description: string; 
    media: { type: string; src: string }[]; 
    additionalText?: string; 
    link?: string 
  } | null;
}>();

// Emitir eventos al padre
const emit = defineEmits(['close']);

// Estado interno del Slideover
const isOpen = ref(false);

// Abrir el Slideover automáticamente cuando llega un proyecto nuevo
watch(() => props.project, (newProject) => {
  if (newProject) {
    isOpen.value = true;
  }
});

// Función para cerrar el Slideover
const closeSlideover = () => {
  isOpen.value = false; // Cambiar el estado interno
  emit('close'); // Emitir el evento "close" al componente padre
};

// Control del carrusel
const currentMediaIndex = ref(0);

const showNextMedia = () => {
  if (props.project?.media) {
    currentMediaIndex.value = (currentMediaIndex.value + 1) % props.project.media.length;
  }
};

const showPreviousMedia = () => {
  if (props.project?.media) {
    currentMediaIndex.value =
      (currentMediaIndex.value - 1 + props.project.media.length) % props.project.media.length;
  }
};
</script>

<template>
  <USlideover v-model="isOpen" :overlay="false">
    <UCard
      class="flex flex-col flex-1 slide"
      :ui="{ 
        body: { base: 'flex-1' }, 
        ring: '', 
        divide: 'divide-y divide-gray-100 dark:divide-gray-800' 
      }"
    >
      <button
        class="cerrar absolute top-2 right-2 rounded-full shadow-md p-2"
        @click="closeSlideover"
        aria-label="Cerrar"
      >
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M5 5h2v2H5zm4 4H7V7h2zm2 2H9V9h2zm2 0h-2v2H9v2H7v2H5v2h2v-2h2v-2h2v-2h2v2h2v2h2v2h2v-2h-2v-2h-2v-2h-2zm2-2v2h-2V9zm2-2v2h-2V7zm0 0V5h2v2z"></path></svg>

      </button>

      <div v-if="props.project">
        <h2 class="text-xl font-bold">{{ props.project.title }}</h2>

        <div class="carousel mt-4 relative">
          <button
            class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md z-10"
            @click="showPreviousMedia"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
              <path fill="#6e3bfc" d="M16 5v2h-2V5zm-4 4V7h2v2zm-2 2V9h2v2zm0 2H8v-2h2zm2 2v-2h-2v2zm0 0h2v2h-2zm4 4v-2h-2v2z"></path>
            </svg>
          </button>

          <template v-if="props.project.media[currentMediaIndex]">
            <img
              v-if="props.project.media[currentMediaIndex].type === 'image'"
              :src="props.project.media[currentMediaIndex].src"
              alt="Project image"
              class="w-full h-48 object-cover rounded-md"
            />
            <video
              v-else-if="props.project.media[currentMediaIndex].type === 'video'"
              :src="props.project.media[currentMediaIndex].src"
              controls
              class="w-full h-48 object-cover rounded-md"
            ></video>
          </template>

          <button
            class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md z-10"
            @click="showNextMedia"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
              <path fill="#6e3bfc" d="M8 5v2h2V5zm4 4V7h-2v2zm2 2V9h-2v2zm0 2h2v-2h-2zm-2 2v-2h2v2zm0 0h-2v2h2zm-4 4v-2h2v2z"></path>
            </svg>
          </button>
        </div>

        <div v-if="props.project.additionalText" class="mt-4">
          <p>{{ props.project.additionalText }}</p>
        </div>

        <a
          v-if="props.project.link"
          :href="props.project.link"
          target="_blank"
          rel="noopener noreferrer"
          class="mt-4 inline-block text-blue-600 hover:underline font-medium"
        >
          Visit Project
        </a>
      </div>
    </UCard>
  </USlideover>
</template>


<style scoped>
h2 {
  font-family: 'Daydream';
}

.slide {
  background-color: #f7fdfb;
  border-radius: 0;
  border-left: #062016 1px solid;
}

.dark-mode .slide {
  background-color: #05140f;
  border-left: #e1f9f0 1px solid;
}

.carousel img,
.carousel video {
  max-width: 100%;
  border-radius: 8px;
  height: auto;
}

.carousel button {
  background-color: #f7fdfb;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  position: absolute;
  z-index: 10;
  margin: 0.3rem;
}

a {
  color: #3fe2f7;
  font-weight: 500;
  transition: color 0.2s ease;
}

a:hover {
  text-decoration: underline;
  color: #08aabf;
}

.dark-mode a {
  color: #08aabf;
  font-weight: 500;
}

.dark-mode a:hover {
  text-decoration: underline;
  color: #3fe2f7;
}

p {
  color: #062016;
}

.dark-mode p {
  color: #e1f9f0;
}
</style>
