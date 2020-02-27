import Vue from 'vue'
import Vuex from 'vuex'
import instance from '../apis/axios';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categories:[],
    watchs:[],
    carts:[],
    totalCarts:0,
    isLogin:null,
  },
  mutations: {
    CATEGORIES(state, payload){
      state.categories = payload
    },
    WATCHS(state, payload){
      state.watchs = payload
    },
    LOGIN(state, payload){
      state.isLogin = payload
    },
    CARTS(state, payload){
      state.totalCarts = 0
      for (let i = 0; i < payload.length; i++){
        state.totalCarts += payload[i].amount
      }
      state.carts = payload
    }
  },
  actions: {
    getCategories(context){
      instance({
        url: `category`,
        methods: "GET"
      })
      .then(({ data }) => {
        context.commit('CATEGORIES', data)
      })
      .catch(err => {
        console.log(err.response)
      })
    },
    getAllProduct(context){
      instance({
        url: `product`,
        methods: "GET"
      })
      .then(({ data }) => {
        context.commit('WATCHS', data)
      })
      .catch(err => {
        console.log(err.response)
      })
    },
    getProductCategory(context, payload){
      instance({
        url: `product/category/${payload.id}`,
        methods: "GET"
      })
      .then(({ data }) => {
        context.commit('WATCHS', data)
      })
      .catch(err => {
        console.log(err.response)
      })
    },
    checkLogin(context){
      if(localStorage.token){
        context.commit('LOGIN', true)
      }else{
        context.commit('LOGIN', false)
      }
    },
    activeCart(context) {
      instance({
        method:"get",
        url:`cart`,
        headers:{
          token: localStorage.token
        }
      })
      .then(({data}) => {
        context.commit('CARTS', data)
      })
      .catch(err => {
        
      })
    },
    changeCart(context,payload){
      context.commit('CARTS', payload)
    }
  },
})
