<template>
<!-- eslint-disable max-len -->
<div class="container">
   <h3>{{selectedCategory}}</h3>
  <table class="table">
  <thead>
    <tr>
      <th scope="col">No.</th>
      <th scope="col">Name</th>
      <th scope="col">Price</th>
      <th scope="col">Stock</th>
      <th scope="col">Category</th>
    </tr>
  </thead>
  <tbody v-for="(product, i) in getProducts" :key="i" >
    <tr v-if="product.Category.name == selectedCategory">
      <td scope="row">{{i+1}}.</td>
      <td><router-link class="name" :to="{name: 'detailProduct', params: {id: product.id}}">{{product.name}}</router-link></td>
      <td>{{product.price}}</td>
      <td>{{product.stock}}</td>
      <td>{{product.Category.name}}</td>
    </tr>
  </tbody>
</table>
</div>
</template>

<script>
export default {
  computed: {
    selectedCategory() {
      if (this.$route.query && this.$route.query.category) {
        return this.$route.query.category;
      }
      return null;
    },
    getProducts() {
      return this.$store.state.products;
    },
    getCategories() {
      return this.$store.state.categories;
    },
  },
};
</script>

<style scoped>
.container {
  margin-left: 9%;
}
.table {
  text-align: center;
}
table > thead > tr > th{
  border:1px solid #e79796;
}
table > tbody > tr > td{
    border:1px solid #e79796;
}
h3 {
  text-align: center;
  margin: 10px;
}
button {
  text-align: center;
}
i {
  cursor: pointer;
}
.name {
  color: black;
  cursor: pointer;
}
.name:hover{
  font-size: 110%;
  box-shadow: 20px;
  text-shadow: 200px;
  background-color: #f5cec7;
}
</style>
