import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allData: null
  },
  mutations: {
    SET_DATA (state, payload) {
      state.allData = [...payload]
    }
  },
  actions: {
    loadData ({ commit }) {
      axios({
        method: 'GET',
        url: 'http://localhost:3000/product'
      })
        .then((result) => {
          const filterData = result.data.filter((el) => el.stock > 0)
          commit('SET_DATA', filterData)
        })
    }
  },
  modules: {
  }
})
