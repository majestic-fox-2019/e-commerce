import Vue from 'vue';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.prototype.$axios = axios.create({ baseURL: 'http://localhost:3000/api' });
Vue.prototype.$formatterRupiah = (input) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(input);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
