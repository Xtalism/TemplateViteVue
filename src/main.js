// Import styles
import './style.css'
import 'vuetify/styles'

// Import Vue and Vuetify components
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Import main App component and router
import App from './App.vue'
import router from './router'

// Create Vuetify instance
const vuetify = createVuetify({ components, directives })

// Create and mount the app
createApp(App).use(vuetify).use(router).mount('#app')
