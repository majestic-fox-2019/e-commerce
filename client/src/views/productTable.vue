<template>
  <!-- eslint-disable max-len -->
  <div class="container">
    <div class="vld-parent">
      <loading
        :active.sync="isLoading"
        :can-cancel="true"
        :is-full-page="true"
        :color="'#d47a90'"
        :loader="'dots'"
        :width="100"
      ></loading>
    </div>
    <h3>ALL PRODUCTS</h3>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Product</th>
          <th scope="col" class="center">Price</th>
          <th scope="col" class="center">Stock</th>
          <th scope="col" class="center">Category</th>
        </tr>
      </thead>
      <tbody v-for="(product, i) in getProducts()" :key="i">
        <tr>
          <th scope="row">
            <img :src="product.image" class="mr-3" />
            <router-link
              class="name"
              :to="{name: 'detailProduct', params: {id: product.id}}"
            >{{product.name}}</router-link>
          </th>
          <td>{{product.price}}</td>
          <td>{{product.stock}}</td>
          <td>{{product.Category ? product.Category.name : 'no category'}}</td>
        </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <div
      class="modal fade"
      id="addProduct"
      tabindex="-1"
      role="dialog"
      aria-labelledby="addProductLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addProductLabel">Add New Product</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="clearForm()"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form v-on:submit.prevent="addProduct">
              <div class="form-group">
                <label for="name">Name</label>
                <input type="text" class="form-control" v-model="formAdd.name" />
              </div>
              <div class="form-group">
                <label for="image">Image</label>
                <input type="text" class="form-control" v-model="formAdd.image" />
              </div>
              <div class="form-group">
                <label for="image">Price</label>
                <input type="text" class="form-control" v-model="formAdd.price" />
              </div>
              <div class="form-group">
                <label for="image">Stock</label>
                <input type="text" class="form-control" v-model="formAdd.stock" />
              </div>
              <div class="form-group">
                <label for="exampleFormControlSelect1">Category</label>
                <select class="form-control" v-model="formAdd.CategoryId">
                  <option
                    v-for="(category, i) in getCategories()"
                    :key="i"
                    :value="category.id"
                  >{{category.name}}</option>
                </select>
              </div>
              <button type="submit" class="btn btn-outline-danger btn-sm">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  components: {
    Loading,
  },
  data() {
    return {
      allproducts: null,
      isLoading: false,
      formAdd: {
        name: null,
        image: null,
        price: null,
        stock: null,
        CategoryId: null,
      },
    };
  },
  created() {
    this.$store.dispatch('allProducts');
    this.$store.dispatch('allCategories');
  },
  methods: {
    getProducts() {
      return this.$store.state.products;
    },
    getCategories() {
      console.log();
      return this.$store.state.categories;
    },
    clearForm() {
      this.formAdd.name = null;
      this.formAdd.image = null;
      this.formAdd.price = null;
      this.formAdd.stock = null;
      this.formAdd.CategoryId = null;
    },
    addProduct() {
      this.isLoading = true;
      this.$axios({
        method: 'post',
        url: `${this.$server}/products`,
        headers: {
          token: localStorage.token,
        },
        data: {
          name: this.formAdd.name,
          image: this.formAdd.image,
          price: this.formAdd.price,
          stock: this.formAdd.stock,
          CategoryId: this.formAdd.CategoryId,
        },
      })
        .then((result) => {
          this.isLoading = false;
          window.$('#addProduct').modal('hide');
          this.$swal.fire({
            icon: 'success',
            title: `Successfully added ${result.data.name}!`,
            showConfirmButton: false,
            timer: 1500,
          });
          this.clearForm();
          this.$store.dispatch('allProducts');
        })
        .catch((err) => {
          this.isLoading = false;
          this.$swal.fire({
            icon: 'error',
            title: err.response.data,
            showConfirmButton: false,
            timer: 1500,
          });
        });
    },
  },
};
</script>

<style scoped>
.mr-3 {
  height: 50px;
}
.container {
  margin-left: 9%;
}
.center {
  text-align: center;
}
td {
  text-align: center;
}
h3 {
  text-align: center;
  margin: 10px;
}
button {
  text-align: center;
}
i {
  cursor: pointer;
}
.name {
  text-align: left;
  color: black;
  cursor: pointer;
}
.name:hover {
  box-shadow: 20px;
  text-shadow: 200px;
  background-color: #f5cec7;
}
</style>
