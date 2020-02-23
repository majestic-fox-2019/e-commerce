import '@babel/polyfill'
import 'mutationobserver-shim'
/*!

=========================================================
* Vue Argon Dashboard - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Vue from 'vue'
import './plugins/bootstrap-vue'
import axios from 'axios';
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import ArgonDashboard from './plugins/argon-dashboard'

axios.defaults.baseURL = "http://localhost:3000";

Vue.config.productionTip = false

Vue.use(axios);
Vue.use(ArgonDashboard)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
