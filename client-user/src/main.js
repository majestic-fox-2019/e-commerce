import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import { VueProgressBar, options } from './apis/progress';
import instance from './apis/axios';
import { Swal, Toast } from './apis/sweetAlert';
import VueCarousel from 'vue-carousel';
import convert from './apis/helper';

Vue.config.productionTip = false

Vue.use(VueProgressBar, options);
Vue.use(VueCarousel);

Vue.prototype.$http = instance;
Vue.prototype.$swal = Swal;
Vue.prototype.$toast = Toast;
Vue.prototype.$convert = convert;

new Vue({
  created() {
    this.$http.interceptors.request.use((config) => {
      this.$Progress.start();
      return config;
    }, (error) => {
      this.$Progress.finish();
      return Promise.reject(error);
    });
    this.$http.interceptors.response.use((response) => {
      this.$Progress.finish();
      return response;
    }, (error) => {
      this.$Progress.finish();
      return Promise.reject(error);
    });
  },
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
