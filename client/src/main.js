import Vue from 'vue';
import VueRouter from 'vue-router';
import VueSocketIOExt from 'vue-socket.io-extended';
import { VueProgressBar, options } from './apis/progress';
import App from './App.vue';
import store from './store';
import vuetify from './plugins/vuetify';
import router from './router';
import instance from './apis/axios';
import socket from './apis/socket';
import { Swal, Toast } from './apis/sweetAlert';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';

Vue.config.productionTip = false;

Vue.use(VueProgressBar, options);
Vue.use(VueRouter);
Vue.use(VueSocketIOExt, socket);

Vue.prototype.$http = instance;
Vue.prototype.$swal = Swal;
Vue.prototype.$toast = Toast;

new Vue({
  created() {
    this.$http.interceptors.request.use((config) => {
      this.$Progress.start();
      return config;
    }, (error) => {
      this.$Progress.fail();
      return Promise.reject(error);
    });
    this.$http.interceptors.response.use((response) => {
      this.$Progress.finish();
      return response;
    }, (error) => {
      this.$Progress.fail();
      return Promise.reject(error);
    });
  },
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
