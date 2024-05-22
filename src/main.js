import './style.css'
import 'vuetify/styles'
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import * as vuetifyComponents from 'vuetify/components'
import * as vuetifyDirectives from 'vuetify/directives'
import App from './App.vue'
import router from './router'

createApp(App)
  .use(
    createVuetify({
      components: vuetifyComponents,
      directives: vuetifyDirectives
    })
  )
  .use(router)
  .mount('#app')
