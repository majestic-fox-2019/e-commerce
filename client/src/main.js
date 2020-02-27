import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import moment from 'moment';
import { BootstrapVue } from 'bootstrap-vue'
import VueToastify from 'vue-toastify'

Vue.filter('formatDate', function(value) {
  if (value) return moment(String(value)).format('DD MMMM YYYY, hh:mm')
});

Vue.filter('formatDateDashboard', function(value) {
  if (value) return moment(String(value)).format('DD MMMM YYYY')
});

Vue.use(Vuex)
Vue.use(BootstrapVue)
Vue.use(VueToastify, {
  customNotifications: {
    notifSuccess: {
      type: "success",
      canTimeout: true,
      duration: 1500
    },
    notifError: {
      type: "error",
      canTimeout: true,
      duration: 1500
    }
  }
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
