<template>
  <div class="navbar-ecommerce">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="#">Arduishop</a>
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
          Cart</router-link></a>
      </li>
      <li class="nav-item" v-if="admin">
        <a class="nav-link"><router-link :to="{name: 'Products'}">
          List Product</router-link></a>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
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
export default {
  name: 'Navbar',
  data() {
    return {
      admin: localStorage.admin,
    };
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$store.dispatch('checkLogin');
    },
    hasLoggedIn() {
      return this.$store.state.loginStatus;
    },
  },
};
</script>
