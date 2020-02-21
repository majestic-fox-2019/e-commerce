<template>
<!-- eslint-disable max-len -->
<div class= container>
   <h3><i class="fas fa-plus" data-toggle="modal" data-target="#addProduct"></i>PRODUCTS</h3>
  <table class="table">
  <thead>
    <tr>
      <th scope="col">No.</th>
      <th scope="col">Name</th>
      <th scope="col">Price</th>
      <th scope="col">Stock</th>
      <th scope="col">Category</th>
    </tr>
  </thead>
  <tbody v-for="(product, i) in getProducts()" :key="i">
    <tr>
      <th scope="row">{{i+1}}</th>
      <td><router-link class="name" :to="{name: 'detailProduct', params: {id: product.id}}">{{product.name}}</router-link></td>
      <td>{{product.price}}</td>
      <td>{{product.stock}}</td>
      <td>{{product.Category.name}}</td>
    </tr>
  </tbody>
</table>
<!-- Modal -->
<div class="modal fade" id="addProduct" tabindex="-1" role="dialog" aria-labelledby="addProductLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="addProductLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form v-on:submit.prevent="addProduct">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" class="form-control" v-model="formAdd.name">
          </div>
          <div class="form-group">
            <label for="image">Image</label>
            <input type="text" class="form-control" v-model="formAdd.image">
          </div>
          <div class="form-group">
            <label for="image">Price</label>
            <input type="text" class="form-control" v-model="formAdd.price">
          </div>
          <div class="form-group">
            <label for="image">Stock</label>
            <input type="text" class="form-control" v-model="formAdd.stock">
          </div>
        <div class="form-group">
          <label for="exampleFormControlSelect1">Category</label>
          <select class="form-control" v-model="formAdd.CategoryId" >
            <option v-for="(category, i) in getCategories()" :key="i" :value=category.id>{{category.name}}</option>
          </select>
        </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </div>
</div>
</div>
</template>

<script>
import axios from 'axios';

const server = 'http://localhost:3000';

export default {
  data() {
    return {
      allproducts: null,
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
  },
  mounted() {
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
    addProduct() {
      console.log(this.formAdd, '< ini formnya');
      axios({
        method: 'post',
        url: `${server}/products`,
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
          console.log(result);
          window.$('#addProduct').modal('hide');
          this.$store.dispatch('allProducts');
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.container {
  margin-left: 9%;
}
.table {
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
  color: black;
  cursor: pointer;
}
.name:hover{
  font-size: 105%;
  box-shadow: 20px;
  text-shadow: 200px;
  background-color: #f5cec7;
}
</style>
