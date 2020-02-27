<template>
  <div class="adminView">
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "adminView",
  created() {
    this.$store.dispatch("findProductAdmin");
  }
};
</script>

<style scoped>
</style>
