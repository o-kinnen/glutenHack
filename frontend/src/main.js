import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
import './assets/styles.scss'
import './registerServiceWorker'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

axios.defaults.withCredentials = true;

createApp(App)
  .use(router)
  .use(store)
  .mount('#app')
