<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light">
      <router-link :to="{name:'Home'}" class="navbar-brand" href="#">Home</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link :to="{name:'Cart'}" class="nav-link" href="#">
              Cart
              <span class="sr-only">(current)</span>
            </router-link>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <button
            type="button"
            @click="logout"
            class="btn btn-secondary"
            v-show="checkOnline"
          >Log Out</button>
          <router-link
            :to="{name:'Login'}"
            type="button"
            class="btn btn-secondary"
            v-show="!checkOnline"
          >Log in</router-link>
        </form>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  props: ["checkOnline"],
  methods: {
    checklogin() {
      if (localStorage.getItem("token")) {
        this.$emit("submit", true);
      } else {
        this.$emit("submit", false);
      }
    },
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      this.checklogin();
      this.$router.push({ name: "Login" });
    }
  },
  created() {
    console.log("created");
    this.checklogin();
  },
  mounted() {
    console.log("mounted");
    this.checklogin();
  },
  watch: {
    checkOnline() {
      console.log("watchs");
      this.checklogin();
    }
  }
};
</script>

<style scooped>
.navbar {
  background-color: #f4fff4;
  padding: 20px;
}
</style>