<template>
  <div class="container">
    <div class="d-flex justify-content-center align-items-center" style="height: 100vh;">
      <div class="text-left col-md-6 shadow-lg p-5 text-white rounded">
        <div class="text-center">
          <img src="@/assets/logo.png" alt />
          <span class="font-weight-bold pl-2 align-top">E-Commerce</span>
        </div>
        <hr />
        <h2 class="font-weight-bold mb-4">Login</h2>
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              v-model="email"
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              v-model="password"
              type="password"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary w-50 font-weight-bold mt-4">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../helper/api'
export default {
  name: 'Home',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      api
        .post('/login', { email: this.email, password: this.password })
        .then(({ data }) => {
          console.log(data)
          if (data.access_token) {
            localStorage.setItem('access_token', data.access_token)
            this.$router.push({ name: 'Home' })
          } else {
            console.log('No user')
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
