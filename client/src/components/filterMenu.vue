<template>
  <div>
    <nav class="Container">
      <p
        class="menu-contain"
        v-for="(category, idx) in showCategory"
        :key="idx"
        v-on:click="setCategory(category.name)"
      >
        {{ category.name }}
      </p>
    </nav>
  </div>
</template>

<script>
export default {
  name: "filterMenu",
  created() {
    this.$store.dispatch("showCategory");
  },
  computed: {
    showCategory() {
      return this.$store.state.dataCategories;
    }
  },
  methods: {
    setCategory(category) {
      this.$emit("getCategory", category);
    }
  }
};
</script>

<style scoped>
.Container {
  display: flex;
  justify-content: center;
  flex-direction: row;
}
.menu-contain {
  margin: 10px;
  cursor: pointer;
}
</style>
