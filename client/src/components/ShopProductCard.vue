<template>
  <div class="productCard pt-2">
    <div class="ProdBasic">
      <div class="prodImg">
        <img class="ProdPic" :src="product.img_url" alt="">
      </div>
      <div class="prodBInfo ml-3">
        <p class="prodBInfo-text" style="font-weight: bold;">{{product.name}}</p>
        <p class="prodBInfo-text mt-1" style="font-size: 0.9em;">{{product.category}}</p>
        <p class="prodBInfo-text mt-3">{{product.price}}</p>
      </div>
    </div>
    <div class="ProdDesc">
      {{product.desc}}
    </div>
    <div class="ProdStock">
      {{product.stock}}
    </div>
    <div class="ProdAction">
      <b-button>edit</b-button>
      <b-button>delete</b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShopProductCard',
  props: {
    product: {
      type: Object
    }
  }
}
</script>

<style scoped>
.ProdAction {
  width: 10%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.ProdStock {
  width: 18%;
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 2em;
  justify-content: center;
}
.ProdDesc {
  width: 37%;
  height: 100%;
  text-align: left;
  font-size: 1em;
}
.prodBInfo-text {
  font-size: 1em;
  padding: 0;
  margin: 0;
  text-align: left;
}
.prodBInfo {
  display: flex;
  flex-direction: column;
}
.productCard {
    width: 100%;
    height: 20%;
    display: flex;
    border-bottom: 1px solid rgb(138, 138, 138);
}
.prodImg {
  width: 30%;
  height: 100%;
}
.ProdPic {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.ProdBasic {
  width: 35%;
  height: 100%;
  display: flex;
}
</style>
