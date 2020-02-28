import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import swal from 'sweetalert2'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products : [],
    product : {},
    productId : null,
    isEditing : false,
    transactions : [],
    carts : [],
    loggedin : false
  },
  mutations: {
    SET_PRODUCTS(state, payload){
      state.products = payload
    },
    SET_PRODUCT(state, payload){
      state.product = payload
    },
    SET_PRODUCT_ID(state, payload){
      state.productId = payload
    },
    EMPTY_PRODUCT(state){
      state.product = {}
    },
    SET_TRANSACTIONS(state, payload){
      state.transactions = payload
    },
    SET_CARTS(state, payload){
      state.carts = payload
    }
  },
  actions: {
    getProducts({commit,state}){
      axios({
        url : 'http://localhost:3000/product/',
        method : 'get',
        headers : {
          token : localStorage.token
        }
      })
      .then(({data})=>{
        commit('SET_PRODUCTS', data)
      })
      .catch(err => {
        swal.fire('oops something went wrong')
        console.log(err)
      })
    },

    deleteProduct({dispatch},id){
      axios({
        url:'http://localhost:3000/product/'+id,
        method : 'DELETE',
        headers : {
          token : localStorage.token
        }
      })
      .then(({data})=>{
        swal.fire(data.msg)
        dispatch('getProducts')
      }).catch(err => {
        swal.fire('oops something went wrong')
        console.log(err)
      })
    },
    
    showEditProduct({state, commit, dispatch}, id){
      axios({
        url: 'http://localhost:3000/product/'+id,
        method: 'GET',
        headers : {
          token :localStorage.token
        },
      })
      .then(({data})=>{
        commit('SET_PRODUCT', data)
        commit('SET_PRODUCT_ID', data.id)
        state.isEditing = true
        router.push('/admin/add')
      })
      .catch(err => {
        swal.fire('oops something went wrong')
        console.log(err)
      })
    },

    getTransactions({commit}){
      axios({
        url : 'http://localhost:3000/cart/transactions',
        method : 'get',
        headers : {
          token : localStorage.token
        }
      })
      .then(({data})=>{
        commit('SET_TRANSACTIONS', data)
      })
      .catch(err => {
        swal.fire('oops something went wrong')
        console.log(err)
      })
    },

    deleteTransaction({dispatch},id){
      axios({
        url:'http://localhost:3000/cart/'+id,
        method : 'DELETE',
        headers : {
          token : localStorage.token
        }
      })
      .then(({data})=>{
        swal.fire(data.msg)
        dispatch('getTransactions')
      })
      .catch(err => {
        swal.fire('oops something went wrong')
        console.log(err)
      })
    },

    getCarts({commit}){
      console.log('masuk get carts')
      axios({
        url : 'http://localhost:3000/cart/',
        method : 'get',
        headers : {
          token : localStorage.token
        }
      })
      .then(({data}) => {
        commit('SET_CARTS', data)
      })
      .catch(err => {
        swal.fire('oops something went wrong')
        console.log(err)
      })
    },

    addToCart({state}, id){
      axios({
        url : 'http://localhost:3000/cart/',
        method : 'post',
        data : {
          ProductId : id
        },
        headers : {
          token : localStorage.token
        }
      })
      .then(response => {
        swal.fire('cart updated!')
      })
      .catch(err => {
        swal.fire('oops something went wrong')
        console.log(err.response)
      })
    },

    checkout({commit, dispatch, state}, id){
      console.log(id)
      axios({
        url : 'http://localhost:3000/cart/'+id,
        method : 'put',
        headers : {
          token : localStorage.token
        }
      })
      .then(response => {
        dispatch('getCarts')
        swal.fire('Product checked out!')
      })
      .catch(err => {
        swal.fire('oops something went wrong')
        console.log(err)
      })
    },

    login({state}, payload){
      console.log('masuk register')
      axios({
        url : 'http://localhost:3000/user/login',
        method : 'post',
        data : payload
      })
      .then(({data}) => {
        swal.fire('Welcome back!')
        localStorage.token = data.token,
        localStorage.email = data.email,
        localStorage.role = data.role
        state.loggedin = true
        router.push('/')
      })
      .catch(err => {
        swal.fire(err.response.data.msg)
        console.log(err.response.data.msg)
      })
    },

    register({state}, payload){
      console.log('masuk register')
      axios({
        url : 'http://localhost:3000/user/register',
        method : 'post',
        data : payload
      })
      .then(({data}) => {
        swal.fire('Registered!')
        localStorage.token = data.token,
        localStorage.email = data.email,
        localStorage.role = data.role
        state.loggedin = true
        router.push('/')
      })
      .catch(err => {
        swal.fire(err.response.data.msg)
        console.log(err.response.data.msg)
      })
    }
  },
  modules: {
  }
})
