import Vue from 'vue'
import Vuex from 'vuex'

import api from '../helper/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: localStorage.access_token || false,
    categories: null,
    products: null,
    productsBackup: null,
    user: localStorage.user || null,
    carts: null
  },
  mutations: {
    logout(state) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      state.isLoggedIn = false
    },
    login(state, data) {
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("user", data.email);
      if (localStorage.access_token) {
        state.isLoggedIn = true
        state.user = localStorage.user
        state.carts = data.carts
      }
    },
    setCategories(state, payload) {
      state.categories = payload
    },
    setProducts(state, payload) {
      state.products = payload
    },
    setProductsBackup(state, payload) {
      state.productsBackup = payload
    },
    restoreProducts(state, payload) {
      state.products = state.productsBackup
    },
    setCarts(state, payload) {
      state.carts = payload
    }
  },
  actions: {
    getCategories(context) {
      api
        .get('/categories')
        .then(({ data }) => {
          if (Array.isArray(data)) {
            context.commit('setCategories', data)
          } else {
            context.commit('setCategories', data.message)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    getProducts(context) {
      api
        .get('/products')
        .then(({ data }) => {
          if (Array.isArray(data)) {
            context.commit('setProducts', data)
            context.commit('setProductsBackup', data)
          } else {
            context.commit('setProducts', data.message)
          }
        })
    },
    getCarts(context) {
      api
        .get("/carts", { headers: { token: localStorage.access_token } })
        .then(({ data }) => {
          console.log(data)
          context.commit('setCarts', data)
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  modules: {
  }
})
