import Vue from 'vue'
import { VueProgressBar, options } from './api/progressbar.js'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from './api/axios'
import VueCarousel from 'vue-carousel';
import { currencyConverter, qtyConverter, dateFormat } from './helpers/converter'


Vue.use(VueProgressBar, options);
Vue.use(VueCarousel);

Vue.prototype.$axios = axios
Vue.prototype.$currencyConverter = currencyConverter
Vue.prototype.$qtyConverter = qtyConverter
Vue.prototype.$dateFormat = dateFormat

Vue.config.productionTip = false

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
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
