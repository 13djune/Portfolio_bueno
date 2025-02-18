// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/color-mode', '@nuxt/ui'],
  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '-mode',
    storage: 'localStorage', // or 'sessionStorage' or 'cookie'
    storageKey: 'nuxt-color-mode'
  },
  ui: {
    global: true,

  },
  css: [
    '@/assets/styles.css' // Ruta al archivo CSS
  ],
  app: {
    head: {
      title: 'Belen Castillo',
      link: [
        { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.png' }
      ]
    },
  },
  ssr: false, // 🚀 Forzamos Nuxt a modo SPA para evitar SSR
  router: {
    options: {
      strict: false // Evita problemas con rutas sensibles a mayúsculas/minúsculas
    }
  }
 
})