<template>
  <div id="app">
    <div class="container">
      <div class="canvas-header gatito">
        <p>If you are bored, give a try to draw something:</p>
        <img src="assets/img/gatito.gif" alt="Cute cat in pixel art jumping" class="responsive-img gato" />
      </div>

      <!-- Canvas -->
      <vue-drawing-canvas
        ref="VueCanvasDrawing"
        v-model:image="image"
        :width="canvasWidth"
        :height="canvasHeight"
        :stroke-type="strokeType"
        :line-cap="lineCap"
        :line-join="lineJoin"
        :fill-shape="fillShape"
        :eraser="eraser"
        :lineWidth="line"
        :color="color"
        :background-color="backgroundColor"
        saveAs="png"
        :styles="{
          border: 'solid 1px #cdf8e8',
          borderRadius: '10px',
        }"
        :lock="disabled"
      />

      <!-- Controles -->
      <div class="controls">
        <!-- Primera fila de botones -->
        <div class="button-container">
          <button class="control-btn" @click.prevent="disabled = !disabled">
            <span v-if="!disabled">  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M15 2H9v2H7v2h2V4h6v4H4v14h16V8h-3V4h-2zm0 8h3v10H6V10zm-2 3h-2v4h2z"></path></svg>
              Unlock</span>
            <span v-else>  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M15 2H9v2H7v4H4v14h16V8h-3V4h-2zm0 2v4H9V4zm-6 6h9v10H6V10zm4 3h-2v4h2z"></path></svg>
              Lock</span>
          </button>
          <button class="control-btn" @click.prevent="$refs.VueCanvasDrawing.undo()">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M8 4h2v2H8zm10 6V8H8V6H6v2H4v2h2v2h2v2h2v-2H8v-2zm0 8v-8h2v8zm0 0v2h-6v-2z"></path></svg>
            Undo</button>
          <button class="control-btn" @click.prevent="$refs.VueCanvasDrawing.redo()">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M16 4h-2v2h2v2H6v2H4v8h2v2h6v-2H6v-8h10v2h-2v2h2v-2h2v-2h2V8h-2V6h-2z"></path></svg>
            Redo</button>
          <button class="control-btn" @click.prevent="$refs.VueCanvasDrawing.redraw()">  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M16 2h-2v2h2v2H4v2H2v5h2V8h12v2h-2v2h2v-2h2V8h2V6h-2V4h-2zM6 20h2v2h2v-2H8v-2h12v-2h2v-5h-2v5H8v-2h2v-2H8v2H6v2H4v2h2z"></path></svg>
            Refresh</button>
          <button class="control-btn" @click.prevent="$refs.VueCanvasDrawing.reset()">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M16 2v4h6v2h-2v14H4V8H2V6h6V2zm-2 2h-4v2h4zm0 4H6v12h12V8zm-5 2h2v8H9zm6 0h-2v8h2z"></path></svg>
            Reset</button>
        </div>

        <!-- Segunda fila de botones -->
        <div class="button-container">
          <button class="control-btn" @click.prevent="toggleFillMode">
  <span v-if="fillShape">
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
      <path fill="currentColor" d="M9 2h2v2H9zm4 4V4h-2v2H9v2H7v2H5v2H3v2h2v2h2v2h2v2h2v2h2v-2h2v-2h2v-2h2v-2h2V8h2V6h-2V4h-2zm0 0v2h2v2h2v2h2v2H5v-2h2v-2h2V8h2V6z"></path>
    </svg>
    Fill
  </span>
  <span v-else>
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
      <path fill="currentColor" d="M4 4h16v16H4z M6 6v12h12V6H6zm4 4h4v4h-4z"></path>
    </svg>
    Stroke
  </span>
