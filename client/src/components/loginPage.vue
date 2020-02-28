<template>
  <div>
    <navBar></navBar>
    <div class="loginForm">
      <div class="container">
        <h1 style="text-align:center">Login</h1>
        <form method="POST" v-on:submit.prevent="login">
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              class="form-control"
              v-model="formLogin.email"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Email"
              required
            />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              class="form-control"
              v-model="formLogin.password"
              id="exampleInputPassword1"
              placeholder="Password"
              required
            />
          </div>
          <div class="vld-parent">
            <loading
              :active.sync="isLoading"
              :is-full-page="fullPage"
              :loader="'bars'"
              :color="'Brown'"
            ></loading>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary text-center">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from "./navBar.vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import Swal from "sweetalert2";
export default {
  name: "loginPage",
  components: {
    navBar,
    Loading
  },
  data() {
    return {
      formLogin: {
        email: null,
        password: null
      },
      isLoading: false,
      fullPage: true
    };
  },
  methods: {
    login() {
      this.isLoading = true;
      this.$axios({
        method: "post",
        url: "/user/login",
        data: {
          email: this.formLogin.email,
          password: this.formLogin.password
        }
      })
        .then(data => {
          this.isLoading = false;
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Login Success",
            showConfirmButton: false,
            timer: 1500
          });
          this.formLogin = null;
          localStorage.setItem("token", data.data.token);
          localStorage.setItem("UserId", data.data.id);
          localStorage.setItem("role", data.data.role);
          if (localStorage.role === "admin") {
            this.$router.push({ name: "tableProduct" });
          } else {
            this.$router.push({ name: "homePage" });
          }
        })
        .catch(err => {
          this.isLoading = false;
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${err.response.data.message}`
          });
        });
    }
  }
};
</script>

<style scope>
.loginForm {
  background-image: url("https://images.unsplash.com/photo-1521012012373-6a85bade18da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80");
  height: 800px;
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-color: #464646;
  display: flex;
  align-items: center;
}
.container {
  width: 400px;
  background-color: gray;
  color: black;
}
</style>
