import VueRouter from 'vue-router';
import Vuex from 'vuex';
import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import routes from './routes';

const superagent = require('superagent');
require('dotenv').config();

const urlBase = 'http://localhost:3000';
const token = localStorage.getItem('token');

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
    isUpdate: false,
    dataUpdate: {},
    loadData: [],
    isAdmin: localStorage.getItem('isAdmin'),
    username: localStorage.getItem('username'),
    products: [],
    showCart: false,
    isDetails: false,
    dataDetails: {},
    carts: [],
  },
  mutations: {
    loginsetter(state, alreadyLogin) {
      state.isLogin = alreadyLogin.token;
      // state.isAdmin = alreadyLogin.data;
      // console.log(state.isAdmin, 'masuk gakkkk');
    },
    dataUpdate(state, dataUpdate) {
      state.dataUpdate = dataUpdate;
      state.isUpdate = true;
      console.log(dataUpdate, 'ini nihh state', state.isUpdate, 'awkakwakwka');
    },
    dataDetails(state, data) {
      console.log(data);
      state.dataDetails = data;
      state.isDetails = true;
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
    GETDATA(state, data) {
      state.products = [];
      console.log(data, 'masukkah???');
      state.products = data;
    },
    GETCART(state, data) {
      state.carts = data;
    },
    showCart(state, argument) {
      state.showCart = argument;
    },
  },
  actions: {
    loadData({ commit }) {
      // this.products = [];
      superagent
        .get(`${urlBase}/products`)
        .set('token', token)
        .end((err, res) => {
          // alert('ulalaaaa');
          console.log(res.body, 'INI BODY LOAD DATA');
          commit('GETDATA', res.body);
        });
    },
    getCart() {
      // alert('ulalaaa');
      superagent
        .get(`${urlBase}/carts`)
        .set('token', token)
        .end((err, res) => {
          console.log(res.body, 'getCart nihhh');
          this.commit('GETCART', res.body);
        });
    },
  },
});

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
