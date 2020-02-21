import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  const isAuthenticated = to.matched.some((record) => record.meta.isAuthenticated);
  const isAdmin = to.matched.some((record) => record.meta.isAdmin);
  if (!isAuthenticated) {
    if (localStorage.token) {
      if (localStorage.role === 'admin') {
        next({ name: 'productTable' });
      } else if (localStorage.role === 'user') {
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
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
