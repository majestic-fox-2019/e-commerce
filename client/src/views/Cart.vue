<template>
  <div class="container store">
      <div class="row product-list">
        <CartCard v-for="(cart,i) in carts" :key=i :cart="cart"></CartCard>
      </div>
  </div>
</template>

<script>
import CartCard from '../components/CartCard' 
export default {
  components : {
      CartCard,
  },
  computed : {
    carts(){
      return this.$store.state.carts
    }
  },
  created(){
    this.$store.dispatch('getCarts')
  },
}
</script>

<style>

</style>