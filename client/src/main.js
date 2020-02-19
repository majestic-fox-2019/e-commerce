import Vue from 'vue';
import axios from 'axios';
import App from './App.vue';
import store from './store';
import router from './router';

Vue.config.productionTip = false;

Vue.prototype.$axios = axios.create({ baseURL: 'http://localhost:3000' });

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
