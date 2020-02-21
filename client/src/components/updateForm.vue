<template>
<!-- eslint-disable max-len -->

  <form v-on:submit.prevent="updateProduct">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" v-model="formUpdate.name">
      </div>
      <div class="form-group">
        <label for="image">Image</label>
        <input type="text" class="form-control" v-model="formUpdate.image">
      </div>
      <div class="form-group">
        <label for="image">Price</label>
        <input type="text" class="form-control" v-model="formUpdate.price">
      </div>
      <div class="form-group">
        <label for="image">Stock</label>
        <input type="text" class="form-control" v-model="formUpdate.stock">
      </div>
    <div class="form-group">
      <label for="exampleFormControlSelect1">Category</label>
      <select class="form-control" v-model="formUpdate.CategoryId" >
            <option v-for="(category, i) in getCategories()" :key="i" :value=category.id>{{category.name}}</option>
          </select>
    </div>
      <button type="submit" class="btn btn-outline-success">Submit</button>
    </form>
</template>

<script>
import axios from 'axios';

const server = 'http://localhost:3000';

export default {
  props: ['product'],
  data() {
    return {
      formUpdate: {
        name: this.product.name,
        image: this.product.image,
        price: this.product.price,
        stock: this.product.stock,
        CategoryId: this.product.CategoryId,
      },
    };
  },
  methods: {
    getCategories() {
      console.log();
      return this.$store.state.categories;
    },
    updateProduct() {
      return axios({
        method: 'put',
        url: `${server}/products/${this.$route.params.id}`,
        headers: {
          token: localStorage.token,
        },
        data: this.formUpdate,
      })
        .then((result) => {
          console.log(result.data, '<<< update data');
          this.$router.push({ path: '/admin' });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>


</style>
