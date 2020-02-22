import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    listAdmin : null,
    listCategory : null,
    listProducts : null,
  },
  mutations: {
    get_admin (state, payload) {
      state.listAdmin = payload
    },
    get_category (state, payload) {
      state.listCategory = payload
    },
    get_products (state, payload) {
      state.listProducts = payload
    }
  },
  actions: {
    getAdmin({ commit }, params = ''){

      const name = params.name || ''
      
      api({
        headers : {
          token : localStorage.token
        },
        method : 'get',
        url : `/users/admin/?name=${name}`,
      })
        .then(response => {
          commit('get_admin', response.data)
        })
        .catch(err => {
          let error = err
        })
    },
    getCategory({ commit }){
      api({
        headers : {
          token : localStorage.token
        },
        method : 'get',
        url : '/categories'
      })
      .then(response => {
        commit('get_category', response.data)
      })
      .catch(err => {
        let error = err
      })
    },
    getProduct({ commit }, name = ''){
      api({
        headers : {
          token : localStorage.token
        },
        method : 'get',
        url : `/products/?name=${name}`
      })
      .then(response => {
        commit('get_products', response.data)
      })
      .catch(err => {
        let error = err
      })
    }
  },
  modules: {
  }
})
