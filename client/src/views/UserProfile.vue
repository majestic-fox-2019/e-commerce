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
        <b-tab title="Transactions of My Shop">
          <allTransactions></allTransactions>
        </b-tab>
        <b-tab title="Shopping History">
          <belanjaHistory></belanjaHistory>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import belanjaHistory from "../components/belanjaHistory";
import allTransactions from "../components/allTransaction";
import FormProduct from "../components/FormProduct";
import MyProducts from "../components/MyProducts";
export default {
  name: "Userpage",
  components: {
    FormProduct,
    MyProducts,
    allTransactions,
    belanjaHistory
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