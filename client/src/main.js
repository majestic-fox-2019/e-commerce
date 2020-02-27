import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import store from './vuex/main';
import router from './routes';

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
