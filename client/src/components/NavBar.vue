<template>
  <div>
    <div class="container-fluid divNavBar fixed-top">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="" v-on:click.prevent="product">Product</a>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="" v-on:click.prevent="addProduct">Add Product<span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="" v-on:click.prevent="goLogout" style="color:gold">Log Out</a>
            </li>
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2 bg-dark text-white" style="width: 350px;" v-bind:value="email" readonly>
          </form>
        </div>
      </nav>
    </div>
  </div>

</template>

<script>
export default {
    name: 'navbar',
    data() {
        return {
            email: localStorage.getItem('email')
        }
    },
    methods: {
        goLogout() {
            this.$store.commit('SET_LOGOUT')
            this.$router.push('/')
        },
        addProduct() {
            this.$store.commit('SET_PRODUCTPAGE', 'add')
        },
        product() {
            this.$store.commit('SET_PRODUCTPAGE', 'list')
        },
    }
}
</script>

<style>

</style>