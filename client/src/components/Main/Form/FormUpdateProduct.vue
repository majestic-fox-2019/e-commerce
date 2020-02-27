<template>
  <div class="container-fluid">
    <div>
      <Toaster :toaster="toaster" />
    </div>
    <Title msg="Form Add Product"/>
    <div class="col-md-12">
      <div class="modal-body">
        <form @submit.prevent="updateProduct" enctype="multipart/form-data">
          <div class="row">
            <div class="form-group col-md-6">
              <label for="exampleInputEmail1">Product Name</label>
              <input type="text" v-model="form.name" :class="`form-control ${error.errorClass.name}`" placeholder="Put the product name">
              <span class="invalid-feedback">{{ error.errorMessage.name }}</span>
            </div>
            <div class="form-group col-md-6">
              <label for="exampleInputPassword1">Price</label>
              <input type="number" v-model="form.price" :class="`form-control ${error.errorClass.price}`" placeholder="Put the price">
              <span class="invalid-feedback">{{ error.errorMessage.price }}</span>
            </div>
          </div>
          <div class="row">
            <div class="form-group col-md-6">
              <label for="exampleInputEmail1">Stock</label>
              <input type="number" v-model="form.stock" :class="`form-control ${error.errorClass.stock}`" placeholder="Put the stock">
              <span class="invalid-feedback">{{ error.errorMessage.stock }}</span>
            </div>
            <div class="form-group col-md-6">
              <label for="exampleInputPassword1">Category</label>
              <select :class="`form-control ${error.errorClass.CategoryId}`" v-model="form.CategoryId">
                  <option value="">Choose Category</option>
                  <option :key="category.id" v-for="category in dataCategory" :value="category.id">{{ category.category_name }}</option>
              </select>
                <span class="invalid-feedback">{{ error.errorMessage.CategoryId }}</span>
            </div>
          </div>
          <div class="row">
            <div class="form-group col-md-6">
              <label for="exampleInputPassword1">Description</label>
              <textarea row="5" v-model="form.description" :class="`form-control ${error.errorClass.description}`" placeholder="Put the description"></textarea>
              <span class="invalid-feedback">{{ error.errorMessage.description }}</span>
            </div>
            <div class="form-group col-md-6">
              <label for="exampleInputPassword1">Image</label><br>
              <input @change="getImage" type="file"><br>
              <small v-if="imageWrongFormat != null" class="text-danger"><b>*{{ imageWrongFormat }}</b></small>
              <div class="col-md-3 mt-2 bg-light" style="height: 120px;">
                <img :src="currentImage" width="100%" height="100%" />
              </div>
            </div>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>&nbsp;
          <button @click="$router.go(-1)" type="button" class="btn btn-danger">Back</button>
        </form>
      </div>
    </div>
  </div> 
</template>

<script>
import Title from '../../Title'
import axios from 'axios'
import Toaster from '../../Toaster'

export default {
  name : 'FormAddProduct',
  components : {
    Title,
    Toaster
  },
  data() {
    return {
      toaster : null,
      errorLoadData: null,
      form : {
        name : '',
        image : '',
        image_url : '',
        image_type : '',
        price : '',
        stock : '',
        CategoryId : '',
        description : '',
      },
      error : {
        status : false,
        errorMessage : {
          name : '',
          price : '',
          stock : '',
          CategoryId : '',
          description : '',
        },
        errorClass : {
          name : '',
          price : '',
          stock : '',
          CategoryId : '',
          description : '',
        }
      },
      currentImage : '',
      imageWrongFormat : null,
      imageStatus : ''
    }
  },
  created(){
    this.getCategory()
    this.getProductById()
  },
  computed:{
    dataCategory(){
      return this.$store.state.listCategory
    }
  },
  methods : {
    getCategory(){
      this.$store.dispatch('getCategory')
    },
    getProductById(){
      this.$axios.get(`/products/detail/${this.$route.params.product_id}`, {
        headers : {
          token : localStorage.token
        }
      })
      .then(response => {
        this.form.name = response.data.name
        this.currentImage = response.data.image_url
        this.form.price = response.data.price
        this.form.stock = response.data.stock
        this.form.CategoryId = response.data.CategoryId
        this.form.description = response.data.description
      })
      .catch(err => {
        this.errorLoadData = err
      })
    },
    updateProduct(){
      let imageTitle = Date.now().toString()
      if(this.form.image !== ''){
        this.form.image_url = `https://storage.googleapis.com/disekrip/product/${imageTitle}.png`

        axios({
          headers : {
            'Content-Type' : 'image/png'
          },
          method : 'post',
          url : `https://storage.googleapis.com/upload/storage/v1/b/disekrip/o?name=product/${imageTitle}.png&uploadType=media&key=AIzaSyCOIgGP3XatX7gfeEG__KhYWw1mWemXlYs`,
          data : this.form.image
        })
        .then(response => {
          this.imageStatus = response.data
          // this.form.image_url = `https://storage.googleapis.com/storage-example/arona/${imageTitle}.png`
        })
        .catch(err => {
          this.imageStatus = err.data
        })
      }
            
      const value = {
        name : this.form.name,
        image_url : this.form.image_url === '' ? this.currentImage : this.form.image_url,
        price : this.form.price,
        stock : this.form.stock,
        CategoryId : this.form.CategoryId,
        description : this.form.description,
      }

      this.$axios({
        headers : {
          token : localStorage.token,
        },
        method : 'put',
        url : `products/admin/${this.$route.params.product_id}`,
        data : value
      })
      .then(response => {
        this.toaster = 'Success update products ' + response.data.name
        this.clearValidation(this.error.errorClass)
        this.clearField(this.form)
      })
      .catch(err => {
        this.error.status = true
        this.error.errorMessage = err.response.data
        this.showError(this.form, this.error)
      })
    },
    getImage(e){
      if(e.target.files[0].type == 'image/png'){
        this.form.image = e.target.files[0]
        this.form.image_type = e.target.files[0].type
        this.imageWrongFormat = null
      }else{
        this.imageWrongFormat = 'Image format must be png'        
      } 
    },
    showError : function(errorObject, state){
      for(let key in errorObject){
        if(errorObject[key] === ''){
          state.errorClass[key] = 'is-invalid'
        }
      }
    },
    clearValidation : function(objectValidation){
      for(let key in objectValidation){
        objectValidation[key] = ''
      }
    }
  }
}
</script>

<style>

</style>