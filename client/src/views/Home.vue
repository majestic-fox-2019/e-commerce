<template>
  <div class="home">
    <navbar v-if="$store.state.loggedin"/>
    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src
import navbar from '@/components/navbar.vue'

export default {
  name: 'Home',
  components: {
    navbar
  },
  created(){
    if(!localStorage.token){
      this.$router.push('/login')
    }
  }
}
</script>
