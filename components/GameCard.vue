<template>
   <div
    v-if="isShowing"
    ref="interactElement"
    :class="{
      isAnimating: isInteractAnimating,
      isCurrent: isCurrent
    }"
    class="card"
    :style="{ transform: transformString, zIndex: zIndex }"
  >
    <h3 class="cardTitle">{{ card.title }}</h3>
    <p class="cardText">{{ card.text }}</p>
  </div>
</template>

<script>
import interact from "interactjs";
import "../assets/styles.css"; // Asegúrate de que este archivo esté configurado correctamente

const ACCEPT_CARD = "cardAccepted";
const REJECT_CARD = "cardRejected";
const SKIP_CARD = "cardSkipped";

export default {
  static: {
    interactMaxRotation: 15,
    interactOutOfSightXCoordinate: 500,
    interactOutOfSightYCoordinate: 600,
    interactYThreshold: 150,
    interactXThreshold: 100,
  },

  props: {
    card: {
      type: Object,
      required: true,
    },
    isCurrent: {
      type: Boolean,
      required: true,
    },
    zIndex: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      isShowing: true,
      isInteractAnimating: true,
      isInteractDragged: null,
      interactPosition: {
        x: 0,
        y: 0,
        rotation: 0,
      },
    };
  },

  computed: {
    transformString() {
      if (!this.isInteractAnimating || this.isInteractDragged) {
        const { x, y, rotation } = this.interactPosition;
        return `translate3D(${x}px, ${y}px, 0) rotate(${rotation}deg)`;
      }

      return null;
    },
  },

  mounted() {
    const element = this.$refs.interactElement;

    interact(element).draggable({
      onstart: () => {
        this.isInteractAnimating = false;
      },

      onmove: (event) => {
        const { interactMaxRotation, interactXThreshold } = this.$options.static;
        const x = this.interactPosition.x + event.dx;
        const y = this.interactPosition.y + event.dy;

        let rotation = interactMaxRotation * (x / interactXThreshold);

        if (rotation > interactMaxRotation) rotation = interactMaxRotation;
        else if (rotation < -interactMaxRotation) rotation = -interactMaxRotation;

        this.interactSetPosition({ x, y, rotation });
      },

      onend: () => {
        const { x, y } = this.interactPosition;
        const { interactXThreshold, interactYThreshold } = this.$options.static;
        this.isInteractAnimating = true;

        if (x > interactXThreshold) this.playCard(ACCEPT_CARD);
        else if (x < -interactXThreshold) this.playCard(REJECT_CARD);
        else if (y > interactYThreshold) this.playCard(SKIP_CARD);
        else this.resetCardPosition();
      },
    });
  },

  beforeDestroy() {
    interact(this.$refs.interactElement).unset();
  },

  methods: {
    hideCard() {
      setTimeout(() => {
        this.isShowing = false;
        this.$emit("hideCard", this.card);
      }, 300);
    },

    playCard(interaction) {
  const {
    interactOutOfSightXCoordinate,
    interactOutOfSightYCoordinate,
    interactMaxRotation,
  } = this.$options.static;

  this.interactUnsetElement();

  switch (interaction) {
    case ACCEPT_CARD:
      this.interactSetPosition({
        x: interactOutOfSightXCoordinate,
        rotation: interactMaxRotation,
      });
      this.$emit(ACCEPT_CARD);
      break;
    case REJECT_CARD:
      this.interactSetPosition({
        x: -interactOutOfSightXCoordinate,
        rotation: -interactMaxRotation,
      });
      this.$emit(REJECT_CARD);
      break;
    case SKIP_CARD:
      this.interactSetPosition({
        y: interactOutOfSightYCoordinate,
      });
      this.$emit(SKIP_CARD);
      break;
  }

  // Añadir un pequeño retraso para ocultar después de animar
  setTimeout(() => {
    this.hideCard();
  }, 700);
}
,

    interactSetPosition(coordinates) {
      const { x = 0, y = 0, rotation = 0 } = coordinates;
      this.interactPosition = { x, y, rotation };
    },

    interactUnsetElement() {
      interact(this.$refs.interactElement).unset();
      this.isInteractDragged = true;
    },

    resetCardPosition() {
      this.interactSetPosition({ x: 0, y: 0, rotation: 0 });
    },
  },
};
</script>

<style scoped>


.card.isCurrent {
  pointer-events: auto;
  opacity: 1;
}

.card.isAnimating {
  transition: transform 0.7s ease-out, opacity 0.7s ease-out;
}

.card:nth-child(1) {
  z-index: 3;
  transform: translateY(0) scale(1);
}

.card:nth-child(2) {
  z-index: 2;
  transform: translateY(4vh) scale(0.95);
}

.card:nth-child(3) {
  z-index: 1;
  transform: translateY(8vh) scale(0.9);

}

.cardTitle{
color: #e1f9f0 !important;
  font-size: 0.9rem;
}
.cardText{
  color: #e1f9f0 !important;
  font-size: 1.2rem;
}

.dark-mode .cardTitle{
color: #062016 !important;

}
.dark-mode .cardText{
  color: #062016 !important;

}

</style>
