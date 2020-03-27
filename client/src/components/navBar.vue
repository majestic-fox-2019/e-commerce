<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light ">
      <router-link class="nav-link" to="/"><a class="navbar-brand" href="#">Ma-Tea</a></router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo02"
        aria-controls="navbarTogglerDemo02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item active">
            <router-link class="nav-link" to="/"><a>Home</a></router-link>
          </li>
          <li class="nav-item" v-show="!isLogin">
            <router-link class="nav-link" to="/register"><a>Register</a></router-link>
          </li>
          <li class="nav-item" v-show="!isLogin">
            <router-link class="nav-link" to="/login"><a>Login</a></router-link>
          </li>
          <li class="nav-item" v-show="isLogin">
            <a class="nav-link" @click="logOut" style="cursor: pointer;">Logout</a>
          </li>
        </ul>
        <div class="my-2 my-lg-0">
          <router-link class="nav-link" to="/cart"
            ><i class="fas fa-cart-plus">My Cart {{ totalCart }}</i></router-link
          >
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "navBar",
  data() {
    return {
      isLogin: false
    };
  },
  created() {
    this.$store.dispatch("showCart");
  },
  mounted() {
    this.Logincheck();
  },
  computed: {
    totalCart() {
      let cart = this.$store.state.totalCart;
      return cart;
    }
  },
  methods: {
    logOut() {
      localStorage.clear();
      this.$router.push({ name: "loginPage" });
    },
    Logincheck() {
      if (localStorage.token) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
        this.$store.dispatch("showCart");
      }
    }
  },
  watch: {
    checkLogin() {
      this.Logincheck();
    }
  }
};
</script>

<style>
.navbar {
  background-color: #f4ecd4;
}
</style>
