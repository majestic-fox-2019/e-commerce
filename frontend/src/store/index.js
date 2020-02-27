import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { config } from '../config.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    islogin: null,
    modalLogin: false,
    categories: [],
    products: [],
    carts: [],
    transactions: [],
    totalPrice: null,
    isBusy: false
  },
  mutations: {
    SET_CATEGORIES(state, payload){
      state.categories = payload
    },
    SET_PRODUCTS(state, payload){
      state.products = payload
    },
    SET_CART(state, payload){
      state.carts = payload
    },
    SET_TRANSACTION(state, payload){
      state.transactions = payload
    },
    SET_TOTALPRICE(state, payload){
      state.totalPrice = payload
    },
    SET_ISLOGIN(state, payload){
      state.islogin = payload
    },
    SET_MODAL(state, payload){
      state.modalLogin = payload
    }
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
      this.state.isBusy = true
      axios.get(`${config.connections.server}/products`)
      .then(res => {
        this.state.isBusy = false
        context.commit('SET_PRODUCTS', res.data.payload)
      })
      .catch(err => {
        console.log(err)
      })
    },
    getCart(context){
      const user_id = JSON.parse(localStorage.getItem('user')).id
      const token = localStorage.getItem('token')
      this.state.isBusy = true
      axios.get(`${config.connections.server}/carts/${user_id}`, {
        headers: { Bearer : token }
      })
      .then(res => {
        this.state.isBusy = false
        context.commit('SET_CART', res.data.payload.Carts)
        context.commit('SET_TOTALPRICE', res.data.total)
      })
      .catch(err => {
        console.log(err)
      })
    },
    getTransaction(context){
      const user_id = JSON.parse(localStorage.getItem('user')).id
      const token = localStorage.getItem('token')
      this.state.isBusy = true
      axios.get(`${config.connections.server}/transactions/${user_id}`, {
        headers: { Bearer : token }
      })
      .then(res => {
        this.state.isBusy = false
        context.commit('SET_TRANSACTION', res.data.payload)
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  modules: {
  }
})
