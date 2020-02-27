<template>
  <div>
    <navBar></navBar>
    <cartTable></cartTable>
  </div>
</template>

<script>
import cartTable from "../components/cartTable.vue";
import navBar from "../components/navBar.vue";

export default {
  components: {
    cartTable,
    navBar
  }
};
</script>

<style></style>
