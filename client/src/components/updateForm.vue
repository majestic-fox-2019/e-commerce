<template>
  <!-- eslint-disable max-len -->

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
      <label for="image">Stock</label>
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
</template>

<script>
export default {
  props: ["product"],
  data() {
    return {
      formUpdate: {
        name: this.product.name,
        image: this.product.image,
        price: this.product.price,
        stock: this.product.stock,
        CategoryId: this.product.CategoryId
      }
    };
  },
  methods: {
    getCategories() {
      return this.$store.state.categories;
    },
    updateProduct() {
      return this.$axios({
        method: "put",
        url: `${this.$server}/products/${this.$route.params.id}`,
        headers: {
          token: localStorage.token
        },
        data: this.formUpdate
      })
        .then(result => {
          this.$swal.fire({
            icon: "success",
            title: `Successfully update ${result.data.name}!`,
            showConfirmButton: false,
            timer: 1500
          });
          this.$router.push({ path: "/admin" });
        })
        .catch(err => {
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
