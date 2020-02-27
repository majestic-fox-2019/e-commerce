<template>
<div >
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap
       align-items-center pt-3 pb-2 mb-3 border-bottom">
        <div class="row">
          <div class="mx-4">
          <router-link to="/admin/product" type="button"
            class="btn btn-outline-primary btn-sm">Back
          </router-link>
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
                v-model="product.name">
            </div>
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text">Image</span>
                </div>
                <input type="text" aria-label="Name" class="form-control"
                v-model="product.image_url">
            </div>
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text">Price</span>
                </div>
                <input type="number" aria-label="Price" min="1" class="form-control"
                v-model="product.price">
            </div>
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text">Stock</span>
                </div>
                <input type="number" aria-label="Stock" min="0" class="form-control"
                v-model="product.stock">
            </div>
            <div class="input-group">
                <button type="submit" class="btn btn-primary">Submit</button>
            </div>
        </form>
      </div>
      <div class="col-6">
          <div class="container">
              <b-card>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/1/1d/No_image.svg" alt="" class="">
              </b-card>
          </div>
      </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'FormAdd',
  data() {
    return {
      product: {},
    };
  },
  methods: {
    getallProducts() {
      return this.$store.state.products;
    },
    formProduct() {
      const add = {
        name: this.product.name,
        image_url: this.product.image_url,
        price: this.product.price,
        stock: this.product.stock,
      };
      this.$axios
        .post('/products/', add, {
          headers: {
            token: localStorage.getItem('token'),
          },
        })
        .then(({ data }) => {
          this.$Swal.fire(`Product ${data.name} has been add`);
          this.$store.dispatch('getAllProduct');
          this.product = {};
        })
        .catch((err) => {
          console.log('masuk err');
          console.log(err);
        });
    },
  },
  beforeMount() {
    this.getallProducts();
  },
};
</script>

<style scoped>

.input-group{
    padding: 1%;
}
</style>
