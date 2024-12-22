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
      offsetX: 0, // Desplazamiento inicial X
      offsetY: 0, // Desplazamiento inicial Y
    };
  },
  mounted() {
    this.container = this.$refs.container;
    this.draggableImage = this.$refs.draggableImage;

    // Establecer posición inicial aleatoria
    this.draggableImage.style.left = `${Math.random() * (this.container.clientWidth - this.draggableImage.offsetWidth)}px`;
    this.draggableImage.style.top = `${Math.random() * (this.container.clientHeight - this.draggableImage.offsetHeight)}px`;

    // Configurar interact.js
    interact(this.draggableImage)
      .draggable({
        listeners: {
          start: (event) => {
            cancelAnimationFrame(this.animationFrameId); // Pausar la animación
            const rect = event.target.getBoundingClientRect();
            this.offsetX = event.clientX - rect.left;
            this.offsetY = event.clientY - rect.top;
          },
          move: (event) => {
            const target = event.target;

            // Calcular posición
            const x = event.clientX - this.container.getBoundingClientRect().left - this.offsetX;
            const y = event.clientY - this.container.getBoundingClientRect().top - this.offsetY;

            const maxX = this.container.clientWidth - target.offsetWidth;
            const maxY = this.container.clientHeight - target.offsetHeight;

            const boundedX = Math.min(Math.max(0, x), maxX);
            const boundedY = Math.min(Math.max(0, y), maxY);

            target.style.left = `${boundedX}px`;
            target.style.top = `${boundedY}px`;

            target.dataset.x = boundedX;
            target.dataset.y = boundedY;
          },
          end: () => {
            this.animate();
          },
        },
      });

    this.animate();
  },
  methods: {
    animate() {
      this.animationFrameId = requestAnimationFrame(this.animate);

      const containerRect = this.container.getBoundingClientRect();
      const imageRect = this.draggableImage.getBoundingClientRect();

      if (
        this.draggableImage.offsetLeft <= 0 ||
        this.draggableImage.offsetLeft + imageRect.width >= containerRect.width
      ) {
        this.dx *= -1;
      }

      if (
        this.draggableImage.offsetTop <= 0 ||
        this.draggableImage.offsetTop + imageRect.height >= containerRect.height
      ) {
        this.dy *= -1;
      }

      this.draggableImage.style.left = `${this.draggableImage.offsetLeft + this.dx}px`;
      this.draggableImage.style.top = `${this.draggableImage.offsetTop + this.dy}px`;

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
  width: 30rem;
  height: 20rem;
  overflow: hidden;
}

.draggable-image {
  position: absolute;
  width: 150px;
  height: auto;
  cursor: grab !important;
}
</style>
