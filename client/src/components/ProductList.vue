<template>
  <div class="admin-list">
    <table class="table">
      <thead class="thead-light">
        <tr>
          <th scope="col">No</th>
          <th scope="col">Image</th>
          <th scope="col">Name</th>
          <th scope="col">Price</th>
          <th scope="col">Amount</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(cart, idx) in listProducts()" :key="idx">
          <th scope="row">{{idx + 1}}</th>
          <td><img :src="`${cart.image_url}`" style="width: 20vw; height: 15vw"></td>
          <td>{{cart.name}}</td>
          <td>{{cart.price}}</td>
          <td>1</td>
          <td href="">Delete</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ProductList',
  methods: {
    listProducts() {
      return this.$store.getters.getListProducts;
    },
  },
};
</script>

<style scoped>

</style>