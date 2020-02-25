import Vue from 'vue'
import * as BoostrapVue from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap.css'
import App from './App.vue'
import router from './router'
import store from './store'
import { IconsPlugin } from 'bootstrap-vue'

Vue.config.productionTip = false
Vue.use(BoostrapVue)
Vue.use(IconsPlugin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
