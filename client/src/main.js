import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

axios.defaults.baseURL = "https://online-store-57731.herokuapp.com"

Vue.config.productionTip = false;

Vue.use(axios)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
