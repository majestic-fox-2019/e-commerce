<template>
  <div>
    <navBar></navBar>
    <div class="registerForm">
      <div class="container">
        <h1 style="text-align:center">REGISTER</h1>
        <form method="POST" @submit.prevent="register">
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Email"
              v-model="form.email"
              required
            />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              v-model="form.password"
              required
            />
          </div>
          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              class="form-control"
              id="username"
              placeholder="Username"
              v-model="form.username"
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
  name: "registerPage",
  components: {
    navBar,
    Loading
  },
  data() {
    return {
      form: {
        email: null,
        password: null,
        username: null,
        role: "user"
      },
      isLoading: false,
      fullPage: true
    };
  },
  methods: {
    register() {
      this.isLoading = true;
      this.$axios({
        method: "post",
        url: "/user/register",
        data: {
          email: this.form.email,
          password: this.form.password,
          username: this.form.username,
          role: this.form.role
        }
      })
        .then(data => {
          this.isLoading = false;
          Swal.fire({
            position: "mid",
            icon: "success",
            title: "Register success",
            showConfirmButton: false,
            timer: 1500
          });
          localStorage.setItem("token", data.data.token);
          localStorage.setItem("UserId", data.data.id);
          localStorage.setItem("role", this.form.role);
          if (localStorage.role === "admin") {
            this.$router.push({ name: "tableProduct" });
          } else {
            this.$router.push({ name: "homePage" });
          }
        })
        .catch(err => {
          this.isLoading = false;
          console.log(err.response);
        });
    }
  }
};
</script>

<style>
.registerForm {
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
