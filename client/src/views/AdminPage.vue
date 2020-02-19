<template>
  <div>
    <div>
      <b-tabs content-class="mt-3" fill>
        <b-tab title="First" active>
          <MyProducts></MyProducts>
        </b-tab>
        <b-tab title="Add new Product">
          <FormProduct></FormProduct>
        </b-tab>
        <b-tab title="Very, very long title">
          <p>I'm the tab with the very, very long title</p>
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

export default {
  name: "AdminPage",
  components: {
    FormProduct,
    MyProducts
  },
  mounted() {
    let role = localStorage.getItem("role");
    if (role !== "admin") {
      this.$router.push("/");
    }
  }
};
</script>

<style>
</style>