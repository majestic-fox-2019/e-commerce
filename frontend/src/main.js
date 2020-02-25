import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue } from 'bootstrap-vue'
import VueToastify from 'vue-toastify'

Vue.config.productionTip = false

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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
