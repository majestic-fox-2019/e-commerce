<template>
  <div class="container" v-if="product">
  <div class="card">
  <h5 class="card-header">{{product.name}}</h5>
  <div class="card-body">
    <img :src="product.image" alt="">
    <h5 class="card-title">Rp. {{product.price}}</h5>
    <p class="card-text">Stock: {{product.stock}}</p>
    <button class="btn btn-warning"><i class="fas fa-edit">Edit</i></button>
    <button class="btn btn-danger"><i class="fas fa-trash">Delete</i></button>
    <button class="btn btn-dark"><i class="fas fa-home">Home</i></button>
  </div>
</div>
</div>
</template>

<script>
export default {

};
</script>

<style>

</style>
