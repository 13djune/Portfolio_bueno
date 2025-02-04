<script setup lang="ts">
import { ref } from 'vue';
import Slideover from './Slideover.vue';

import alphegor1 from '../assets/img/ALPHEGOR.20.png';
import alphegor2 from '../assets/img/ALPHEGOR.1.png';
import alphegor3 from '../assets/img/ALPHEGOR.3.png';
import alphegor4 from '../assets/img/ALPHEGOR.4.png';

import talsie1 from '../assets/img/TALSIE2.png';
import talsie2 from '../assets/img/TALSIE1.png';
import talsie3 from '../assets/img/TALSIE3.png';
import talsie4 from '../assets/img/TALSIE4.png';

import serenyx1 from '../assets/img/Serenyx1.png';
import serenyx2 from '../assets/img/Serenyx2.png';

import enstock from '../assets/img/EN_STOCK.mp4';

import ESDMeet1 from '../assets/img/Comunidades_landing.png'
import ESDMeet2 from '../assets/img/Desktop_Feed_Chat.png'
import ESDMeet3 from '../assets/img/Desktop_Feed.png'


// Lista de proyectos con imágenes locales
const projects = [
  {
    id: 1,
    title: 'TALSIE',
    description: 'Web that would meet the needs of a product brand',
    media: [
      { type: 'image', src: talsie1 },
      { type: 'image', src: talsie2 },
      { type: 'image', src: talsie3 },
      { type: 'image', src: talsie4 },
    ],
    additionalText: 'A website that would meet the needs of a brand of a product, with sections such as a product gallery, a shopping cart, contact information, etc. We made use of a frontend framework like Bootstrap, HTML+CSS+JS languages, the Github repository and the Netlify program through which the website will be synchronized and published, my work consisted of making the main layout for all sections, the home page and creating the hamburger menu (functional in responsive). January 2024, Madrid.',
    link: 'https://talsie.netlify.app',
  },
  {
    id: 2,
    title: 'ALPHEGOR',
    description: 'Web of the final degree project of a fashion design student',
    media: [
      { type: 'image', src: alphegor1 },
      { type: 'image', src: alphegor2 },
      { type: 'image', src: alphegor3 },
      { type: 'image', src: alphegor4 },
    ],
    additionalText:
      'Alphegor is a clothing brand inspired by a futuristic and different theme. Its main purpose is to provide users with an immersive experience to explore and understand the world from which Alphegor was born. Skills and knowledge of HTML+CSS+JS, the Github repository and the Netlify programme through which the website will be synchronised and published were used. The responsive version of the website was not created. June 2024, Madrid.',
    link: 'https://alphegor.netlify.app',
  },
  { id: 3, 
    title: 'Serenyx', 
  description: 'An app to address mental health and emotion management needs', 
  media: [
      { type: 'image', src: serenyx1 },
      { type: 'image', src: serenyx2 },
    ],
  additionalText: 'Its main purpose is to provide users with an accessible tool to manage everyday problems, learn about them and foster a supportive community. The app is aimed at people seeking to supplement their mental wellbeing with supported psychological methods, although it is not intended to be a substitute for professional therapy. In a context where a high percentage of the population suffers from mental disorders such as depression, Serenyx emerges as a practical and accessible solution to improve mental health in everyday life. June 2024, Madrid', 
  link: 'https://www.figma.com/proto/RsHiPGhnRaycwWS3IDocga/Serenyx_Bel%C3%A9nCastillo?page-id=18%3A792&node-id=467-5730&node-type=frame&viewport=322%2C195%2C0.14&t=Y5xe8BBK1T6q6KGO-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=467%3A5730&show-proto-sidebar=1' },
  { id: 4, 
    title: 'EN STOCK', 
    description: 'A spot from the magazine ‘EN STOCK’ that combines 3D and 2D', 
    media: [
      { type: 'video', src: enstock },
    ],
    additionalText: 'The magazine is intended to be a collection, dealing with different concerns that we may have in the creative or artistic world, and at the same time using a food that can be similar to the theme. This volume deals with uncertainty and is linked to red cabbage.',
     },
     { id: 5, 
    title: 'ESDMeet', 
    description: 'A digital platform to optimise communication and strengthen the school community.', 
    media: [
    { type: 'image', src: ESDMeet1 },
    { type: 'image', src: ESDMeet2 },
    { type: 'image', src: ESDMeet3 }
    ],
    additionalText: 'Este proyecto propone mejorar la comunicación en la escuela mediante una plataforma interactiva que optimiza el flujo de información y facilita la interacción entre estudiantes, docentes y personal administrativo. Al eliminar barreras comunicativas, se busca fortalecer el sentido de comunidad, promover la colaboración y crear un entorno más accesible e inclusivo para todos.',
    link: 'https://www.figma.com/proto/uuG3XtsRYQMQWLjQuyCamD/Prototipo_MDI?page-id=0%3A1&node-id=1-5524&viewport=-80%2C3%2C0.09&t=QyauFSjmlurNHo3z-1&scaling=scale-down-width&content-scaling=fixed' },


];

const activeProject = ref(null);
const isSlideoverOpen = ref(false);

const openSlideover = (project) => {
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
      
      <!-- Renderizar la primera imagen o video del proyecto -->
      <template v-if="project.media[0]">
        <img
          v-if="project.media[0].type === 'image'"
          :src="project.media[0].src"
          alt="Project image"
          class="w-full object-cover rounded-md mb-4"
        />
        <video
          v-else-if="project.media[0].type === 'video'"
          :src="project.media[0].src"
          controls
          class="w-full object-cover rounded-md mb-4"
        ></video>
      </template>
      
      <UButton
        class="info"
        label="View more"
        @click="openSlideover(project)"
        icon="i-pixelarticons-bullseye-arrow"
      />
    </div>
  </div>

  <!-- Componente del Slideover -->
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
 p {
  color: #062016;
}
.dark-mode p {
  color: #e1f9f0;
}
</style>
