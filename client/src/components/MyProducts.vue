<template>
  <div>
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Description</th>
          <th>Category</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <listKu v-for="one in myProducts" :key="one.id" :detailPKu="one">
          <!-- <th>{{one.id}}</th> -->
        </listKu>
      </tbody>
    </table>
  </div>
</template>

<script>
import listKu from "./listProductsKu";
export default {
  name: "tableProduct",
  components: {
    listKu
  },

  methods: {
    getMyProducts() {
      this.$store.dispatch("getMyProducts");
    }
  },
  computed: {
    myProducts() {
      return this.$store.state.myProducts;
    }
  },
  mounted() {
    this.getMyProducts();
  },
  watch: {
    myProducts(oldVal, newVal) {
      if (oldVal !== newVal) {
        this.getMyProducts();
      }
    }
  }
};
</script>

<style scoped>
.styleIcon {
  font-weight: bold;
}

.colDesc {
  max-height: 70px;
}
</style>