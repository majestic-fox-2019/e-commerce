import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/api/axios.js'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    categories: [],
    products: [],
    cart: []
  },
  mutations: {
    categories (state, categories) {
      state.categories = categories
    },
    products (state, products) {
      state.products = products
    },
    cart (state, cart) {
      state.cart = cart
    },
  },
  actions: {
    categories (context) {
      axios({
        url: `/category/listCategory`,
        method: 'get',
        headers: {token: localStorage.getItem('token')},
      })
        .then(datas=>{
          context.commit('categories', datas.data)
        })
        .catch(error=>{
          console.log(error.response)
        })
    },
    products (context) {
      axios({
        url: `/product/listProduct`,
        method: 'get',
        headers: {token: localStorage.getItem('token')},
      })
      .then(products=>{
        for(let i = 0; i < products.data.length; i++) {
          for(let j = 0; j < products.data[i].Users.length; j++) {
            if(products.data[i].Users[j].email == localStorage.getItem('email')) {
              products.data[i].added = true
              break;
            }
          }
        }
        context.commit('products', products.data)
      })
      .catch(error=>{
        console.log(error.response)
      })
    },
    allProd(context) {
      axios({
        url: `/product/adminListProduct`,
        method: 'get',
        headers: {token: localStorage.getItem('token')},
      })
      .then(products=>{
        context.commit('products', products.data)
      })
      .catch(error=>{
        console.log(error.response)
      })
    },
    cart(context) {
      axios({
        url: `/product/adminListProduct`,
        method: 'get',
        headers: {token: localStorage.getItem('token')},
      })
      .then(products=>{
        context.commit('cart', products.data)
      })
      .catch(error=>{
        console.log(error.response)
      })
    },
    filter(context,id) {
      axios({
        url: `/product/listProduct/category/${id}`,
        method: 'get',
        headers: {token: localStorage.getItem('token')},
      })
        .then(products=>{
          for(let i = 0; i < products.data.length; i++) {
            for(let j = 0; j < products.data[i].Users.length; j++) {
              if(products.data[i].Users[j].email == localStorage.getItem('email')) {
                products.data[i].added = true
                break;
              }
            }
          }
          context.commit('products', products.data)
        })
        .catch(error=>{
          console.log(error.response)
        })
    },
    filterAdmin(context,id) {
      axios({
        url: `/product/adminListProduct/category/${id}`,
        method: 'get',
        headers: {token: localStorage.getItem('token')},
      })
        .then(products=>{
          for(let i = 0; i < products.data.length; i++) {
            for(let j = 0; j < products.data[i].Users.length; j++) {
              if(products.data[i].Users[j].email == localStorage.getItem('email')) {
                products.data[i].added = true
                break;
              }
            }
          }
          context.commit('products', products.data)
        })
        .catch(error=>{
          console.log(error.response)
        })
    },
    memberproducts(context,payload) {
      context.commit('products', payload)
    },
  }

})
export default store