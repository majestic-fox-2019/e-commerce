<template>
  <div class="account">
    <login v-if="$store.state.accountWhatToShow === 'login'"></login>
    <register v-if="$store.state.accountWhatToShow === 'register'"></register>
  </div>
</template>

<script>
import login from "@/components/login.vue";
import register from "@/components/register.vue";
export default {
  name: "account",
  components: {
    login,
    register
  }
};
</script>

<style>
</style>