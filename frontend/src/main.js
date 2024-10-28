import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles.scss'
import './registerServiceWorker'

createApp(App)
  .use(router)
  .mount('#app')
