<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>


<script>
import Login from "./components/Login.vue";
export default {
  components: { Login }
};
</script>


<style lang="scss">
@import "@/assets/scss/style.scss";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
