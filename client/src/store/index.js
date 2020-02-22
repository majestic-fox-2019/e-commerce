import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: null,
    products: null,
    categories: null
  },
  mutations: {
    LOGIN(state, data) { },
    GETPRODUCT(state, data) {
      state.products = data
    },
    GETCATEGORY(state, data) {
      state.categories = data
    }
  },
  actions: {
    getAllProduct({ commit }) {
      axios({
        method: "GET",
        url: `http://localhost:3000/products`,
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
    login({ commit }) {
      axios({
        method: "POST",
        url: `http://localhost:3000/users/login`,
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(data => {

          localStorage.setItem("token", data.data.token);
          this.$router.push({ name: "Admin" });
        })
        .catch(err => {
          Swal.fire(err.response.data);
        });
    }
  },
  modules: {
  }
})
