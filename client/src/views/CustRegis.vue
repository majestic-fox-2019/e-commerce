<template>
  <div>
    <div id="nav">
         <h1 style="font-family: 'Pacifico', cursive; color:#90F0B4">Welcome to SkinType</h1>
      <router-link to="/">Login</router-link> | <router-link to="/user-register">Register</router-link>
    </div>
    <div class="container box">
    <form @submit.prevent = "register()" class="border p-4">
      <div class="form-group">
        <label for="nameRegis">Name</label>
        <input type="text" class="form-control" id="nameRegis"  placeholder="Name" v-model="nameRegis">
      </div>
      <div class="form-group">
        <label for="emailRegis">Email address</label>
        <input type="email" class="form-control" id="emailRegis" aria-describedby="emailHelp" placeholder="Enter email" v-model="emailRegis">
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
        <label for="passRegis">Password</label>
        <input type="password" class="form-control" id="passRegis"  placeholder="Password" v-model="passRegis">
      </div>
      <div class="form-group">
        <label for="addressRegis">Address</label>
        <input type="text" class="form-control" id="addressRegis"  placeholder="Address" v-model="addressRegis">
      </div>
      <div class="form-group">
        <label for="phoneRegis">Phone Number</label>
        <input type="number" class="form-control" id="phoneRegis"  placeholder="Phone Number" v-model="phoneRegis">
      </div>
      <button type="submit" class="btn btn-success">Register</button>
    </form>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
name:'CustRegis',
  data() {
    return {
      nameRegis: null,
      passRegis: null,
      addressRegis: null,
      phoneRegis: null,
      emailRegis: null
    }
  },
  methods: {
      register() {
        axios({
          method:"POST",
          url: 'https://e-commers-skin-type.herokuapp.com/register',
          data:{
            name: this.nameRegis,
            email: this.emailRegis,
            password: this.passRegis,
            address: this.addressRegis,
            phone_number: this.phoneRegis
          }
        })
        .then(res => {
          console.log(res, "berhasil")
          this.$router.push('/admin')
           Swal.fire({
            icon: 'success',
            title: 'Registration success!',
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch(err => {
          console.log(err.response)
          let errMsg = `<div style="color:red;">`
          err.response.data.forEach(el => {
            errMsg += `${el}<br>`
          })
          errMsg += '</div>'
          Swal.fire({
          icon: 'error',
          title: 'Oops...',
          html: errMsg
        })
        })
      }
    }
}
</script>

<style>

</style>