import Vue from 'vue'
import Vuex from 'vuex'
import api from '../helper/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categories: null,
  },
  mutations: {
    SET_CATEGORIES(state, payload) {
      state.categories = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
