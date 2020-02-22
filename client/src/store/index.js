import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:3000' });
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    userLogin: null,
    products: null,
  },
  mutations: {
    // Sync
    isLogin(state, payload) {
      state.isLogin = true;
      state.userLogin = payload;
    },
    logout(state) {
      state.isLogin = false;
      state.userLogin = null;
    },
    ALLPRODUCT(state, payload) {
      state.products = [...payload];
    },
  },
  actions: {
    // Async
    loginStatus({ commit }) {
      if (localStorage.getItem('token')) {
        commit('login');
      } else {
        commit('logout');
      }
    },
    logout({ commit }) {
      localStorage.clear();
      commit('logout');
    },
    getAllProduct({ commit }) {
      api
        .get('/products', {
          headers: {
            token: localStorage.getItem('token'),
          },
        })
        .then(({ data }) => {
          commit('ALLPRODUCT', data);
        })
        .catch((err) => {
          console.log('masuk err');
          console.log(err);
        });
    },
  },

});
