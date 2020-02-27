<template>
  <div class="container mt-5">
    <div v-if="carts.length > 0">
      <div class="row" v-for="(cart, index) in carts" :key="index">
        <Table :content="cart"></Table>
      </div>
    </div>
    <div v-else>
      <Error></Error>
    </div>
  </div>
</template>

<script>
import Table from "../components/Table";
import Error from "../components/ErrorPage";
export default {
  components: {
    Table,
    Error
  },
  data() {
    return {
      stock: ""
    };
  },
  created() {
    // this.$store.dispatch("getCart");
    // this.carts;
    this.getCarts();
  },
  methods: {
    getCarts() {
      this.$store.dispatch("getCart");
    }
  },
  computed: {
    carts() {
      return this.$store.state.carts;
    },
    newStock() {
      return this.stock;
    }
  }
  // watch: {
  //   stock(newData, oldData) {
  //     console.log(newData, oldData);
  //   }
  // }
};
</script>

<style>
</style>