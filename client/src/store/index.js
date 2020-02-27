import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { config } from '../config.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products_dashboard: [],
    users_dashboard: [],
    categories_dashboard: [],
    transactions_dashboard: [],
    isBusy: false,
  },
  mutations: {
    setProductsDashboard(state, payload){
      state.products_dashboard = payload
    },
    setCategoriesDashboard(state, payload){
      state.categories_dashboard = payload
    },
    setUsersDashboard(state, payload){
      state.users_dashboard = payload
    },
    setTransactionsDashboard(state, payload){
      state.transactions_dashboard = payload
    }
  },
  actions: {
    getProductsDashboard(context){
      const token = localStorage.getItem('token')
      this.state.isBusy = true
      axios.get(`${config.connections.server}/admin/products`, {
        headers: { Bearer : token }
      })
      .then(res => {
        this.state.isBusy = false
        context.commit('setProductsDashboard', res.data.payload)
      })
      .catch(err => {
        console.log(err)
      })
    },
    getCategoriesDashboard(context){
      const token = localStorage.getItem('token')
      this.state.isBusy = true
      axios.get(`${config.connections.server}/admin/categories`, {
        headers: { Bearer : token }
      })
      .then(res => {
        this.state.isBusy = false
        context.commit('setCategoriesDashboard', res.data.payload)
      })
      .catch(err => {
        console.log(err)
      })
    },
    getUsersDashboard(context){
      const token = localStorage.getItem('token')
      this.state.isBusy = true
      axios.get(`${config.connections.server}/admin/users`, {
        headers: { Bearer : token }
      })
      .then(res => {
        this.state.isBusy = false
        context.commit('setUsersDashboard', res.data.payload)
      })
      .catch(err => {
        console.log(err)
      })
    },
    getTransactionsDashboard(context){
      const token = localStorage.getItem('token')
      this.state.isBusy = true
      axios.get(`${config.connections.server}/admin/transactions`, {
        headers: { Bearer : token }
      })
      .then(res => {
        this.state.isBusy = false
        context.commit('setTransactionsDashboard', res.data.payload)
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  modules: {

  }
})
