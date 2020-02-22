<template>
  <div class="login align-items-center bg-login">
    <div class="container">
      <b-row class="justify-content-center middle-vertical">
        <b-col md="9">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form id="login">
                  <h4 class="title">E-Commerce Admin Panel</h4>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text><i class="fa fa-envelope"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="text" name="email" v-model="formLogin.email" placeholder="Email" v-bind:state="Boolean(formLogin.email)"/>
                  </b-input-group>
                  <b-input-group class="mb-4">
                    <b-input-group-prepend><b-input-group-text><i class="fa fa-key"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="password" name="password" v-model="formLogin.password" v-bind:state="Boolean(formLogin.password)" placeholder="Password" />
                  </b-input-group>
                  <b-row>
                    <b-col cols="6">
                      <b-button variant="primary" class="px-4 btn-special" @click="doLogin">Login</b-button>
                    </b-col>
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
            <b-card no-body class="text-white bg-special py-5 d-md-down-none" style="width:44%">
              <b-card-body class="text-center">
                <div class="right-side">
                  <img src="@/assets/images/logo-white.png" class="logo-login" alt="">
                  <p>Welcome to admin panel E-Commerce Wawewo for management content website.</p>
                </div>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { url } from '@/mixins/mixins'

export default {
  mixins: [url],
  data(){
    return {
      formLogin: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    doLogin(){
      let self = this
      if(self.formLogin.email === '' || self.formLogin.password === ''){
        this.$vToastify.notifError('Email or Password must be filled', 'Login Failed!')
      }else{
        let dataLogin = {
          email: self.formLogin.email,
          password: self.formLogin.password
        }
        axios.post(`${self.url}/admin/login`, dataLogin)
        .then(res => {
          localStorage.setItem('token', res.data.payload.Token)
          localStorage.setItem('user', JSON.stringify(res.data.payload.users))
          this.$vToastify.notifSuccess('Login Success!', "Yeah!")
          this.$router.go(this.$router.push({ name: 'dashboard' }))
        })
        .catch(err => {
          self.$vToastify.notifError(`${err.response.data.message}`, "Failed!")
        })
      }
    }
  }
}
</script>

<style scoped>
  .bg-login{
    background: url("../../assets/images/bg-login.jpg") no-repeat fixed center; 
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .title{
    margin-bottom: 1.5rem;
  }
  h1{
   margin-bottom: 20px; 
  }
  .right-side p{
    padding: 0 10px;
  }
</style>