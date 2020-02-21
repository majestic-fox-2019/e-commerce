<template>
  <div class="col mt-4">
    <div class="card p-2" style="width: 18rem; height:400px;">
      <div style="width: 100%; height:60%; ">
       <img :src="carddata.image_url" alt="Card image cap" style="object-fit:cover; height:100%; width:100%;"> 
      </div>
    <div class="cardbody" >
      <h5 class="card-title">{{carddata.name}}</h5>
      <p>{{priceFixed}}</p>
      <div class="d-flex justify-content-center">
      <button type="button" class="btn btn-outline-success" data-toggle="tooltip" data-placement="right" title="Detail Product" @click="goDetail(carddata.id)"><i class="fas fa-search"></i></button>
    </div>
    </div>
  </div>
  </div>
</template>

<script>

export default {
  name: "Card",
  props: ['carddata'],
  methods: {
    goDetail(id) {
      this.$router.push(`/products/${id}`)
    }
  },
  mounted() {
    console.log(this.carddata, "<<<<<")
  },
  computed: {
    priceFixed(){
      let result = 'Rp. '
      result += (this.carddata.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
      return result
    }
  }
}
</script>

<style>
.cardbody{
  margin-top: 20px;

}
</style>