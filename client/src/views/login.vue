<template>
  <div>
    <div class="cont">
      <div class="form sign-in">
        <h2 class="welcome">Welcome!</h2>
        <form v-on:submit.prevent="login">
          <label>
            <span>Email</span>
            <input type="email" v-model="formLogin.email" required />
          </label>
          <label>
            <span>Password</span>
            <input type="password" v-model="formLogin.password" required />
          </label>
          <div class="vld-parent">
            <loading
              :active.sync="isLoading"
              :can-cancel="true"
              :is-full-page="true"
              :color="'#d47a90'"
              :loader="'dots'"
              :width="100"
            ></loading>
          </div>

          <button type="submit" class="submit">Sign In</button>
          <button type="button" class="fb-btn" @click="isLoading =true">
            Connect with
            <span>Google</span>
          </button>
        </form>
      </div>
      <div class="sub-cont">
        <div class="img">
          <div class="img__text m--up">
            <router-link to="/" class="home effect-underline">
              <h1>
                Face UP
                <i class="fas fa-angle-double-up"></i>
              </h1>
            </router-link>
            <p>Aim to offer a quick and reliable service affordable prices and friendly!</p>
          </div>
          <router-link to="/register">
            <div class="img__btn">
              <span class="m--up">Sign Up</span>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template> 

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  components: {
    Loading
  },
  data() {
    return {
      formLogin: {
        email: null,
        password: null
      },
      isLoading: false
    };
  },
  methods: {
    login() {
      this.isLoading = true;
      this.$axios({
        method: "post",
        url: `${this.$server}/login`,
        data: this.formLogin
      })
        .then(result => {
          this.isLoading = false;
          this.$swal.fire({
            icon: "success",
            title: `Welcome ${result.data.name}`,
            showConfirmButton: false,
            timer: 1500
          });
          localStorage.setItem("token", result.data.token);
          localStorage.setItem("role", result.data.role);
          this.$router.push({ path: "/admin" });
        })
        .catch(err => {
          this.isLoading = false;
          this.$swal.fire({
            icon: "error",
            title: `${err.response.data.message}`,
            showConfirmButton: false,
            timer: 1500
          });
        });
    }
  }
};
</script>

<style scoped>
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.home {
  color: white;
  font-family: "Dancing Script";
}
.swal2-icon.swal2-success {
  border-color: #d47a90 !important;
}
.welcome {
  color: #d47a90;
  font-family: "Montserrat";
}
.loader {
  margin-left: 40%;
}
/*effect-underline*/
.effect-underline:after {
  content: "";
  position: absolute;
  left: 0;
  display: inline-block;
  width: 100%;
  border-bottom: 1px solid;
  margin-top: 1px;
  opacity: 0;
  -webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
  transition: opacity 0.35s, transform 0.35s;
  -webkit-transform: scale(0, 1);
  transform: scale(0, 1);
}

.effect-underline:hover:after {
  opacity: 1;
  -webkit-transform: scale(1);
  transform: scale(1);
}

body {
  font-family: "Montserrat";
  background: #ededed;
}

input,
button {
  border: none;
  outline: none;
  background: none;
  font-family: "Montserrat";
}

.cont {
  overflow: hidden;
  position: relative;
  width: 900px;
  height: 550px;
  margin: 0 auto 100px;
  background: #fff;
}

.form {
  position: relative;
  width: 640px;
  height: 100%;
  transition: transform 1.2s ease-in-out;
  padding: 50px 30px 0;
}

.sub-cont {
  overflow: hidden;
  position: absolute;
  left: 640px;
  top: 0;
  width: 900px;
  height: 100%;
  padding-left: 260px;
  background: #fff;
  transition: transform 1.2s ease-in-out;
}
.cont.s--signup .sub-cont {
  transform: translate3d(-640px, 0, 0);
}

button {
  display: block;
  margin: 0 auto;
  width: 260px;
  height: 36px;
  border-radius: 30px;
  color: #fff;
  font-size: 15px;
  cursor: pointer;
}

.img {
  overflow: hidden;
  z-index: 2;
  position: absolute;
  left: 0;
  top: 0;
  width: 260px;
  height: 100%;
  padding-top: 360px;
}
.img:before {
  content: "";
  position: absolute;
  right: 0;
  top: 0;
  width: 300px;
  height: 100%;
  background-image: url("https://images.unsplash.com/photo-1512496015851-a90fb38ba796?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80");
  background-size: cover;
}
.img:after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(156, 75, 106, 0.6);
}
.cont.s--signup .img:before {
  transform: translate3d(640px, 0, 0);
}
.img__text {
  z-index: 2;
  position: absolute;
  left: 0;
  top: 50px;
  width: 100%;
  padding: 0 20px;
  text-align: center;
  color: #fff;
  transition: transform 1.2s ease-in-out;
}
.img__text h2 {
  margin-bottom: 10px;
  font-weight: normal;
}
.img__text p {
  font-size: 13px;
  line-height: 1.5;
  margin-top: 5px;
  font-family: "Montserrat";
}
.cont.s--signup .img__text.m--up {
  transform: translateX(520px);
}
.img__text.m--in {
  transform: translateX(-520px);
}
.cont.s--signup .img__text.m--in {
  transform: translateX(0);
}
.img__btn {
  overflow: hidden;
  z-index: 2;
  position: relative;
  width: 100px;
  height: 36px;
  margin: 0 auto;
  background: transparent;
  color: #fff;
  text-transform: uppercase;
  font-size: 15px;
  cursor: pointer;
}
.img__btn:after {
  content: "";
  z-index: 2;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border: 2px solid #fff;
  border-radius: 30px;
}
.img__btn span {
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  transition: transform 1.2s;
}
.img__btn span.m--in {
  transform: translateY(-72px);
}
.cont.s--signup .img__btn span.m--in {
  transform: translateY(0);
}
.cont.s--signup .img__btn span.m--up {
  transform: translateY(72px);
}

h2 {
  width: 100%;
  font-size: 26px;
  text-align: center;
}

label {
  display: block;
  width: 260px;
  margin: 25px auto 0;
  text-align: center;
}
label span {
  font-size: 12px;
  color: #cfcfcf;
  text-transform: uppercase;
}

input {
  display: block;
  width: 100%;
  margin-top: 5px;
  padding-bottom: 5px;
  font-size: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  text-align: center;
}

.submit {
  margin-top: 40px;
  margin-bottom: 20px;
  background: #d47a90;
  text-transform: uppercase;
}

.fb-btn {
  border: 2px solid #d3dae9;
  color: #d47a90;
}
.fb-btn span {
  font-weight: bold;
  color: #455a81;
}

.sign-in {
  transition-timing-function: ease-out;
}
.cont.s--signup .sign-in {
  transition-timing-function: ease-in-out;
  transition-duration: 1.2s;
  transform: translate3d(640px, 0, 0);
}

.sign-up {
  transform: translate3d(-900px, 0, 0);
}
.cont.s--signup .sign-up {
  transform: translate3d(0, 0, 0);
}

.icon-link {
  position: absolute;
  left: 5px;
  bottom: 5px;
  width: 32px;
}
.icon-link img {
  width: 100%;
  vertical-align: top;
}
.icon-link--twitter {
  left: auto;
  right: 5px;
}

/*# sourceMappingURL=login.css.map */
</style>
