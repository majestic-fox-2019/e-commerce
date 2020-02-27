<template>
  <div>
    <Navbar></Navbar>
    <!-- Content -->
    <div class="container">
      <div class="row row-cols-1 row-cols-md-3">
        <div class="col mb-4">
          <div class="card h-100">
            <!-- <img src="..." class="card-img-top" alt="..." /> -->
            <img :src="product.image_url" class="w-100 h-100"/>
          </div>
        </div>
        <div class="col mb-4">
          <div class="card h-100">
            <div class="card-body d-flex flex-column
             bd-highlight mb-3 align-items-sm-left">
                <div class="p-2 bd-highlight ">
                    <h1 class="card-title">{{product.name}}</h1>
                    <!-- <h4 class="card-title">{{product.CategoryId}}</h4> -->
                </div>
                <div class="">
                  <b-card>
                    <dt class="row text-left">
                      <div class="col-2">Price</div>
                      <div class="col-10">{{formatPrice(product.price)}}</div>
                    </dt>
                  </b-card>
                  <b-card>
                    <dt class="row text-left">
                      <div class="col-2">Stock</div>
                      <div class="col-10">{{product.stock}}</div>
                    </dt>
                  </b-card>
                  <b-card>
                    <p class="row text-left">
                      {{product.description}}
                    </p>
                  </b-card>
                </div>
              <div class="mt-auto p-2 bd-highlight">
                <button type="button" class="btn btn-primary">Add Cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'DetailProduct',
  components: {
    Navbar,
  },
  data() {
    return {
      product: {},
      ProductId: this.$route.params.id,
    };
  },
  methods: {
    getProduct() {
      this.$axios
        .get(`/products/${this.ProductId}`, {
          headers: {
            token: localStorage.getItem('token'),
          },
        })
        .then(({ data }) => {
          this.product = data;
        })
        .catch((err) => {
          console.log('masuk err');
          console.log(err);
        });
    },
    formatPrice(value) {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
    },
  },
  created() {
    this.getProduct();
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
  flex: 0 0 50%;
  max-width: 500vh;
  height: 70vh;
}
.container{
    margin: 5%
}
</style>
