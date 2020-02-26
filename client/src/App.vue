<template>
  <div id="app">
    <Menu :checkOnline="checkOnline" @submit="changeStatus"></Menu>
    <div class="content">
      <router-view @isLogin="checkOnline=true"></router-view>
    </div>
  </div>
</template>


<script>
import Login from "./components/Login.vue";
import Menu from "./components/menu.vue";
export default {
  components: { Login, Menu },
  data() {
    return {
      checkOnline: false
    };
  },
  methods: {
    changeStatus(bool) {
      this.checkOnline = bool;
    }
  }
};
</script>


<style lang="scss">
@import "@/assets/scss/style.scss";
#app {
  font-family: "Yeon Sung", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.content {
  background-color: #f4fff4 !important;
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
