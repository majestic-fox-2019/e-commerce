import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Swal from 'sweetalert2'

Vue.config.productionTip = false
Vue.prototype.$axios = axios.create({ baseURL: 'https://disekrip-cms.herokuapp.com' })
Vue.prototype.$swal = Swal

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
})

Vue.prototype.$toast = Toast

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
