<template>
    <div class="marquee-wrapper">
      <div class="marquee-content" ref="content">
        <slot>
          <!-- Texto por defecto si no se usa un slot -->
          WHO AM I?  WHO AM I?  WHO AM I?  WHO AM I?  WHO AM I?  WHO AM I?  WHO AM I?
        </slot>
        <!-- Duplicamos el contenido para crear un efecto de bucle continuo -->
        <slot>
            WHO AM I?  WHO AM I?  WHO AM I?  WHO AM I?  WHO AM I?  WHO AM I?  WHO AM I?
        </slot>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Marquee",
  };
  </script>
  
  <style scoped>
  .marquee-wrapper {
    width: 100%;
    overflow: hidden; 
    position: relative;
    background: #f7fdfb;
    color:  #9e99f8;
    font-size: 2.5rem; 
    white-space: nowrap; /* Evita que el texto haga saltos de línea */
    padding: 0.6rem;
    border: #9e99f8 3px solid;
    border-left: 0;
    border-right: 0 ;
    z-index: -1;
  }
 .dark-mode .marquee-wrapper {
    background: #05140f;
    color:  #6e3bfc;
    border: #6e3bfc 3px solid;
    border-left: 0;
    border-right: 0 ;
  }
  
  .marquee-content {
    display: inline-block;
    white-space: nowrap;
    animation: marquee 10s linear infinite; /* Animación: duración y repetición infinita */
  }
  
  @keyframes marquee {
    from {
      transform: translateX(0); /* Punto de inicio */
    }
    to {
      transform: translateX(-50%); /* Mueve el texto la mitad de su ancho */
    }
  }
  </style>
  
  