<template>
  <div class="historyContent">
    <div class="transactions" v-for="(transaction, i) in $store.state.transactionHistory" :key="i">
      <div class="header">
        Transaction Date: {{new Date(transaction.createdAt).toDateString()}}
      </div>
      <div class="statHead">
        <div style="border-right: 1px solid black;padding-right:2%;">
          <div>
            Finished Date:
          </div>
          {{new Date(transaction.createdAt).toDateString()}}
        </div>
        <div style="border-left: 1px solid black;padding-left:2%;">
          <div>
            Total Transaction:
          </div>
          {{rpConvert(transaction.qty * transaction.Product.price)}}
        </div>
      </div>
      <div class="transactionDetails">
        <div class="prodPic">
          <img class="prodImg" :src="transaction.Product.img_url" alt="">
          </div>
        <div class="prodInfo">
          <h3>{{transaction.Product.name}}</h3>
          <h5>{{transaction.Product.displayPrice}}</h5>
          <h5>{{transaction.qty}} pcs</h5>
        </div>
        <div class="againButtonSpot">
          <b-button @click.prevent="toProduct(transaction.ProductId)">Purchase Again</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import converter from '../helpers/rpConverter'
export default {
  name: 'TransactionHistory',
  methods: {
    rpConvert (number) {
      return converter(number)
    },
    toProduct (id) {
      this.$router.push(`/products/${id}`)
    }
  }
}
</script>

<style scoped>
.againButtonSpot {
  width: 28%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 1px solid black;
}
.prodImg {
  height: 100%;
  width: 100%;
  object-fit: contain;
}
.transactionDetails {
  padding: 1%;
  height: 55%;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}
.prodInfo {
  width: 50%;
  height: 100%;
  text-align: left;
  padding-left: 2%;
}
.prodPic {
  width: 20%;
  height: 100%;
  border-radius: 10px;
}
.statItem {
  display: flex;
  flex-direction: column;
}
.statHead {
  height: 30%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 3%;
  padding-right: 3%;
  border-bottom: 1px solid black;
}
.header {
  text-align: left;
  padding-left: 2%;
  border-bottom: 1px solid black;
  height: 15%;
  padding-top: 1%;
}
.historyContent {
  height: 100%;
  width: 100%;
  overflow: scroll;
  border-radius: 10px;
  background-color: white;
  padding: 1%;
}
.transactions {
  height: 50%;
  width: 100%;
  border: 1px solid black;
  border-radius: 10px;
  margin-bottom: 2%;
}
.transactions:hover {
    box-shadow: 0px 0px 13px 0px rgba(0,0,0,0.75);
    transition: 0.5s;
    z-index: 2;
}
</style>
