import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import axios from 'axios'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    BASE_URL: 'http://localhost:3000',
    loading: false,
    loginStatus: false,
    userProfile: null,
    registerStatus: false,
    allProducts: [],
    myProducts: [],
    selectedProduct: null,
    editProduct: null,
    dialogItem: false,
    dialogShop: false
  },
  mutations: {
    CHANGE_LOGIN(state, val) {
      state.loginStatus = true
      state.userProfile = val
    },
    CLEAR_STATUS(state) {
      state.loginStatus = false
      state.registerStatus = false
      state.userProfile = null
      state.myProducts = []
      state.editProduct = []
    },
    CHANGE_REGISTER(state, val) {
      state.registerStatus = val
    },
    DIALOG_CHANGE(state, val) {
      state.dialogItem = val
    },
    DIALOG_CHANGE_SHOP(state, val) {
      state.dialogShop = val
    },
    ALL_PRODUCTS(state, val) {
      state.allProducts = val
    },
    MY_PRODUCTS(state, val) {
      state.myProducts = val
    },
    DETAIL_PRODUCT(state, val) {
      state.selectedProduct = val
    },
    GET_EDIT_DATA(state, val) {
      state.editProduct = val
    }
  },
  actions: {
    LOGIN(context, data) {
      axios
        .post(`${this.state.BASE_URL}/users/login`, data)
        .then(({ data }) => {
          const user = data.data
          router.push('/')
          localStorage.setItem('token', data.token)
          context.commit('CHANGE_LOGIN', user)
          Swal.fire('Welcome', 'Login success', 'success')
        })
        .catch(({ response }) => {
          const errors = response.data.err
          console.log(errors)
        })
    },
    REGISTER(context, data) {
      axios
        .post(`${this.state.BASE_URL}/users/register`, data)
        .then(({ data }) => {
          const user = data.data
          localStorage.setItem('token', data.token)
          context.commit('CHANGE_LOGIN', user)
          Swal.fire('Welcome', 'Registration success', 'success')
        })
        .catch(({ response }) => {
          const errors = response
          console.log(errors)
        })
    },
    GET_USER_INFO(context) {
      axios
        .get(`${this.state.BASE_URL}/users`, {
          headers: { token: localStorage.getItem('token') }
        })
        .then(({ data }) => {
          const user = data
          context.commit('CHANGE_LOGIN', user)
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    CREATE_SHOP(context, data) {
      axios
        .patch(`${this.state.BASE_URL}/users/create-shop`, data, {
          headers: { token: localStorage.getItem('token') }
        })
        .then(result => {
          context.commit('DIALOG_CHANGE', false)
          this.dispatch('GET_USER_INFO')
          this.state.userProfile.role = 'premium'
          router.push('/panel')
          Swal.fire('Congratulations', 'A new shop created', 'success')
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    FETCH_ALL_PRODUCTS(context) {
      axios
        .get(`${this.state.BASE_URL}/products`)
        .then(({ data }) => {
          context.commit('ALL_PRODUCTS', data)
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    FETCH_CATEGORY_PRODUCTS(context, data) {
      axios
        .get(`${this.state.BASE_URL}/products/categories/${data}`)
        .then(({ data }) => {
          console.log(data)
          context.commit('ALL_PRODUCTS', data)
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    FETCH_USER_PRODUCTS(context) {
      axios
        .get(`${this.state.BASE_URL}/products/user/my-products`, {
          headers: { token: localStorage.getItem('token') }
        })
        .then(({ data }) => {
          context.commit('MY_PRODUCTS', data)
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    FETCH_DETAILS_PRODUCT(context, data) {
      axios
        .get(`${this.state.BASE_URL}/products/${data}`)
        .then(({ data }) => {
          context.commit('DETAIL_PRODUCT', data)
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    POST_PRODUCT(context, data) {
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('description', data.description)
      formData.append('price', data.price)
      formData.append('stocks', data.stocks)
      formData.append('category', data.category)
      formData.append('status', data.status)
      formData.append('image_url', data.image_url)
      Swal.showLoading()
      axios
        .post(`${this.state.BASE_URL}/products`, formData, {
          headers: { token: localStorage.getItem('token') }
        })
        .then(({ data }) => {
          Swal.close()
          context.commit('DIALOG_CHANGE', false)
          this.dispatch('FETCH_USER_PRODUCTS')
          Swal.fire('Product Added', data.msg, 'success')
        })
        .catch(({ response }) => {
          Swal.close()
          console.log(response)
        })
    },
    EDIT_PRODUCT(context, data) {
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('description', data.description)
      formData.append('price', data.price)
      formData.append('stocks', data.stocks)
      formData.append('category', data.category)
      formData.append('image_url', data.image_url)
      Swal.showLoading()
      axios
        .put(
          `${this.state.BASE_URL}/products/${this.state.editProduct.id}`,
          formData,
          {
            headers: { token: localStorage.getItem('token') }
          }
        )
        .then(({ data }) => {
          Swal.close()
          this.state.editProduct = null
          context.commit('DIALOG_CHANGE', false)
          this.dispatch('FETCH_USER_PRODUCTS')
          Swal.fire('Product Edited', data.msg, 'success')
        })
        .catch(({ response }) => {
          Swal.close()
          console.log(response)
        })
    },
    DELETE_PRODUCT(context, id) {
      Swal.showLoading()
      axios
        .delete(`${this.state.BASE_URL}/products/${id}`, {
          headers: { token: localStorage.getItem('token') }
        })
        .then(({ data }) => {
          Swal.close()
          this.dispatch('FETCH_USER_PRODUCTS')
          Swal.fire('Success', 'Data removed', 'success')
        })
        .catch(({ response }) => {
          Swal.close()
          console.log(response)
        })
    },
    LOGOUT(context) {
      localStorage.clear()
      context.commit('CLEAR_STATUS')
    }
  },
  modules: {}
})
