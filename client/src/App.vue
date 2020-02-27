<template>
  <div>
    <Navbar />
    <router-view @login="login" />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
export default {
  name: 'app',
  components: {
    Navbar
  },
  methods: {
    login() {}
  }
}
</script>
<style lang="scss" scoped></style>
