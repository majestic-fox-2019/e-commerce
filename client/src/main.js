import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import * as firebase from "firebase"

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'element-ui/lib/theme-chalk/index.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(ElementUI)

Vue.config.productionTip = false
const firebaseConfig = require("./config/configFirebase")
firebase.initializeApp(firebaseConfig)
Vue.use(firebase)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
