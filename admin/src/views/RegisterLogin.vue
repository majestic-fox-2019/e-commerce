<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-6">
          <el-input
            placeholder="Please input your name"
            type="email"
            v-model="name"
          ></el-input>
          <el-input
            placeholder="Please input your email"
            type="email"
            v-model="email"
          ></el-input>
          <el-input
            placeholder="Please input your password"
            v-model="password"
            show-password
          ></el-input>
          <el-button @click="login" round>Login</el-button>
          <el-button @click="register" round>Register</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'registerLogin',
  data() {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    login() {
      axios({
        method: 'post',
        url: `${this.$store.state.baseUrl}/users/login`,
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          console.log('user login successfully with data: ', data)
          localStorage.setItem('e_musicToken_admin', data.token)
          localStorage.setItem('e_musicEmail_admin', data.email)
          localStorage.setItem('e_musicRole_admin', data.role)
          this.$router.push({
            path: '/'
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    register() {
      let newUser = {
        name: this.name,
        email: this.email,
        password: this.password,
        role: 'admin'
      }
      axios({
        method: 'post',
        url: `${this.$store.state.baseUrl}/users/register`,
        data: newUser
      })
        .then(({ data }) => {
          console.log('user register successfully with data: ', data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created() {
    if (localStorage['e_musicToken_admin']) {
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>

<style></style>
