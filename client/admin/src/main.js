import Vue from 'vue';
import axios from 'axios';
import * as BoostrapVue from 'bootstrap-vue';
import VueSweetalert2 from 'vue-sweetalert2';
import { BTable, BButton } from 'bootstrap-vue';
import router from './router';
import store from './store/store';
import './assets/style.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App.vue';


Vue.config.productionTip = false;
Vue.prototype.$axios = axios.create({ baseURL: 'http://localhost:3000' });
Vue.use(BoostrapVue);
Vue.use(VueSweetalert2);
// Vue.use(IconsPlugin);

new Vue({
  router,
  store,
  BoostrapVue,
  BTable,
  BButton,
  render: (h) => h(App),
}).$mount('#app');
