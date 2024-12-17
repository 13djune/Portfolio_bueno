<template>
    <div class="gradient-container" @mousemove="updateGradient">
      <slot></slot>
    </div>
  </template>
  
  <script>
  export default {
    name: "GradientBackground",
    data() {
      return {
        gradientX: 50, // Posición inicial X en porcentaje
        gradientY: 50, // Posición inicial Y en porcentaje
      };
    },
    computed: {
      // Computed property para obtener el color del fondo según el modo
      gradientColors() {
        const isDarkMode = this.$nuxt.$colorMode.preference === 'dark'; // Detectar si estamos en modo oscuro
  
        // Colores según el modo
        if (isDarkMode) {
          return 'radial-gradient(circle at ' + this.gradientX + '% ' + this.gradientY + '%, #26c08c, #05140f, #05140f, #05140f, #05140f, #05140f, #05140f, #05140f, #05140f, #05140f, #05140f)';
        } else {
          return 'radial-gradient(circle at ' + this.gradientX + '% ' + this.gradientY + '%, #3ed9a6, #f7fdfb, #f7fdfb, #f7fdfb, #f7fdfb, #f7fdfb, #f7fdfb, #f7fdfb, #f7fdfb, #f7fdfb, #f7fdfb)';
        }
      }
    },
    methods: {
      updateGradient(event) {
        const { offsetWidth, offsetHeight } = event.target;
  
        // Calculamos la posición del cursor como porcentaje del tamaño del contenedor
        this.gradientX = (event.offsetX / offsetWidth) * 100;
        this.gradientY = (event.offsetY / offsetHeight) * 100;
  
        // Actualizamos el gradiente con los colores dependiendo del modo
        event.target.style.background = this.gradientColors;
      },
    },
  };
  </script>
  
  <style scoped>
  .gradient-container {
    position: absolute; /* Fija el fondo al área de la ventana */
    top: 0;
    left: 0;
    width: 100vw; /* Asegura que ocupe toda la pantalla */
    height: 300vh; /* Asegura que ocupe toda la pantalla */
    transition: background 0.1s ease-out;
  }
  </style>
  