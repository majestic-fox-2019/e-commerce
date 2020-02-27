import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import Swal from 'sweetalert2';
import router from '../router';
// import user from './modules/user';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    user: {}
  },
  mutations: {
  },
  actions: {
    registerCustomer(context, payload) {
      axios({
        url: "/users/register",
        method: "post",
        data: {
          name: payload.name.trim(),
          email: payload.email.trim(),
          password: payload.password
        }
      })
        .then(() => {
          router.push("/login");
        }).catch((err) => {
          console.error(err);
          Swal.fire({
            title: "Something went wrong",
            icon: "error"
          })
        });
    },
    login(context, payload) {
      Swal.showLoading();
      axios({
        url: "/users/login",
        method: "post",
        data: {
          email: payload.email,
          password: payload.password,
        }
      })
        .then(({ data }) => {
          for (const key in data) {
            let value = data[key];
            if (typeof value === "object") {
              value = JSON.stringify(value);
            }
            localStorage.setItem(key, value);
          }
          Swal.close();
          router.push("/");
        }).catch((err) => {
          Swal.fire({
            title: "Email or Password is Wrong",
            icon: "error"
          })
          console.error(err);
        });
    },
    autoLogin({ state }) {
      if (!localStorage.getItem("access_token")) {
        return;
      }
      else {
        const user = JSON.parse(localStorage.getItem("user"));
        state.isLogin = true;
        state.user = user;
      }
    },
    logout({ state }) {
      localStorage.clear();
      state.isLogin = false;
      state.user = {};
      if (router.currentRoute.fullPath !== "/") {
        router.push("/");
      }
    }
  },
  modules: {
  }
})
