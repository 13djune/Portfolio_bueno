<script setup lang="ts">
import { ref, defineProps, watch } from 'vue';

const props = defineProps<{
  project: { id: number; title: string; description: string; images: string[]; additionalText?: string; link: string } | null;
}>();

const isOpen = ref(false);

watch(() => props.project, (newProject) => {
  if (newProject) {
    isOpen.value = true;
  }
});

const closeSlideover = () => {
  isOpen.value = false;
  props.$emit('close');
};

// Control del carrusel
const currentImageIndex = ref(0);

const showNextImage = () => {
  if (props.project?.images) {
    currentImageIndex.value = (currentImageIndex.value + 1) % props.project.images.length;
  }
};

const showPreviousImage = () => {
  if (props.project?.images) {
    currentImageIndex.value =
      (currentImageIndex.value - 1 + props.project.images.length) % props.project.images.length;
  }
};
</script>

<template>
  <USlideover v-model="isOpen" :overlay="false">
    <UCard
      class="flex flex-col flex-1 slide"
      :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }"
    >
      <template #header>
        <UButton
          color="gray"
          variant="ghost"
          size="sm"
          class="flex sm:hidden absolute end-5 top-5 z-10"
          square
          padded
          @click="closeSlideover"
        />
      </template>

      <!-- Mostrar la información del proyecto -->
      <div v-if="project">
        <h2 class="text-xl font-bold">{{ project.title }}</h2>

        <!-- Carrusel de imágenes -->
        <div class="carousel mt-4 relative">
          <button
            class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md z-10"
            @click="showPreviousImage"
          >
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#6e3bfc" d="M16 5v2h-2V5zm-4 4V7h2v2zm-2 2V9h2v2zm0 2H8v-2h2zm2 2v-2h-2v2zm0 0h2v2h-2zm4 4v-2h-2v2z"></path></svg>

          </button>
          <img
            :src="project.images[currentImageIndex]"
            alt="Project image"
            class="w-full h-48 object-cover rounded-md"
           
          />
          <button
            class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md z-10"
            @click="showNextImage"
          >
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#6e3bfc" d="M8 5v2h2V5zm4 4V7h-2v2zm2 2V9h-2v2zm0 2h2v-2h-2zm-2 2v-2h2v2zm0 0h-2v2h2zm-4 4v-2h2v2z"></path></svg>

          </button>
        </div>

        <!-- Texto adicional -->
        <div v-if="project.additionalText" class="mt-4">
          <p>{{ project.additionalText }}</p>
        </div>
        <a
          v-if="project.link"
          :href="project.link"
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
.slide {
  background-color: #f7fdfb;
}

.dark-mode .slide {
  background-color: #020806;
}

.carousel img {
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
  color: #6e3bfc;
  font-weight: 500;
  transition: color 0.2s ease;
}

a:hover {
  text-decoration: underline;
  color: #5229c2;
}
.dark-mode a {
  color: #9e99f8;
  font-weight: 500;
}

.dark-mode a:hover {
  text-decoration: underline;
  color: #b4b0fb;
}
</style>
