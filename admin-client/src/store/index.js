import Vue from 'vue'
import Vuex from 'vuex'
import api from '../helper/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: null,
    categories: null,
    products: null
  },
  mutations: {
    SET_USERS (state, payload) {
      state.users = payload
    },
    SET_CATEGORIES (state, payload) {
      state.categories = payload
    },
    SET_PRODUCTS (state, payload) {
      state.products = payload
    }
  },
  actions: {
    getUsers (context) {
      api
        .get('/users', { headers: { token: localStorage.access_token } })
        .then(({ data }) => {
          context.commit('SET_USERS', data)
        })
        .catch(err => console.log(err))
    },
    getCategories (context) {
      api
        .get('/categories', { headers: { token: localStorage.access_token } })
        .then(({ data }) => {
          context.commit('SET_CATEGORIES', data)
        })
        .catch(err => console.log(err))
    },
    getProducts (context) {
      api
        .get('/products', { headers: { token: localStorage.access_token } })
        .then(({ data }) => {
          // console.log(data)
          context.commit('SET_PRODUCTS', data)
        })
        .catch(err => console.log(err.response))
    }

  },
  modules: {
  }
})
