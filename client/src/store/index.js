import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

// const server = 'http://localhost:3000';
const server = 'https://upface.herokuapp.com';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: null,
    categories: null,
  },
  mutations: {
    ALL_PRODUCTS(state, payload) {
      state.products = payload;
    },
    ALL_CATEGORIES(state, payload) {
      state.categories = payload;
    },
  },
  actions: {
    allProducts(context) {
      axios({
        method: 'get',
        url: `${server}/products`,
        headers: { token: localStorage.token },
      })
        .then((data) => {
          context.commit('ALL_PRODUCTS', data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    allCategories(context) {
      axios({
        method: 'get',
        url: `${server}/categories`,
        headers: { token: localStorage.token },
      })
        .then((data) => {
          context.commit('ALL_CATEGORIES', data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  getters: {
  },
});
