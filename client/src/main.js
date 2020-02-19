import Vue from 'vue';
import VueRouter from 'vue-router';

import App from './App.vue';
import vuetify from './plugins/vuetify';

import routes from './routes';

Vue.config.productionTip = false;
Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes,
  linkActiveClass: 'active',
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (localStorage.getItem('token')) {
      next();
    } else {
      next({
        name: 'login',
      });
    }
  } else {
    next();
  }
});

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount('#app');
