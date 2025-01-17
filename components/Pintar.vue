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
            <span v-if="!disabled">Unlock</span>
            <span v-else>Lock</span>
          </button>
          <button class="control-btn" @click.prevent="$refs.VueCanvasDrawing.undo()">Undo</button>
          <button class="control-btn" @click.prevent="$refs.VueCanvasDrawing.redo()">Redo</button>
          <button class="control-btn" @click.prevent="$refs.VueCanvasDrawing.redraw()">Refresh</button>
          <button class="control-btn" @click.prevent="$refs.VueCanvasDrawing.reset()">Reset</button>
        </div>

        <!-- Segunda fila de botones -->
        <div class="button-container">
          <button class="control-btn" @click.prevent="fillShape = !fillShape">
            <span v-if="fillShape">Fill</span>
            <span v-else>Stroke</span>
          </button>
          <button class="control-btn" @click.prevent="eraser = !eraser">
            <span v-if="eraser">Eraser</span>
            <span v-else>Draw</span>
          </button>
          <select v-model="line" class="control-btn">
            <option v-for="n in 25" :key="'option-' + n" :value="n">{{ n }}</option>
          </select>
          <input type="color" v-model="color" class="control-btn" />
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
  },
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
