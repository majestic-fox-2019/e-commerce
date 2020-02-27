<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <router-link class="navbar-brand" :to="{ name: 'Dashboard' }" href="#"><img width="32px" height="32px" src="../assets/sekripwhite.png"> <b>Disekrip</b></router-link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse ml-4" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li>
          <ButtonFilter customStyle="btn btn-secondary" :categories="categories" />
      </li>
    </ul>
    <div class="">
      <div v-if="isLoggedIn" class="dropdown">
        <button class="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
         <i class="fa fa-user" aria-hidden="true"></i> {{ userEmail }} <span class="badge badge-danger">{{ countCart }}</span>
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <router-link href="#" :to="{ name: 'Cart' }" class="dropdown-item"><i class="fa fa-shopping-cart" aria-hidden="true"></i> Cart <span class="badge badge-danger">{{ countCart }}</span></router-link>
          <a href="#" @click.prevent="logout" class="dropdown-item" ><i class="fa fa-sign-out" aria-hidden="true"></i> Logout</a>
        </div>
      </div>
      <button v-if="!isLoggedIn" @click.prevent="$router.push({ name: 'Auth' })" type="button" class="btn btn-primary btn-sm"><i class="fa fa-user-plus" aria-hidden="true"></i> Login / Register</button>
    </div>
  </div>
</nav>
</template>

<script>
import ButtonFilter from '../components/ButtonFilter'

export default {
  name: 'Navbar',
  components: {
    ButtonFilter
  },
  created(){
    this.getCart()
    this.getCategory()
  },
  computed: {
    isLoggedIn:function() {
      return this.$store.state.isLoggedIn
    },
    userEmail: function() {
      return this.$store.state.userEmail
    },
    userId: function() {
      return this.$store.state.userId
    },
    countCart: function(){
      return this.$store.state.countCart
    },
    categories: function(){
      return this.$store.state.categories
    }
  },
  methods: {
    logout(){
      this.$store.dispatch('logoutHandler')
      this.$toast.fire({
        icon: 'success',
        title: 'Successfully logout'
      })
    },
    getCart(){
      this.$store.dispatch('getTransaction', { userId: this.userId, token: this.isLoggedIn })
    },
    getCategory(){
      this.$store.dispatch('getCategory')
    }
  }
}
</script>

<style scoped>
  .navbar-brand {
    font-size : 18px;
  }
</style>