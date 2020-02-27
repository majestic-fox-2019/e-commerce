<template>
  <div class="container mt-5">
    <h3 class="font-weight-bold text-left">Product List</h3>

    <div class="text-left">
      <div class="btn-group" role="group" v-if="Array.isArray(categories)">
        <button type="button" class="btn btn-secondary">All Product</button>
        <button
          v-for="category in categories"
          :key="category.id"
          type="button"
          class="btn btn-secondary"
        >{{category.name}}</button>
      </div>
    </div>

    <div class="text-right mb-4">
      <button @click="$router.push({name: 'add_product'})" class="btn btn-light font-weight-bold">
        <i :class="'fa fa-plus mr-2'"></i>
        ADD
      </button>
    </div>
    <router-view @success="$store.dispatch('getProducts')"></router-view>
  </div>
</template>

<script>
import UpdateProductForm from "../components/UpdateProductForm";
import api from "../helper/api";
export default {
  components: {
    UpdateProductForm
  },
  data() {
    return {
      isAddData: false,
      isUpdateData: false,
      product: null
    };
  },
  methods: {
    gotoAddForm() {
      this.isAddData = !this.isAddData;
      if (!this.isAddData) {
        this.$router.push("/product");
      } else {
        this.$router.push({ name: "AddProduct" });
      }
    },
    update(params) {
      this.isUpdateData = !this.isUpdateData;
      this.product = params;
    },
    goToUpdateForm(product) {
      this.isAddData = !this.isAddData;
      if (!this.isAddData) {
        this.$router.push("/product");
      } else {
        this.$router.push({
          name: "UpdateProduct",
          params: { id: product.id },
          query: {
            name: product.name,
            price: product.price,
            stock: product.stock,
            img: product.img_url
          }
        });
      }
    },
    deleteProduct(product) {
      swal
        .fire(
          "Confirmation",
          "Are you sure you want to delete this category?",
          "question"
        )
        .then(result => {
          if (result.value) {
            api
              .delete(`/products/${product.id}`, {
                headers: { token: localStorage.access_token }
              })
              .then(({ data }) => {
                swal.fire("Error", data.message, "success");
                this.$store.dispatch("getProducts");
              })
              .catch(err => {
                swal.fire("Error", err.response.message, "warning");
              });
          }
        });
    }
  },
  mounted() {},
  computed: {
    categories() {
      return this.$store.state.categories;
    }
  }
};
</script>

<style>
</style>
