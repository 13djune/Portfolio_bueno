<template>
  <div id="intro" >
  <img src="assets/img/burbujas.gif" alt="Two bubbles in pixel art" class="burbujas">
  <img src="assets/img/ordena.png" alt="Old PC computer in pixel art in isometric" class="ordena">
    <h1>Hii!! I'm Belen</h1>
    <h3>or june</h3>
    <br>
    <p>a Multimedia and Graphic Designer and</p>
    <p>currently studying a Master's degree in UX/UI, in Madrid.</p>
    <p>Nice to meet you :)</p>
  </div>

  <Marquee>
      WHO AM I? WHO AM I? WHO AM I? WHO AM I? WHO AM I? WHO AM I? WHO AM I?
    </Marquee>
  <div id="app">
    <Avatar/>
    <GameCardsStack
      :cards="visibleCards"
      @cardAccepted="handleCardAccepted"
      @cardRejected="handleCardRejected"
      @cardSkipped="handleCardSkipped"
      @hideCard="removeCardFromDeck"
    />
  </div>
  <UDivider  size="sm">
<img src="assets/img/ranita.png" alt="Cute frog in pixel art static" class="rana">
  </UDivider>


  
  <div id="skills">
    <div>

      <Skills/>
    </div>
  </div>

</template>

<script setup>
import { ref } from 'vue';
import GameCardsStack from "./components/GameCardsStack.vue";
import interact from "interactjs";
import "../assets/styles.css"; // Asegúrate de que este archivo esté configurado correctamente
import Marquee from './components/Marquee.vue'; // Importar el componente
import VueKonva from 'vue-konva';

const app = createApp(App);
app.use(VueKonva);
app.mount('#app');



const colorMode = useColorMode();

// Definición de la propiedad reactiva
const visibleCards = ref([
{ id: 1, title: "I am focused", text: "on web and iteractive design, problem solving or campaign ideation and motion graphics. Also, spreading awarness about social causes, as it helps to capture people's attention and encourage their support, which is essential to generate changes in society." },
{ id: 2, title: "I consider myself", text: "a multidisciplinary person, I love to learn new things, to apply them and to contribute ideas for different projects, I would not like to fit into a single graphic discipline." },
  {id: 3, title: "Currently...", text: "I'm perfecting my technical skills to be able to develop new and complex projects, and focus on having inclusive and accessible designs. " }
]);

// Definición de los métodos
function handleCardAccepted() {
  console.log("handleCardAccepted");
}

function handleCardRejected() {
  console.log("handleCardRejected");
}

function handleCardSkipped() {
  console.log("handleCardSkipped");
}

function removeCardFromDeck() {
  visibleCards.value.splice(0, 1); // Usar .value para acceder a la propiedad de ref
}
</script>

<style lang="scss" scoped >

#skills{
display: flex;
justify-content: center;
}
#skills>div{
  width: 60vw !important;
  margin: 2rem 2rem 3rem 2rem;
}

h1{
  color: #9e99f8;
    margin: 3rem;
    margin-bottom: 0;
    font-size: 2rem;

}
h3{
  color: #9e99f8;
  font-size: 1rem;
}
p{
  color: #9e99f8;
  font-size: 1.5rem;
}
.dark-mode h1{
  color: #6e3bfc;
}
.dark-mode p{
  color: #6e3bfc;
}
.dark-mode h3{
  color: #6e3bfc;
}
#intro{
  height: 90vh;
  display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

}

</style>
