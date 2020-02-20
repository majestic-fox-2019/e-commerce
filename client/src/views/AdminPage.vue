<template>
  <div class="adminPage">
    <tableAdmin></tableAdmin>
    <formProduct></formProduct>
  </div>
</template>

<script>
// @ is an alias to /src
import tableAdmin from "@/components/tableAdmin.vue";
import formProduct from "@/components/formProduct.vue";

export default {
  name: "adminPage",
  components: {
    tableAdmin,
    formProduct
  },
  created() {
    this.$store.dispatch("findAllProduct");
  }
};
</script>
