import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    allData: null,
    emptyStock: null,
  },
  actions: {
    loadData({ commit }) {
      axios({
        method: 'GET',
        url: 'http://localhost:3000/product',
      })
        .then((result) => {
          const filterData = result.data.filter((el) => el.stock > 0);
          const filterStockEmpty = result.data.filter((el) => el.stock === 0);
          // setTimeout(() => {
          // }, 1000);
          commit('SET_DATA', filterData);
          commit('SET_EMPTY', filterStockEmpty);
        });
    },
  },
  mutations: {
    SET_DATA(state, payload) {
      state.allData = [...payload];
    },
    SET_EMPTY(state, payload) {
      state.emptyStock = [...payload];
    },
  },
});
