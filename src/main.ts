import { createApp } from 'vue'
import { pinia } from './plugins/pinia.plugin'
import { router } from './router'
import './style.css'
import App from './App.vue'

const app = createApp(App)
app
  .use(router)
  .use(pinia)
  .mount('#app')
