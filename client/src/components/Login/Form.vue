<template>
    <form @submit.prevent="loginHandler">
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input type="text" class="form-control" v-model="form.email" placeholder="Put your email address">
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" class="form-control" v-model="form.password" placeholder="Put your password">
      </div>
      <p v-if="error != null" class="text-danger">{{ error }}</p>
      <button type="submit" class="btn btn-full-width btn-success">Login</button>
    </form>
</template>

<script>

export default {
  name : 'FormLogin',
  data(){
    return {
      form : {
        email : '',
        password : ''
      },
      error : null,
    }
  },
  methods : {
    loginHandler(){

      
      const value = {
        email : this.form.email,
        password : this.form.password
      }

      this.$axios.post('/users/admin/login',value)
      .then(response => {
        localStorage.token = response.data.token
        localStorage.email = response.data.email
        this.error = null
        this.$router.push({ name : 'ContentUser' })
      })
      .catch(err => {
        this.error = err.response.data
      })
    }  
  }
}
</script>

<style>

</style>