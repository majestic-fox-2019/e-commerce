import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

const api = axios.create({
  // baseURL: 'https://e-commerce-hacktiv.herokuapp.com/',
  baseURL: 'https://e-commerce-hacktiv.herokuapp.com',
});
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: null,
    userLogin: null,
    products: null,
    allCarts: null,
    total: null,
  },
  mutations: {
    // Sync
    login(state, payload) {
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
    ALLCARTS(state, payload) {
      state.allCarts = [...payload];
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
      console.log('dispatch run');
      // if (localStorage.getItem('token')) {
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
          // console.log('masuk err');
          console.log(err);
        });
      // }
    },
    getAllCarts({ commit }) {
      console.log('Masuk carts');
      api
        .get('/carts', {
          headers: {
            token: localStorage.getItem('token'),
          },
        })
        .then(({ data }) => {
          commit('ALLCARTS', data);
        })
        .catch((err) => {
          // console.log('masuk err');
          console.log(err);
        });
    },
  },

});
