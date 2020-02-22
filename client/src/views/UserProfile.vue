<template>
  <div>
    <div class="mt-3">
      <b-tabs content-class="mt-3" fill>
        <b-tab title="List of Products" active>
          <MyProducts></MyProducts>
        </b-tab>
        <b-tab title="Add new Product">
          <FormProduct></FormProduct>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import FormProduct from "../components/FormProduct";
import MyProducts from "../components/MyProducts";
export default {
  name: "Userpage",
  components: {
    FormProduct,
    MyProducts
  },
  mounted() {
    if (!localStorage.getItem("token")) {
      this.$router.push("/");
    }
  }
};
</script>

<style>
</style>