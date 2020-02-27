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
          <h1 class="h2">Edit Product</h1>
          </div>
        </div>
    </div>
    <div class="container row col-12">
      <div class="col-6">
        <form action="" @submit.prevent="formProduct">
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text">Name</span>
                </div>
                <input type="text" aria-label="Name" class="form-control"
                v-model="product.name" :key="product.id">
            </div>
                    <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text">Image</span>
                </div>
                <input type="text" aria-label="Name" class="form-control"
                v-model="product.image_url" :key="product.id">
            </div>
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text">Price</span>
                </div>
                <input type="number" aria-label="Price" min="1" class="form-control"
                v-model="product.price" :key="product.id">
            </div>
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text">Stock</span>
                </div>
                <input type="number" aria-label="Stock" min="0" class="form-control"
                v-model="product.stock" :key="product.id">
            </div>
            <div class="input-group">
                <button type="submit" class="btn btn-primary">Submit</button>
            </div>
        </form>
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
  name: 'FormEdit',
  data() {
    return {
      product: {},
      // editProduct: {},
      ProductId: this.$route.params.id,
    };
  },
  methods: {
    // getAllProduct() {
    //   this.$store.state
    // },
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
          // console.log('masuk err');
          console.log(err);
        });
    },
    formProduct() {
      const edit = {
        name: this.product.name,
        image_url: this.product.image_url,
        price: this.product.price,
        stock: this.product.stock,
      };
      this.$axios
        .put(`/products/${this.ProductId}`, edit, {
          headers: {
            token: localStorage.getItem('token'),
          },
        })
        .then(({ data }) => {
          this.$Swal.fire(`Product ${data.name} has been update`);
        })
        .catch((err) => {
          // console.log('masuk err');
          console.log(err);
        });
    },
  },
  created() {
    this.getProduct();
  },
};
</script>

<style scoped>

.input-group{
    padding: 1%;
}
</style>
