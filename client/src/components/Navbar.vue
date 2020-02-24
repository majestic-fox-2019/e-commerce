<template>
  <nav class="navbar navbar-dark bg-transparent mx-2">
    <a href>
      <img src="@/assets/logo.png" style="height: 6vmin;" />
      <span id="brand" class="font-weight-bold align-bottom text-white ml-2">E-Commerce</span>
    </a>
    <div>
      <a href class="font-weight-bold text-white" @click.prevent="logout">
        Logout
        <i class="fa fa-sign-out mx-2"></i>
      </a>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    logout () {
      localStorage.removeItem('access_token')
      this.$router.push({ name: 'Login' }).catch(err => { console.log(err) })
    }
  }
}
</script>

<style>
</style>
