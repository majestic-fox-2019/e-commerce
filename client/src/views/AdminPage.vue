<template>
  <div>
    <div>
      <b-tabs content-class="mt-3" fill>
        <b-tab title="List of Products" active>
          <MyProducts></MyProducts>
        </b-tab>
        <b-tab title="Add new Product">
          <FormProduct></FormProduct>
        </b-tab>
        <b-tab title="List of Transactions">
          <allTransactions></allTransactions>
        </b-tab>
        <b-tab title="Disabled" disabled>
          <p>I'm a disabled tab!</p>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import FormProduct from "../components/FormProduct";
import MyProducts from "../components/MyProducts";
import allTransactions from "../components/allTransaction";
export default {
  name: "AdminPage",
  components: {
    FormProduct,
    MyProducts,
    allTransactions
  },
  mounted() {
    let role = localStorage.getItem("role");
    if (role !== "admin") {
      this.$router.push("/");
    }
  },
  computed: {
    roleKu() {
      return localStorage.getItem("role");
    }
  },
  watch: {
    roleKu() {
      if (localStorage.getItem("role") !== "admin") {
        this.$router.push("/");
      }
    }
  }
};
</script>

<style>
</style>