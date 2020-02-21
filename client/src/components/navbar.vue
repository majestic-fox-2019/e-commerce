<template>
<!-- eslint-disable max-len -->

  <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-white">
        <a class="navbar-brand">Face UP <i class="fas fa-angle-double-up"></i></a>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-link">Fulfill your needs</li>
          </ul>
          <div class="login" v-if="isLogin">
          <router-link to='/login' class="login"><i class="fas fa-sign-in-alt">Login</i></router-link>
          </div>
          <div v-if="!isLogin">
          <button class="btn btn-danger">Logout</button>
          </div>
        </div>
      </nav>
    </div>
</template>

<script>
export default {
  data() {
    return {
      isLogin: localStorage.token,
    };
  },
};
</script>

<style scoped>
* {
  color: #f0908a;
}
</style>
