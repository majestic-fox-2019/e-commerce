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
    products: [],
    search: '',
    product: [],
    carts: []
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
    },
    SET_PRODUCT(state, payload) {
      state.product = payload
    },
    SET_CARTS(state, payload) {
      state.carts = payload
    }
  },
  actions: {
    checkOut({ commit, state, dispatch }, payload) {
      axios({
        method: 'PATCH',
        url: `${BASE_URL}/carts/${payload.id}/checkout`,
        headers: {
          access_token: localStorage.getItem("access_token")
        },
        data: payload
      })
        .then(({ data }) => {
          let temp = state.carts.filter(el => {
            return el.id !== payload.id
          })
          commit("SET_CARTS", temp)
          Swal.fire({
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${err.response.data}`
          })
        })
    },
    deleteCart({ commit, state, dispatch }, payload) {
      axios({
        method: 'PATCH',
        url: `${BASE_URL}/carts/${payload}`,
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then(({ data }) => {
          let temp = state.carts.filter(el => {
            return el.id !== payload
          })
          commit("SET_CARTS", temp)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${err.response.data}`
          })
        })
    },
    addCart({ commit, state, dispatch }, payload) {
      axios({
        method: 'PATCH',
        url: `${BASE_URL}/carts`,
        headers: {
          access_token: localStorage.getItem("access_token")
        },
        data: payload
      })
    },
    addOneCart({ commit, state, dispatch }, payload) {
      axios({
        method: 'PATCH',
        url: `${BASE_URL}/carts/one`,
        headers: {
          access_token: localStorage.getItem("access_token")
        },
        data: payload
      })
        .then(({ data }) => {
          Swal.fire({
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${err.response.data}`
          })
        })
    },
    getProductOne({ commit, state, dispatch }, payload) {
      axios({
        method: 'GET',
        url: `${BASE_URL}/products/${payload}`,
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then(({ data }) => {
          commit("SET_PRODUCT", data)

        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${err.response.data}`
          })
        })
    },
    getCart({ commit, state, dispatch }) {
      axios({
        method: 'GET',
        url: `${BASE_URL}/carts`,
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then(({ data }) => {
          let temp = []
          data.forEach(el => {
            temp.push(el)
          })
          // console.log(temp, 'okkkkkkk')
          commit("SET_CARTS", temp)

        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${err.response.data}`
          })
        })
    },
    updateProduct({ commit, state, dispatch }, payload) {
      axios({
        method: 'PUT',
        url: `${BASE_URL}/products/${payload.get('id')}`,
        headers: {
          access_token: localStorage.getItem("access_token")
        },
        data: payload
      })
        .then(({ data }) => {
          let temp = state.products.filter(el => {
            return el.id != payload.get('id')
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
      console.log(localStorage.getItem('access_admin'))
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
          } else {
            localStorage.setItem("access_admin", "")
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

          localStorage.setItem('access_token', data.access_token)
          if (data.user.roles === 'admin') {
            localStorage.setItem("access_admin", "admin")
          } else {
            localStorage.setItem("access_admin", "")
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
    }
  },
  modules: {

  }
})
