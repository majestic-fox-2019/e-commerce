<template>
  <div class="home">
    <userNavbar></userNavbar>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import userNavbar from '@/components/userNavbar.vue'

export default {
  name: 'Home',
  components: {
    // HelloWorld,
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
