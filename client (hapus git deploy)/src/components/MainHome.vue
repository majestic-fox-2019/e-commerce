<template>
  <div>
    <div class="category-bar shadow bg-white rounded">
        <ul class="navbar-nav mr-auto" style="display: inline;">
          <li class="nav-item btn mx-2">
            <router-link :to="'/'"><button @click="filter(0)">All</button></router-link>
          </li>
          <li class="nav-item btn mx-2" v-for="category in categories" :key="category.id">
            <router-link :to="'/'"><button @click="filter(category.id)">{{category.name}}</button></router-link>
          </li>
        </ul>
    </div>
    <div class="container mt-5">
      <div class="row row-cols-1 d-flex align-content-start flex-wrap">
        <div class="col mb-4 card-width" v-for="product in products" :key="product.id">
          <div class="card mb-4">
            <form @submit.prevent="submitForm(product)" action="" enctype="multipart/form-data">
            <input v-if="editing === product.id" type="file" class="form-control" @change="setImage($event)">
            <img v-else :src="product.image_url ? product.image_url : '../public/images/no-image.jpg'" class="card-img-top" alt="">
            <div class="card-body">
              <td v-if="editing === product.id">
                <input type="text" style="width: 200px;" v-model="formData.name" value='product.name' />
              </td>  
              <h5 v-else class="card-title">{{product.name}}</h5>
              <div d-flex >
                <td v-if="editing === product.id" style="float: left;">
                  <p>category: 
                    <select required v-model="formData.CategoryId">
                      <option selected disabled>select</option>
                      <option v-for="category in categories" :key="category.id" :value="category.CategoryId">{{category.name}}</option>
                    </select>
                  <p>price: <input type="text" style="width: 135px; margin-top:3px;" v-model="formData.price"/></p>
                  <p>stock: <input type="text" style="width: 134px; margin-top:3px;" v-model="formData.stock"/></p>
                </td>  
                <div v-else style="float: left;">
                  <p class="card-text">category: {{product.Category.name}}</p>
                  <p class="card-text">Price: {{converting(product.price)}}</p>
                  <p>Stock: {{product.stock}}</p>
                </div>
                <div v-if="editing === product.id" style="float: right;" class="flex-column">
                  <div style="margin-bottom: 5px;">
                    <button type="submit">✅</button>
                  </div>
                  <div>
                    <button @click="editing = null">❌</button>
                  </div>
                </div>
                <div v-else style="float: right;" class="flex-column">
                  <div style="margin-bottom: 5px;">
                    <button class="hbtn" @click="editProduct(product.id)">edit</button>
                  </div>
                  <div>
                    <button class="hbtn" @click="deleteProduct(product.id)">delete</button>
                  </div>
                </div>
              </div>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      products: null,
      editing: null,
      categories: null,
      formData: {
        image_url: null,
        name: '',
        price: '',
        stock: '',
        CategoryId: '',
      }
    }
  },
  created() {
    this.$axios({
        url: '/product/listProduct',
        method: 'get',
        headers: {token: localStorage.getItem('token')},
    })
      .then(products=>{
        this.products = products.data
      })
      .catch(error=>{
        console.log(error)
      })
    this.$axios({
        url: '/category/listCategory',
        method: 'get',
        headers: {token: localStorage.getItem('token')},
    })
      .then(datas=>{
        this.categories = datas.data
      })
      .catch(error=>{
        console.log(error)
      })
  },
  methods: {
    load() {
       this.$axios({
        url: '/product/listProduct',
        method: 'get',
        headers: {token: localStorage.getItem('token')},
    })
      .then(products=>{
        this.products = products.data
      })
      .catch(error=>{
        console.log(error)
      })
    },
    submitForm(data) {
    console.log(this.formData.name,this.formData.price,this.formData.stock,this.formData.CategoryId)
      this.$axios({
        url: `/product/updateProduct/${data.id}`,
        method: 'put',
        headers: {token: localStorage.getItem('token')},
        data: {
          name: this.formData.name,
          CategoryId: this.formData.CategoryId,
          price: this.formData.price,
          stock: this.formData.stock,
          image_url: this.formData.image_url,
        }
      })
        .then(added=>{
          console.log(added)
          this.$swal.success('product added')
          this.editing == null
          this.load()
        })
        .catch(error=>{
          this.$swal.error(error.response.data.error[0])
        })
    },
    setImage(event) {
      console.log(event.target.files[0])
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
          console.log(res.data)
          this.formData.image_url = `https://storage.googleapis.com/storage-example/${res.data.name}`
          console.log(this.formData.image_url)
        })
        .catch(error => {
          console.log(error.response)
        });
    },
    filter(id) {
      this.$axios({
        url: `product/listProduct/category/${id}`,
        method: 'get',
        headers: {token: localStorage.getItem('token')},
      })
        .then(datas=>{
          console.log(datas.data)
          this.products = datas.data
        })
        .catch(error=>{
          console.log(error)
        })
    },
    converting(num) {
      let str = String(num)
      let converted = ''
      for(let i = 0; i < str.length; i++){
          if((str.length-i) % 3 ==0 && i !== 0){
              converted += '.' + str[i]
          }else {
              converted += str[i]
          }
      }
      return `Rp. ${converted}`
    },
    deleteProduct(id) {
      let status = confirm('are you sure want to delete this category?')
      if(status) {
        this.$axios({
          url: `/product/deleteProduct/${id}`,
          method: 'delete',
          headers: {token: localStorage.getItem('token')},
        })
          .then(data=>{
            console.log(data)
            this.$swal.success('product deleted')
          })
          .catch(error=>{
            this.$swal.error(error.response.data.error[0])
          })
      }
    },
    editProduct(id) {
      this.editing = id
      console.log(id)
    },
    // updateData(data) {
    //   console.log(data)
    //   this.$axios({
    //     url: `/product/updateProduct/${data.id}`,
    //     method: 'put',
    //     headers: {token: localStorage.getItem('token')},
    //     data: {
    //       name: data.name,
    //       CategoryId: data.categoryId,
    //       price: data.price,
    //       stock: data.stock,
    //       image_url: data.image,
    //     }
    //   })
    //     .then(updated=>{
    //       console.log(updated)
    //       this.editing = null
    //       this.$swal.success('product updated')
    //     })
    //     .catch(error=>{
    //       this.$swal.error(error.response.data.error[0])
    //     })
    // }
  },
}
</script>

<style scoped>
  .card-img, .card-img-top {
      height: 250px;
  }
  .card-width {
    max-width: 280px;
  }
  .card:hover {
    background-color: rgb(185, 250, 228);
    transition-duration: 1s;
  }
  .nav-item:hover {
    background-color: rgb(210, 247, 247);
  }
  .category-bar {
    white-space: nowrap;
    overflow-x: auto;
    margin: auto;
  }
  .hbtn:hover {
    background-color: greenyellow;
  }
</style>