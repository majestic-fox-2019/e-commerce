<template>
    <div class="col-12 col-sm-8 col-md-6 col-lg-4 mt-4">
      <div class="card border shadow text-left">
        <img class="card-img" :src="cart.Product.image_url" alt="Vans">
        <div class="card-body">
          <h4 class="card-title">{{cart.Product.name}}</h4>
          <h6 class="card-subtitle mb-2 text-muted">Category: {{cart.Product.category}}</h6>
          <p class="card-text">Qty : {{cart.qty}}</p>
          <p class="card-text">Price : {{cart.Product.price | toIdr}}</p>
          <h6 class="card-subtitle mb-2 text-muted">{{cart.createdAt | toDate }} -- {{cart.createdAt | fromNow }}</h6>
          <div class="buy d-flex justify-content-between align-items-center">
            <div class="price text-success"><h5 class="mt-4">{{cart.totalPrice | toIdr}}</h5></div>
             <button @click="checkout(cart.id)" class="btn mt-3 text-white" style="background-color : #581E58;"><i class="fa fa-shopping-cart"></i> Checkout</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import moment from 'moment'

export default {
  name : 'CartCard',
  props : ["cart"],
  filters : {
      toIdr(price){
          return price.toLocaleString('en-US', { style: 'currency', currency: 'IDR' })
      },
      toDate(date){
          return moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a")
      },        
      fromNow(date){
          return moment(date).fromNow()
      }              
  },
  methods : {
    checkout(id){
      this.$store.dispatch('checkout', id)
    }
  }
}
</script>

<style scoped>

</style>