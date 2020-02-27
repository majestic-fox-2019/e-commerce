<template>
  <div class="mb-2">
    <div v-if="isLoading" class="text-success">
      <div class="spinner-border text-success" role="status">
        <span class="sr-only">Loading...</span>
      </div> <span class="pl-2">Register process on going, please wait !</span>
    </div>
  <form class="mt-2" @submit.prevent="registerUser">
    <div class="form-group">
      <label>Name</label>
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Put your name" :class="error.name.classes" v-model="form.name">
        <div class="input-group-append">
          <span class="input-group-text bg-primary text-light" id="basic-addon2">
          <i class="fa fa-user" aria-hidden="true"></i></span>
        </div>
        <div class="invalid-feedback">{{ error.name.message }}</div>
      </div>
    </div>
    <div class="form-group">
      <label>Email</label>
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Put your email" :class="error.email.classes" v-model="form.email">
        <div class="input-group-append">
          <span class="input-group-text bg-primary text-light" id="basic-addon2">
          <i class="fa fa-envelope" aria-hidden="true"></i></span>
        </div>
      <div class="invalid-feedback">{{ error.email.message }}</div>
      </div>
    </div>
    <div class="form-group mb-2">
      <label>Password</label>
      <div class="input-group">
        <input type="password" class="form-control" placeholder="Put your password" :class="error.password.classes" v-model="form.password">
        <div class="input-group-append">
          <span class="input-group-text bg-primary text-light" id="basic-addon2">
          <i class="fa fa-unlock" aria-hidden="true"></i></span>
        </div>
      <div class="invalid-feedback">{{ error.password.message }}</div>
      </div>
    </div>
    <button type="submit" class="btn btn-tosca text-light mt-2">Register</button>
    <p class="text-center text-muted pt-4 pb-4">Already have account ? Please Login</p>
  </form>
  </div>
</template>

<script>
export default {
  name: 'Register',
  props : ['isLoading'],
  data(){
    return {
      form : {
        name : '',
        email: '',
        password: ''
      },
      error: {
        name : {
          classes: '',
          message: ''
        },
        email: {
          classes: '',
          message: ''
        },
        password: {
          classes: '',
          message: ''
        }
      },
    }
  },
  methods: {
    registerUser(){
      const { name, email, password } = this.form
      const value = { name, email, password }
      this.loading()
      this.$axios.post('/users/register', value)
      .then(response => {
        this.$toast.fire({
          icon: 'success',
          title: `Register user ${response.data.name} successfully`
        })
        this.clearValidation(this.error)
        this.clearField()
      })
      .catch(err => {
        this.errorMessage(err.response.data)
      })
    },
    clearField(){
      this.form.name = ''
      this.form.email = ''
      this.form.password = ''
    },
    loading(){
      this.$parent.loadingIndicator()
    },
    errorMessage(errorObject){
      for(let key in errorObject){
        this.error[key].classes = 'is-invalid'
        this.error[key].message = errorObject[key]
      }
    },
    clearValidation(errorObject){
      for(let key in errorObject){
        this.error[key].classes = ''
        this.error[key].message = ''
      }
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