import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'
import Swal from 'sweetalert2'
import rpConvert from '../helpers/rpConverter.js'

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
    baseUrl: 'https://v2shop.herokuapp.com',
    displayProducts: null,
    loading: {
      userInfo: false,
      productTable: false,
      wholePageLoading: false,
      productDetails: false,
      productCard: false
    },
    displayDetail: null,
    cart: [],
    unconfirmed: [],
    totalActiveCart: '',
    transactionHistory: [],
    incomes: [],
    totalIncome: 0,
    adminList: []
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
    SET_LOADING_PRODUCTCARD (state) {
      state.loading.userInfo = true
    },
    SET_UNLOAD_PRODUCTCARD (state) {
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
    },
    SET_LOADING_productDetails (state) {
      state.loading.productDetails = true
    },
    SET_UNLOAD_productDetails (state) {
      state.loading.productDetails = false
    },
    SET_CART (state, payload) {
      state.cart = payload
    },
    SET_UNCONFIRMED (state, payload) {
      state.unconfirmed = payload
    },
    SET_TOTAL (state, payload) {
      state.totalActiveCart = payload
    },
    SET_TRANSACTION_HISTORY (state, payload) {
      state.transactionHistory = payload
    },
    SET_INCOME (state, payload) {
      state.incomes = payload
    },
    SET_TOTALINCOME (state, payload) {
      state.totalIncome = payload
    },
    SET_ADMINLIST (state, payload) {
      state.adminList = payload
    }
  },
  actions: {
    fetchAdmins (state, payload) {
      axios({
        url: this.state.baseUrl + '/user/admins',
        method: 'get',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.commit('SET_ADMINLIST', data)
        })
        .catch(err => {
          Swal.fire(
            'Oops. . .!',
            err.response.data.msg,
            'error'
          )
        })
    },
    fetchIncomes (state, payload) {
      axios({
        url: this.state.baseUrl + '/user/incomes',
        method: 'get',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          let totalIncomes = 0
          data.forEach(element => {
            element.Product.displayPrice = rpConvert(element.Product.price)
            element.total = rpConvert(element.Product.price * element.qty)
            totalIncomes += (element.Product.price * element.qty)
          })
          totalIncomes = rpConvert(totalIncomes)
          this.commit('SET_TOTALINCOME', totalIncomes)
          this.commit('SET_INCOME', data)
        })
        .catch(err => {
          Swal.fire(
            'Oops. . .!',
            err.response.data.msg,
            'error'
          )
        })
    },
    fetchPurchases (state, payload) {
      axios({
        url: this.state.baseUrl + '/user/purchases',
        method: 'get',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          data = data.sort(function (a, b) {
            return new Date(b.finish_date).getTime() - new Date(a.finish_date).getTime()
          })
          data.forEach(element => {
            element.Product.displayPrice = rpConvert(element.Product.price)
          })
          this.commit('SET_TRANSACTION_HISTORY', data)
        })
        .catch(err => {
          Swal.fire(
            'Oops. . .!',
            err.response.data.msg,
            'error'
          )
        })
    },
    confirmDelivery (state, payload) {
      axios({
        url: this.state.baseUrl + '/cart/deliveryConfirmation/' + payload.id,
        method: 'delete',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.dispatch('fetchUserCart')
          Swal.fire({
            icon: 'success',
            title: 'Transaction Finished'
          })
          this.dispatch('fetchPurchases')
        })
        .catch(err => {
          Swal.fire(
            'Oops. . .!',
            err.response.data.msg,
            'error'
          )
        })
    },
    checkout (state, payload) {
      axios({
        url: this.state.baseUrl + '/cart/checkOut',
        method: 'patch',
        data: {
          cartItems: payload
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          Swal.fire(
            'CheckedOut!',
            `${payload.length} item(s) has been successfully checkedout`,
            'success'
          )
          this.dispatch('fetchUserCart')
        })
        .catch(err => {
          Swal.fire(
            'Oops. . .!',
            err.response.data.msg,
            'error'
          )
        })
    },
    deleteItem (state, payload) {
      axios({
        url: this.state.baseUrl + '/cart/' + payload.id,
        method: 'delete',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          Swal.fire({
            icon: 'success',
            title: 'Successfully deleted from cart'
          })
          this.dispatch('fetchUserCart')
        })
        .catch(err => {
          Swal.fire(
            'Oops. . .!',
            err.response.data.msg,
            'error'
          )
        })
    },
    fetchUserCart (state, payload) {
      const active = []
      const checkedOut = []
      axios({
        url: this.state.baseUrl + '/cart',
        method: 'get',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          data.forEach(element => {
            if (element.status === 'Active') {
              active.push(element)
            } else if (element.status === 'CheckedOut') {
              checkedOut.push(element)
            }
          })
          active.forEach(element => {
            element.Product.displayPrice = rpConvert(element.Product.price)
          })
          checkedOut.forEach(element => {
            element.Product.displayPrice = rpConvert(element.Product.price)
          })
          this.commit('SET_UNCONFIRMED', checkedOut)
          this.commit('SET_CART', active)
        })
        .catch(err => {
          Swal.fire(
            'Oops. . .!',
            err.response.data.msg,
            'error'
          )
        })
    },
    addToCart (state, payload) {
      axios({
        url: this.state.baseUrl + '/cart',
        method: 'post',
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          ProductId: payload.ProductId,
          qty: payload.qty
        }
      })
        .then(({ data }) => {
          Swal.fire({
            icon: 'success',
            title: 'Successfully added to cart'
          })
          this.dispatch('fetchUserCart')
        })
        .catch(err => {
          Swal.fire(
            'Oops. . .!',
            err.response.data.msg,
            'error'
          )
        })
    },
    fetchShopProducts (state, payload) {
      axios({
        url: this.state.baseUrl + '/products/user',
        method: 'get',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.commit('SET_DISPLAY_PRODUCTS', data)
        })
        .catch(err => {
          Swal.fire(
            'Oops. . .!',
            err.response.data.msg,
            'error'
          )
        })
    },
    fetchUnOfficialProducts (state, payload) {
      axios({
        url: this.state.baseUrl + '/products/unOfficial',
        method: 'get'
      })
        .then(({ data }) => {
          this.commit('SET_DISPLAY_PRODUCTS', data)
        })
        .catch(err => {
          Swal.fire(
            'Oops. . .!',
            err.response.data.msg,
            'error'
          )
        })
    },
    fetchAllOfficialProducts (state, payload) {
      axios({
        url: this.state.baseUrl + '/products/official',
        method: 'get'
      })
        .then(({ data }) => {
          this.commit('SET_DISPLAY_PRODUCTS', data)
        })
        .catch(err => {
          Swal.fire(
            'Oops. . .!',
            err.response.data.msg,
            'error'
          )
        })
    },
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
          Swal.fire(
            'Oops. . .!',
            err.response.data.msg,
            'error'
          )
        })
    },
    fetchProductDetails (state, payload) {
      this.commit('SET_LOADING_productDetails')
      axios({
        url: this.state.baseUrl + '/products/' + payload,
        method: 'get'
      })
        .then(({ data }) => {
          this.commit('SET_UNLOAD_productDetails')
          this.commit('SET_DISPLAY_DETAIL', data)
        })
        .catch(err => {
          Swal.fire(
            'Oops. . .!',
            err.response.data.msg,
            'error'
          )
        })
    },
    fetchProductByCategory (state, payload) {
      this.commit('SET_LOADING_PRODUCTCARD')
      axios({
        method: 'get',
        url: this.state.baseUrl + '/products/categories/' + payload
      })
        .then(({ data }) => {
          this.commit('SET_UNLOAD_PRODUCTCARD')
          this.commit('SET_DISPLAY_PRODUCTS', data)
        })
        .catch(err => {
          this.commit('SET_UNLOAD_PRODUCTCARD')
          Swal.fire(
            'Oops. . .!',
            err.response.data.msg,
            'error'
          )
        })
    },
    fetchMainProducts (state) {
      this.commit('SET_LOADING_PRODUCTCARD')
      axios({
        method: 'get',
        url: this.state.baseUrl + '/products'
      })
        .then(({ data }) => {
          this.commit('SET_UNLOAD_PRODUCTCARD')
          this.commit('SET_DISPLAY_PRODUCTS', data)
        })
        .catch(err => {
          this.commit('SET_UNLOAD_PRODUCTCARD')
          Swal.fire(
            'Oops. . .!',
            err.response.data.msg,
            'error'
          )
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
          Swal.fire(
            'Oops. . .!',
            err.response.data.msg,
            'error'
          )
        })
    },
    register (state, payload) {
      this.commit('SET_LOADING_WHOLEPAGE')
      axios({
        method: 'post',
        url: this.state.baseUrl + '/user/register',
        data: payload
      })
        .then(({ data }) => {
          this.commit('SET_UNLOAD_WHOLEPAGE')
          Swal.fire(
            'Registration Successful!',
            'You have successfully registered and logged in as ' + data.userInfo.name,
            'success'
          )
          localStorage.setItem('token', data.token)
          this.commit('SET_USERINFO', data.userInfo)
          router.push('/home')
        })
        .catch(err => {
          this.commit('SET_UNLOAD_WHOLEPAGE')
          Swal.fire(
            'Oops. . .!',
            err.response.data.msg,
            'error'
          )
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
          Swal.fire(
            'Oops. . .!',
            err.response.data.msg,
            'error'
          )
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
          if (payload.user) {
            router.push('/shop/products')
          }
        })
        .catch(err => {
          this.commit('SET_UNLOAD_WHOLEPAGE')
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.msg
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
          if (payload.user) {
            this.dispatch('fetchShopProducts')
          } else {
            this.dispatch('fetchMainProducts')
          }
        })
        .catch(err => {
          this.commit('SET_UNLOAD_WHOLEPAGE')
          Swal.fire(
            'Oops. . .!',
            err.response.data.msg,
            'error'
          )
        })
    },
    deleteProduct (state, payload) {
      this.commit('SET_LOADING_WHOLEPAGE')
      axios({
        url: this.state.baseUrl + '/products/' + payload.id,
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
          if (payload.user) {
            this.dispatch('fetchShopProducts')
          } else {
            this.dispatch('fetchMainProducts')
          }
        })
        .catch(err => {
          this.commit('SET_UNLOAD_WHOLEPAGE')
          Swal.fire(
            'Oops. . .!',
            err.response.data.msg,
            'error'
          )
        })
    },
    registerAdmin (state, payload) {
      axios({
        method: 'post',
        url: this.state.baseUrl + '/user/register',
        data: payload,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          Swal.fire(
            'Registered!',
            'Employee has been registered successfully. Please try to login using the newly registered account',
            'success'
          )
          router.push('/admin/Products')
        })
        .catch(err => {
          Swal.fire(
            'Oops. . .!',
            err.response.data.msg,
            'error'
          )
        })
    }
  }
})
