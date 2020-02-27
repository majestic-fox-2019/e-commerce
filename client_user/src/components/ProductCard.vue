<template>
  <div>
    <div v-if="products.length > 0" class="row">
    <div :key="i" v-for="(product, i) in products" class="card mx-1 my-2">
      <img :src="product.image_url" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title"><i class="fa fa-tag" aria-hidden="true"></i> {{ product.name }}</h5>
        <p class="card-text"><i class="fa fa-money" aria-hidden="true"></i> {{ product.price }}</p>
        <p :class="`card-text ${product.stock > 0 ? 'text-info' : 'text-danger'}`"><b><i class="fa fa-exclamation-circle" aria-hidden="true"></i> {{ product.stock > 0 ? product.stock + ' item' : 'Out of stock' }} </b></p>
          <a href="#" @click.prevent="addCart(product.id)" v-if="product.stock > 0" class="btn btn-warning btn-sm"><i class="fa fa-cart-plus mb-1" aria-hidden="true"></i> Add Cart</a>&nbsp;
          <router-link :to="{ name: 'DetailProduct', params : { product_id: product.id } }" class="btn btn-info btn-sm"><i class="fa fa-arrow-circle-right mb-1" aria-hidden="true"></i> Detail Products</router-link>
      </div>
    </div>  
    </div>
    <div v-else>
        <h2 class="text-center text-danger">Product is Empty!</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: ['products'],
  data(){
    return {

    }
  },
  computed: {
    userId: function(){
      return this.$store.state.userId
    },
    token: function(){
      return this.$store.state.isLoggedIn
    }
  },
  methods: {
    addCart(product_id){
      const value = {
        qty: 1,
      }
      this.$axios({
        headers: {
          token: this.token
        },
        method: 'post',
        url: `/transaction/${this.userId}/${product_id}`,
        data: value
      })
      .then(response => {
        this.$parent.getTransaction()
        this.$toast.fire({
          icon: 'success',
          title: response.data.message
        })
      })
      .catch(err => {
        this.$swal.fire({
          icon: 'error',
          title: 'Oops..',
          text: err.response.data,
          showCloseButton: true,
        })
        this.$router.push({ name: 'Auth' })
      })
    }
  }
}
</script>

<style scoped>
  .card{
    width: 16.5rem;
  }
  .card-title{
    font-size: 14px;
  }
  .card-text{
    font-size: 14px;
  }
  .card-body{
    padding: 10px 10px;
  }
  img{
    height: 150px;
  }
</style>