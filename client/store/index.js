import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);
const server = "https://ma-tea.herokuapp.com";
export default new Vuex.Store({
  state: {
    dataProducts: null,
    dataCategories: null
  },
  mutations: {
    inputProduct(state, payload) {
      state.dataProducts = payload;
    },
    inputCategory(state, payload) {
      state.dataCategories = payload;
    }
  },
  actions: {
    showData({ commit }) {
      axios({
        method: "get",
        url: `${server}/products`,
        headers: { token: localStorage.token }
      })
        .then(data => {
          console.log(data);
          commit("inputProduct", data.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    showCategory({ commit }) {
      axios({
        methd: "get",
        url: `${server}/category`,
        headers: { token: localStorage.token }
      })
        .then(data => {
          commit("inputCategory", data.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
});
