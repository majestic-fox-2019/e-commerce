import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    products: null,
    categories: null,
    carts: null
  },
  mutations: {
    LOGIN(state, data) {
      state.isLogin = !state.isLogin;
    },
    GETPRODUCT(state, data) {
      state.products = data
    },
    GETCART(state, data) {
      state.carts = data
    },
    GETCATEGORY(state, data) {
      state.categories = data
    }
  },
  actions: {
    getAllProduct({ commit }) {
      axios({
        method: "GET",
        url: `https://sleepy-fjord-45887.herokuapp.com/products`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(data => {
          commit('GETPRODUCT', data.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getAllCarts({ commit }) {
      axios({
        method: "GET",
        url: `https://sleepy-fjord-45887.herokuapp.com/carts`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(data => {
          commit('GETCART', data.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
