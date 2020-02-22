<template>
  <div>
    <categories :cards="{ getCategories, image }" />
    <modalCategory />
  </div>
</template>

<script>
import categories from "../components/catalog.vue";
import modalCategory from "../components/addCategory.vue";

export default {
  components: {
    categories,
    modalCategory
  },
  data() {
    return {
      image:
        "https://cdn3.iconfinder.com/data/icons/beauty-makeup-and-fashion-1/66/2-512.png"
    };
  },
  created() {
    this.$store.dispatch("allCategories");
  },
  computed: {
    getCategories() {
      console.log();
      return this.$store.state.categories;
    }
  }
};
</script>

<style>
.container {
  margin-left: 9%;
}
</style>
