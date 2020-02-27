import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/api/axios.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    listCategories: [],
    listProducts: [],
    isLogin: null
  },
  mutations: {
    GETALLCATEGORIES(state, payload) {
      state.listCategories = payload
    },
    GETALLPRODUCTS(state, payload) {
      state.listProducts = payload
    },
    CHANGELOGINSTATUS(state, payload) {
      localStorage.token ? state.isLogin = true : state.isLogin = false
    }
  },
  actions: {
    getAllCategories(context) {
      axios
        .get('/categories')
        .then(response => {
          context.commit("GETALLCATEGORIES", response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    getAllProducts(context) {
      axios
        .get('/products')
        .then(response => {
          context.commit('GETALLPRODUCTS', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    filterByCategory(context, filter) {
      axios
        .get(`/products/find/${filter}`)
        .then(response => {
          context.commit('GETALLPRODUCTS', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    checkLoginStatus(context) {
      context.commit('CHANGELOGINSTATUS')
    }
  },
})
