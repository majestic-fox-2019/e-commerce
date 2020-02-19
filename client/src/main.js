import VueRouter from 'vue-router';
import Vuex from 'vuex';
import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import routes from './routes';


Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(Vuex);

const router = new VueRouter({
  mode: 'history',
  routes,
});

const store = new Vuex.Store({
  state: {
    url_base: 'http://localhost:3000',
    isLogin: localStorage.getItem('token'),
  },
  mutations: {
    loginsetter(state, alreadyLogin) {
      state.isLogin = alreadyLogin;
    },
  },
});

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
