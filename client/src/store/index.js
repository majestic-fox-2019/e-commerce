import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allData: [],
    resultMoney: ''
  },
  mutations: {
    GET_DATA(state, payload) {
      state.allData = payload
    }
  },
  actions: {
    getData(context) {
      axios({
        url: "https://e-commers-skin-type.herokuapp.com/home",
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
