<template>
  <div class="container-fluid bg">
    <router-link :to="{ name: 'Dashboard' }" class="btn btn-secondary">Back to home</router-link>
    <br><br>
    <AuthForm />
  </div>
</template>

<script>
import AuthForm from '../components/AuthForm'

export default {
  name : 'Auth',
  components : {
    AuthForm
  },
}
</script>

<style>
  .bg {
    width: 100%;
    height: 100vh;
    background-size: cover;
    background-image: url('../assets/rsz_carousel1.jpg')
  }
</style>