<template>
  <div>
    <NavbarMember/>
    <router-view></router-view>
  </div>
</template>

<script>
import NavbarMember from './NavbarMember.vue'

export default {
  name: 'Home',
  components: {
    NavbarMember,
  },
};
</script>


<style>

</style>