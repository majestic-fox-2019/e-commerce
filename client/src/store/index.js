import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    listProducts: null,
    loginStatus: false,
  },
  mutations: {
    LIST_PRODUCTS(state, payload) {
      state.listProducts = payload;
    },
    LOGOUT(state) {
      state.loginStatus = false;
    },
    LOGIN(state) {
      state.loginStatus = true;
    },
  },
  actions: {
    listProducts({ commit }) {
      axios.get('http://localhost:3000/api/products')
        .then((result) => {
          commit('LIST_PRODUCTS', result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    logout({ commit }) {
      localStorage.clear();
      commit('LOGOUT');
    },
    login({ commit }) {
      commit('LOGIN');
    },
    checkLogin({ commit }) {
      if (localStorage.token) {
        commit('LOGIN');
      } else {
        commit('LOGOUT');
      }
    },
  },
  getters: {
    getListProducts(state) {
      return state.listProducts;
    },
  },
});
