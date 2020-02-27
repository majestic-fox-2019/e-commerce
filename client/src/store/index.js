import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

const server = 'http://localhost:3000';
// const server = 'https://upface.herokuapp.com';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: null,
    categories: null,
    carts: null
  },
  mutations: {
    ALL_PRODUCTS(state, payload) {
      state.products = payload;
    },
    ALL_CATEGORIES(state, payload) {
      state.categories = payload;
    },
    MY_CART(state, payload) {
      state.carts = payload
    }
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
    userCarts(context) {
      if (localStorage.token) {
        axios({
          method: "get",
          url: `${server}/carts`,
          headers: {
            token: localStorage.token
          }
        })
          .then(result => {
            context.commit('MY_CART', result.data.Products)
          })
          .catch(err => {
            console.log(err.response, '< error store')
          });
      } else {
        context.commit('MY_CART', null)

      }
    }

  },
  getters: {
  },
});
