<template>
  <q-layout view="lHh Lpr lFf">
    <Navbar @open="leftDrawerOpen = !leftDrawerOpen" v-if="!isAdmin" />

    <Drawer :drawerOpen="leftDrawerOpen" v-if="!isAdmin" />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import Navbar from './partials/Navbar'
import Drawer from './partials/Drawer'

export default {
  name: 'App',

  components: {
    Navbar,
    Drawer
  },

  data() {
    return {
      leftDrawerOpen: false
    }
  },
  created() {
    this.$store.dispatch('GET_LOGIN_STATUS')
  },
  computed: {
    isAdmin() {
      return this.$store.state.isAdmin
    }
  }
}
</script>

<style></style>
