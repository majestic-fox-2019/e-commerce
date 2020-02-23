<template>
  <div class="content-container">
        <div class="userProductContentHeader">
            <div class="ProductBasic">
                Product
            </div>
            <div class="ProductDesc">
                Description
            </div>
            <div class="ProductStock">
                Stock
            </div>
        </div>
    <ShopProductCard v-for="(displayProduct, i) in $store.state.displayProducts" :key="i" :product="displayProduct"></ShopProductCard>
    </div>
</template>

<script>
import ShopProductCard from '../components/ShopProductCard'
export default {
  name: 'UserProducts',
  components: {
    ShopProductCard
  },
  created () {
    this.$store.dispatch('fetchShopProducts')
  }
}
</script>

<style scoped>
.content-container {
    padding: 1%;
    background-color: #ffffff;
    height: 100%;
    width: 100%;
    border-radius: 15px;
    overflow: scroll;
}
.ProductStock {
    width: 18%;
    height: 100%;
    text-align: center;
    font-size: 2em;
}
.ProductDesc {
    width: 37%;
    height: 100%;
    text-align: left;
    font-size: 2em;
}
.ProductBasic {
    width: 35%;
    height: 100%;
    text-align: left;
    font-size: 2em;
}
.userProductContentHeader {
    height: 8%;
    width: 100%;
    display: flex;
    border-bottom: 1px solid rgb(71, 71, 71);
    margin-bottom:1%;
}
</style>
