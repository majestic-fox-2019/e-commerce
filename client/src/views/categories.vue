<template>
  <div>
    <categories :cards="getCategories" />
    <modalCategory />
  </div>
</template>

<script>
import categories from '../components/catalog.vue';
import modalCategory from '../components/addCategory.vue';

export default {
  components: {
    categories,
    modalCategory,
  },
  created() {
    this.$store.dispatch('allCategories');
  },
  computed: {
    getCategories() {
      return this.$store.state.categories;
    },
  },
};
</script>

<style>
.container {
  margin-left: 9%;
}
</style>
