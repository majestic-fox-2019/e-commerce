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
    idUpdate: null,
    nameUpdate: null,
    image_urlUpdate: null,
    priceUpdate: null,
    stockUpdate: null,
    ratingUpdate: null,
    descriptionUpdate: null,
    isUpdate: false,
    dataUpdate: {},
    loadData: [],
  },
  mutations: {
    loginsetter(state, alreadyLogin) {
      state.isLogin = alreadyLogin;
    },
    dataUpdate(state, dataUpdate) {
      state.idUpdate = dataUpdate.id;
      state.nameUpdate = dataUpdate.name;
      state.image_urlUpdate = dataUpdate.image_url;
      state.priceUpdate = dataUpdate.price;
      state.stockUpdate = dataUpdate.stock;
      state.descriptionUpdate = dataUpdate.description;
      state.ratingUpdate = dataUpdate.rating;
      state.isUpdate = true;
      console.log(dataUpdate, 'ini nihh state', state.isUpdate, 'awkakwakwka');
    },
    logoutupdate(state, status) {
      state.isUpdate = status;
      state.idUpdate = null;
      state.nameUpdate = null;
      state.image_urlUpdate = null;
      state.priceUpdate = null;
      state.stockUpdate = null;
      state.descriptionUpdate = null;
      state.ratingUpdate = null;
    },
    cancelupdate(state, status) {
      state.isUpdate = status;
      state.idUpdate = null;
      state.nameUpdate = null;
      state.image_urlUpdate = null;
      state.priceUpdate = null;
      state.stockUpdate = null;
      state.descriptionUpdate = null;
      state.ratingUpdate = null;
    },
    // loadData(state, data) {

    // },
  },
});

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
