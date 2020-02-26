<template>
  <div class="AdminRegistrationPage">
      <div class="registrationForm">
          <h2>Admin Registration</h2>
          <form @submit.prevent="registerAdmin" class="formRegist mt-3">
              <div style="display: flex; height:45%; width:100%;">
                <div class="left">
                    <label for="name">Employee Name:</label>
                    <br>
                    <input class="inputEmployee" type="text" v-model="form.name" id="name">
                    <br>
                    <br>
                    <label for="address">Employee Address:</label>
                    <br>
                    <input class="inputEmployee" type="text" v-model="form.address" id="address">
                    <br>
                    <br>
                </div>
                <div class="right">
                    <label for="email">Employee Email:</label>
                    <br>
                    <input class="inputEmployee" v-model="form.email" type="email" id="email">
                    <br>
                    <br>
                    <label for="phone">Employee Phone Number:</label>
                    <br>
                    <input class="inputEmployee" v-model="form.phone" type="text" id="phone">
                </div>
              </div>
              <label for="password">Password:</label>
              <br>
              <input class="inputEmployee" :type="formType" v-model="form.password" id="password">
              <br>
              <input type="checkbox" @click="seePass()">Show Password
              <br>
              <b-button type="submit">Register Admin</b-button>
          </form>
      </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name: 'AdminRegistration',
  data () {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        address: '',
        phone: ''
      },
      formType: 'password'
    }
  },
  methods: {
    seePass () {
      if (this.formType === 'password') {
        this.formType = 'text'
      } else {
        this.formType = 'password'
      }
    },
    registerAdmin () {
      Swal.fire({
        title: 'Are you sure you have the correct registration data?',
        text: "You won't be able to change this Employee's Data in the future",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: "Yes I'm sure"
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch('registerAdmin', {
            name: this.form.name,
            email: this.form.email,
            address: this.form.address,
            phone: this.form.phone,
            role: 'admin',
            password: this.form.password
          })
          this.form.name = ''
          this.form.password = ''
          this.form.email = ''
          this.form.address = ''
          this.form.phone = ''
        }
      })
    }
  }
}
</script>

<style scoped>
.inputEmployee {
    height: 4vh;
    width: 20vw;
    border: none;
    border-radius: 10px;
    padding: 1%;
}
.formRegist {
    height: 100%;
    width: 100%;
}
.left {
    width: 50%;
    height: 100%
}
.right {
    width: 50%;
    height: 100%
}
.AdminRegistrationPage {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
}
.registrationForm {
    width: 90%;
    height: 90%;
    background-color: #cd84f1;
    padding: 1%;
    border-radius: 10px;
}
</style>
