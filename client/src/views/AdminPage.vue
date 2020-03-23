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
        <b-tab title="List of Transactions">
          <allTransactions></allTransactions>
        </b-tab>
        <b-tab title="Register New Admin">
          <RegAdmin></RegAdmin>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import FormProduct from "../components/FormProduct";
import MyProducts from "../components/MyProducts";
import allTransactions from "../components/allTransaction";
import RegAdmin from "../components/RegAdmin";
export default {
  name: "AdminPage",
  components: {
    FormProduct,
    MyProducts,
    allTransactions,
    RegAdmin
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