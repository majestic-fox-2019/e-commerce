<template>
  <span class="navbar-text">
    <button @click="logout" class="btn btn-danger text-light btn-sm"><i class="fa fa-sign-out" aria-hidden="true"></i> Logout</button>
  </span>
</template>

<script>
export default {
  name : 'ButtonLogout',
  methods : {
    logout(){
      localStorage.clear()
      this.$router.push({ name : 'Login' })
    }
  }
}
</script>

<style>

</style>