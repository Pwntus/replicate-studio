// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  runtimeConfig: {
    replicateApikey: process.env.NUXT_REPLICATE_API_KEY || ''
  },
  build: {
    transpile: ['vuetify', 'primevue']
  },
  modules: ['@pinia/nuxt'],
  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css',
    'primevue/resources/themes/lara-light-blue/theme.css',
    'primevue/resources/primevue.css'
  ]
})
