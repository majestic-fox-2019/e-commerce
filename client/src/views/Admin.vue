<template>
  <div class="container">
    <button type="button" @click.prevent="addProduct()" class="btn btn-primary mb-3">Add Product</button>
    <div v-if="$store.state.addProduct">
      <AddProduct></AddProduct>
    </div>
    <div>
      <div class="row" v-for="(product, index) in $store.state.products" :key="index">
        <AdminCards :content="product"></AdminCards>
      </div>
    </div>
  </div>
</template>

<script>
import AddProduct from "../components/AddProduct";
import AdminCards from "../components/AdminCard";
export default {
  created() {
    this.$store.dispatch("getProduct");
    this.$store.dispatch("checkLogin");
  },
  data() {
    return {
      count: 0
    };
  },
  components: {
    AddProduct,
    AdminCards
  },
  methods: {
    addProduct() {
      if (this.count === 0) {
        this.$store.commit("SET_FORM", true);
        this.count++;
      } else {
        this.$store.commit("SET_FORM", false);
        this.count = 0;
      }
    }
  }
};
</script>

<style>
</style>