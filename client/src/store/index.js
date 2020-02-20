import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'
import Swal from 'sweetalert2'

Vue.use(Vuex)
const baseUrl = 'http://localhost:3000'
export default new Vuex.Store({
  state: {
    isLogin: false,
    whoIsLogin: "",
    accountWhatToShow: "login",
    products: [],
    product: { name: "", description: "", price: "", stock: "", image: "", category: "" },
    idProduct: ""
  },
  mutations: {
    successRegister(state, payload) {
      state.isLogin = payload
    },
    LogoutSuccess(state, payload) {
      state.isLogin = payload
    },
    whoLogin(state, payload) {
      state.whoIsLogin = payload
    },
    setProducts(state, payload) {
      state.products = payload
    },
    setProduct(state, payload) {
      state.product = payload
    }
  },
  actions: {
    registerAdmin(context, payload) {
      const username = payload.username;
      const email = payload.email;
      const password = payload.password;
      axios({
        url: `${baseUrl}/users/register`,
        method: 'POST',
        data: {
          username,
          email,
          password,
          role: "admin"
        }
      })
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('id', data.user.id)
          localStorage.setItem('username', data.user.username)
          localStorage.setItem('email', data.user.email)
          localStorage.setItem('role', data.user.role)
          context.commit('successRegister', true)
          context.commit('whoLogin', "admin")
          router.push('/seller')
        })
        .catch(err => {
          Swal.fire('Error!', err.message, 'error');
        })
    },
    logout(context) {
      localStorage.clear()
      context.commit('LogoutSuccess', false)
      router.push("/");
    },
    login(context, payload) {
      const email = payload.email;
      const password = payload.password;
      axios({
        url: `${baseUrl}/users/login`,
        method: 'POST',
        data: {
          email,
          password
        }
      })
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('id', data.user.id)
          localStorage.setItem('username', data.user.username)
          localStorage.setItem('email', data.user.email)
          localStorage.setItem('role', data.user.role)
          context.commit('successRegister', true)
          if (data.user.role === 'admin') {
            context.commit('whoLogin', "admin")
            router.push('/seller')
          } else {
            context.commit('whoLogin', "customer")
            router.push('/')
          }
        }).catch((err) => {
          Swal.fire('Error!', err.message, 'error');
        });
    },
    register(context, payload) {
      const username = payload.username;
      const email = payload.email;
      const password = payload.password;
      axios({
        url: `${baseUrl}/users/register`,
        method: 'POST',
        data: {
          username,
          email,
          password
        }
      })
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('id', data.user.id)
          localStorage.setItem('username', data.user.username)
          localStorage.setItem('email', data.user.email)
          localStorage.setItem('role', data.user.role)
          context.commit('successRegister', true)
          if (data.user.role === 'admin') {
            context.commit('whoLogin', "admin")
            router.push('/seller')
          } else {
            context.commit('whoLogin', "customer")
            router.push('/')
          }
        })
        .catch(err => {
          Swal.fire('Error!', err.message, 'error');
        })
    },
    addProduct(context, payload) {
      const formData = payload
      axios({
        url: `${baseUrl}/products`,
        method: 'POST',
        data: formData,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(() => {
          Swal.fire('Success!', 'Create Question Success', 'success');
          context.dispatch('findAllProduct')
        })
        .catch(err => {
          Swal.fire('Error!', err.message, 'error');
        })
    },
    findAllProduct(context) {
      axios({
        url: `${baseUrl}/products`,
        method: 'GET'
      })
        .then(({ data }) => {
          context.commit('setProducts', data)
        })
        .catch(err => {
          Swal.fire('Error!', err.message, 'error');
        })
    },
    findOneProduct(context, payload) {
      axios({
        url: `${baseUrl}/products/${payload}`,
        method: 'GET'
      })
        .then(({ data }) => {
          context.commit('setProduct', data)
          this.idProduct = data.id
          this.product = data
        })
        .catch(err => {
          Swal.fire('Error!', err.message, 'error');
        })
    },
    updateProduct(context, payload) {
      let formData
      if (payload) {
        formData = payload
      } else {
        formData = {
          name: this.product.name,
          description: this.product.description,
          price: this.product.price,
          stock: this.product.stock,
          image_url: this.product.image,
          category: this.product.category
        }
      }
      axios({
        url: `${baseUrl}/products/${this.idProduct}`,
        method: 'PUT',
        headers: {
          token: localStorage.getItem('token')
        },
        data: formData
      })
        .then(() => {
          Swal.fire('Success!', 'Create Question Success', 'success');
          context.dispatch('findAllProduct')
          this.product = { name: "", description: "", price: "", stock: "", image: "", category: "" }
        })
        .catch(err => {
          Swal.fire('Error!', err.message, 'error');
        })
    },
    removeProduct(context, payload) {
      axios({
        url: `${baseUrl}/products/${payload}`,
        method: 'DELETE',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(() => {
          Swal.fire('Success!', 'Create Question Success', 'success');
          context.dispatch('findAllProduct')
        })
        .catch(err => {
          Swal.fire('Error!', err.message, 'error');
        })
    }
  },
  modules: {
  }
})
