import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categories: [
      {
        name: 'Smartphones',
        img: 'https://v2shop.s3-ap-southeast-1.amazonaws.com/handphone.png'
      },
      {
        name: 'Smartwatches',
        img: 'https://v2shop.s3-ap-southeast-1.amazonaws.com/smartwatch.png'
      },
      {
        name: 'Drones',
        img: 'https://v2shop.s3-ap-southeast-1.amazonaws.com/drone.png'
      },
      {
        name: 'Headphones',
        img: 'https://v2shop.s3-ap-southeast-1.amazonaws.com/headphone.png'
      },
      {
        name: 'Laptops',
        img: 'https://v2shop.s3-ap-southeast-1.amazonaws.com/laptop.png'
      }
    ],
    userInfo: null,
    baseUrl: 'http://localhost:3000',
    displayProducts: null,
    loading: {
      userInfo: false,
      productTable: false,
      wholePageLoading: false
    },
    displayDetail: null
  },
  mutations: {
    SET_DISPLAY_PRODUCTS (state, payload) {
      state.displayProducts = payload
    },
    SET_USERINFO (state, payload) {
      state.userInfo = payload
    },
    SET_LOGOUT (state) {
      state.userInfo = null
    },
    SET_LOADING_USERINFO (state) {
      state.loading.userInfo = true
    },
    SET_UNLOAD_USERINFO (state) {
      state.loading.userInfo = false
    },
    SET_LOADING_WHOLEPAGE (state) {
      state.loading.wholePageLoading = true
    },
    SET_UNLOAD_WHOLEPAGE (state) {
      state.loading.wholePageLoading = false
    },
    SET_DISPLAY_DETAIL (state, payload) {
      state.displayDetail = payload
    }
  },
  actions: {
    registerShop (state, payload) {
      axios({
        url: this.state.baseUrl + '/user/shop',
        method: 'patch',
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          shopName: payload.shopName
        }
      })
        .then(({ data }) => {
          this.dispatch('fetchUserData')
          Swal.fire(
            'Registered!',
            'You have successfully registered a shop.',
            'success'
          )
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchProductDetails (state, payload) {
      axios({
        url: this.state.baseUrl + '/products/' + payload,
        method: 'get'
      })
        .then(({ data }) => {
          this.commit('SET_DISPLAY_DETAIL', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchProductByCategory (state, payload) {
      axios({
        method: 'get',
        url: this.state.baseUrl + '/products/categories/' + payload
      })
        .then(({ data }) => {
          this.commit('SET_DISPLAY_PRODUCTS', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchMainProducts (state) {
      axios({
        method: 'get',
        url: this.state.baseUrl + '/products'
      })
        .then(({ data }) => {
          this.commit('SET_DISPLAY_PRODUCTS', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    login (state, payload) {
      axios({
        method: 'post',
        url: this.state.baseUrl + '/user/login',
        data: payload
      })
        .then(({ data }) => {
          Swal.fire(
            'Logged In!',
            'You have successfully logged in as ' + data.userInfo.name,
            'success'
          )
          localStorage.setItem('token', data.token)
          this.commit('SET_USERINFO', data.userInfo)
          router.push('/home')
        })
        .catch(err => {
          console.log(err)
        })
    },
    register (state, payload) {
      axios({
        method: 'post',
        url: this.state.baseUrl + '/user/register',
        data: payload
      })
        .then(({ data }) => {
          Swal.fire(
            'Registration Successful!',
            'You have successfully registered and logged in as ' + data.userInfo.name,
            'success'
          )
          localStorage.setItem('token', data.token)
          this.commit('SET_USERINFO', data.userInfo)
          router.push('/home')
        })
    },
    logout (state) {
      localStorage.clear()
      this.commit('SET_LOGOUT')
      Swal.fire(
        'Logged Out!',
        'Come back soon',
        'success'
      )
      router.push('/home')
    },
    fetchUserData (state, payload) {
      this.commit('SET_LOADING_USERINFO')
      axios({
        url: this.state.baseUrl + '/user/userInfo',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.commit('SET_USERINFO', data)
          this.commit('SET_UNLOAD_USERINFO')
          if (payload && data.role !== 'admin') {
            router.push('/home')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    addProduct (state, payload) {
      this.commit('SET_LOADING_WHOLEPAGE')
      const data = new FormData()
      data.append('name', payload.name)
      data.append('img_url', payload.img_url)
      data.append('desc', payload.description)
      data.append('price', payload.price)
      data.append('stock', payload.stock)
      data.append('category', payload.category)
      axios({
        method: 'post',
        url: this.state.baseUrl + '/products',
        data: data,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.commit('SET_UNLOAD_WHOLEPAGE')
          Swal.fire(
            'Add Product Success',
            'You have successfully added a product',
            'success'
          )
          this.dispatch('fetchMainProducts')
        })
        .catch(err => {
          this.commit('SET_UNLOAD_WHOLEPAGE')
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err
          })
        })
    },
    editProduct (state, payload) {
      this.commit('SET_LOADING_WHOLEPAGE')
      const data2 = new FormData()
      data2.append('name', payload.name)
      data2.append('img_url', payload.img_url)
      data2.append('desc', payload.description)
      data2.append('price', payload.price)
      data2.append('stock', payload.stock)
      data2.append('category', payload.category)
      axios({
        method: 'put',
        url: this.state.baseUrl + '/products/' + payload.id,
        data: data2,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.commit('SET_UNLOAD_WHOLEPAGE')
          Swal.fire(
            'Edit Product Success',
            'You have successfully edited a product',
            'success'
          )
          this.dispatch('fetchMainProducts')
        })
        .catch(err => {
          this.commit('SET_UNLOAD_WHOLEPAGE')
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err
          })
        })
    },
    deleteProduct (state, payload) {
      this.commit('SET_LOADING_WHOLEPAGE')
      axios({
        url: this.state.baseUrl + '/products/' + payload,
        method: 'delete',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.commit('SET_UNLOAD_WHOLEPAGE')
          Swal.fire(
            'Deleted!',
            'Your product has been deleted.',
            'success'
          )
          this.dispatch('fetchMainProducts')
        })
        .catch(err => {
          this.commit('SET_UNLOAD_WHOLEPAGE')
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err
          })
        })
    }
  }
})
