import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    // ssr: true,
    components,
    directives,
    theme: {
      defaultTheme: 'light',
      themes: {
        light: {
          dark: false,
          colors: {
            background: '#ffffff',
            surface: '#ffffff',
            primary: '#000000',
            secondary: '#0b213f'
          }
        }
      }
    }
  })

  nuxtApp.vueApp.use(vuetify)
})
