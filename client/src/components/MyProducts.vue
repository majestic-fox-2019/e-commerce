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
      <tbody class="overflow-auto bodyTable">
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
    },
    getOfficialProducts() {
      this.$store.dispatch("getOfficialProducts");
    }
  },
  computed: {
    myProducts() {
      return this.$store.state.myProducts;
    },
    statusEditDel() {
      return this.$store.state.editDelStatus;
    }
  },
  mounted() {
    if (localStorage.getItem("role") == "admin") {
      this.getOfficialProducts();
    } else {
      this.getMyProducts();
    }
  },
  watch: {
    statusEditDel() {
      if (this.$store.state.editDelStatus == true) {
        // this.$store.state.editDelStatus = false;
        this.$store.commit("setEdit", false);
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
.bodyTable {
  height: 70vh;
}
</style>