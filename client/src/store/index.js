import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categoryItem: null,
    userLogin: null,
    baseUrl: 'http://localhost:3000'
  },
  mutations: {
    SET_CATEGORYITEM(state, payload) {
      state.categoryItem = payload
    },
    SET_USERLOGIN(state, payload) {
      state.userLogin = payload
    }
  },
  actions: {
    register({ commit, state }, payload) {
      console.log('masuk actions', payload)

      let newUser = {
        name: payload.name,
        email: payload.email,
        password: payload.password,
        role: 'user'
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
          commit('SET_USERLOGIN', payload)
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
        })
        .catch(err => {
          console.log(err.response)
        })
    }
  },
  modules: {}
})
