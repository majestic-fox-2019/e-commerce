<template>
  <div class="mb-2">
  <form @submit.prevent="loginUser">
    <div class="form-group">
      <label>Email</label>
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Put your email" v-model="form.email">
        <div class="input-group-append">
          <span class="input-group-text bg-primary text-light" id="basic-addon2"><i class="fa fa-envelope" aria-hidden="true"></i></span>
        </div>
      </div>
    </div>
    <div class="form-group mb-2">
      <label>Password</label>
      <div class="input-group">
        <input type="password" class="form-control" placeholder="Put your password" v-model="form.password">
        <div class="input-group-append">
          <span class="input-group-text bg-primary text-light" id="basic-addon2"><i class="fa fa-unlock" aria-hidden="true"></i></span>
        </div>
      </div>
    </div>
    <button type="submit" class="btn btn-tosca text-light mt-2">Login</button>
    <p class="text-center text-muted pt-4 pb-4">Dont have account ? Please Register</p>
  </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data(){
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    loginUser(){
      const { email, password } = this.form
      const value = { email, password }
      
      this.$axios.post('/users/login', value)
      .then(response => {
        this.$store.dispatch('loginHandler', response.data)
        this.$toast.fire({
          icon: 'success',
          title: `${response.data.email} login successfully!`
        })
        this.$router.push({ name: 'Dashboard' })
      })
      .catch(err => {
        this.$swal.fire({
          icon: 'error',
          title: 'Oops..',
          text: err.response.data,
          showCloseButton: true,
        })
      })
    },
    loadingIndicator(){
      this.$parent.loadingIndicator()
    }
  }
}
</script>

<style>
  .input-group-text {
    width: 40px;
    text-align: center;
  }
  label {
    font-size: 16px;
  }
  .btn-tosca{
    background-color:#349d73;
  }
  .btn{
    width: 100%;
    border-radius: 3px;
  }
</style>