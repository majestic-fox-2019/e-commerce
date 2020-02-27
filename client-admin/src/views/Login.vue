<template>
  <div>
    <div class="login-wrap mt-3">
      <div class="login-html text-center">
        <input
          id="tab-1"
          type="radio"
          @click="clearDataStorage('login')"
          name="tab"
          class="sign-in"
          checked
        />
        <label for="tab-1" class="tab">ADMIN LOGIN</label>
        <input
          id="tab-2"
          type="radio"
          @click="clearDataStorage('register')"
          name="tab"
          class="sign-up"
        />
        <label for="tab-2" class="tab"></label>
        <div class="login-form">
          <div class="sign-in-htm">
            <form @submit.prevent="submitLogin()">
              <div class="group text-left">
                <label for="user" class="label">Email</label>
                <input id="user" type="text" class="input" v-model="email" />
              </div>
              <div class="group text-left">
                <label for="pass" class="label">Password</label>
                <input
                  id="pass"
                  type="password"
                  class="input"
                  data-type="password"
                  v-model="password"
                />
              </div>
              <div class="group text-left">
                <input id="check" type="checkbox" class="check" checked />
                <label for="check">
                  <span class="icon"></span>
                  <label class="ml-2">Remember me</label>
                </label>
              </div>
              <div class="group">
                <input type="submit" class="button" value="Sign In" />
              </div>
            </form>
            <div class="hr"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swal, Toast } from "@/api/swal.js";

export default {
  name: "Login",
  data: function() {
    return {
      name: null,
      email: null,
      password: null,
      type: "login"
    };
  },
  methods: {
    submitLogin() {
      let loginData = {
        email: this.email,
        password: this.password
      };
      this.$axios
        .post(`/users/login`, loginData)
        .then(res => {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("name", res.data.name);

          this.password = null;
          this.$store.dispatch("getAllCategories");
          this.$router.push({ name: "HomeCategory" });

          Toast.fire({
            icon: "success",
            title: "Sign in Success!"
          });
        })
        .catch(error => {
          Swal.fire({
            title: "Error!",
            text: error.response.data.errors,
            icon: "error",
            confirmButtonText: "Try again"
          });
        });
    },
    clearDataStorage(type) {
      if (type !== this.type) {
        this.name = null;
        this.email = null;
        this.password = null;
        this.type = type;
      }
    }
  }
};
</script>

<style scoped>
@import "../style/style.css";
</style>
