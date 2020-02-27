<template>
  <div>
    <div class="category-bar shadow bg-white rounded">
        <ul class="navbar-nav mr-auto" style="display: inline;">
          <li class="nav-item btn mx-2">
            <router-link :to="{name: 'filter', params:{category: 'all'}}"><button @click="load">All</button></router-link>
          </li>
          <li class="nav-item btn mx-2" v-for="category in categories" :key="category.id">
            <router-link :to="{name: 'filter', params:{category: category.name}}"><button @click="filter(category.id)">{{category.name}}</button></router-link>
          </li>
        </ul>
    </div>
    <div class="container mt-5">
      <div class="row row-cols-1 d-flex align-content-start flex-wrap">
        <div v-if="products.length == 0"><h1>No Product</h1></div>
        <div class="col mb-4 card-width" v-for="product in products" :key="product.id">
          <div class="card mb-4">
            <form @submit.prevent="submitForm(product)" action="" enctype="multipart/form-data">
              <input v-if="editing === product.id" type="file" class="form-control" @change="setImage($event)">
              <img v-else :src="product.image_url ? product.image_url : `${publicPath}images/no-image.jpg`" class="card-img-top" alt="">
              <div class="card-body">
                <td v-if="editing === product.id">
                  <input type="text" style="width: 200px;" v-model="product.name" />
                </td>  
                <h5 v-else class="card-title">{{product.name}}</h5>
                <div d-flex >
                  <td v-if="editing === product.id" style="float: left;">
                    <p>category: 
                      <select required v-model="product.CategoryId">
                        <option selected disabled>select</option>
                        <option v-for="category in categories" :key="category.id" :value="category.id">{{category.name}}</option>
                      </select>
                    <p>price: <input type="text" style="width: 135px; margin-top:3px;" v-model="product.price"/></p>
                    <p>stock: <input type="text" style="width: 134px; margin-top:3px;" v-model="product.stock"/></p>
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
                      <div class="hbtn" @click="editing = null">❌</div>
                    </div>
                  </div>
                  <div v-else style="float: right;" class="flex-column">
                    <div style="margin-bottom: 5px;">
                      <div class="hbtn" @click="editProduct(product.id)">edit</div>
                    </div>
                    <div>
                      <div class="hbtn" @click="deleteProduct(product.id)">delete</div>
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
import Swal from "sweetalert2"

export default {
  data() {
    return {
      publicPath: process.env.BASE_URL,
      editing: null,
      formData: {
        image_url: null,
      }
    }
  },
  computed: {
    categories () {
      return this.$store.state.categories
    },
    products () {
      return this.$store.state.products
    }
  },
  created() {
    this.$store.dispatch('allProd')
    this.$store.dispatch('categories')
  },
  methods: {
    load() {
      this.$store.dispatch('allProd')
    },
    submitForm(data) {
      this.$axios({
        url: `/product/updateProduct/${data.id}`,
        method: 'put',
        headers: {token: localStorage.getItem('token')},
        data: {
          name: data.name,
          CategoryId: data.CategoryId,
          price: data.price,
          stock: data.stock,
          image_url: data.image_url,
        }
      })
        .then(added=>{
          console.log(added)
          if(this.$route.params.category == 'all'){
            this.$store.dispatch('allProd')
          } else {
            this.$store.dispatch('filterAdmin',data.CategoryId)
          }
          this.$swal.success('product updated')
          this.editing = null
        })
        .catch(error=>{
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
    },
    filter(id) {
      this.$store.dispatch('filterAdmin',id)
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
      Swal.fire({
        title: `Are you sure want to delete this product??`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.value) {  
          this.$axios({
            url: `/product/deleteProduct/${id}`,
            method: 'delete',
            headers: {token: localStorage.getItem('token')},
          })
            .then(data=>{
              console.log(data)
              this.$store.dispatch('allProd')
              this.$swal.success('product deleted')
            })
            .catch(error=>{
              this.$swal.error(error.response.data.error[0])
            })
        }
      })
    },
    editProduct(id) {
      this.editing = id
    },
   
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
    cursor: pointer;
    background-color: greenyellow;
  }
</style>