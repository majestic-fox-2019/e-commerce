<template>
<div>
</div>
</template>
<script>

export default {
  components: {
  },
  data() {
    return {
    };
  },
  created() {
    this.$store.dispatch('loadData');
  },
  computed: {
    loadData() {
      return this.$store.state.allData;
    },
  },
};
</script>

<style>

</style>
