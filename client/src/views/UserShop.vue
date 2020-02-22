<template>
  <div class="mt-5 mainShop">
    <h1>{{$store.state.userInfo.shopName}}</h1>
    <div class="my-5 shopMenu">
        <div class="shopPic"></div>
        <div class="userSection">
            <div class="userNav">
                <div id="AllProductsMenu" class="py-3 menu-items">
                    <h4>Your Products</h4>
                </div>
                <div id="outOfStockProducts" class="py-2 menu-items">
                    <h4>Out of Stock Products</h4>
                </div>
            </div>
            <div class="userContents"></div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserShop'
}
</script>

<style scoped>
.menu-items {
    height: 100%;
    width: 25%;
    border: 1px solid black;
}
.userContents {
    width: 100%;
    height: 90%;
    overflow: scroll;
}
.userNav {
    width: 100%;
    border-bottom: 1px solid black;
    height: 10%;
    display: flex;
    align-items: center;
}
.shopPic {
    width: 25%;
    height: 100%;
    border: 1px black solid;
}
.userSection {
    width: 73%;
    height: 100%;
    border: 1px black solid;
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
