<template>
      <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4" >
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap
       align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Product list</h1>
        <div class="btn-toolbar mb-2 mb-md-0">
        </div>
      </div>
      <div class="table-responsive">
        <table class="table table-striped table-sm">
          <thead>
            <tr>
              <th>No</th>
              <th>Image</th>
              <th>Name</th>
              <th>price</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, idx) in allProducts" :key="product.id">
              <td>{{idx+1}}</td>
              <td><img :src="product.image_url" :alt="product.name" class="img-thumbnail img"></td>
              <td>{{product.name}}</td>
              <td>{{product.price}}</td>
              <td>{{product.stock}}</td>
              <td>
                <router-link :to="`/admin/productdetail/${product.id}`" type="button"
                 class="btn btn-outline-dark">Show</router-link>
                <router-link :to="`/admin/editproduct/${product.id}`" type="button"
                 class="btn btn-outline-warning">Edit</router-link>
                <button type="button" class="btn btn-outline-danger"
                 @click.prevent="deleteProduct(product)" :key="product.id">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
</template>

<script>
export default {
  name: 'AllProduct',
  computed: {
    allProducts() {
      // console.log(this.$store.state.products, '=================');
      return this.$store.state.products;
    },
  },
  created() {
    this.$store.dispatch('getAllProduct');
  },
  methods: {
    deleteProduct(product) {
      this.$Swal.fire({
        title: 'Are you sure?',
        text: 'Are you sure you want to remove product from cart?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      })
        .then((result) => {
          if (result.value) {
            this.$axios
              .delete(`/products/${product.id}`, { headers: { token: localStorage.getItem('token') } })
              .then(() => {
                this.$Swal.fire(
                  'Deleted!',
                  'Product in cart has been deleted.',
                  'success',
                );
                this.$store.dispatch('getAllProduct');
              })
              .catch((err) => {
                this.$Swal.fire(
                  'Deleted!',
                  `${err}.`,
                  'error',
                );
              });
          }
        });
    },
  },
};
</script>

<style scoped>
.btn {
  margin: 1%
}
.img {
  width: 5vw;
}
</style>
