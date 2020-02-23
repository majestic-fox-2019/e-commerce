<template>
  <div class="mt-5 mainShop">
    <h1><i class="fas fa-store mr-3"></i>{{$store.state.userInfo.shopName}}<i class="fas fa-store ml-3"></i></h1>
    <div class="my-5 shopMenu">
        <div class="shopPic">
            <img id="shopImg" src="../assets/userShop.svg" alt="">
        </div>
        <div class="userSection">
            <div class="userNav">
                <div id="AllProductsMenu" @click="shopProductsView" class="py-3 menu-items" style="border-radius: 15px 0 0 0;">
                    <h4>Your Products</h4>
                    <div v-if="yourProducts" class="header-line"></div>
                </div>
                <div id="outOfStockProducts" @click="addProductView" class="py-3 menu-items">
                    <h4>Add Product</h4>
                    <div v-if="addProduct" class="header-line"></div>
                </div>
            </div>
            <div class="userContents">
                <router-view/>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserShop',
  data () {
    return {
      yourProducts: true,
      addProduct: false
    }
  },
  methods: {
    shopProductsView () {
      this.yourProducts = true
      this.addProduct = false
      this.$router.push('/shop/products')
    },
    addProductView () {
      this.yourProducts = false
      this.addProduct = true
      this.$router.push('/shop/addProduct')
    }
  },
  created () {
    this.$router.push('/shop/products')
  }
}
</script>

<style scoped>
.header-line {
    border-bottom: 2px solid #f67878;
    height: 5%;
    width: 100%;
}
#shopImg {
    width:100%;
    height: 100%;
    object-fit: contain;
}
.menu-items {
    height: 100%;
    width: 25%;
    cursor: pointer;
}
.userContents {
    width: 100%;
    height: 90%;
    padding: 1%;
}
.userNav {
    width: 100%;
    height: 10%;
    display: flex;
    align-items: center;
    padding-left: 1%;
    padding-right: 1%;
}
.shopPic {
    width: 25%;
    height: 100%;
    background-color: #70a1ff;
    border-radius: 15px;
}
.userSection {
    width: 73%;
    height: 100%;
    border-radius: 15px;
    background-color: #dff9fb;
}
.mainShop {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    overflow: scroll;
    height: 90vh;
}
.shopMenu {
    display: flex;
    height: 80vh;
    width: 80vw;
    justify-content: space-between;
}
</style>
