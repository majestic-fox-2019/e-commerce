<template>
<div>
  <navbar></navbar>
  <div>
     <carousel></carousel>
     <category></category>
     <div class=" container">
       <div class="d-flex justify-content-between row">
     <div v-for="data in filterData" :key="data.id" >
       <div >
       <card :carddata="data"></card>
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
import Category from '../components/Category.vue'
import Navbar from '../components/Navbar.vue'
import Card from '../components/Card.vue'
import axios from 'axios'
export default {
  name: 'zFilter',
  components: {
    Carousel, Category, Navbar, Card
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
