<script setup lang="ts">
import { ref, defineProps, watch } from 'vue';

const props = defineProps<{
  project: { id: number, title: string, description: string, images: string[], additionalText?: string } | null;
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

      <!-- Mostrar la información del proyecto si existe -->
      <div v-if="project">
        <h2 class="text-xl font-bold">{{ project.title }}</h2>
        <p class="mt-2">{{ project.description }}</p>
        
        <!-- Carrusel de imágenes -->
        <UCarousel class="mt-4">
          <template v-for="(image, index) in project.images" :key="index">
            <div class="carousel-slide">
              <img :src="image" alt="Project image" class="w-full h-48 object-cover rounded-md" />
            </div>
          </template>
        </UCarousel>

        <!-- Texto adicional, si lo hay -->
        <div v-if="project.additionalText" class="mt-4">
          <p>{{ project.additionalText }}</p>
        </div>
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

/* Estilización del carrusel */
.carousel-slide img {
  max-width: 100%;
  display: block;
  border-radius: 8px;
}
</style>
