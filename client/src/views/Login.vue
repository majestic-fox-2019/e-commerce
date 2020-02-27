<template>
  <div>
      <div id="nav">
         <h1 style="font-family: 'Pacifico', cursive; color:#90F0B4">Welcome to SkinType</h1>
         <router-link to="/">Login</router-link> | <router-link to="/user-register">Register</router-link>
    </div>
    <div class="container border p-4">
    <form @submit.prevent ="login()" method="POST">
      <div class="form-group">
        <label for="emailLogin">Email address</label>
        <input type="email" class="form-control" id="emailLogin" aria-describedby="emailHelp" placeholder="Enter email" v-model="emailLogin">
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
        <label for="passLogin">Password</label>
        <input type="password" class="form-control" id="passLogin"  placeholder="Password" v-model="passLogin">
      </div>
      <button type="submit" class="btn btn-success">Login</button>
    </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
  name:'Login',
  data() {
    return {
      emailLogin: null,
      passLogin: null
    }
  },
  methods: {
      login(){
        axios({
          method: 'POST',
          url:'http://localhost:3000/login',
          data: {
            email: this.emailLogin,
            password: this.passLogin
          }
        })
        .then(res => {
          console.log(res)
          localStorage.setItem("token", res.data.token)
          localStorage.setItem("role", res.data.user.role)
          localStorage.setItem("name", res.data.user.name) 
          localStorage.setItem("address", res.data.user.address)
          localStorage.setItem("phone_number", res.data.user.phone_number)
          localStorage.setItem("email", res.data.user.email)
          
            
          if(res.data.user.role == "admin") {
            this.$router.push('/admin')   
            Swal.fire({
              icon: 'success',
              title: 'Welcome admin!',
              showConfirmButton: false,
              timer: 1500
            })
          } else {
            Swal.fire({
              icon: 'success',
              title: `Wellcome ${res.data.user.name}`,
              showConfirmButton: false,
              timer: 1500
            })
            this.$router.push('/user')
          }

        })
        .catch(err => {
          console.log(err.response.data.err.message)
           Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${err.response.data.err.message}` 
        })
        })
      }
      
      }
}
</script>

<style>

</style>