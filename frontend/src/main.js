import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
import './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import './assets/styles.scss';

axios.defaults.withCredentials = true;

createApp(App)
  .use(router)
  .use(store)
  .mount('#app')
