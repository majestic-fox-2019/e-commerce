import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const $axios = axios.create({ baseURL: 'http://localhost:3000' })

export default new Vuex.Store({
  state: {
    isLoggedIn: localStorage.token || null,
    userEmail: localStorage.email || null,
    userId: localStorage.userId || null,
    products: [],
    carts: [],
    countCart: 0,
    singleProducts: {},
    errors: [],
    categories: [],
  },
  mutations: {
    already_login(state) {
      state.isLoggedIn = localStorage.token
      state.userEmail = localStorage.email
      state.userId = localStorage.userId
    },
    get_products(state, payload){
      state.products = payload
    },
    get_errors(state, payload){
      state.errors = payload
    },
    get_single_products(state, payload){
      state.singleProducts = payload
    },
    get_count_cart(state, payload){
      state.countCart = payload
    },
    get_cart(state, payload){
      state.carts = payload
    },
    get_category(state, payload){
      state.categories = payload
    },
    logout(state){
      state.isLoggedIn = null
    }
  },
  actions: {
    loginHandler({ commit }, payload){
      localStorage.token = payload.token
      localStorage.email = payload.email
      localStorage.userId = payload.id
      commit('already_login')
    },
    getProducts({ commit }){
      $axios.get('/products')
      .then(response => {
        commit('get_products', response.data)
      })
      .catch(err => {
        commit('get_errors', err.response.data)
      })
    },
    getProductById({ commit }, id){
      $axios.get(`/products/detail/${id}`)
      .then(response => {
        commit('get_single_products', response.data)
      })
      .catch(err => {
        commit('get_errors', err.response.data)
      })
    },
    getTransaction({ commit }, data){
      $axios.get(`/transaction/${data.userId}`,{
        headers: {
          token: data.token
        }
      })
      .then(response => {
        commit('get_count_cart', response.data.length)
        commit('get_cart', response.data)
      })
      .catch(err => {
        commit('get_errors', err.response.data)
      })
    },
    getCategory({ commit }){
      $axios.get('/categories')
      .then(response => {
        this.commit('get_category', response.data)
      })
      .catch(err => {
        commit('get_errors', err.response.data)
      })
    },
    logoutHandler({ commit }){
      localStorage.clear()
      commit('logout')
    }
  },
  modules: {
  }
})
