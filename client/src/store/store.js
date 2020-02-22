import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    allData: null,
  },
  actions: {
    loadData({ commit }) {
      axios({
        method: 'GET',
        url: 'http://localhost:3000/product',
        headers: { token: localStorage.token },
      })
        .then((result) => {
          // setTimeout(() => {
          // }, 1000);
          commit('SET_DATA', result.data);
        });
    },
  },
  mutations: {
    SET_DATA(state, payload) {
      state.allData = [...payload];
    },
  },
  getters: {
    available: (state) => {
      let data = '';
      setTimeout(() => {
        data = state.allData.filter((el) => el.stock === 10);
      }, 1000);
      return data;
    },
  },
});
