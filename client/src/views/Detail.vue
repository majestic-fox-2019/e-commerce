<template>
<div>
  <navbar></navbar>
  <div class="container d-flex row justify-content-center mx-auto" style="margin-top:80px;">
    <div>

    </div>
    <div class="col-sm-12 col-md-6">
      <img class="img-thumbnail sh" :src="dataDetail.image_url" alt="" width="500" height="500">
    </div>

    <div class="col-sm-12 col-md-6 d-flex flex-column justify-content-center mx-auto">
      <h2>
        {{dataDetail.name}}
      </h2>
      <h4>for {{dataDetail.category}} skin type</h4>
      <p>{{dataDetail.description}}</p>
      <p>Price: {{priceFixed}}</p>
      <p>Stocks: {{dataDetail.stock}}</p> 
        <div>
          <button type="button" class="btn btn-light"  data-toggle="modal"  data-placement="right" title="Edit Product" data-target="#modalEdit"><i class="far fa-edit"></i></button>
          <button type="button" class="btn btn-light"  data-toggle="tooltip" data-placement="right" title="Delete Product" @click="deleteProduct()"><i class="far fa-trash-alt"></i></button>
        </div>
    </div>

<!-- Modal Edit-->
<div class="modal fade" id="modalEdit" tabindex="-1" role="dialog" aria-labelledby="modalEditLabel" aria-hidden="true" v-show="modalEdit">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalEditLabel">Edit Product</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
       <form @submit.prevent="editProduct()">

           <div class="form-group row">
            <label for="nameedit" class="col-sm-2 col-form-label">Name</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="nameedit" v-model="nameEdit" >
            </div>
          </div>

          <div class="form-group row">
            <label for="editdescription" class="col-sm-2 col-form-label">Description</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="editdescription" placeholder="description" v-model="descEdit">
            </div>
          </div>

          <div class="form-group row">
            <label for="editprice" class="col-sm-2 col-form-label">Price</label>
            <div class="col-sm-10">
              <input type="number" class="form-control" id="editprice" placeholder="price" v-model="priceEdit">
            </div>
          </div>

          <div class="form-group row">
            <label for="editstock" class="col-sm-2 col-form-label">Stock</label>
            <div class="col-sm-10">
              <input type="number" class="form-control" id="editstock" placeholder="stock" v-model="stockEdit">
            </div>
          </div>

          <div class="form-group row">
            <label for="editcategory" class="col-sm-2 col-form-label">Category</label>
            <div class="col-sm-10">
             <select id="categoryedit" name="categoryedit" v-model="categoryEdit">
              <option value="dry">Dry</option>
              <option value="oily">Oily</option>
              <option value="normal">Normal</option>
              <option value="combination">Combination</option>
            </select>
            </div>
          </div>

          <div class="form-group row">
            <label for="editimage" class="col-sm-2 col-form-label">Image</label>
            <form  enctype="multipart/form-data">
              <input type="file" name="file" v-on:change="getImage" />
            </form><br>
          </div>
            <div v-if="preview" class="text-center">
              <img :src="preview" alt="Image Preview" width="300" height="300"> 
            </div>
 
          <button type="submit" class="btn btn-primary">Edit</button>
        </form>
      </div>
    </div>
  </div>
</div>


  </div>
</div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
  name: 'Detail',
  components:{
    Navbar
  },
  data(){
    return {
      nameEdit : null,
      stockEdit: null,
      categoryEdit: null,
      descEdit: null,
      priceEdit: null,
      imageEdit: null,
      dataDetail: null,
      modalEdit:true,
      preview:null
    }
  },
  methods: {
    getDetail() {
      let id = this.$route.params.id
      axios({
        url: `http://localhost:3000/products/${id}`,
        method: "GET",
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then(res => {
        this.dataDetail = res.data
        this.nameEdit = res.data.name
        this.stockEdit = res.data.stock
        this.categoryEdit = res.data.category
        this.descEdit = res.data.description
        this.priceEdit = res.data.price
        this.imageEdit = res.data.image_url

      })
      .catch(err => {
        console.log(err)
      })
    },
    editProduct(){
      let id = this.$route.params.id
      const fd = new FormData()
      fd.append('name', this.nameEdit)
      fd.append('price', this.priceEdit)
      fd.append('stock', this.stockEdit)
      fd.append('image_url', this.imageEdit)
      fd.append('description', this.descEdit)
      fd.append('category', this.categoryEdit)
      axios({
        url: `http://localhost:3000/admin/${id}`,
        method:"PUT",
        data: fd,
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then(res => {
         window.$('#modalEdit').modal('hide')
         Swal.fire({
          icon: 'success',
          title: 'Product edited!',
          showConfirmButton: false,
          timer: 1500
        })
        this.$router.push('/admin')
        console.log(res,"berhasil")
      })
      .catch(err => {
        console.log(err)
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
    deleteProduct(){
      let id = this.$route.params.id
      Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        })
        .then((result) => {
          if (result.value) {
           return axios({
                url: `http://localhost:3000/admin/${id}`,
                method:"DELETE",
                headers: {
                  token: localStorage.getItem("token")
                }
              })
            .then(res => {
              console.log(res, "berhasil delete")
              this.$router.push('/admin')
              Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  )
              })
            .catch(err => {
                console.log(err)
              })
          }
      })  
    },
    getImage(e) {
      console.log(e.target.files)
      this.imageEdit = e.target.files[0]
      this.preview = URL.createObjectURL(e.target.files[0])
    }
  },
  mounted(){
    this.getDetail()
  },
  computed: {
    priceFixed(){
      let result = 'Rp. '
      result += (this.dataDetail.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
      return result
    }
  }
}
</script>

<style>

</style>