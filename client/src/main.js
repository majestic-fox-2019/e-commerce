import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './quasar'
import * as firebase from 'firebase/app'

const firebaseConfig = require('../config/config')

firebase.initializeApp(firebaseConfig)

Vue.use(firebase)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
