<template>
    <div class="col-12 col-sm-8 col-md-6 col-lg-4 mt-4">
      <div class="card border shadow text-left">
        <img class="card-img" :src="product.image_url" alt="Vans">
        <div class="card-body">
          <h4 class="card-title">{{product.name}}</h4>
          <h6 class="card-subtitle mb-2 text-muted">Category: {{product.category}}</h6>
          <p class="card-text">Stock : {{product.stock}}</p>
          <div class="buy d-flex justify-content-between align-items-center">
            <div class="price text-success"><h5 class="mt-4">{{product.price | toIdr}}</h5></div>
             <button @click="addToCart(product.id)" class="btn mt-3 text-white" style="background-color : #581E58;"><i class="fa fa-shopping-cart"></i> Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name : 'ProductCard',
  props : ["product"],
  filters : {
      toIdr(price){
          return price.toLocaleString('en-US', { style: 'currency', currency: 'IDR' })
      }        
  },
  methods : {
    addToCart(id){
      this.$store.dispatch('addToCart', id)
    }
  }
}
</script>

<style scoped>

</style>