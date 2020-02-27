<template>
<div>
  <navbar-user/>
  <div>
     <carousel></carousel>
     <category-user/>
     <div class=" container">
       <div class="d-flex justify-content-between row">
     <div class="container">
      <div class="d-flex justify-content-between row">
        <div v-for="data in filterData" :key="data.id">
         <div class="col mt-4">
            <div class="card p-2" style="width: 18rem; height:400px;">
              <div style="width: 100%; height:60%; ">
              <img :src="data.image_url" alt="Card image cap" style="object-fit:cover; height:100%; width:100%;"> 
              </div>
            <div class="cardbody" >
              <h5 class="card-title">{{data.name}}</h5>
              <p>{{priceFixed(data.price)}}</p>
              <div class="d-flex justify-content-center">
              <button type="button" class="btn btn-outline-success" data-toggle="tooltip" data-placement="right" title="Detail Product" @click="goDetail(data.id)"><i class="fas fa-search"></i></button>
            </div>
            </div>
          </div>
          </div>
       </div>
      </div>
  </div>
       </div>
     </div>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import Carousel from '../components/Carousel.vue'
import CategoryUser from '../components/CategoryUser.vue'
import NavbarUser from '../components/NavbarUser.vue'
import axios from 'axios'
export default {
  name: 'FilterUser',
  components: {
    Carousel, CategoryUser, NavbarUser
  },
  data() {
    return {
      filterData : []
    }
  },
  methods: {
    getCategory(){
      console.log("masuk get")
      let input = this.$route.params.category
      axios({
        url:`http://localhost:3000/home/${input}`,
        method: "GET",
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then(res => {
        console.log(res.data)
        this.filterData = res.data
      })
      .catch(err => {
        console.log(err)
      })
    },
    priceFixed(money){
      let result = 'Rp. '
      result += (money).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
      return result
    },
    goDetail(id) {
      this.$router.push(`/user-products/${id}`)
    }
  },
  mounted() {
    this.getCategory()
  },
  watch:{
    currentParam(oldVal, newVal){
      if(oldVal !== newVal){
        this.getCategory()
      }
    }
  },
  computed:{
    currentParam(){
      return this.$route.params.category

    }
  }
}
</script>

<style scoped>
.carousel-item{
  height: 200px;
}
.carousel-item img{
  height: 200px;
}
</style>
