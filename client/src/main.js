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

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount('#app');
