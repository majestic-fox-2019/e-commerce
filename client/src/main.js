import Vue from 'vue'
import App from './App.vue'
import Swal from 'sweetalert2'
import router from './router'
import store from './store'
import 'sweetalert2/src/sweetalert2.scss'
Vue.config.productionTip = false

Vue.prototype.$Swal = Swal

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
