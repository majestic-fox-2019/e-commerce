import Vue from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import App from './App.vue';
import store from './store';
import router from './router';
import 'sweetalert2/src/sweetalert2.scss';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
// Vue.use(Swal);

Vue.config.productionTip = false;
// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

Vue.prototype.$axios = axios.create({ baseURL: 'https://e-commerce-hacktiv.herokuapp.com/' });
// Vue.prototype.$axios = axios.create({ baseURL: 'https://e-commerce-hacktiv.herokuapp.com' });
Vue.prototype.$Swal = Swal;

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
