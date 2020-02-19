<template>
  <div class="pt-5">
      <div class="mb-5">
        <h1 style="text-align:left;">{{$route.params.category}}</h1>
      </div>
      <b-row cols="4" class="forProductList">
          <b-col cols="3" class="mb-3" v-for="(product, i) in $store.state.displayProducts" :key="i">
              <ProductCard :productData="product"></ProductCard>
          </b-col>
      </b-row>
  </div>
</template>

<script>
import ProductCard from '../components/ProductCard'
export default {
  name: 'ProductList',
  components: {
    ProductCard
  }
}
</script>

<style scoped>
.forProductList {
  overflow-y: scroll;
  height: 64vh;
}
</style>
