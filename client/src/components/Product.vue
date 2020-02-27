<template>
  <div class="container mt-4  d-flex justify-content-center">
    <form @submit.prevent="submitForm" class="addForm" enctype="multipart/form-data">
      <h2>Add Product</h2><br>
      <div class="form-group">
        <label>Product Name</label>
        <input type="text" class="form-control" v-model="formData.name">
      </div>
      <div class="form-group">
        <label>Category</label>
        <select required v-model="formData[categoryId == '' ? 'categoryId' : 'no'] " >
          <option disabled :value="no" >please select the category...</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">{{category.name}}</option>
        </select>
      </div>
      <div class="form-group">
        <label>Price</label>
        <input type="number" class="form-control" v-model="formData.price">
      </div>
      <div class="form-group">
        <label>Stock</label>
        <input type="number" class="form-control" v-model="formData.stock">
      </div>
      <div class="form-group">
        <label>Image</label>
        <input type="file" class="form-control" @change="setImage($event)">
      </div>
      <button type="submit" class="btn btn-primary">Add Product</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return{
      formData: {
          name: '',
          categoryId: '',
          price: '',
          stock: '',
          image_url:'',
      },
      no: '',
      categoryId: '',
    }
  },
  computed : {
    categories() {
      return this.$store.state.categories
    }
  },
  created() {
    this.$store.dispatch('categories')
  },
  methods: {
    submitForm() {
      this.$axios({
        url: '/product/addProduct',
        method: 'post',
        headers: {token: localStorage.getItem('token')},
        data: {
          name: this.formData.name,
          CategoryId: this.formData.categoryId,
          price: this.formData.price,
          stock: this.formData.stock,
          image_url: this.formData.image_url,
        }
      })
        .then(added=>{
          console.log(added)
          this.$swal.success('product added')
        })
        .catch(error=>{
          console.log(error)
          this.$swal.error(error.response.data.error[0])
        })
    },
    setImage(event) {
      const file = event.target.files[0];
      const url = `https://storage.googleapis.com/upload/storage/v1/b/storage-example/o?name=kevin/${file.name}.png&uploadType=media&key=AIzaSyDXXhdtF6Ba2Fyd3zE3xgFfv_Hx4hxJKuI`;
      axios
       .post(
          url,
          file,
          {
            headers: {
              'Content-Type': 'image/png',
              'Cache-Control': 'no-cache',
            },
          },
        )
        .then(res => {
          this.formData.image_url = `https://storage.googleapis.com/storage-example/${res.data.name}`
        })
        .catch(error => {
          console.log(error.response)
        });
    }
  }
}
</script>

<style>
.addForm{
  margin-bottom: 20px;
  width: 300px;
  text-align: center;
}
</style>