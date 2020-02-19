import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allData: []
  },
  mutations: {
    GET_DATA(state, payload) {
      state.allData = payload
    }
  },
  actions: {
    getData(context) {
      axios({
        url: "http://localhost:3000/home",
        method: "GET",
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then(res => {
        console.log(res.data)
        context.commit('GET_DATA', res.data)
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  modules: {
  }
})
