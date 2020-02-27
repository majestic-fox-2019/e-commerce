import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categoryItem: null,
    userLogin: null,
    baseUrl: 'http://localhost:3000',
    mallProduct: null,
    userProduct: null,
    quantity: 0,
    mallQuantity: 0,
    email: null
  },
  mutations: {
    SET_CATEGORYITEM(state, payload) {
      state.categoryItem = payload
    },
    SET_USERLOGIN(state, payload) {
      state.userLogin = payload
    },
    SET_USERPRODUCT(state, payload) {
      state.userProduct = payload
    },
    SET_QUANTITY(state, payload) {
      state.quantity = payload
    },
    SET_MALLQUANTITY(state, payload) {
      state.mallQuantity = payload
    },
    SET_EMAIL(state, payload) {
      state.email = payload
    },
    SET_MALLPRODUCT(state, payload) {
      state.mallProduct = payload
    }
  },
  actions: {
    register({ commit, state }, payload) {
      console.log('masuk actions', payload)

      let newUser = {
        name: payload.name,
        email: payload.email,
        password: payload.password,
        role: payload.role
      }
      axios({
        method: 'post',
        url: `${state.baseUrl}/users/register`,
        data: newUser
      })
        .then(({ data }) => {
          console.log('user register successfully with data: ', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    login({ commit, state }, payload) {
      console.log('masuk actions', payload)

      let userLogin = {
        email: payload.email,
        password: payload.password
      }
      axios({
        method: 'post',
        url: `${state.baseUrl}/users/login`,
        data: userLogin
      })
        .then(({ data }) => {
          console.log('user login successfully with data: ', data)
          localStorage.setItem('e_musicToken', data.token)
          localStorage.setItem('e_musicEmail', data.email)
          localStorage.setItem('e_musicId', data.id)
          commit('SET_USERLOGIN', data)
          commit('SET_EMAIL', data.email)
          router.push({
            path: '/'
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    getItem({ commit, state }) {
      axios({
        method: 'get',
        url: `${state.baseUrl}/products`
      })
        .then(({ data }) => {
          console.log('ini adalah semua data yang ada', data)
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    findByCategory({ commit, state }, category) {
      axios({
        method: 'get',
        url: `${state.baseUrl}/products/category/${category}`
      })
        .then(({ data }) => {
          console.log('ini adalah data berdasarkan category', data)
          commit('SET_CATEGORYITEM', data)
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    findUserProduct({ commit, state }) {
      axios({
        method: 'get',
        url: `${state.baseUrl}/products/user`,
        headers: {
          token: localStorage.getItem('e_musicToken')
        }
      })
        .then(({ data }) => {
          console.log(data)
          commit('SET_USERPRODUCT', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    findMallProduct({ state, commit }) {
      axios({
        method: 'get',
        url: `${state.baseUrl}/malls`
      })
        .then(({ data }) => {
          console.log('ini adalah seluruh data mall', data)
          commit('SET_MALLPRODUCT', data)
        })
        .catch(err => {
          console.log(err.response)
        })
    }
  },
  modules: {}
})
