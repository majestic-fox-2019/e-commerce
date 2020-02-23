import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import axios from 'axios';
import router from './router';
// import router from './router';

export default new Vuex.Store({
  state: {
    isLogin: false,
    products: [],
    user: {}
  },
  getters: {
    getProducts(state) {
      return state.products;
    },
    getUser(state) {
      return state.user;
    }
  },
  mutations: {
    login(state, data) {
      // eslint-disable-next-line
      for (const key in data) {
        let value = data[key];
        if (typeof value === "object") {
          value = JSON.stringify(value);
        }
        localStorage.setItem(key, value)
      }
      router.replace("/dashboard")
      state.isLogin = true;
    },
    "auto-login"(state) {
      const access_token = localStorage.getItem("access_token");
      if (!access_token) {
        return;
      }
      else {
        state.user = JSON.parse(localStorage.getItem("user"));
        state.isLogin = true;
      }
    },
    showProducts(state, data) {
      state.products = data;
    }
  },
  actions: {
    login({ commit }, form) {
      axios({
        url: "/users/login",
        method: "post",
        data: {
          email: form.email,
          password: form.password
        }
      })
        .then(({ data }) => {
          commit("login", data);
        })
        .catch((err) => {
          // eslint-disable-next-line
          console.error(err);
        });
    },
    "auto-login"({ commit }) {
      commit("auto-login");
    },
    showProducts({ commit }) {
      axios({
        url: "/products",
        method: "get",
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
      .then(({data}) => {
        commit("showProducts", data);
      }).catch((err) => {
        // eslint-disable-next-line
        console.error(err);
      });
    }
  }
})
