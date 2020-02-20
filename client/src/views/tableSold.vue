<template>
  <Table :data="loadData"></Table>
</template>
<script>
import Table from '@/components/table.vue';

export default {
  components: {
    Table,
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
