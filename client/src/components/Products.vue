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
          <th scope="col">action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, id) in products" :key="id">
          <th scope="row">{{product.id}}</th>
          <th><img :src="product.image_url" class="picture img-thumbnail" alt="" width= "50" height="50"></th>
          <th>{{product.name}}</th>
          <th>{{product.price}}</th>
          <th>{{product.stock}}</th>
          <th><router-link :to="`/detail/${product.id}`">Detail</router-link> <b-btn variant="danger">Delete</b-btn></th>
        </tr>
      </tbody>
    </table>
    <!-- {{products}} -->
    <router-view/>
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