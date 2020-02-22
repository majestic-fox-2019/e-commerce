import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Swal from 'sweetalert2'
Vue.use(Vuex)

const BASE_URL = `http://localhost:3000`

export default new Vuex.Store({
  state: {
    name: '',
    isLogin: false,
    addProduct: false,
    products: []
  },
  mutations: {
    SET_LOGIN(state, payload) {
      state.isLogin = payload
    },
    SET_FORM(state, payload) {
      state.addProduct = payload
    },
    SET_PRODUCTS(state, payload) {
      state.products = payload
    }
  },
  actions: {
    updateProduct({ commit, state, dispatch }, payload) {
      console.log(payload.name)
      axios({
        method: 'PUT',
        url: `${BASE_URL}/products/${payload.id}`,
        headers: {
          access_token: localStorage.getItem("access_token")
        },
        data: payload
      })
        .then(({ data }) => {
          let temp = state.products.filter(el => {
            return el.id != payload.id
          })
          temp.push(data[1])
          commit("SET_PRODUCTS", temp)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${err.response.data}`
          })
        })
    },
    deleteProduct({ commit, state, dispatch }, payload) {
      axios({
        method: 'DELETE',
        url: `${BASE_URL}/products/${payload}`,
        data: payload,
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then(({ data }) => {
          let temp = state.products.filter(el => {
            return el.id !== payload
          })
          console.log(temp)
          commit("SET_PRODUCTS", temp)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${err.response.data}`
          })
        })
    },
    getProduct({ commit, state, dispatch }) {
      axios({
        method: 'GET',
        url: `${BASE_URL}/products`,
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then(({ data }) => {
          console.log(data)
          let temp = []
          data.forEach(el => {
            temp.push(el)
          })
          commit("SET_PRODUCTS", temp)

        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${err.response.data}`
          })
        })
    },
    addProduct({ commit, state, dispatch }, payload) {
      axios({
        method: 'POST',
        url: `${BASE_URL}/products`,
        data: payload,
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then(({ data }) => {
          console.log(data)
          commit("SET_FORM", false)
          let temp = state.products
          temp.push(data)
          commit("SET_PRODUCTS", temp)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${err.response.data}`
          })
        })
    },
    logOut({ commit, state, dispatch }) {
      localStorage.clear()
      dispatch("checkLogin")
    },
    checkLogin({ commit, state, dispatch }) {
      if (localStorage.getItem('access_token')) {
        commit('SET_LOGIN', true)
      } else {
        commit('SET_LOGIN', false)
      }
    },
    login({ commit, state, dispatch }, payload) {
      axios({
        method: 'POST',
        url: `${BASE_URL}/users/login`,
        data: payload
      })
        .then(({ data }) => {
          if (data.user.roles === 'admin') {
            localStorage.setItem("access_admin", "admin")
          }
          localStorage.setItem('access_token', data.access_token)
          dispatch("checkLogin")
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${err.response.data}`,
            footer: '<a href>Why do I have this issue?</a>'
          })
        })
    },
    register({ commit, state, dispatch }, payload) {
      axios({
        method: 'POST',
        url: `${BASE_URL}/users/register`,
        data: payload
      })
        .then(({ data }) => {
          console.log(data)
          localStorage.setItem('access_token', data.access_token)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${err.response.data}`,
            footer: '<a href>Why do I have this issue?</a>'
          })
        })
    }
  },
  modules: {

  }
})