</button>



          <button class="control-btn" @click.prevent="eraser = !eraser">
            <span v-if="eraser">  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M2 5h20v14H2zm2 2v10h2V7zm4 0v10h12V7z"></path></svg>
              Eraser</span>
            <span v-else>  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M18 2h-2v2h-2v2h-2v2h-2v2H8v2H6v2H4v2H2v6h6v-2h2v-2h2v-2h2v-2h2v-2h2v-2h2V8h2V6h-2V4h-2zm0 8h-2v2h-2v2h-2v2h-2v2H8v-2H6v-2h2v-2h2v-2h2V8h2V6h2v2h2zM6 16H4v4h4v-2H6z"></path></svg>
              Draw</span>
          </button>
          <select v-model="line" class="control-btn">
            <option v-for="n in 25" :key="'option-' + n" :value="n">{{ n }}</option>
          </select>
          <input type="color" v-model="color" class="control-btn" style="height: auto; width: 3rem;"/>
          <select v-model="strokeType" class="control-btn">
            <option value="dash">FreeHand</option>
            <option value="line">StraightLine</option>
            <option value="circle">Circle</option>
            <option value="square">Square</option>
            <option value="triangle">Triangle</option>
          </select>
        </div>

        <!-- Tercera fila de botones -->
        <div class="button-container">
          <select v-model="lineCap" class="control-btn">
            <option value="round">lineCap Round</option>
            <option value="square">lineCap Square</option>
            <option value="butt">lineCap Butt</option>
          </select>
          <select v-model="lineJoin" class="control-btn">
            <option value="round">lineJoin Round</option>
            <option value="miter">lineJoin Miter</option>
            <option value="bevel">lineJoin Bevel</option>
          </select>
          <div class="control-btn">
            <p class="bg-btn" style="margin: 0; color: #062016 !important;">Background:</p>
            <input type="color" v-model="backgroundColor" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueDrawingCanvas from "vue-drawing-canvas";

export default {
  name: "ServeDev",
  components: {
    VueDrawingCanvas,
  },
  data() {
    return {
      image: "",
      canvasWidth: window.innerWidth * 0.8, // 80% del ancho de la pantalla
      canvasHeight: window.innerHeight * 0.5, // 50% del alto de la pantalla
      eraser: false,
      disabled: false,
      fillShape: false,
      line: 5,
      color: "#9e99f8",
      strokeType: "dash",
      lineCap: "round",
      lineJoin: "round",
      backgroundColor: "#F7FDFB",
    };
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
  handleResize() {
    this.canvasWidth = window.innerWidth * 0.8;
    this.canvasHeight = window.innerHeight * 0.5;
  },
  toggleFillMode() {
    this.fillShape = !this.fillShape; // Cambia entre Fill y Stroke
  },
  fillCanvas() {
    if (this.fillShape && this.$refs.VueCanvasDrawing) {
      this.$refs.VueCanvasDrawing.fill({ color: this.color }); // Rellenar con el color actual
    }
  }
}

};
</script>

<style scoped>
/* General Styles */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
}

.responsive-img {
  max-width: 100%;
  height: auto;
}

/* Botones y Controles */
.controls {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
  width: 100%;
}

.button-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.control-btn {
  background-color: #e1f9f0;
  padding: 0.5rem 1rem;
  font-size: 14px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}
.control-btn>span {
    display: flex
;
    justify-content: center;
    align-items: center;
}
.dark-mode .control-btn {
    background-color: #0f3e2f;
}
.bg-btn{
  font-size: 14px !important;
}
.control-btn:hover {
  background-color: #cdf8e8;
}
.dark-mode .control-btn:hover {
  background-color: #207e60;
}
/* Ajustes responsivos */
@media screen and (max-width: 768px) {
  .control-btn {
    font-size: 12px;
    padding: 0.4rem 0.8rem;
  }
  .bg-btn{
  font-size: 12px !important;
}
  .controls {
    gap: 0.5rem;
  }
}

@media screen and (max-width: 480px) {
  .control-btn {
    font-size: 10px;
    padding: 0.3rem 0.5rem;
  }
  .bg-btn{
  font-size: 10px !important;
}
  .button-container {
    gap: 0.3rem;
  }
}
</style>
