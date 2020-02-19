<template>
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
      <select class="form-control" v-model="formUpdate.CategoryId">
        <option value="1">Face</option>
        <option value="2">Lips</option>
        <option value="3">Eye</option>
        <option value="4">Brows</option>
      </select>
    </div>
      <button type="submit" class="btn btn-primary">Submit</button>
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

<style>

</style>
