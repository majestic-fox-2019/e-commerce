<template>
  <div class="navbar-ecommerce">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="" @click="backHome">Arduishop</a>
<button class="navbar-toggler" type="button" data-toggle="collapse"
  data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
  aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" ><router-link :to="{name: 'Home'}">
          Home</router-link><span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item" v-if="hasLoggedIn()">
        <a class="nav-link" ><router-link :to="{name: 'Cart'}">
          <i class="fas fa-shopping-cart"></i> Cart</router-link></a>
      </li>
      <li class="nav-item" v-if="hasLoggedIn()">
        <a class="nav-link" ><router-link :to="{name: 'Transactions'}">
          Transactions</router-link></a>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <div class="name-profile">
        <a v-if="hasLoggedIn()" style="color: white">
          {{getName()}}<i class="fas fa-child"></i></a>
      </div>
      <router-link :to="{name: 'Login'}">
        <button v-if="!hasLoggedIn()" class="btn btn-outline-success my-2 my-sm-0">
      Login</button></router-link>
      <router-link :to="{name: 'Login'}">
        <button v-if="hasLoggedIn()" @click="logout" class="btn btn-outline-success my-2 my-sm-0">
      Logout</button></router-link>
    </form>
  </div>
</nav>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  name: 'Navbar',
  methods: {
    backHome() {
      this.$router.push({ name: 'Home' });
    },
    logout() {
      this.$store.dispatch('logout');
      this.$store.dispatch('checkLogin');
      this.$store.dispatch('checkAdmin');
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        onOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: 'success',
        title: 'Sign out successfully',
      });
    },
    hasLoggedIn() {
      return this.$store.state.loginStatus;
    },
    getName() {
      return this.$store.state.name;
    },
  },
};
</script>

<style scoped>
.name-profile {
  color: white;
  margin-right: 10px;
  font-size: 20px;
}
</style>
