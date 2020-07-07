<template>
  <div>
    <div class="container-fluid divNavBar fixed-top">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <p class="h3 text-info p-0 m-0 mt-2 mr-4">ADMIN Page</p>
        <a class="navbar-brand p-0 m-0 mt-2 mr-2" href="" v-on:click.prevent="transaction">Transaction</a>
        <a class="navbar-brand p-0 m-0 mt-2 mr-2" href="" v-on:click.prevent="product">Product</a>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link p-0 m-0 mr-2 text-success h5 textAddProduct" href="" v-if="$router.app._route.path=='/product'" v-on:click.prevent="addProduct">Add Product</a>
            </li>
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <a class="nav-link p-0 m-0 mt-2 mr-2" href="" v-on:click.prevent="goLogout" style="color:gold">Log Out</a>
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
            this.$store.dispatch('logoutadmin')
        },
        addProduct() {
            this.$store.commit('SET_PRODUCTPAGE', 'add')
            if(this.$router.app._route.path != '/product') {
              this.$router.push('/product')
              this.$store.commit('SET_PRODUCTPAGE', 'add')
            }            
        },
        product() {
            this.$store.commit('SET_PRODUCTPAGE', 'list')
            if(this.$router.app._route.path != '/product') {
              this.$router.push('/product')
            }            
        },
        transaction() {
            if(this.$router.app._route.path != '/transaction') {
              this.$router.push('/transaction')
            }
        }
    }
}
</script>

<style scoped>
.textAddProduct{
    margin-top: 8px !important;
}
.textAddProduct:hover {
    text-shadow: 3px 3px 3px gray;
    color:lightgreen !important;
}
</style>