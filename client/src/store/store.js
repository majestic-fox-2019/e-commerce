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
          commit('SET_DATA', result.data);
        });
    },
  },
  mutations: {
    SET_DATA(state, payload) {
      state.allData = payload;
    },
  },
});
