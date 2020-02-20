<template>
  <div id="app">
    <navbar></navbar>
    <router-view />
  </div>
</template>

<script>
import navbar from "@/components/navbar.vue";

export default {
  components: {
    navbar
  },
  created() {
    if (localStorage.getItem("token")) {
      this.$store.state.isLogin = true;
    } else {
      this.$store.state.isLogin = false;
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Lato", "Arial", sans-serif;
}
</style>
