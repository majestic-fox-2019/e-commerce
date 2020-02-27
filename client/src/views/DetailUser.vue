<template>
<div>
  <navbar-user/>
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
        <form @submit.prevent="addToCart">
          <div class="form-group d-flex flex-column justify-content-center">
            <label >Quantity</label>
            <input type="number" class="form-control mx-auto"  style="width:80px;" v-model="stock">
          </div>
          <button type="submit" class="btn btn-success"><button type="button" class="btn btn-success"><i class="fas fa-cart-plus"></i> add to cart</button></button>
        </form>
      </div>
      </div>
      </div>
</div>
  

</template>

<script>
import NavbarUser from '../components/NavbarUser.vue'
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
  name: 'DetailUser',
  components: {
    NavbarUser
  },
  data(){
    return {
      dataDetail:null,
      stock:null
    }
  },
  methods: {
    getDetail() {
      let id = this.$route.params.id
      console.log(id)
      axios({
        url: `http://localhost:3000/products/${id}`,
        method: "GET",
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then(res => {
        console.log(res.data)
        this.dataDetail = res.data
      })
      .catch(err => {
        console.log(err.response)
      })
    },
    addToCart(){
      let produckId = this.$route.params.id
      axios({
        url:`http://localhost:3000/products/${produckId}`,
        method: 'POST',
        headers: {
          token: localStorage.getItem("token")
        },
        data: {
          total: this.stock
        }
      })
      .then(res => {
         Swal.fire({
          icon: 'success',
          title: `${this.dataDetail.name} added to your cart!`,
          showConfirmButton: false,
          timer: 1500
        })
        this.$router.push('/user')
        console.log(res)
      })
      .catch(err => {
        console.log(err.response)
        if(err.response.data.msg === "invalid token"){
          Swal.fire({
            icon: 'error',
            title: 'Sorry...',
            text: "you need to have an account and login first"
          })
        } else if(err.response.data.msg==="sorry we were out of stocks!" ) {
          Swal.fire({
            icon: 'error',
            title: 'Sorry...',
            text: "we were out of stocks!"
          })
        } else {
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
        }
      })
    }
  },
  mounted() {
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