<template>
  <div class="container mt-5">
    <h3 class="font-weight-bold text-left">User List</h3>
    <div class="text-right mb-4">
      <button @click="$router.push('/user/add')" class="btn btn-light font-weight-bold">
        <i :class="'fa fa-plus mr-2'"></i>
        ADD
      </button>
    </div>
    <router-view @success="$store.dispatch('getUsers')"></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {
    if (this.users === null) {
      this.$store.dispatch("getUsers");
    }
  },
  computed: {
    users() {
      return this.$store.state.users;
    }
  }
};
</script>

<style>
</style>
