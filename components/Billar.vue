<template>
  <div ref="canvasContainer" class="billiard-table"></div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { World, Testbed, Vec2, Circle, Polygon } from 'planck/with-testbed';

export default {
  name: 'Billar',
  setup() {
    const canvasContainer = ref(null);

    onMounted(() => {
      if (canvasContainer.value) {
        initPhysics(canvasContainer.value);
      }
    });

    function initPhysics(container) {
      const world = new World();

      // Configurar el testbed dentro del contenedor
      const testbed = Testbed.mount(container);
      testbed.start(world);

      // Parámetros de la mesa de billar
      const width = 8.00, height = 4.00;
      const BALL_R = 0.12, POCKET_R = 0.2;

      testbed.width = width * 1.2;
      testbed.height = height * 1.2;
      testbed.ratio = 100;
      testbed.mouseForce = -30;

      // Definir las propiedades físicas
      const railFixDef = { friction: 0.1, restitution: 0.9 };
      const pocketFixDef = { userData: 'pocket' };
      const ballFixDef = { friction: 0.1, restitution: 0.99, density: 1 };
      const ballBodyDef = { linearDamping: 1.5, angularDamping: 1 };

      // Crear las bandas de la mesa
      world.createBody().createFixture(Polygon([
        Vec2(width * 0.5, height * 0.5),
        Vec2(width * 0.5, -height * 0.5),
        Vec2(-width * 0.5, -height * 0.5),
        Vec2(-width * 0.5, height * 0.5),
      ]), railFixDef);

      // Crear los bolsillos
      world.createBody().createFixture(Circle(Vec2(0, height * 0.5 + POCKET_R * 1.5), POCKET_R), pocketFixDef);
      world.createBody().createFixture(Circle(Vec2(0, -height * 0.5 - POCKET_R * 1.5), POCKET_R), pocketFixDef);

      // Crear bolas de billar
      const balls = [
        { x: -width / 4, y: 0, color: 'white' },
        { x: width / 4, y: 0, color: 'black' }
      ];

      balls.forEach(ball => {
        const body = world.createDynamicBody(ballBodyDef);
        body.setPosition(Vec2(ball.x, ball.y));
        body.createFixture(Circle(BALL_R), ballFixDef);
        body.render = { fill: ball.color, stroke: 'black' };
      });

      // Evento para detectar cuando la bola entra en un bolsillo
      world.on('post-solve', (contact) => {
        const fA = contact.getFixtureA(), bA = fA.getBody();
        const fB = contact.getFixtureB(), bB = fB.getBody();

        const pocket = fA.getUserData() === 'pocket' ? bA : fB.getUserData() === 'pocket' ? bB : null;
        const ball = fA.getUserData() === 'ball' ? bA : fB.getUserData() === 'ball' ? bB : null;

        if (ball && pocket) {
          setTimeout(() => world.destroyBody(ball), 100);
        }
      });

      return world;
    }

    return { canvasContainer };
  }
};
</script>

<style scoped>
.billiard-table {
  width: 100%;
  height: 500px;
  background: transparent;
  position: relative;
}
</style>
