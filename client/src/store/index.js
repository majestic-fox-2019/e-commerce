import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categories: [
      {
        name: 'Smartphones',
        img: 'https://v2shop.s3-ap-southeast-1.amazonaws.com/handphone.png'
      },
      {
        name: 'Smartwatches',
        img: 'https://v2shop.s3-ap-southeast-1.amazonaws.com/smartwatch.png'
      },
      {
        name: 'Drones',
        img: 'https://v2shop.s3-ap-southeast-1.amazonaws.com/drone.png'
      },
      {
        name: 'Headphones',
        img: 'https://v2shop.s3-ap-southeast-1.amazonaws.com/headphone.png'
      },
      {
        name: 'Laptops',
        img: 'https://v2shop.s3-ap-southeast-1.amazonaws.com/laptop.png'
      }
    ],
    userInfo: true,
    baseUrl: 'http://localhost:3000',
    displayProducts: null
  },
  mutations: {
    SET_DISPLAY_PRODUCTS (state, payload) {
      state.displayProducts = payload
    }
  },
  actions: {
    fetchMainProducts (state) {
      axios({
        method: 'get',
        url: this.state.baseUrl + '/products'
      })
        .then(({ data }) => {
          this.commit('SET_DISPLAY_PRODUCTS', data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
})
