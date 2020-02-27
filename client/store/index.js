import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);
// const server = "https://ma-tea.herokuapp.com";
const server = "http://localhost:3000";
export default new Vuex.Store({
  state: {
    dataProducts: null,
    dataCategories: null,
    dataCarts: null,
    subTotal: null,
    totalCart: null
  },
  mutations: {
    inputProduct(state, payload) {
      state.dataProducts = payload;
    },
    inputCategory(state, payload) {
      state.dataCategories = payload;
    },
    inputCart(state, payload) {
      state.dataCarts = payload;
    },
    inputSubTotal(state, payload) {
      state.subTotal = payload;
    },
    countCart(state, payload) {
      state.totalCart = payload;
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
        method: "get",
        url: `${server}/category`,
        headers: { token: localStorage.token }
      })
        .then(data => {
          commit("inputCategory", data.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    showCart({ commit }) {
      axios({
        method: "get",
        url: `${server}/cart`,
        headers: { token: localStorage.token }
      })
        .then(data => {
          let harga = 0;
          let total = 0;
          data.data.Products.forEach(price => {
            harga += price.price * price.Cart.total;
            total += price.Cart.total;
          });
          commit("countCart", total);
          commit("inputCart", data.data.Products);
          commit("inputSubTotal", harga);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
});
