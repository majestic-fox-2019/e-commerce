import Vue from 'vue'
import Vuex from 'vuex'
import { config } from '../config'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    role: null,
    errors: null,
    products: null,
    categories: null,
    loading: false,
  },
  mutations: {
    login(state){
      console.log("masuk login state")
        state.isLogin = true
    },
    error(state, err){
      console.log(err)
      state.errors = err
    },
    role(state, data){
      state.role = data
      console.log(state.role)
    },
    products(state, data){
      state.products= data
    },
    categories(state, data){
      state.categories= data
    },
    loading(state){
      if(!state.loading){
        state.loading = true
      } else {
        state.loading = false
      }
    }
  },
  actions: {
    loginUser({commit}, user) {
      config({
        method: 'post',
        url: '/users/login',
        data: user
      })
      .then(({ data }) => {
        console.log(data)
        localStorage.setItem('token', data.token)
        commit('role', data.role)
        router.push({name: 'home'})
      })
      .catch(err => {
        // console.log(err.response.data.message)
        const dataErr = err.response.data.message
        commit('error', dataErr)
      })
    },
    checkLogin({ commit }){
      // console.log('masuk checklogin')
      if(localStorage.getItem('token')){
        commit('login')
      }
    },
    logOut({ commit }){
      localStorage.removeItem('token')
      commit('logout')
      router.push('/auth')
    },
    fetchProducts({commit}){
      commit('loading')
      config({
        method: "get",
        url: 'products',
      })
      .then(({ data }) => {
        commit('loading')
        commit("products", data)
      })
      .catch(err => {
        commit('loading')
        commit("error", err.response.data.message)
      })
    },
    fetchCategories({ commit }){
      commit('loading')
      config({
        method:'get',
        url:'categories',
      })
      .then(({ data }) => {
        commit('loading')
        commit("error", data)
      })
      .err(err => {
        commit('loading')
        commit("error", err.response.data.message)
      })
    },
    loading({ commit }){
      commit('loading')
    }
  },
  modules: {
  }
})
