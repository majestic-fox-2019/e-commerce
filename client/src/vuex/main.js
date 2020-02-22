import Vue from 'vue';

import Vuex from 'vuex';

const superagent = require('superagent');

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: localStorage.getItem('token'),
    url_backend: 'https://o-ecommerce-backend.herokuapp.com',
    superagent,
  },
  mutations: {
    setIsLogin(state, isLogin) {
      state.isLogin = isLogin;
    },
  },
});
