import './assets/main.css'
import 'todomvc-app-css/index.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//vuetify

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'

const vuetify = createVuetify({ components })

const app = createApp(App)

app.use(router)
app.use(vuetify)

app.mount('#app')
