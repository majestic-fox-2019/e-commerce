<template>
  <div class="UserMenu-Main px-5">
      <h1>Admins</h1>
  </div>
</template>

<script>
export default {
  name: 'AdminUsers',
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$store.dispatch('fetchUserData', true)
    })
  }
}
</script>

<style scoped>
.UserMenu-Main {
  width: 100vw;
  height: 65vh;
}
</style>
