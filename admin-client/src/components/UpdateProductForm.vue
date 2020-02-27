<template>
  <div class="col-md-8 text-left shadow-lg text-white rounded p-5 mb-5">
    <h2 class="font-weight-bold mb-4">Update Product</h2>
    <hr />
    <form @submit.prevent="putProduct">
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">Name</span>
        </div>
        <input type="text" class="form-control" v-model="product.name" />
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">Stock</span>
        </div>
        <input v-model="product.stock" type="number" class="form-control" />
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">Price</span>
        </div>
        <input type="number" v-model="product.price" class="form-control" />
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text" for="inputGroupSelect01">Options</label>
        </div>
        <select class="custom-select" @change="onChange">
          <option selected>Choose...</option>
          <option
            v-for="category in categories"
            :key="category.id"
          >{{category.name}}</option>
        </select>
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">Image Url</span>
        </div>
        <input v-model="product.img_url" type="text" class="form-control" id="img" />
      </div>

      <div class="text-center">
        <button type="button" class="btn btn-primary mx-4 font-weight-bold mt-4" @click="$router.push('/product')">Cancel</button>
        <button type="submit" class="btn btn-primary mx-4 font-weight-bold mt-4">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
import api from "../helper/api";
import swal from "sweetalert2";
export default {
  data() {
    return {
      product: null,
      categoryId: null
    };
  },
  methods: {
    putProduct() {
      const value = {
        name: this.name,
        price: this.price,
        img_url: this.img_url,
        stock: this.stock,
        categoryId: this.categoryId
      };
      api
        .put(`/products/${this.product.id}`, value)
        .then(({ data }) => {
          this.$emit("success");
          swal.fire("Success", data.message, "success");
        })
        .catch(err => {
          swal.fire("Error", err.response.data.message, "warning");
        });
    },
    onChange(e) {
      this.categoryId = e.target.value;
    }
  },
  created() {
    this.product = this.products.filter(item => {
      return item.id === this.$route.params.id;
    })[0];
  },
  computed: {
    categories() {
      return this.$store.state.categories;
    },
    products() {
      return this.$store.state.products;
    }
  }
};
</script>
