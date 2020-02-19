import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

const server = 'http://localhost:3000';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: null,
  },
  mutations: {
    ALL_PRODUCTS(state, payload) {
      state.products = payload;
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
  },
  getters: {
  },
});
