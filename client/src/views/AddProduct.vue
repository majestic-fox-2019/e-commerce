<template>
  <div>
    <navbar></navbar>
    <div class="container border p-4 mt-5">
          <h3>Add New Product</h3>

    <form @submit.prevent="addProduct">
      <div class="form-group row">
        <label for="name" class="col-sm-2 col-form-label">Name</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="name" placeholder="name" v-model="nameAdd">
        </div>
      </div>
      <div class="form-group row">
        
      </div>
      <div class="form-group row">
        <label  class="col-sm-2 col-form-label">Price</label>
        <div class="col-sm-4">
          <input type="number" class="form-control" id="inputprice" placeholder="price" v-model="priceAdd">
        </div>
        <label  class="col-sm-2 col-form-label">Stock</label>
        <div class="col-sm-4">
          <input type="number" class="form-control" id="inputstock" placeholder="stock" v-model="stockAdd">
        </div>
      </div>
      <div class="form-group row">
        <label  class="col-sm-2 col-form-label">Category</label>
        <div class="col-sm-10">
         <select id="inputState" class="form-control" name="cars" v-model="categoryAdd">
              <option value="dry">Dry</option>
              <option value="oily">Oily</option>
              <option value="normal">Normal</option>
              <option value="combination">Combination</option>
            </select>
        </div>
      </div>
      <div class="form-group row">
        <label  class="col-sm-2 col-form-label">Image</label>
        <form  enctype="multipart/form-data">
          <input type="file" name="file" v-on:change="getImage" />
        </form>
        <div v-if="preview">
          <img :src="preview" alt="Image Preview" width="300" height="300"> 
        </div>

      </div>
      <div class="form-group row">
        <label  class="col-sm-2 col-form-label">Description</label>
        <div class="col-sm-10">
          <textarea class="form-control" id="inputdescription" rows="3" placeholder="description" v-model="descAdd"></textarea>
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import Navbar from '../components/Navbar.vue'
export default {
  name: "AddProduct",
  components: {Navbar},
  data() {
    return {
      nameAdd : null,
      stockAdd: null,
      categoryAdd: null,
      descAdd: null,
      priceAdd: null,
      imageAdd: null,
      preview: null
    }
  },
  methods:{
    addProduct(){
      const fd = new FormData()
      fd.append('name', this.nameAdd)
      fd.append('price', this.priceAdd)
      fd.append('stock', this.stockAdd)
      fd.append('image_url', this.imageAdd)
      fd.append('description', this.descAdd)
      fd.append('category', this.categoryAdd)
      axios({
        url: "http://localhost:3000/admin",
        method: "POST",
        data: fd,
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then(res => {
        console.log(res, "berhasil")
        Swal.fire({
          icon: 'success',
          title: 'Product Added!',
          showConfirmButton: false,
          timer: 1500
        })
        this.$router.push('/admin')
      })
      .catch(err => {
        console.log(err.response)
        let errMsg = `<div style="color:red;">`
        err.response.data.forEach(el => {
          errMsg += `${el}<br>`
        })
        errMsg += '</div>'
        Swal.fire({
        icon: 'error',
        title: 'Oops...',
        html: errMsg
      })
      })
    },
    getImage(e) {
      console.log(e.target.files)
      this.imageAdd = e.target.files[0]
      this.preview = URL.createObjectURL(e.target.files[0])
    }
  },
  mounted() {
    console.log("masukkkkkk")
  }
}
</script>

<style>
form {
  padding: 0;
}
</style>