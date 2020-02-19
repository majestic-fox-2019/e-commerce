<template>
  <div>
    <div class="d-flex mx-auto row">
      <CardProducts v-for="one in dataCategory" :key="one.id" :product="one"></CardProducts>
    </div>
  </div>
</template>

<script>
import CardProducts from "../components/CardProducts";
export default {
  name: "category",
  components: {
    CardProducts
  },
  mounted() {
    let category = this.$route.params.category;

    this.$store.dispatch("getCategory", category);
  },
  computed: {
    dataCategory() {
      return this.$store.state.perCategory;
    },
    currentParams() {
      return this.$route.params.category;
    }
  },
  watch: {
    currentParams(oldVal, newVal) {
      if (oldVal !== newVal) {
        let category = this.$route.params.category;
        this.$store.dispatch("getCategory", category);
      }
    }
  }
};
</script>

<style>
</style>