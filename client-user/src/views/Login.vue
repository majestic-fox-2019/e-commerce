<template>
  <div>
    <div class="background-login pt-4">
      <div class="login-wrap">
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
            <form @submit.prevent="submitLogin()">
              <div class="sign-in-htm">
                <div class="group text-left">
                  <label for="user" class="label">Email</label>
                  <input type="text" class="input" v-model="email" />
                </div>
                <div class="group text-left">
                  <label for="pass" class="label">Password</label>
                  <input type="password" class="input" data-type="password" v-model="password" />
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

                <div class="hr"></div>
              </div>
            </form>
            <form @submit.prevent="submitRegister()">
              <div class="sign-up-htm text-left">
                <div class="group">
                  <label for="user" class="label">Name</label>
                  <input type="text" class="input" v-model="name" />
                </div>
                <div class="group">
                  <label for="pass" class="label">Email Address</label>
                  <input type="text" class="input" v-model="email" />
                </div>
                <div class="group">
                  <label for="pass" class="label">Password</label>
                  <input type="password" class="input" data-type="password" v-model="password" />
                </div>
                <div class="group">
                  <input type="submit" class="button" value="Sign Up" />
                </div>
                <div class="foot-lnk">
                  <label for="tab-1" style="color:white">Already Member?</label>
                </div>
                <div class="hr mt-2"></div>
              </div>
            </form>
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
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    }
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
          this.$router.push({ name: "Store" });
          this.$store.dispatch("checkLoginStatus");

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
@import "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css";

.background-login {
  background: url("../assets/bg-cover.png") no-repeat center;
  background-size: 100vw;
  height: 100vh;
}

*,
:after,
:before {
  box-sizing: border-box;
}
.clearfix:after,
.clearfix:before {
  content: "";
  display: table;
}
.clearfix:after {
  clear: both;
  display: block;
}
a {
  color: inherit;
  text-decoration: none;
}

.login-wrap {
  width: 100%;
  margin: auto;
  max-width: 525px;
  min-height: 609px;
  position: relative;
  background-size: cover;
  box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 0.24),
    0 17px 50px 0 rgba(0, 0, 0, 0.19);
}
.login-html {
  width: 100%;
  height: 100%;
  position: absolute;
  padding: 90px 70px 50px 70px;
  background: rgba(48, 126, 67, 0.877);
}
.login-html .sign-in-htm,
.login-html .sign-up-htm {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  transform: rotateY(180deg);
  backface-visibility: hidden;
  transition: all 0.4s linear;
}
.login-html .sign-in,
.login-html .sign-up,
.login-form .group .check {
  display: none;
}

.login-html .tab,
.login-form .group .label,
.login-form .group .button {
  text-transform: uppercase;
}
.login-html .tab {
  font-size: 22px;
  margin-right: 15px;
  padding-bottom: 5px;
  margin: 0 15px 10px 0;
  display: inline-block;
  border-bottom: 2px solid transparent;
}
.login-html .sign-in:checked + .tab,
.login-html .sign-up:checked + .tab {
  color: #fff;
  border-color: #1161ee;
}
.login-form {
  min-height: 345px;
  position: relative;
  perspective: 1000px;
  transform-style: preserve-3d;
}
.login-form .group {
  margin-bottom: 15px;
}
.login-form .group .label,
.login-form .group .input,
.login-form .group .button {
  width: 100%;
  color: #fff;
  display: block;
}
.login-form .group .input,
.login-form .group .button {
  border: none;
  padding: 15px 20px;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.1);
}
.login-form .group input[data-type="password"] {
  text-security: circle;
  -webkit-text-security: circle;
}
.login-form .group .label {
  color: rgb(221, 215, 215);
  font-size: 12px;
}
.login-form .group .button {
  background: #1161ee;
}
.login-form .group label .icon {
  width: 15px;
  height: 15px;
  border-radius: 2px;
  position: relative;
  display: inline-block;
  background: rgba(255, 255, 255, 0.1);
}
.login-form .group label .icon:before,
.login-form .group label .icon:after {
  content: "";
  width: 10px;
  height: 2px;
  background: #fff;
  position: absolute;
  transition: all 0.2s ease-in-out 0s;
}
.login-form .group label .icon:before {
  left: 3px;
  width: 5px;
  bottom: 6px;
  transform: scale(0) rotate(0);
}
.login-form .group label .icon:after {
  top: 6px;
  right: 0;
  transform: scale(0) rotate(0);
}
.login-form .group .check:checked + label {
  color: #fff;
}
.login-form .group .check:checked + label .icon {
  background: #1161ee;
}
.login-form .group .check:checked + label .icon:before {
  transform: scale(1) rotate(45deg);
}
.login-form .group .check:checked + label .icon:after {
  transform: scale(1) rotate(-45deg);
}
.login-html
  .sign-in:checked
  + .tab
  + .sign-up
  + .tab
  + .login-form
  .sign-in-htm {
  transform: rotate(0);
}
.login-html .sign-up:checked + .tab + .login-form .sign-up-htm {
  transform: rotate(0);
}

.hr {
  height: 2px;
  margin: 60px 0 50px 0;
  background: rgba(255, 255, 255, 0.2);
}
.foot-lnk {
  text-align: center;
}
</style>
