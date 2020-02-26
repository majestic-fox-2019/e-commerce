import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    isAdmin: false,
    productList: [],
    productDetail: {},
    bannerList: [],
    cartList: [],
    orderList: [],
    transactionList: []
  },
  mutations: {
    SAVE_LOGIN_STATUS(state, data) {
      state.isLogin = data.token
      state.isAdmin = data.isAdmin
    },
    SAVE_PRODUCT_LIST(state, data) {
      state.productList = data
    },
    SAVE_BANNER_LIST(state, data) {
      state.bannerList = data
    },
    SAVE_PRODUCT_DETAIL(state, data) {
      state.productDetail = data
    },
    SAVE_USER_CART(state, data) {
      state.cartList = data
    },
    SAVE_ON_CONFIRM_ORDERS(state, data) {
      state.orderList = data
    },
    SAVE_TRANSACTION_LIST(state, data) {
      state.transactionList = data
    }
  },
  actions: {
    GET_LOGIN_STATUS({ commit }) {
      let status = {
        token: false,
        isAdmin: false
      }
      if (localStorage.token) {
        status.token = true
        if (localStorage.isAdmin) {
          status.isAdmin = true
        }
      }
      commit('SAVE_LOGIN_STATUS', status)
    },
    GET_LOGOUT({ commit }) {
      localStorage.clear()
      let status = {
        token: false,
        isAdmin: false
      }
      commit('SAVE_LOGIN_STATUS', status)
    },
    GET_ALL_PRODUCT_LIST({ commit }) {
      axios({
        method: 'GET',
        url: '/products'
      })
        .then(({ data }) => {
          commit('SAVE_PRODUCT_LIST', data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    GET_ALL_BANNER_LIST({ commit }) {
      axios({
        method: 'GET',
        url: '/banners'
      })
        .then(({ data }) => {
          commit('SAVE_BANNER_LIST', data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    GET_PRODUCT_DETAIL({ commit }, id) {
      axios({
        method: 'GET',
        url: `/products/${id}`
      })
        .then(({ data }) => {
          commit('SAVE_PRODUCT_DETAIL', data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    GET_USER_CART({ commit }) {
      axios({
        method: 'GET',
        url: '/carts',
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          commit('SAVE_USER_CART', data)
        })
        .catch(({ response }) => {
          console.log(response.data)
        })
    },
    GET_ON_CONFIRM_ORDERS({ commit }) {
      axios({
        method: 'GET',
        url: '/carts/confirm',
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          commit('SAVE_ON_CONFIRM_ORDERS', data)
        })
        .catch((err) => {
          console.log(err.response.data)
        })
    },
    GET_TRANSACTION_LIST({ commit }) {
      axios({
        method: 'GET',
        url: '/transactions/',
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          commit('SAVE_TRANSACTION_LIST', data)
        })
        .catch((err) => {
          console.log(err.response.data)
        })
    }
  },
  modules: {}
})
