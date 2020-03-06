<template>
<div>
  <b-row class="m-3">
    <b-col md="6">
      <b-card-img :src="product.image_url"></b-card-img>
    </b-col>
    <b-col>
      <b-card-body>
        <b-card-text>
          <div class="detail-group">
            <span>Name: </span> <p>{{product.name}}</p>
          </div>
          <div class="detail-group">
            <span>Price: </span> <p>{{product.price}}</p>
          </div>
          <div class="detail-group">
            <span>Stock: </span><p>{{product.stock}}</p>
          </div>
          <b-button>Edit</b-button>
        </b-card-text>
      </b-card-body>
    </b-col>
  </b-row>
</div>
</template>

<script>
import { config } from '../config' 
export default {
  data(){
    return {
      product: null
    }
  },
  created() {
    this.$store.dispatch('login')
    config({
      method: 'get',
      url: `/products/${this.$route.params.id}`
    })
    .then(({ data }) => {
      this.$store.dispatch('login')
      this.product = data
    })
    .catch(err => {
      console.log(err.response.message)
    })
  }
}
</script>

<style scoped>
.detail-group{
  font-size: 1.5rem;
}

.detail-group span{
  font-weight: 700;
}
</style>