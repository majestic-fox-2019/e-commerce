<template>
  <div class="incomeCard">
    <div class="header">
        <div>
            <p>Transaction date:</p>
            <p style="font-weight: bold;">{{new Date(income.finish_date).toDateString()}}</p>
        </div>
        <div>
            <p>Buyer Info:</p>
            <p>{{income.buyer}}</p>
        </div>
    </div>
    <div class="card-content">
        <div class="productInfo">
            <h2>{{income.Product.name}}</h2>
            <p>{{income.Product.displayPrice}} x {{income.qty}}pcs</p>
            <p class="mt-5">Current Stock: {{income.Product.stock}}</p>
        </div>
        <div class="totalPrice">
            <h4>Total Price:</h4>
            <p>{{income.total}}</p>
            <b-button class="mt-5" @click.prevent="toShopMenu">Shop Menu</b-button>
        </div>
        <div class="productPic">
            <img class="productImg" :src="income.Product.img_url" alt="Product Picture">
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IncomeCard',
  props: {
    income: {
      type: Object
    }
  },
  methods: {
    toShopMenu () {
      this.$router.push('/shop/products')
    }
  }
}
</script>

<style scoped>
.productImg {
    height: 100%;
    width: 100%;
    object-fit: contain;
}
.productPic {
    width: 30%;
    height: 100%;
    background-color: white;
    border-radius: 10px;
}
.totalPrice{
    width: 40%;
    height: 100%;
    text-align: center;
}
.productInfo {
    width: 30%;
    height: 100%;
    text-align: left
}
.card-content {
    padding: 2%;
    height: 80%;
    width: 100%;
    display: flex;
}
.header {
    height: 20%;
    text-align: left;
    border-bottom: 1px solid black;
    padding-left: 2%;
    padding-right: 2%;
    display: flex;
    justify-content: space-between;
}
.header p{
    margin: 0;
    padding: 0;
}
.incomeCard {
    width: 90%;
    height: 40%;
    margin-top: 2%;
    border-radius: 10px;
    background-color: #f6e58d;
}
</style>
