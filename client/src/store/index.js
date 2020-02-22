import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    isAdmin: false,
    productList: [],
    bannerList: []
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
        url: '/products',
        headers: {
          token: localStorage.token
        }
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
        url: '/banners',
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          commit('SAVE_BANNER_LIST', data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  modules: {}
})
