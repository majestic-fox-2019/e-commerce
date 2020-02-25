import Vue from 'vue';

import Vuex from 'vuex';

const superagent = require('superagent');

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: localStorage.getItem('token'),
    // url_backend: 'https://o-ecommerce-backend.herokuapp.com',
    url_backend: 'http://localhost:3000',
    superagent,
    carts_total: 0,
  },
  mutations: {
    setIsLogin(state, isLogin) {
      state.isLogin = isLogin;
    },
    setCartTotal(state, cartsTotal) {
      state.carts_total = cartsTotal;
    },
  },
});
