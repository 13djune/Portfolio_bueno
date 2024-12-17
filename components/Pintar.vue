<script>
import { _borderRadius } from "#tailwind-config/theme";
import VueDrawingCanvas from "vue-drawing-canvas";

export default {
  name: "ServeDev",
  components: {
    VueDrawingCanvas,
  },
  data() {
    return {
      initialImage: [
        {
          type: "dash",
          from: {
            x: 262,
            y: 154,
          },
         
          color: "#000000",
          width: 5,
          fill: false,
        },
      ],
      x: 0,
      y: 0,
      image: "",
      eraser: false,
      disabled: false,
      fillShape: false,
      line: 5,
      color: "#9e99f8",
      strokeType: "dash",
      lineCap: "square",
      lineJoin: "round",
      backgroundColor: "#F7FDFB",
      backgroundImage: null,
      watermark: null,
      additionalImages: [],
    };
  },
  mounted() {
    if ("vue-drawing-canvas" in window.localStorage) {
      this.initialImage = JSON.parse(
        window.localStorage.getItem("vue-drawing-canvas")
      );
    }
  },
  methods: {
    async setImage(event) {
      let URL = window.URL;
      this.backgroundImage = URL.createObjectURL(event.target.files[0]);
      await this.$refs.VueCanvasDrawing.redraw();
    },
  
    getStrokes() {
      window.localStorage.setItem(
        "vue-drawing-canvas",
        JSON.stringify(this.$refs.VueCanvasDrawing.getAllStrokes())
      );
      alert(
        "Strokes saved, reload your browser to see the canvas with previously saved image"
      );
    },
    removeSavedStrokes() {
      window.localStorage.removeItem("vue-drawing-canvas");
      alert("Strokes cleared from local storage");
    },
  },
};
</script>

<template>
  <div id="app">
   
    <div class="flex-row">
      
      <div class="source">
        <p >If you are bored, give a try to draw something:</p>
        <vue-drawing-canvas
          ref="VueCanvasDrawing"
          v-model:image="image"
          :width="800"
          :height="400"
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

        <div class="button-container">
          <button class="control-btn" type="button" @click.prevent="disabled = !disabled">
   
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M15 2H9v2H7v4H4v14h16V8h-3V4h-2zm0 2v4H9V4zm-6 6h9v10H6V10zm4 3h-2v4h2z"></path></svg>

            <span v-if="!disabled">Unlock</span>
            <span v-else>Lock</span>
          </button>
          <button class="control-btn" type="button" @click.prevent="$refs.VueCanvasDrawing.undo()">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M8 4h2v2H8zm10 6V8H8V6H6v2H4v2h2v2h2v2h2v-2H8v-2zm0 8v-8h2v8zm0 0v2h-6v-2z"></path></svg>

            Undo
          </button>
          <button class="control-btn" type="button" @click.prevent="$refs.VueCanvasDrawing.redo()">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M16 4h-2v2h2v2H6v2H4v8h2v2h6v-2H6v-8h10v2h-2v2h2v-2h2v-2h2V8h-2V6h-2z"></path></svg>

            Redo
          </button>
          <button class="control-btn" 
            type="button"
            @click.prevent="$refs.VueCanvasDrawing.redraw()"
          >

    
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M16 2h-2v2h2v2H4v2H2v5h2V8h12v2h-2v2h2v-2h2V8h2V6h-2V4h-2zM6 20h2v2h2v-2H8v-2h12v-2h2v-5h-2v5H8v-2h2v-2H8v2H6v2H4v2h2z"></path></svg>



            Refresh
          </button>
          <button class="control-btn" type="button" @click.prevent="$refs.VueCanvasDrawing.reset()">
      
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M16 2v4h6v2h-2v14H4V8H2V6h6V2zm-2 2h-4v2h4zm0 4H6v12h12V8zm-5 2h2v8H9zm6 0h-2v8h2z"></path></svg>


            Reset
          </button>
          <button class="control-btn" type="button" @click.prevent="fillShape = !fillShape">
            <span v-if="fillShape" style="
    display: flex;">
    
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M9 2h2v2H9zm4 4V4h-2v2H9v2H7v2H5v2H3v2h2v2h2v2h2v2h2v2h2v-2h2v-2h2v-2h2v6h2V12h-2v-2h-2V8h-2V6zm0 0v2h2v2h2v2h2v2H5v-2h2v-2h2V8h2V6z"></path></svg>

              Fill
            </span>
            <span v-else style="display: flex;">
            

  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M11 2h2v2h2v4h2v4h2v6h-2v2h-2v2H9v-2H7v-2H5v-6h2V8h2V4h2z"></path></svg>

              Stroke
            </span>
          </button>
        </div>
        <div class="button-container">
          <button class="control-btn" type="button" @click.prevent="eraser = !eraser">
            <span v-if="eraser" style="
    display: flex;">
             

  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M21 5H7v2H5v2H3v2H1v2h2v2h2v2h2v2h16V5zM7 17v-2H5v-2H3v-2h2V9h2V7h14v10zm8-6h-2V9h-2v2h2v2h-2v2h2v-2h2v2h2v-2h-2zm0 0V9h2v2z"></path></svg>

              Eraser
            </span>
            <span v-else style="
    display: flex;">
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M18 2h-2v2h-2v2h-2v2h-2v2H8v2H6v2H4v2H2v6h6v-2h2v-2h2v-2h2v-2h2v-2h2v-2h2V8h2V6h-2V4h-2zm0 8h-2v2h-2v2h-2v2h-2v2H8v-2H6v-2h2v-2h2v-2h2V8h2V6h2v2h2zM6 16H4v4h4v-2H6z"></path></svg>

              Draw
            </span>
          </button>
          <select v-model="line" class="control-btn">
            <option v-for="n in 25" :key="'option-' + n" :value="n">
              {{ n }}
            </option>
          </select>
          <input type="color" v-model="color" class="control-btn"/>
          <select v-model="strokeType" class="control-btn">
            <option value="dash">FreeHand</option>
            <option value="line">StraightLine</option>
            <option value="circle">Circle</option>
            <option value="square">Square</option>
            <option value="triangle">Triangle</option>
          </select>
          <select v-model="lineCap" class="control-btn">
            <option value="round">lineCap Round</option>
            <option value="square">lineCap Square</option>
            <option value="butt">lineCap butt</option>
          </select>
          <select v-model="lineJoin" class="control-btn" >
            <option value="round">lineJoin Round</option>
            <option value="miter">lineJoin miter</option>
            <option value="bevel">lineJoin bevel</option>
          </select>
      
        </div>

        <div class="button-container" >
          <div style="margin-right: 30px" class="control-btn">
            <p style="margin-bottom: 0">Background Color:</p>
            <input type="color" v-model="backgroundColor" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.flex-row {
  display: flex;
  flex-direction: row;
  align-items: center;
    justify-content: space-around;
    margin: 4rem;
}
.button-container {
  display: flex;
  flex-direction: row;
  align-items: center;
    justify-content: space-around;
}
.button-container > * {
  margin-top: 15px;
  margin-right: 10px;
}
.control-btn {
  background-color: #e1f9f0;
    padding: 5px 10px;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.control-btn:hover {
  background-color: #cdf8e8;
}
.dark-mode .control-btn {
  background-color: #09231a;
    padding: 5px 10px;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.dark-mode .control-btn:hover {
  background-color: #124634;
}
.control-btn svg {
  width: 20px;
  height: 20px;
}
.dark-mode p {
  color: #e1f9f0;
}

</style>
