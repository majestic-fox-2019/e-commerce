<template>
  <div class="container-login100" style="background-image: url('images/bg-01.jpg');">
    <div class="wrap-login100 p-l-55 p-r-55 p-t-45 p-b-30">
			<form @submit.prevent="submitForm" class="login100-form validate-form">
        <span v-if="formLogin === true" class="login100-form-title p-b-37">
          Login
        </span>
        <span v-else-if="formLogin === false" class="login100-form-title p-b-37">
          Register
        </span>
        <div v-show="formLogin === false" class="wrap-input100 validate-input m-b-20" data-validate="Enter username">
          <input class="input100" type="text" v-model="formData.username" name="username" placeholder="username">
          <span class="focus-input100"></span>
        </div>
        <div class="wrap-input100 validate-input m-b-20" data-validate="Enter email">
          <input class="input100" type="email" v-model="formData.email" name="email" placeholder="email">
          <span class="focus-input100"></span>
        </div>
        <div class="wrap-input100 validate-input m-b-25" data-validate = "Enter password">
          <input class="input100" type="password" v-model="formData.password" name="pass" placeholder="password">
          <span class="focus-input100"></span>
        </div>
        <center><div class="error" v-show="errorLogin">username/password is wrong</div></center>
        <center><div class="error" v-show="errorRegister">{{msg}}</div></center>
        <div class="container-login100-form-btn">
          <button v-if="formLogin === true" type="submit" class="login100-form-btn">
            Login
          </button>
          <button v-if="formLogin === false" type="submit" class="login100-form-btn">
            Register
          </button>
        </div>
        <div class="text-center p-t-30 p-b-20">
          <span class="txt1">
            Or login with
          </span>
        </div>
        <div class="flex-c">
          <a href="#" class="login100-social-item">
            <img src="@/../public/images/icons/icon-google.png" alt="google">
          </a>
          <a href="#" class="login100-social-item">
            <img src="@/../public/images/icons/facebook.png" alt="facebook">
          </a>
        </div>
				<div class="text-center">
					<a href="#" v-if="formLogin === true" @click='registerForm' class="txt2 hov1">
						register
					</a>
          <a href="#" v-if="formLogin === false" @click='loginForm' class="txt2 hov1">
						login
					</a>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
// import axios from 'axios'

export default {
  data() {
    return {
      formData: {
        username: '',
        email: '',
        password: '',
      },
      msg: '',
      errorLogin: false,
      errorRegister: false,
      formLogin: true,
    }
  },
  methods: {
    registerForm() {
      this.formLogin = false
    },
    loginForm() {
      this.formLogin = true
    },
    submitForm() {
      if(this.formLogin === true) {
        this.$axios({
          url:`/user/login`, 
          method:'post',
          data:{
            email: this.formData.email,
            password: this.formData.password,
          }
        })
          .then(loggedin=>{
            this.errorLogin = false
            localStorage.setItem('email',loggedin.data.email)
            localStorage.setItem('token',loggedin.data.token)
            this.$router.push({ name: 'home'})
            this.$swal.success('logged in')
            })
          .catch(error=>{
            console.log(error)
            this.errorLogin = true
          })
      }else{
        this.$axios({
          url:`/user/register`, 
          method:'post',
          data:{
            username: this.formData.username,
            email: this.formData.email,
            password: this.formData.password,
          }
        })
          .then(registered=>{
            console.log(registered)
            this.errorRegister = false
            this.formData.username = ''
            this.formData.email = ''
            this.formData.password = ''
            this.$swal.success('register complete')
            })
          .catch(error=>{
            this.msg = error.response.data.error[0]
            this.errorRegister = true
          })
      }
    },
  },
  watch: {
    formLogin: function() {
      this.errorRegister = false
      this.errorLogin = false
      this.formData.username = '';
      this.formData.email = '';
      this.formData.password = '';
    }
  }
}
</script>

<style scoped>

@import '../assets/css/loginMain.css';
@import '../assets/css/loginUtil.css';
.error {
  color: red;
}
</style>