<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col"></th>
          <th scope="col">name</th>
          <th scope="col">price</th>
          <th scope="col">stock</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, id) in products" :key="id">
          <th scope="row">{{product.id}}</th>
          <th><img :src="product.image_url" class="picture img-thumbnail" alt="" width= "60" height="60"></th>
          <th>{{product.name}}</th>
          <th>{{product.price}}</th>
          <th>{{product.stock}}</th>
        </tr>
      </tbody>
    </table>
    <!-- {{products}} -->
  </div>
</template>

<script>
export default {
  computed: {
    products(){
      return this.$store.state.products
    }
  },
  created(){
     this.$store.dispatch('fetchProducts')
 }
}
</script>

<style scoped>
.picture{
  
}
</style>