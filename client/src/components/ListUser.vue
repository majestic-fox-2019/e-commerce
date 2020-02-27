<template>
  <div class="container">
      <div class="d-flex justify-content-between row">
        <div v-for="data in allData" :key="data.id">
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
</template>

<script>
export default {
  name: 'ListUser',
  methods:{
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
    this.$store.dispatch('getData')
  },
  computed: {
    allData() {
      return this.$store.state.allData
    }
  }
  
}
</script>

<style>

</style>