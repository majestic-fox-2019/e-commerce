import Vue from 'vue'
import * as BoostrapVue from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap.css'
import App from './App.vue'
import router from './router'
import store from './store'
import { IconsPlugin } from 'bootstrap-vue'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$axios = axios.create({ baseURL: 'http://localhost:3000' })
Vue.use(BoostrapVue)
Vue.use(IconsPlugin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
