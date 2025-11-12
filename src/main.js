//import './assets/main.css'
//createApp(App).mount('#app')

import { createApp } from 'vue'

import App from './App.vue'
import router from './router/router'

const app = createApp(App)

app.use(router)

app.mount('#app')
