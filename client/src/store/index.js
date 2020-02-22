import Vue from 'vue'
import Vuex from 'vuex'
import jwt from 'jsonwebtoken'

Vue.use(Vuex)

import axios from 'axios'
// const server = `http://localhost:3000`
const server = `https://mysterious-plains-04294.herokuapp.com`

export default new Vuex.Store({
  state: {
    items: [],
    isAdmin: false
  },
  mutations: {
    allItem(state, payload) {
      state.items = payload
    },
    // isAdmin() {
    // state.isAdmin = true
    isAdmin(state, payload) {
      console.log('payload', payload)
      state.isAdmin = payload
    }
    // }
  },
  actions: {
    cekAdmin(context) {
      let token = localStorage.getItem("token");
      // if (!token) return;

      const user = token ? jwt.verify(token, "edo tensi") : null

      if (user && user.role == "admin") {
        // this.isAdmin = true;
        context.commit("isAdmin", true);
      } else {
        // this.isAdmin = false;
        context.commit("isAdmin", false);
      }
    },
    getAllItem(context) {
      console.log('mulai fetch')
      axios({
        method: 'get',
        url: `${server}/products`,
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          console.log('berhasil fetch')

          context.commit('allItem', data)
        })
        .catch(err => {
          console.log('gagal fetch')
          console.log(err)
        })
    },
    addBarang(context, paramsObj) {
      axios({
        method: "post",
        url: `${server}/products`,
        headers: {
          token: localStorage.token
        },
        data: paramsObj
      })
        .then(result => {
          context.dispatch('getAllItem')
        })
        .catch(err => {
          console.log(err)
        });
    },
    deletBarang(context, params) {
      axios({
        method: "delete",
        url: `${server}/products/${params}`,
        headers: {
          token: localStorage.token
        }
      })
        .then(result => {
          context.dispatch('getAllItem')
        })
        .catch(err => {
          console.log(err)
        })
    },
    editBarang(context, params) {
      axios({
        method: 'put',
        url: `${server}/products/${params.id}`,
        headers: {
          token: localStorage.token
        },
        data: params
      })
        .then(resultUpdate => {
          context.dispatch('getAllItem')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

})
