import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

import App from './App.vue';
import vuetify from './plugins/vuetify';

import routes from './routes';

Vue.config.productionTip = false;
Vue.use(VueRouter).use(Vuex);

// Vue Router Config
const router = new VueRouter({
  mode: 'history',
  routes,
  linkActiveClass: 'active',
});
// End Router Config

// Redirect before login
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.meta.requiresAuth) {
    if (token) {
      next();
    } else {
      next({
        name: 'login',
      });
    }
  } else if (to.path === '/login' && token) {
    next({
      name: 'home',
    });
  } else {
    next();
  }
});
// End Redirect

// Vuex
const store = new Vuex.Store({
  state: {
    isLogin: localStorage.getItem('token'),
  },
  mutations: {
    setIsLogin(state, isLogin) {
      state.isLogin = isLogin;
    },
  },
});
// console.log('store di main.js');
// console.log(store);
// End Vuex

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
