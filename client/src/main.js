import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


//firebase
import firebase from 'firebase'
const firebaseConfig = require('../firebaseConfig')
firebase.initializeApp(firebaseConfig)

Vue.config.productionTip = false
Vue.use(firebase)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
