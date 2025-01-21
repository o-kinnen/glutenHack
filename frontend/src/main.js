import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
import './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap';
import './assets/styles.scss';

axios.defaults.withCredentials = true;

const app = createApp(App);

app.config.errorHandler = (err, instance, info) => {
  if (process.env.VUE_APP_NODE_ENV !== 'production') {
    console.error(`[Vue Error]: ${info}`, err);
  }
};
window.addEventListener('error', (event) => {
  if (process.env.VUE_APP_NODE_ENV !== 'production') {
    console.error('Global error:', event.error);
  }
});
window.addEventListener('unhandledrejection', (event) => {
  if (process.env.VUE_APP_NODE_ENV !== 'production') {
    console.error('Unhandled promise rejection:', event.reason);
  }
});

app.use(router).use(store).mount('#app');
