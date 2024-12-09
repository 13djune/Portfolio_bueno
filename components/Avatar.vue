<template>
    <div ref="container" class="container">
      <img
        ref="draggableImage"
        src="../assets/img/avatar.png"
        alt="Imagen rebotante"
        class="draggable-image"
      />
    </div>
  </template>
  
  <script>
  import interact from 'interactjs';
  
  export default {
    name: 'BouncingImage',
    data() {
      return {
        dx: 1, // Velocidad horizontal inicial
        dy: 1, // Velocidad vertical inicial
        speed: 1, // Velocidad de movimiento
        angle: 0, // Ángulo de rotación
        rotationSpeed: 0.5, // Velocidad de rotación
        animationFrameId: null,
      };
    },
    mounted() {
      this.container = this.$refs.container;
      this.draggableImage = this.$refs.draggableImage;
  
      // Establecer una posición inicial aleatoria para la imagen
      this.draggableImage.style.left = `${Math.random() * (this.container.clientWidth - this.draggableImage.width)}px`;
      this.draggableImage.style.top = `${Math.random() * (this.container.clientHeight - this.draggableImage.height)}px`;
  
      // Configurar interact.js para hacer la imagen arrastrable
      interact(this.draggableImage)
        .draggable({
          listeners: {
            start: () => {
              cancelAnimationFrame(this.animationFrameId); // Pausar animación al arrastrar
            },
            move: (event) => {
              // Actualizar la posición de la imagen mientras se arrastra
              const containerRect = this.container.getBoundingClientRect();
              let x = event.pageX - containerRect.left;
              let y = event.pageY - containerRect.top;
  
              // Limitar la posición de la imagen para que no se salga del contenedor
              const maxX = containerRect.width - this.draggableImage.offsetWidth;
              const maxY = containerRect.height - this.draggableImage.offsetHeight;
  
              x = Math.min(Math.max(0, x), maxX);
              y = Math.min(Math.max(0, y), maxY);
  
              this.draggableImage.style.left = `${x}px`;
              this.draggableImage.style.top = `${y}px`;
            },
            end: () => {
              // Reanudar la animación después de soltar la imagen
              this.animate();
            },
          },
        });
  
      // Inicializar la animación con la velocidad ajustada al contenedor
      this.adjustSpeed();
      this.animate();
    },
    methods: {
      adjustSpeed() {
        // Ajusta la velocidad de la animación en función del tamaño del contenedor
        const containerWidth = this.container.clientWidth;
        const containerHeight = this.container.clientHeight;
        this.speed = Math.min(containerWidth, containerHeight) * 0.002; // Ajusta el factor de escala según tus necesidades
      },
      animate() {
        this.animationFrameId = requestAnimationFrame(this.animate);
  
        const containerRect = this.container.getBoundingClientRect();
        const imageRect = this.draggableImage.getBoundingClientRect();
  
        // Verificar los límites y cambiar la dirección si la imagen toca un borde
        if (
          this.draggableImage.offsetLeft <= 0 ||
          this.draggableImage.offsetLeft + imageRect.width >= containerRect.width
        ) {
          this.dx *= -1; // Invertir dirección horizontal
          this.adjustSpeed(); // Ajustar velocidad después de invertir la dirección
        }
        if (
          this.draggableImage.offsetTop <= 0 ||
          this.draggableImage.offsetTop + imageRect.height >= containerRect.height
        ) {
          this.dy *= -1; // Invertir dirección vertical
          this.adjustSpeed(); // Ajustar velocidad después de invertir la dirección
        }
  
        // Actualizar la posición de la imagen de forma suave
        this.draggableImage.style.left = `${this.draggableImage.offsetLeft + this.dx}px`;
        this.draggableImage.style.top = `${this.draggableImage.offsetTop + this.dy}px`;
  
        // Actualizar la rotación de la imagen de forma suave
        this.angle += this.rotationSpeed;
        this.draggableImage.style.transform = `rotate(${this.angle}deg)`;
      },
    },
    beforeDestroy() {
      cancelAnimationFrame(this.animationFrameId);
    },
  };
  </script>
  
  <style scoped>
  .container {
    position: relative;
    width: 30rem; /* Ajusta el tamaño del contenedor según tus necesidades */
    height: 25rem; /* Ajusta el tamaño del contenedor según tus necesidades */
   
  }
  
  .draggable-image {
    position: absolute;
    width: 150px; /* Ajusta el tamaño de la imagen según tus necesidades */
    height: auto;
  }
  </style>
  