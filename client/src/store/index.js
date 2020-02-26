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
    idProduct: "",
    search: "",
    searchCategory: "",
    carts: [],
    history: [],
    productAdmin: []
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
    setProductAdmin(state, payload) {
      state.productAdmin = payload
    },
    setProduct(state, payload) {
      state.product = payload
    },
    setCarts(state, payload) {
      state.carts = payload
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
        .catch(({ response }) => {
          Swal.fire('Error!', response.data.message, 'error');
        })
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
            context.dispatch('findAllCart')
            router.push('/')
          }
        }).catch(({ response }) => {
          Swal.fire('Error!', response.data, 'error');
        });
    },
    logout(context) {
      router.push("/");
      context.commit('LogoutSuccess', false)
      localStorage.clear()
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
            context.dispatch('findAllCart')
            router.push('/')
          }
        })
        .catch(({ response }) => {
          Swal.fire('Error!', response.data.message, 'error');
        })
    },
    addProduct(context, payload) {
      let formData = new FormData();
      formData.append("name", payload.name);
      formData.append("description", payload.description);
      formData.append("price", payload.price);
      formData.append("stock", payload.stock);
      formData.append("image_url", payload.image);
      formData.append("category", payload.category);
      axios({
        url: `${baseUrl}/products`,
        method: 'POST',
        data: formData,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(() => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Success Created Product',
            showConfirmButton: false,
            timer: 1500
          })
          context.dispatch('findProductAdmin')
        })
        .catch(({ response }) => {
          Swal.fire('Error!', response.data.message, 'error');
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
        .catch(({ response }) => {
          Swal.fire('Error!', response.data.message, 'error');
        })
    },
    findProductAdmin(context) {
      axios({
        url: `${baseUrl}/products/admin`,
        method: 'GET',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          console.log(data);
          context.commit('setProductAdmin', data)
        })
        .catch(({ response }) => {
          Swal.fire('Error!', response.data.message, 'error');
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
        .catch(({ response }) => {
          Swal.fire('Error!', response.data.message, 'error');
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
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Success Update Product',
            showConfirmButton: false,
            timer: 1500
          })
          context.dispatch('findProductAdmin')
          this.product = { name: "", description: "", price: "", stock: "", image: "", category: "" }
        })
        .catch(({ response }) => {
          Swal.fire('Error!', response.data.message, 'error');
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
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Success Remove Product',
            showConfirmButton: false,
            timer: 1500
          })
          context.dispatch('findProductAdmin')
        })
        .catch(({ response }) => {
          Swal.fire('Error!', response.data.message, 'error');
        })
    },
    addToCart(context, payload) {
      axios({
        url: `${baseUrl}/carts`,
        method: 'POST',
        data: {
          productId: payload.productId,
          qty: payload.quantity
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(() => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Success Added To Cart',
            showConfirmButton: false,
            timer: 1500
          })
          context.dispatch('findAllCart')
        }).catch(({ response }) => {
          if (response.data.message === "Unauthorized Invalid Token") {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Please Login First',
              showConfirmButton: false,
              timer: 1500
            })
          } else {
            Swal.fire('Error!', response.data.message, 'error');
          }
        });
    },
    findAllCart(context) {
      axios({
        url: `${baseUrl}/carts`,
        method: 'GET',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          context.commit('setCarts', data)
        })
        .catch(({ response }) => {
          if (response.data.message === "Unauthorized Invalid Token") {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Please Login First',
              showConfirmButton: false,
              timer: 1500
            })
          } else {
            Swal.fire('Error!', response.data.message, 'error');
          }
        })
    },
    removeCartUser(context, payload) {
      axios({
        url: `${baseUrl}/carts/${payload}`,
        method: 'DELETE',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(() => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Success Remove Cart',
            showConfirmButton: false,
            timer: 1500
          })
          context.dispatch('findAllCart')
        })
        .catch(({ response }) => {
          Swal.fire('Error!', response.data.message, 'error');
        })
    }
  },
  modules: {
  }
})
