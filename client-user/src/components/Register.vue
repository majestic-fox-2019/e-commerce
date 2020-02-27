<template>
  <v-form
      ref="form"
      @submit.prevent="register"
    >
      <v-text-field
        v-model="email"
        label="Email"
        :error-messages="error.email"
      ></v-text-field>
      <v-text-field
        v-model="name"
        label="Name"
        :error-messages="error.name"
      ></v-text-field>
      <v-text-field
        v-model="password"
        type="password"
        label="Password"
        :error-messages="error.password"
      ></v-text-field>
      <div class="pt-5">
        <v-btn
        type="submit" color="success">
          Register
        </v-btn>
      </div>
  </v-form>
</template>

<script>
import axios from 'axios'
export default {
  name:'Register',
  data() {
    return {
      email:'',
      password:'',
      name:'',
      error:{
        email:'',
        password:'',
        name:''
      }
    }
  },
  methods: {
    register() {
      this.$http({
        method:"post",
        url:'user/register',
        data:{
          email:this.email,
          name:this.name,
          password:this.password
        }
      })
      .then(({ data }) => {
        this.$refs.form.reset()
        this.$emit('close')
        this.$toast.fire(
          {
            title: 'Success',
            text: 'Register success',
            icon: 'success',
          },
        );
      })
      .catch(err => {
        this.error = {}
        for (let key in err.response.data){
          this.error[key] = err.response.data[key]
        }
        this.$toast.fire(
          {
            title: 'Error!',
            text: typeof err.response.data !== 'string' ? 'Something Wrong' : `${err.response.data}`,
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