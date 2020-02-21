<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Ma-Tea</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/admin">Product Table</router-link>
          </li>
          <li>
            <router-link class="nav-link" to="/category">Category Table</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="logOut" style="cursor: pointer;">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'admin',
  data() {
    return {
      datas: null,
    };
  },
  methods: {
    showData() {
      return this.$store.state.dataProducts;
    },
    logOut() {
      localStorage.clear();
      this.$router.push({ name: 'loginPage' });
    },
  },
};
</script>

<style></style>
