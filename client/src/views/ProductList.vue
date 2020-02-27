<template>
  <div class="pt-5">
      <div class="mb-5">
        <h1 style="text-align:left;">{{$route.params.category}}</h1>
      </div>
      <b-row v-if="!$store.state.loading.productCard" cols="4" class="forProductList">
          <b-col cols="3" class="mb-3" v-for="(product, i) in $store.state.displayProducts" :key="i">
              <ProductCard :productData="product"></ProductCard>
          </b-col>
      </b-row>
      <b-row cols="4" v-if="$store.state.loading.productCard" class="forProductList">
        <b-col cols="3" class="mb-3" v-for="i in 4" :key="i">
          <div class="cardLoader blink"></div>
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
.cardLoader {
  height: 30vh;
  border-radius: 15px;
  width: 100%;
  background: #909090;
}
.forProductList {
  overflow-y: scroll;
  height: 64vh;
}
</style>
