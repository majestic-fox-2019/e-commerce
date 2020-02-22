<template>
  <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap
       align-items-center pt-3 pb-2 mb-3 border-bottom">
        <div class="row">
          <div class="mx-4">
          <router-link to="/admin/product" type="button"
            class="btn btn-outline-primary btn-sm">Back
          </router-link>
          </div>
          <div>
          <h1 class="h2">Detail Product</h1>
          </div>
        </div>
    </div>
    <div class="container row col-12">
      <div class="col-6">
        <b-card class="mb-2"><h1>{{product.name}}</h1></b-card>
        <b-list-group>
          <b-list-group-item><strong>Rp. {{product.price}}</strong></b-list-group-item>
          <b-list-group-item><strong>{{product.stock}}</strong></b-list-group-item>
        </b-list-group>
      </div>
      <div class="col col-6">
        <div class="container">
          <b-card>
            <img :src="product.image_url" class="w-100">
          </b-card>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'DetailProduct',
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
  },
  created() {
    this.getProduct();
  },
};
</script>

<style>

</style>
