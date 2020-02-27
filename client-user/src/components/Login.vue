<template>
  <v-form
      ref="form"
      @submit.prevent="login"
    >
      <v-text-field
        v-model="email"
        label="Email"
      ></v-text-field>

      <v-text-field
        v-model="password"
        type="password"
        label="Password"
      ></v-text-field>
      <v-btn
        type="submit" color="success">
          Login
        </v-btn>
  </v-form>
</template>

<script>
import axios from 'axios'
export default {
  name:'Login',
  data() {
    return {
      email:'',
      password:''
    }
  },
  methods: {
    login() {
      this.$http({
        method:"post",
        url:'user/login',
        data:{
          email:this.email,
          password:this.password
        }
      })
      .then(({ data }) => {
        localStorage.name = data.name
        localStorage.token = data.token
        this.$store.dispatch('checkLogin')
        this.$refs.form.reset()
        this.$emit('close')
        this.$toast.fire(
          {
            title: 'Success',
            text: 'Login success',
            icon: 'success',
          },
        );
      })
      .catch(err => {
        this.$toast.fire(
          {
            title: 'Error!',
            text: err.response.data,
            icon: 'error',
          },
        );
      })
    }
  }
}
</script>

<style>

</style>