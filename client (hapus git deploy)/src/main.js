import Vue from 'vue';
import VueProgressBar from 'vue-progressbar'
import App from './App.vue';
import router from './routes/router';
import axios from './api/axios'
import swal from './api/swal'
import moment from './api/moment'
import options from './api/progressBar'
import store from './store/store'


Vue.prototype.$axios = axios;
Vue.prototype.$swal = swal;
Vue.prototype.$moment = moment;

Vue.use(VueProgressBar, options)

Vue.config.productionTip = false;



export default new Vue({
  router,
  store,
  created() {
    this.$axios.interceptors.request.use(config => {
      this.$Progress.start();
      return config;
    }, error=>{
      this.$Progress.fail();
      return Promise.reject(error);
    });
    
    this.$axios.interceptors.response.use(response => {
      this.$Progress.finish();
      return response;
    }, error=>{
      this.$Progress.fail();
      return Promise.reject(error);
    });
  },
  render: (h) => h(App),
}).$mount('#app');
