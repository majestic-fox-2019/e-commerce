<template>
  <div class="prodCard shadow" :style="{ 'background-image': 'url(' + productData.img_url + ')' }">
      <div class="ProductDetails">
          <p>{{productData.name}}</p>
          <p>{{productData.price}}</p>
          <a href="#" style="color: white">See Product</a>
      </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    productData: {
      type: Object
    }
  }
}
</script>

<style scoped>
.prodCard {
    height: 30vh;
    border-radius: 15px;
    width: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position-x: 50%;
    display: flex;
    flex-direction: column-reverse;
}
.ProductDetails {
    height: 5%;
    width: 100%;
    background: rgba(47, 47, 47, 0.575);
    color: white;
    font-size: 0;
    border-radius: 0 0 15px 15px;
    transition: 1s;
}
.prodCard:hover > .ProductDetails {
    height: 50%;
    font-size: 1.5em;
    transition: 1s;
}

</style>
