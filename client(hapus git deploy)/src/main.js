import Vue from "vue";
import { VueProgressBar, options } from '@/api/progressbar.js'
import App from "./App.vue";
import router from "./router";
import axios from './api/axios'
import store from '@/store/index.js'

Vue.config.productionTip = false;

Vue.use(VueProgressBar, options)

Vue.prototype.$axios = axios

new Vue({
  created() {
    this.$axios.interceptors.request.use(config => {
      this.$Progress.start();
      return config;
    }, error => {
      this.$Progress.fail();
      return Promise.reject(error);
    });

    this.$axios.interceptors.response.use(response => {
      this.$Progress.finish();
      return response;
    }, error => {
      this.$Progress.fail();
      return Promise.reject(error);
    });
  },
  router,
  render: h => h(App),
  store
}).$mount("#app");
