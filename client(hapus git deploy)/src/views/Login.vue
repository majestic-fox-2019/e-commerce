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
        <label for="tab-1" class="tab">Sign In</label>
        <input
          id="tab-2"
          type="radio"
          @click="clearDataStorage('register')"
          name="tab"
          class="sign-up"
        />
        <label for="tab-2" class="tab">Sign Up</label>
        <div class="login-form">
          <div class="sign-in-htm">
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
              <input @click="submitLogin()" type="submit" class="button" value="Sign In" />
            </div>

            <div class="hr"></div>
          </div>
          <div class="sign-up-htm text-left">
            <div class="group">
              <label for="user" class="label">Name</label>
              <input id="user" type="text" class="input" v-model="name" />
            </div>
            <div class="group">
              <label for="pass" class="label">Email Address</label>
              <input id="pass" type="text" class="input" v-model="email" />
            </div>
            <div class="group">
              <label for="pass" class="label">Password</label>
              <input
                id="pass"
                type="password"
                class="input"
                data-type="password"
                v-model="password"
              />
            </div>
            <div class="group">
              <input type="submit" @click="submitRegister()" class="button" value="Sign Up" />
            </div>
            <div class="foot-lnk">
              <label for="tab-1" style="color:white">Already Member?</label>
            </div>
            <div class="hr mt-2"></div>
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
    submitRegister() {
      let registerData = {
        name: this.name,
        email: this.email,
        password: this.password
      };

      this.$axios
        .post(`/users/register`, registerData)
        .then(res => {
          Swal.fire({
            title: "Good job!",
            text: `${res.data.name} successfully registered`,
            icon: "success",
            confirmButtonText: "Sign In to Continue"
          });
        })
        .catch(error => {
          if (error.response.data.errors == "Email already Exist") {
            Toast.fire({
              icon: "error",
              title: `${error.response.data.errors}`,
              position: "top"
            });
          } else {
            let errorMsg = error.response.data.errors;
            let template = `<ul class="text-center" 
            style='list-style: none; font-size:16px;
            font-weight: 700;
            margin-right: 50px;'>`;

            Object.keys(errorMsg).forEach(el => {
              template += `<li> ${errorMsg[el]} </li>`;
            });

            template += `</ul>`;

            Swal.fire({
              title: "Error!",
              html: template,
              icon: "error",
              confirmButtonText: "Try again"
            });
          }
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
