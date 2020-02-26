<template>
  <div id="formLogin">
    <div id="login-body">
      <div id="login-head">
        <div class="login-masukDafter" id="login-active">Masuk</div>

        <div class="login-masukDafter">
          <router-link to="/register">Daftar</router-link>
        </div>
      </div>
      <div id="login-content">
        <div id="login-social-content">
          <h3>Masuk ke akun Anda</h3>
          <div id="imgSigninGoogle">
            <img src="@/assets/btn_google_signin_light_normal_web.png" alt />
          </div>
          <p>Kami tidak akan posting atas nama Anda atau membagikan informasi apapun tanpa persetujuan Anda.</p>
        </div>
        <form @submit.prevent="loginAdmin">
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              required
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              v-model="dataLogin.email"
            />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              required
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              v-model="dataLogin.password"
            />
          </div>
          <!-- <button type="submit" class="btn btn-primary" @click="loginAdmin">login</button> -->
          <button type="submit" class="btn btn-login btn-lg btn-block" @click="loginAdmin">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import firebase from "firebase";
const server = `http://localhost:3000`;
// const server = `https://mysterious-plains-04294.herokuapp.com`;
export default {
  data: function() {
    return {
      dataLogin: {
        email: null,
        password: null
      }
    };
  },
  methods: {
    loginAdmin() {
      axios({
        method: "post",
        url: `${server}/users/login`,
        data: this.dataLogin
      })
        .then(resultLogiAdmin => {
          localStorage.setItem("token", resultLogiAdmin.data);

          this.$store.dispatch("cekAdmin");
          this.$router
            .push({
              path: "/dashboard"
            })
            .catch(_ => {});
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Welcome",
            showConfirmButton: false,
            timer: 1500
          });
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!"
            // footer: "<a href>Why do I have this issue?</a>"
          });
          console.log(err.message);
        });
    }
  }
};
</script>

<style scoped>
#formLogin {
  /* border: 1px solid red; */
  /* padding-top: 8em; */
  background-color: #bdc3c7;
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 60px);
}
#login-body {
  display: flex;
  width: 30em;
  height: 35em;
  flex-direction: column;
  margin-top: 1em;
  background-color: #fff;
  -webkit-box-shadow: -1px 1px 12px -6px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: -1px 1px 12px -6px rgba(0, 0, 0, 0.75);
  box-shadow: -1px 1px 12px -6px rgba(0, 0, 0, 0.75);
}
#login-head {
  display: flex;
  justify-content: space-around;
}
.login-masukDafter {
  justify-content: center;
  display: flex;
  height: 2em;
  border-bottom: 2px solid gray;
  width: 100%;
  align-items: center;
  font-size: 1.5em;
  letter-spacing: 5px;
  font-weight: 200;
}
.login-masukDafter a {
  text-decoration: none;
  color: #000;
}
#login-active {
  border-bottom: 4px solid#000;
}
#login-content {
  margin: 2em 5em;
  display: flex;
  flex-direction: column;
  /* background-color: #fff; */
}
#login-social-content {
  text-align: center;
  border-bottom: 1px solid gray;
  margin-bottom: 2em;
}
#login-social-conten,
p {
  font-size: 0.8em;
  font-weight: 100;
}

#imgSigninGoogle {
  width: 100%;
}
.btn-login {
  width: 100%;
  background-color: #000;
  color: #fff;
  border-radius: none;
}
/* #imgSigninGoogle {
  cursor: pointer;
  margin-bottom: 1em;
} */
</style>