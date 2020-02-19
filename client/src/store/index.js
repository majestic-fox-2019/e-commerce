import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    role: "user",
    baseUrl: "http://localhost:3000",
    username: localStorage.getItem("username"),
    allProducts: [],
    errMSG: "",
    dummy: "",
    myProducts: [],
    productDetail: null,
    perCategory: []
  },
  mutations: {
    changeLogin(state, status) {
      state.isLogin = status
    },
    changeRole(state, role) {
      state.role = role
    },
    setUsername(state, username) {
      state.username = username
    },
    setProducts(state, products) {
      state.allProducts = products
    },
    setErrMSG(state, msg) {
      state.errMSG = msg
    },
    dummy(state, isi) {
      state.dummy = isi
    },
    setMyProducts(state, mine) {
      state.myProducts = mine
    },
    setSelectedProduct(state, productDetail) {
      state.productDetail = productDetail
    },
    setDataPerCat(state, dataPerCat) {
      state.perCategory = dataPerCat
    }
  },
  actions: {
    getProducts(context) {
      axios({
        method: "GET",
        url: `${this.state.baseUrl}/products`
      })
        .then(({ data }) => {
          // console.log(data)
          context.commit("setProducts", data)
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    login(context, dataUser) {
      let { email, password } = dataUser
      axios({
        method: "POST",
        url: `${this.state.baseUrl}/users/login`,
        data: {
          email,
          password
        }
      })
        .then(({ data }) => {
          localStorage.setItem("token", data.token);
          localStorage.setItem("role", data.userLoginFound.role);
          localStorage.setItem("userId", data.userLoginFound.id);
          localStorage.setItem("username", data.userLoginFound.name);
          context.commit("changeLogin", true);
          context.commit("changeRole", data.userLoginFound.role);
          context.commit("setUsername", data.userLoginFound.name);


        })
        .catch(err => {
          if (err.response.data) {
            let errMSG = err.response.data;
            context.commit("setErrMSG", errMSG)
          }
          // this.$message.error(this.errMSG);
        });
    },
    register(context, dataReg) {
      let { name, email, password } = dataReg
      axios({
        method: "POST",
        url: `${this.state.baseUrl}/users/register`,
        data: {
          name,
          email,
          password
        }
      })
        .then(({ data }) => {
          localStorage.setItem("token", data.token);
          localStorage.setItem("role", data.userRegistered.role);
          localStorage.setItem("userId", data.userRegistered.id);
          localStorage.setItem("username", data.userRegistered.name);
          context.commit("changeLogin", true);
          context.commit("changeRole", data.userRegistered.role);
          context.commit("setUsername", data.userRegistered.name);
        })
        .catch(err => {
          if (err.response.data) {
            let errMSG = err.response.data;
            context.commit("setErrMSG", errMSG)
          } else {
            context.commit("setErrMSG", "Oops, something went wrong")
          }
        })
    },
    sellProduct(context, dataProduct) {
      let formData = new FormData()
      formData.append("name", dataProduct.name);
      formData.append("description", dataProduct.description);
      formData.append("stock", dataProduct.stock);
      formData.append("price", dataProduct.price);
      formData.append("image_url", dataProduct.image_url);
      formData.append("category", dataProduct.category);
      // console.log(dataProduct, "<<ini data product")
      context.commit("dummy", "dummy")
      axios({
        method: "POST",
        url: `${this.state.baseUrl}/products`,
        headers: {
          token: localStorage.getItem("token")
        },
        data: formData
      })
        .then(() => {
          router.push("/")
          context.dispatch("getProducts")
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    getMyProducts(context) {
      axios({
        method: "GET",
        url: `${this.state.baseUrl}/products/mine`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          context.commit("setMyProducts", data)
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    editProduct(context, objEdit) {
      let { id, name, category, price, description, stock, image_url } = objEdit
      axios({
        method: "PUT",
        url: `${this.state.baseUrl}/products/${id}`,
        headers: {
          token: localStorage.getItem("token")
        },
        data: {
          name,
          category,
          price,
          description,
          stock,
          image_url
        }
      })
        .then(() => {
          context.dispatch("getProducts")
          // router.push("/")
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    deleteProduct(context, idToDelete) {
      axios({
        method: "DELETE",
        url: `${this.state.baseUrl}/products/${idToDelete}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(() => {
          context.dispatch("getProducts")
          // router.push("/")
        })
    },
    getDetailProduct(context, idDetail) {
      axios({
        method: "Get",
        url: `${this.state.baseUrl}/products/${idDetail}`
      })
        .then(({ data }) => {
          context.commit("setSelectedProduct", data)
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    getCategory(context, category) {
      axios({
        method: "Get",
        url: `${this.state.baseUrl}/products/category/${category}`
      })
        .then(({ data }) => {
          context.commit("setDataPerCat", data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
