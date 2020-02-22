import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import axios from 'axios'
const server = `http://localhost:3000`

export default new Vuex.Store({
  state: {
    items: []
  },
  mutations: {
    allItem(state, payload) {
      state.items = payload
    }
  },
  actions: {
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
