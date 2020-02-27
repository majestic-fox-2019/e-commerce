import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
// const url = 'http://localhost:3000'
const url = 'https://frozen-castle-56073.herokuapp.com'

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
        url: `${url}/category/listCategory`,
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
        url: `${url}/product/listProduct`,
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
    allProd(context) {
      axios({
        url: `${url}/product/adminListProduct`,
        method: 'get',
        headers: {token: localStorage.getItem('token')},
      })
      .then(products=>{
        context.commit('products', products.data)
      })
      .catch(error=>{
        console.log(error)
      })
    },
    cart(context) {
      axios({
        url: `${url}/product/adminListProduct`,
        method: 'get',
        headers: {token: localStorage.getItem('token')},
      })
      .then(products=>{
        context.commit('cart', products.data)
      })
      .catch(error=>{
        console.log(error)
      })
    },
    filter(context,id) {
      console.log(id)
      axios({
        url: `${url}/product/listProduct/category/${id}`,
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
          console.log(error)
        })
    },
    filterAdmin(context,id) {
      axios({
        url: `${url}/product/adminListProduct/category/${id}`,
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
          console.log(error)
        })
    },
    memberproducts(context,payload) {
      context.commit('products', payload)
    }
  }

})
export default store