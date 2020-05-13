<template>
  <div class="home">
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  created() {
    this.$store.dispatch("findAllProduct");
  }
};
</script>

<style scoped>
</style>
