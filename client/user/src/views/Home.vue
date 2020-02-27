<template>
  <div class="home">
    <userNavbar></userNavbar>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <Product></Product> -->
    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import userNavbar from '@/components/userNavbar.vue'
// import Product from './Product.vue'

export default {
  name: 'Home',
  components: {
    // HelloWorld,
    // Product,
    userNavbar
  },
  created () {
    this.$store.dispatch('loadData')
  },
  computed: {
    loadData () {
      return this.$store.state.allData
    }
  }
}
</script>
