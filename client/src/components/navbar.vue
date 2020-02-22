<template>
  <!-- eslint-disable max-len -->

  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-white justify-content-center">
      <a class="navbar-brand">
        <router-link to="/admin" class="home">Face UP</router-link>
        <i class="fas fa-angle-double-up"></i>
      </a>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-link serif">Fulfill your needs</li>
        </ul>
        <div v-if="!isLogin">
          <router-link to="/login" class="serif btn btn-outline-danger btn-sm">
            <i class="fas fa-sign-in-alt"></i>Login
          </router-link>
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
.home {
  cursor: pointer;
  font-family: "Dancing Script";
  font-size: 26px;
  letter-spacing: 2px;
  margin-right: 4px;
}
.serif {
  font-family: "Montserrat";
  letter-spacing: 2px;
}
</style>
