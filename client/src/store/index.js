import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    listProducts: null,
    loginStatus: false,
    adminStatus: false,
    name: '',
  },
  mutations: {
    LIST_PRODUCTS(state, payload) {
      state.listProducts = payload;
    },
    LOGOUT(state) {
      state.adminStatus = false;
      state.loginStatus = false;
      state.name = '';
    },
    LOGIN(state) {
      state.loginStatus = true;
    },
    ADMIN(state) {
      state.adminStatus = true;
    },
    NAME(state) {
      state.name = localStorage.name;
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
        commit('NAME');
      } else {
        commit('LOGOUT');
      }
    },
    checkAdmin({ commit }) {
      if (localStorage.admin) {
        commit('ADMIN');
      }
    },
  },
  getters: {
    getListProducts(state) {
      return state.listProducts;
    },
  },
});
