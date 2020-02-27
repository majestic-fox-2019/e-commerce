<template>
  <div>
    <!-- Banner -->
    <div class="pricing-header px-3 py-3 pt-md-3 pb-md-4 mx-auto text-center">
      <Banner/>
    </div>
    <!-- Content -->
    <div class="container">
      <div class="row row-cols-1 row-cols-md-3">
        <div class="col mb-4" v-for="(product) in $store.state.products" :key="product.id">
          <div class="card h-100">
            <!-- <img src="..." class="card-img-top" alt="..." /> -->
            <img :src="product.image_url" class="w-100"/>
            <div class="card-body">
              <div>
                <div>
                  <h5 class="card-title">
                  <router-link :to="`/detail_product/${product.id}`">
                  {{product.name}}</router-link></h5>
                </div>
                <div class="row">
                  <div class="col-4">
                    <dt>Price</dt>
                  </div>
                  <div class="col-8 text-left">
                    <div>
                    {{formatPrice(product.price)}}
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-3">
                <button @click.prevent="addToCart(product.id)"
                type="button" class="btn btn-primary">Add Cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Banner from './Banner.vue';

export default {
  name: 'Content',
  components: {
    Banner,
  },
  methods: {
    formatPrice(value) {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
    },
    addToCart(id) {
      console.log('mask add t cat');
      const data = { ProductId: id };
      this.$axios
        .post('/carts', data, {
          headers: {
            token: localStorage.getItem('token'),
          },
        })
        .then(() => {
          this.$store.dispatch('getAllCarts');
        })
        .catch((err) => {
          console.log('masuk err');
          console.log(err);
        });
    },
  },
  // computed: {
  // allProducts() {
  //   // console.log(this.$store.state.products, '+++++++++++++');
  //   return this.$store.state.products;
  // },
  // },
  created() {
    this.$store.dispatch('getAllProduct');
  },
};
</script>

<style scoped>
.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}
html {
  font-size: 14px;
}
@media (min-width: 768px) {
  html {
    font-size: 16px;
  }
}
.mb-4{
  flex: 0 0 25%;
  max-width: 25%;
}

</style>
