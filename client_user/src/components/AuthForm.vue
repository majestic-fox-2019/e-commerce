<template>
  <div class="col-md-4 mx-auto bg-light">
    <ul class="nav nav-pills pt-4 mb-3" id="pills-tab" role="tablist">
      <li class="nav-item">
        <a class="nav-link text-center active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Login</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-center" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Register</a>
      </li>
    </ul>
    <div class="tab-content" id="pills-tabContent">
      <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
        <LoginForm :isLoading="isLoading"/>
      </div>
      <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
        <RegisterForm :isLoading="isLoading" />
      </div>
    </div>
  </div>  
</template>

<script>
import LoginForm from '../components/Login'
import RegisterForm from '../components/Register'

export default {
  name: 'AuthForm',
  components : {
    LoginForm,
    RegisterForm
  },
  data(){
    return {
      isLoading : false
    }
  },
  methods : {
    loadingIndicator(){
      this.$axios.interceptors.request.use((config) => {
        this.isLoading = true
        return config;
      },(error) => {
        this.isLoading = false
        return Promise.reject(error);
      })
      this.$axios.interceptors.response.use((response) => {
        this.isLoading = false
        return response;
      },(error) => {
          this.isLoading = false
          return Promise.reject(error)
      });
    }
  }
}
</script>

<style>
  .nav-item {
    width: 50%;
  }
</style>