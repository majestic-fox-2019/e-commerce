<template>
  <!-- eslint-disable max-len -->
  <div>
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

    <form v-on:submit.prevent="updateProduct">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" v-model="formUpdate.name" />
      </div>
      <div class="form-group">
        <label for="image">Image</label>
        <input type="text" class="form-control" v-model="formUpdate.image" />
      </div>
      <div class="form-group">
        <label for="image">Price</label>
        <input type="text" class="form-control" v-model="formUpdate.price" />
      </div>
      <div class="form-group">
        <label for="image">Stock {{formUpdate.stock}}</label>
        <input type="text" class="form-control" v-model="formUpdate.stock" />
      </div>
      <div class="form-group">
        <label for="exampleFormControlSelect1">Category</label>
        <select class="form-control" v-model="formUpdate.CategoryId">
          <option
            v-for="(category, i) in getCategories()"
            :key="i"
            :value="category.id"
          >{{category.name}}</option>
        </select>
      </div>
      <button type="submit" class="btn btn-outline-success">Submit</button>
    </form>
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  props: ["product"],
  components: {
    Loading
  },
  data() {
    return {
      formUpdate: {
        name: this.product.name,
        image: this.product.image,
        price: this.product.price,
        stock: this.product.stock,
        CategoryId: this.product.CategoryId
      },
      isLoading: false
    };
  },
  methods: {
    getCategories() {
      return this.$store.state.categories;
    },
    updateProduct() {
      this.isLoading = true;
      return this.$axios({
        method: "put",
        url: `${this.$server}/products/${this.$route.params.id}`,
        headers: {
          token: localStorage.token
        },
        data: this.formUpdate
      })
        .then(result => {
          this.isLoading = false;
          this.$swal.fire({
            icon: "success",
            title: `Successfully update ${result.data.name}!`,
            showConfirmButton: false,
            timer: 1500
          });
          this.$router.push({ path: "/admin" });
        })
        .catch(err => {
          this.isLoading = false;
          this.$swal.fire({
            title: "We're sorry",
            text: err.response.data,
            icon: "question",
            showConfirmButton: false,
            timer: 1500
          });
        });
    }
  }
};
</script>

<style scoped>
</style>
