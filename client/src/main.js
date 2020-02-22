import Vue from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import App from './App.vue';
import router from './router';
import store from './store';


Vue.config.productionTip = false;

Vue.prototype.$server = 'http://localhost:3000';
// Vue.prototype.$server = 'https://upface.herokuapp.com'
Vue.prototype.$axios = axios;
Vue.prototype.$swal = Swal;

router.beforeEach((to, from, next) => {
  const isAuthenticated = to.matched.some((record) => record.meta.isAuthenticated);
  const isAdmin = to.matched.some((record) => record.meta.isAdmin);
  if (!isAuthenticated) {
    if (localStorage.token) {
      if (localStorage.role === 'admin') {
        next({ name: 'productTable' });
      } else {
        next();
      }
    } else {
      next();
    }
  } else if (isAuthenticated) {
    if (!localStorage.token) {
      next({ name: 'home' });
    } else if (isAdmin) {
      if (localStorage.role === 'admin') {
        next();
      } else {
        next({ name: 'home' });
      }
    } else {
      next({ name: 'home' });
    }
  } else {
    next({ name: 'error' });
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
