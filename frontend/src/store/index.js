import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { config } from '../config.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categories: [],
    products: []
  },
  mutations: {
    SET_CATEGORIES(state, payload){
      state.categories = payload
    },
    SET_PRODUCTS(state, payload){
      state.products = payload
    },
  },
  actions: {
    getCategories(context){
      axios.get(`${config.connections.server}/categories`)
      .then(res => {
        context.commit('SET_CATEGORIES', res.data.payload)
      })
      .catch(err => {
        console.log(err)
      })
    },
    getProducts(context){
      axios.get(`${config.connections.server}/products`)
      .then(res => {
        context.commit('SET_PRODUCTS', res.data.payload)
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  modules: {
  }
})
