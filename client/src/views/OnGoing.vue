<template>
    <div style="width:100%;height:100%;overflow:scroll;">
        <div class="header">
                <div style="width:10%;"></div>
                <div style="width:15%;"></div>
                <div style="width:40%;font-size:1em;font-weight:bold;text-align:left;">
                    Product
                </div>
                <div style="width:20%;font-size:1em;font-weight:bold;text-align:left;">
                    Qty
                </div>
                <div style="width:15%;"></div>
            </div>
    <div class="onGoingItems" v-for="(item, i) in $store.state.unconfirmed" :key="i">
        <div style="width:10%;"></div>
        <div style="width:100%; height:100%;">
            <CartItems :itemData="item" :ongoingItem="true"></CartItems>
        </div>
    </div>
  </div>
</template>

<script>
import CartItems from '../components/CartItems'
export default {
  name: 'OnGoing',
  components: {
    CartItems
  },
  created () {
    this.$store.dispatch('fetchUserCart')
  }
}
</script>

<style scoped>
.header {
    width: 90%;
    height: 6%;
    display: flex;
}
.onGoingItems {
  width: 100%;
  height: 20%;;
  display: flex;
}
</style>
