<template>
  <v-app>
    <HeaderNav />
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import HeaderNav from '@/components/HeaderNav'

export default {
  name: 'App',
  components: {
    HeaderNav
  },
  data() {
    return {}
  },
  created() {
    if (localStorage.getItem('token')) {
      this.$store.dispatch('GET_USER_INFO')
    }
  }
}
</script>

<style lang="css">
.loader {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
