import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"
import router from '../router'
import Swal from "sweetalert2"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    role: "user",
    baseUrl: "http://localhost:3000",
    // baseUrl: "https://cherrychenka.herokuapp.com",
    username: localStorage.getItem("username"),
    allProducts: [],
    errMSG: "",
    dummy: "",
    myProducts: [],
    productDetail: null,
    perCategory: [],
    allTransactionMyShop: [],
    editDelStatus: false,
    myCarts: null,
    myBelanjaHistory: null,
    reviews: null
    // allTransactionsAllShop: []
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
    },
    setAllTransMyShop(state, allTransactionMyShop) {
      state.allTransactionMyShop = allTransactionMyShop
    },
    setEdit(state, status) {
      state.editDelStatus = status
    },
    setMyCarts(state, myCarts) {
      state.myCarts = myCarts
    },
    setBelanjaanKu(state, data) {
      state.myBelanjaHistory = data
    },
    setReviews(state, data) {
      state.reviews = data
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
        .catch(() => {
          // console.log(err.response, "<<")
          Swal.fire("Oops", "Something went wrong", "error")
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
          Swal.fire(
            "Sweet!", "Welcome to CherryChenka!", "success"
          ).then(() => {

            if (data.userLoginFound.role == "admin") {
              router.push("/admin")
            } else {
              // console.log(router, "<< ini router")
              if (router.options.base !== "/") {
                router.push("/")
              }
            }
          })

        })
        .catch(err => {
          if (err.response.data) {
            let errMSG = err.response.data.message;
            context.commit("setErrMSG", errMSG)
          }
          // this.$message.error(this.errMSG);
        });
    },
    register(context, dataReg) {
      let { name, email, password, role } = dataReg
      axios({
        method: "POST",
        url: `${this.state.baseUrl}/users/register`,
        data: {
          name,
          email,
          password,
          role
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
          Swal.fire(
            "Sweet!", "Welcome to CherryChenka!", "success"
          ).then(() => {

            router.push("/")
          })

        })
        .catch(err => {
          if (err.response.data) {
            let errMSG = err.response.data.message;
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
          // console.log(err.response)
          let errMSG
          let errMSGS = ""
          if (err.response.data.message) {
            for (let i of err.response.data.message) {
              errMSGS += (i + "  ")
            }
            Swal.fire("Oops", errMSGS, "error")
          }
          else if (err.response.statusText) {
            // console.log("masuk sini sell product error  ")
            errMSG = err.response.statusText
            Swal.fire("Oops", errMSG, "error")
          }
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
          // console.log(err.response)
          context.commit("dummy", err)
          Swal.fire("Oops", "Something Went wrong", "error")
        })
    },
    editProduct(context, objEdit) {
      // console.log("masuk edit product")
      let { id, name, category, price, description, stock, image_url } = objEdit
      let formData = new FormData()
      formData.append("name", name);
      formData.append("description", description);
      formData.append("stock", stock);
      formData.append("price", price);
      formData.append("image_url", image_url);
      formData.append("category", category);
      axios({
        method: "PUT",
        url: `${this.state.baseUrl}/products/${id}`,
        headers: {
          token: localStorage.getItem("token")
        },
        data: formData
      })
        .then(() => {
          context.dispatch("getProducts")
          context.commit("setEdit", true)
          // router.push("/")
        })
        .catch(err => {
          let errMSG
          let errMSGS = ""
          if (err.response.data.message) {
            for (let i of err.response.data.message) {
              errMSGS += (i + "  ")
            }
            Swal.fire("Oops", errMSGS, "error")
          }
          else if (err.response.statusText) {
            errMSG = err.response.statusText
            Swal.fire("Oops", errMSG, "error")
          }
        })
    },
    editNormal(context, objEdit) {
      let { id, name, category, price, description, stock, image_url } = objEdit
      axios({
        method: "PUT",
        url: `${this.state.baseUrl}/products/normal/${id}`,
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
          context.commit("setEdit", true)
          // router.push("/")
        })
        .catch(err => {
          let errMSG
          let errMSGS = ""
          if (err.response.data.message) {
            for (let i of err.response.data.message) {
              errMSGS += (i + "  ")
            }
            Swal.fire("Oops", errMSGS, "error")
          }
          else if (err.response.statusText) {
            errMSG = err.response.statusText
            Swal.fire("Oops", errMSG, "error")
          }
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
          context.commit("setEdit", true)
        })
        .catch(err => {
          let errMSG
          let errMSGS = ""
          if (err.response.data.message) {
            for (let i of err.response.data.message) {
              errMSGS += (i + "  ")
            }
            Swal.fire("Oops", errMSGS, "error")
          }
          else if (err.response.statusText) {
            errMSG = err.response.statusText
            Swal.fire("Oops", errMSG, "error")
          }
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
          // console.log(err.response)
          context.commit("dummy", err)
          Swal.fire("Oops", "Something went wrong!", "error")

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
          // console.log(err)
          context.commit("dummy", err)
          Swal.fire("Oops", "Something went wrong!", "error")
        })
    },
    getAllTransactionsMyShop(context) {
      axios({
        method: "GET",
        url: `${this.state.baseUrl}/carts/history/myShop`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          context.commit("setAllTransMyShop", data)
          // console.log(data, "<< ini transaction")
        })
        .catch(err => {
          // console.log(err.response)
          let errMSG = err.response.statusText
          Swal.fire("Oops", errMSG, "error")
        })
    },
    getOfficialProducts(context) {
      // console.log("masuk ge off")
      axios({
        method: "GET",
        url: `${this.state.baseUrl}/products/official/byOfficial`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          context.commit("setMyProducts", data)
        })
        .catch((err) => {
          // console.log(err.response, "<< gagal")
          context.commit("dummy", err)
          Swal.fire("Oops", "Something went wrong", "error")
        })
    },
    getMyCart(context) {
      axios({
        method: "GET",
        url: `${this.state.baseUrl}/carts/mine`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          // console.log(data, "<< ini dari cartku")
          context.commit("setMyCarts", data)
        })
        .catch(err => {
          console.log(err, "<< ini error my cart")
        })
    },
    addToCart(context, dataAddToCart) {
      let { idProduct, qty } = dataAddToCart
      axios({
        method: "POST",
        url: `${this.state.baseUrl}/carts/${idProduct}`,
        headers: {
          token: localStorage.getItem("token")
        },
        data: {
          qty
        }
      })
        .then(({ data }) => {
          // console.log(data, "<< ini hasil dari add to cart")
          // Swal.fire("Yay!", `${data.productWanted.name} has been successfully added to your cart!`, "success")
          Swal.fire({
            title: "YAY!",
            text: `${data.productWanted.name} has been successfully added to your cart!`,
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'See my carts'
          }).then((result) => {
            if (result.value) {
              router.push("/cart")
            }
          })

        })
        .catch(err => {
          console.log(err.response, "<< ini error add to cart")
        })
    },
    updateCart(context, objUpdateCart) {
      let { idUser, idProduct, qty } = objUpdateCart
      return axios({
        method: "PATCH",
        url: `${this.state.baseUrl}/carts/${idProduct}/${idUser}/unpaid`,
        headers: {
          token: localStorage.getItem("token")
        },
        data: {
          qty
        }
      })
        .then(({ data }) => {
          console.log(data, "<< ini dari update cart")
        })
        .catch(err => {
          console.log(err.response, "<< ini error update cart")
        })
    },
    deleteFromCart(context, objDel) {
      let { idUser, idProduct } = objDel
      return axios({
        method: "DELETE",
        url: `${this.state.baseUrl}/carts/${idProduct}/${idUser}/unpaid`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(() => {
          Swal.fire("Yay", "Successfully deleted", "success")
        })
        .catch(err => {
          console.log(err, "< ini error delete from cart")
        })
    },
    checkout(context) {
      return axios({
        method: "PATCH",
        headers: {
          token: localStorage.getItem("token")
        },
        url: `${this.state.baseUrl}/carts/checkout`
      })
        .then(() => {
          context.commit("dummy", "dummy")
          Swal.fire("Yay", "Successfully checked out", "success")
        })
        .catch(err => {
          console.log(err.response, "<< ini error checkout")
        })
    },
    getMyHistory(context) {
      axios({
        method: "GET",
        url: `${this.state.baseUrl}/carts/history`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          context.commit("setBelanjaanKu", data)
        })
        .catch(err => {
          console.log(err, "<< ini error get belanjaan")
        })
    },
    getReviews(context, idProduct) {
      axios({
        method: "GET",
        url: `${this.state.baseUrl}/reviews/${idProduct}`
      })
        .then(({ data }) => {
          context.commit("setReviews", data)
        })
        .catch(err => {
          console.log(err, "<< ini error get review")
        })
    }
  },
  modules: {
  }
})
