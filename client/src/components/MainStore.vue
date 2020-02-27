<template>
  <div>
    <div class="category-bar shadow bg-white rounded">
        <ul class="navbar-nav mr-auto" style="display: inline;">
          <li class="nav-item btn mx-2">
            <router-link :to="{name: 'adminfilter', params:{category: 'all'}}"><button @click="load">All</button></router-link>
          </li>
          <li class="nav-item btn mx-2" v-for="category in categories" :key="category.id">
            <router-link :to="{name: 'adminfilter', params:{category: category.name}}"><button @click="filter(category.id)">{{category.name}}</button></router-link>
          </li>
        </ul>
    </div>
    <div v-show="banners.length >= 3 && banners !== null">
      <center><h3>New Products</h3></center>
      <carousel :perpage="1" autoplay :speed="2000" :autoplayTimeout="3000" :paginationEnabled="false" loop :scrollPerPage="false" :perPageCustom="[[480, 2], [768, 3]]" >
        <slide v-for='(banner,idx) in banners' :key="idx">
          <img :src="banner.img" class="banner">
          <div class="bannername">{{banner.name}}</div>
        </slide>
      </carousel>
    </div>
    <div class="container mt-5">
      <div class="row row-cols-1 d-flex align-content-start flex-wrap">
        <div class="col mb-4 card-width" v-for="product in products" :key="product.id">
          <div class="card mb-4">
            <form @submit.prevent="submitForm(product)" action="" enctype="multipart/form-data">
              <img :src="product.image_url ? product.image_url : `${publicPath}images/no-image.jpg`" class="card-img-top" alt="">
              <div class="card-body">
                <h5 class="card-title">{{product.name}}</h5>
                <div d-flex >
                  <div style="float: left;">
                    <p class="card-text">category: {{product.Category.name}}</p>
                    <p class="card-text">Price: {{convertIDR(product.price)}}</p>
                    <p>Stock: {{product.stock}}</p>
                  </div>
                  <div style="float: right;" class="flex-column">
                    <div v-if="product.added">
                      <div class="cancelbtn hbtn" @click="cancelProduct(product)">❌</div>
                    </div>
                    <div v-else style="margin-bottom: 5px;">
                      <img src="@/../public/images/icons/cart.png" @click="addProduct(product)" class="hbtn cart" alt="">
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
import Swal from 'sweetalert2'
import { Carousel, Slide } from 'vue-carousel';

export default {
  data() {
    return {
      publicPath: process.env.BASE_URL,
      formData: {
        image_url: null,
      },
      Carousel,
      Slide,
      banners: null,
    }
  },
  computed: {
    categories () {
      return this.$store.state.categories
    },
    products() {
      return this.$store.state.products
    },
  },
  created() {
    this.$axios({
      url: '/product/banner',
      method: 'get',
      headers: {token: localStorage.getItem('token')},
    })
    .then(banners=>{
      this.banners = banners.data
    })
    .catch(error=>{
      console.log(error)
    })
    console.log(this.banners)
    this.load()
    this.$store.dispatch('categories')
    this.$store.dispatch('products')
  },
  methods: {
    load() {
      this.$axios({
        url: '/product/listProduct',
        method: 'get',
        headers: {token: localStorage.getItem('token')},
      })
      .then(products=>{
        for(let i = 0; i < products.data.length; i++) {
          for(let j = 0; j < products.data[i].Users.length; j++) {
            if(products.data[i].Users[j].email == localStorage.getItem('email')) {
              products.data[i].added = true
              break;
            }
          }
        }
        this.$store.dispatch('memberproducts',products.data)
      })
      .catch(error=>{
        console.log(error)
      })
    },
    filter(id) {
      this.$store.dispatch('filter',id)
    },
    convertIDR(num) {
      return this.$idr.convert(num)
    },
    cancelProduct(product) {
      Swal.fire({
        title: `Are you sure want to remove this product from your cart?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.value) {
          this.$axios({
            url: `/cart`,
            method: 'delete',
            headers: {token: localStorage.getItem('token')},
            data: {
              ProductId: product.id,
              amount: 1
            }
          })
            .then(data=>{
              if(this.$route.params.category == 'all'){
                this.load()
              } else {
                this.$store.dispatch('filter',product.CategoryId)
              }
              console.log(data)
              this.$swal.success('product removed from cart')
            })
            .catch(error=>{
              console.log(error)
            })
        }
      })
    },
    addProduct(product) {
      Swal.fire({
        title: `Are you sure want to add this item to your cart?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.value) {
          this.$axios({
            url: '/cart',
            method: 'post',
            headers: {token: localStorage.getItem('token')},
            data: {
              ProductId: product.id
            }
          })
          .then(addedCart=>{
            if(this.$route.params.category == 'all'){
              this.load()
            } else {
              this.$store.dispatch('filter',product.CategoryId)
            }
            this.$swal.success('product added to cart')
            console.log(addedCart)
          })
          .catch(error=>{
            console.log(error)
            this.$swal.error('Please login to purchase product')
          })
        }
      })
    },
  },
}
</script>

<style scoped>
  h3 {
    margin-top: 5px;
  }
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
  .cart {
    padding: 2px;
    width: 35px;
    height: 35px;
    cursor: pointer;
  }
  .cancelbtn {
    font-size: 30px;
    padding: 2px;
  }
  .banner {
    height: 200px;
    width: 100%;
  }
  .bannername {
    text-align: center;
    background-color: antiquewhite;
    border: 1px solid black;
  }
</style>