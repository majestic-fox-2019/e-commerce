import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'
import Swal from 'sweetalert2'
import router from '../router'

Vue.use(Vuex)

let baseURL = 'http://localhost:3000'

export default new Vuex.Store({
  state: {
    page: 'home',
    isLogin: false,
    products: null,
    email: '',
    productpage: 'list',
    detailProduct: null,

  },
  mutations: {
    SET_PAGE(state, payload) {
      state.page = payload
    },
    SET_ISLOGIN(state, payload) {
      state.isLogin = payload
    },
    SET_LOGOUT(state) {
      localStorage.removeItem('token')
      localStorage.removeItem('email')
      localStorage.removeItem('role')
      state.page = 'home'
      state.isLogin = false
    },
    SET_PRODUCTS(state, payload) {
      state.products = payload
    },
    SET_EMAIL(state, payload) {
      state.email = payload
    },
    SET_PRODUCTPAGE(state, payload) {
      state.productpage = payload
    },
    SET_DETAILPRODUCT(state, payload) {
      state.detailProduct = payload
    }
  },
  actions: {
    login(context, payload) {
      axios({
        url: `${baseURL}/login`,
        method: 'POST',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
      .then(({ data }) => {
        localStorage.setItem('token', data.token)
        localStorage.setItem('email', data.email)
        localStorage.setItem('role', data.role)
        context.commit('SET_PAGE', 'home')
        context.commit('SET_ISLOGIN', true)
        if(data.role === 'user') {
          router.push('/')
        } else {
          router.push('/product')
        }
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Success login ' + data.email,
          showConfirmButton: false,
          timer: 1500
        })

      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Error :',
          text: error.response.data.error,
        })
        console.log(error.response.data.error)
      })
    },

    register(context, payload) {
      axios({
        url: `${baseURL}/register`,
        method: 'POST',
        data: {
          name: payload.name,
          email: payload.email,
          password: payload.password,
          address: payload.address,
          phone: payload.phone,
          role: payload.role,
        }
      })
      .then(({ data }) => {
        localStorage.setItem('token', data.token)
        localStorage.setItem('email', data.email)
        localStorage.setItem('role', data.role)
        context.commit('SET_PAGE', 'home')
        context.commit('SET_ISLOGIN', true)
        if(data.role === 'user') {
          router.push('/')
        } else {
          router.push('/product')
        }
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Success register ' + data.email,
          showConfirmButton: false,
          timer: 1500
        })

      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Error :',
          text: error.response.data.error,
        })
        console.log(error.response.data.error)
      })
    },

    getProducts(context) {
      axios({
        url: `${baseURL}/product`,
        method: 'GET',
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(products => {
        context.commit('SET_PRODUCTS', products.data)
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Error :',
          text: error.response.data.error,
        })
        console.log(error.response.data.error)
      })
    },

    addProduct(context, payload) {
      let { name, price, stock, image_url, category, description } = payload
      let form = new FormData()
          form.append("name", name)
          form.append("price", price)
          form.append("stock", stock)
          form.append("image_url", image_url)
          form.append("category", category)
          form.append("description", description)

      axios({
        url: `${baseURL}/product`,
        method: 'POST',
        headers: {
          token: localStorage.getItem('token')
        },
        data: form,
        // {
          // name: payload.name,
          // description: payload.description,
          // image_url: payload.image_url,
          // price: payload.price,
          // stock: payload.stock,
          // category: payload.category
        // }
      })
      .then(result => {
        context.commit('SET_PRODUCTPAGE', 'list')
        context.dispatch('getProducts')
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Error :',
          text: error.response.data.error,
        })
        console.log(error.response.data.error)
      })
    },

    deleteProduct(context, payload) {
      let id = payload
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })
      .then((result) => {
        //cancel = result.dismiss: cancel
        //yes = result.value: true
        if (result.value) {
            axios({
                url: `${baseURL}/product/${id}`,
                method: 'DELETE',
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(response => {
                Swal.fire(
                    'Deleted!',
                    'Task has been deleted.',
                    'success'
                )
                context.dispatch('getProducts')
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error :',
                    text: error.response.data.error,
                })
                console.log(error.response.data.error)
            })
        }
      })
    },

    getProductOne(context, payload) {
        let id = payload
        axios({
          url: `${baseURL}/product/${id}`,
          method: 'GET',
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({ data }) => {
           context.commit('SET_DETAILPRODUCT', data)
        })
        .catch(error => {
          console.log(error)
        })
    },

    saveEditProduct(context, payload) {
      let { id, name, price, stock, image_url, category, description } = payload
      let form = new FormData()
          form.append("name", name)
          form.append("price", price)
          form.append("stock", stock)
          form.append("image_url", image_url)
          form.append("category", category)
          form.append("description", description)

      axios({
        url: `${baseURL}/product/${id}`,
        method: 'PUT',
        headers: {
          token: localStorage.getItem('token')
        },
        data: form,
      })
      .then(({ data }) => {
        context.commit('SET_PRODUCTPAGE', 'list')
        context.dispatch('getProducts')
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Error :',
          text: error.response.data.error,
        })
        console.log(error.response.data.error)
      })
    },

  },
  modules: {
  }
})
