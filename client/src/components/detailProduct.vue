<template>
<!-- eslint-disable max-len -->

<div class="container" v-if="product">
  <div class="row">
    <div class="col-sm-6">
      <div class="card">
      <h5 class="card-header">{{product.name}}</h5>
        <div class="card-body">
          <div class="image">
          <pic-zoom :url="product.image" :scale="2"></pic-zoom>
          </div>
          <h5 class="card-title">Rp. {{product.price}}</h5>
          <p class="card-text">Stock: {{product.stock}}</p>
          <button class="btn btn-warning"><i class="fas fa-edit" @click="isUpdate = true">Edit</i></button>
          <button class="btn btn-danger" @click="deleteProduct"><i class="fas fa-trash">Delete</i></button>
          <button class="btn btn-dark" @click="backToHome"><i class="fas fa-home">Back</i></button>
        </div>
      </div>
    </div>
    <div class="col-sm-6" v-if="isUpdate">
    <div class="card">
      <div class="card-body">
        <updateForm :product="this.product"></updateForm>
      </div>
    </div>
  </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import PicZoom from 'vue-piczoom';
import updateForm from './updateForm.vue';

const server = 'http://localhost:3000';

export default {
  components: {
    updateForm,
    PicZoom,
  },
  data() {
    return {
      product: null,
      isUpdate: false,
    };
  },
  mounted() {
    this.getOne();
  },
  methods: {
    getOne() {
      return axios({
        method: 'get',
        url: `${server}/products/${this.$route.params.id}`,
        headers: {
          token: localStorage.token,
        },
      })
        .then((result) => {
          this.product = result.data;
          console.log(result.data, '<<<');
        })
        .catch((err) => {
          console.log(err);
        });
    },
    backToHome() {
      return this.$router.push({ path: '/admin' });
    },
    deleteProduct() {
      return axios({
        method: 'delete',
        url: `${server}/products/${this.$route.params.id}`,
        headers: {
          token: localStorage.token,
        },
      })
        .then((result) => {
          this.product = result.data;
          this.$router.push({ path: '/admin' });
          console.log(result.data, '<<<');
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.card {
  margin-left: 5%;
  margin-top: 10px;
}
button {
  margin: 5px;
}
.image {
  height: 200px;
  width: 50%;
}
</style>
