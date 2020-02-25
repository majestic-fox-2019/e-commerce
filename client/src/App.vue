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
  computed: {
    dialog() {
      return this.$store.state.cartDialog
    }
  },
  created() {
    this.$store.dispatch('FETCH_ALL_PRODUCTS')
    if (localStorage.getItem('token')) {
      this.$store.dispatch('GET_USER_INFO')
      this.$store.dispatch('SHOW_USER_CARTS')
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
