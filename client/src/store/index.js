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
    userProfile: [],
    registerStatus: false,
    allProducts: [],
    myProducts: [],
    selectedProduct: null,
    editProduct: null,
    dialogItem: false,
    dialogShop: false,
    userCarts: [],
    activeTransaction: null,
    confirmedTransaction: null,
    cityList: [],
    incomeData: [],
    ongkir: {
      value: 0
    }
  },
  mutations: {
    CHANGE_LOGIN(state, val) {
      state.loginStatus = true
      state.userProfile = val
    },
    CLEAR_STATUS(state) {
      state.loginStatus = false
      state.registerStatus = false
      state.userProfile = []
      state.myProducts = []
      state.editProduct = []
      state.userCarts = []
      state.activeTransaction = null
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
    },
    USER_CARTS(state, val) {
      state.userCarts = val
    },
    CART_DIALOG(state, val) {
      state.cartDialog = val
    },
    GET_TRANSACTION(state, val) {
      state.activeTransaction = val
    },
    GET_CITY(state, val) {
      state.cityList = val
    },
    GET_ONGKIR(state, val) {
      state.ongkir = val
    },
    GET_CONFIRMED(state, val) {
      state.confirmedTransaction = val
    },
    GET_INCOMES(state, val) {
      state.incomeData = val
    }
  },
  actions: {
    LOGIN(context, data) {
      Swal.showLoading()
      axios
        .post(`${this.state.BASE_URL}/users/login`, data)
        .then(({ data }) => {
          Swal.close()
          const user = data.data
          router.push('/')
          localStorage.setItem('token', data.token)
          context.commit('CHANGE_LOGIN', user)
          this.dispatch('SHOW_USER_CARTS')
          Swal.fire('Welcome', 'Login success', 'success')
        })
        .catch(({ response }) => {
          Swal.close()
          const errors = response.data.err
          console.log(errors)
          Swal.fire('Error', errors[0], 'error')
        })
    },
    REGISTER(context, data) {
      Swal.showLoading()
      axios
        .post(`${this.state.BASE_URL}/users/register`, data)
        .then(({ data }) => {
          Swal.close()
          const user = data.data
          router.push('/')
          localStorage.setItem('token', data.token)
          context.commit('CHANGE_LOGIN', user)
          this.dispatch('SHOW_USER_CARTS')
          Swal.fire('Welcome', 'Registration success', 'success')
        })
        .catch(({ response }) => {
          Swal.close()
          const errors = response
          Swal.fire('Error', errors[0], 'error')
        })
    },
    GET_USER_INFO(context) {
      axios
        .get(`${this.state.BASE_URL}/users`, {
          headers: { token: localStorage.getItem('token') }
        })
        .then(({ data }) => {
          const user = data
          console.log(data)
          context.commit('CHANGE_LOGIN', user)
        })
        .catch(({ response }) => {})
    },
    CREATE_SHOP(context, data) {
      axios
        .patch(`${this.state.BASE_URL}/users/create-shop`, data, {
          headers: { token: localStorage.getItem('token') }
        })
        .then(result => {
          context.commit('DIALOG_CHANGE_SHOP', false)
          this.dispatch('GET_USER_INFO')
          this.state.userProfile.role = 'premium'
          router.push('/panel')
          Swal.fire('Congratulations', 'A new shop created', 'success')
        })
        .catch(({ response }) => {
          const errors = response
          Swal.fire('Error', errors[0], 'error')
        })
    },
    FETCH_ALL_PRODUCTS(context) {
      axios
        .get(`${this.state.BASE_URL}/products`)
        .then(({ data }) => {
          context.commit('ALL_PRODUCTS', data)
        })
        .catch(({ response }) => {
          const errors = response
          Swal.fire('Error', errors[0], 'error')
        })
    },
    FETCH_CATEGORY_PRODUCTS(context, data) {
      axios
        .get(`${this.state.BASE_URL}/products/categories/${data}`)
        .then(({ data }) => {
          context.commit('ALL_PRODUCTS', data)
        })
        .catch(({ response }) => {
          const errors = response
          Swal.fire('Error', errors[0], 'error')
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
          const errors = response
          Swal.fire('Error', errors[0], 'error')
        })
    },
    FETCH_DETAILS_PRODUCT(context, data) {
      axios
        .get(`${this.state.BASE_URL}/products/${data}`)
        .then(({ data }) => {
          context.commit('DETAIL_PRODUCT', data)
        })
        .catch(({ response }) => {
          const errors = response
          Swal.fire('Error', errors[0], 'error')
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
          const errors = response
          Swal.fire('Error', errors[0], 'error')
        })
    },
    EDIT_PRODUCT(context, data) {
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('description', data.description)
      formData.append('price', data.price)
      formData.append('stocks', data.stocks)
      formData.append('status', data.status)
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
          const errors = response
          Swal.fire('Error', errors[0], 'error')
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
          const errors = response
          Swal.fire('Error', errors[0], 'error')
        })
    },
    SHOW_USER_CARTS(context, id) {
      axios
        .get(`${this.state.BASE_URL}/carts`, {
          headers: { token: localStorage.getItem('token') }
        })
        .then(({ data }) => {
          context.commit('USER_CARTS', data)
        })
    },
    ADD_TO_CART(context, data) {
      Swal.showLoading()
      axios
        .post(`${this.state.BASE_URL}/carts`, data, {
          headers: { token: localStorage.getItem('token') }
        })
        .then(({ data }) => {
          Swal.fire('Item added', 'Successfully added to cart', 'success')
          this.dispatch('SHOW_USER_CARTS')
        })
        .catch(({ response }) => {
          const errors = response.data
          Swal.fire('Error', errors[0], 'error')
        })
    },
    REMOVE_ITEM(context, data) {
      axios
        .delete(`${this.state.BASE_URL}/carts/${data}`, {
          headers: { token: localStorage.getItem('token') }
        })
        .then(({ data }) => {
          Swal.fire('Succcess', data.message, 'success')
          this.dispatch('SHOW_USER_CARTS')
        })
        .catch(({ response }) => {
          const errors = response.data
          Swal.fire('Error', errors[0], 'error')
        })
    },
    LOGOUT(context) {
      localStorage.clear()
      context.commit('CLEAR_STATUS')
    },
    CHECKOUT_ALL(context, data) {
      axios
        .patch(
          `${this.state.BASE_URL}/carts/checkout`,
          { cart: data },
          {
            headers: { token: localStorage.getItem('token') }
          }
        )
        .then(({ data }) => {
          this.dispatch('SHOW_USER_CARTS')
          Swal.fire(
            'Thank you',
            'Your transaction are now processed',
            'success'
          )
          router.push('/user/transaction')
        })
        .catch(({ response }) => {
          const errors = response.data
          Swal.fire('Error', errors[0], 'error')
        })
    },
    FETCH_ACTIVE_TRANSACTION(context) {
      axios
        .get(`${this.state.BASE_URL}/carts/transaction`, {
          headers: { token: localStorage.getItem('token') }
        })
        .then(({ data }) => {
          context.commit('GET_TRANSACTION', data)
        })
        .catch(({ response }) => {
          const errors = response.data
          Swal.fire('Error', errors[0], 'error')
        })
    },
    FETCH_CONFIRMED_TRANSACTION(context) {
      axios
        .get(`${this.state.BASE_URL}/carts/transaction/history`, {
          headers: { token: localStorage.getItem('token') }
        })
        .then(({ data }) => {
          context.commit('GET_CONFIRMED', data)
        })
        .catch(({ response }) => {
          const errors = response.data
          Swal.fire('Error', errors[0], 'error')
        })
    },
    FETCH_CITY(context) {
      axios
        .get(`${this.state.BASE_URL}/api/city`)
        .then(({ data }) => {
          context.commit('GET_CITY', data)
        })
        .catch(({ response }) => {
          const errors = response.data
          Swal.fire('Error', errors[0], 'error')
        })
    },
    CONFIRM_TRANSACTION(context, data) {
      const id = data.id
      const total = {
        totalPrice: data.totalPrice
      }
      axios
        .post(`${this.state.BASE_URL}/carts/confirm/${id}`, total, {
          headers: { token: localStorage.getItem('token') }
        })
        .then(({ data }) => {
          console.log(data)
          this.dispatch('FETCH_ACTIVE_TRANSACTION')
          Swal.fire('Thank you!', 'Transaction success', 'success')
        })
        .catch(({ response }) => {
          const errors = response.data
          Swal.fire('Error', errors[0], 'error')
        })
    },
    FETCH_USER_INCOME(context) {
      axios
        .get(`${this.state.BASE_URL}/carts/user/incomes`, {
          headers: { token: localStorage.getItem('token') }
        })
        .then(({ data }) => {
          context.commit('GET_INCOMES', data)
        })
        .catch(({ response }) => {
          const errors = response.data
          Swal.fire('Error', errors[0], 'error')
        })
    }
  },
  modules: {}
})
