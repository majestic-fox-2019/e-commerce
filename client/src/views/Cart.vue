<template>
  <div>
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
    <tr v-for="(cart, idx) in carts" :key="idx">
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
  name: 'Cart',
  data() {
    return {
      carts: null,
    };
  },
  methods: {
    listCart() {
      this.$axios.get('/carts', { headers: { token: localStorage.token } })
        .then((cart) => {
          this.carts = cart.data;
        })
        .catch((err) => {
          console.log(err, 'masuk');
        });
    },
  },
  created() {
    this.listCart();
  },
};
</script>

<style>

</style>
