<template>
  <div class="cartItemContent">
      <div class="itemPic">
          <img class="itemImg" :src="itemData.Product.img_url" alt="item">
      </div>
      <div class="itemInfo">
          <h4>{{itemData.Product.name}}</h4>
          <h5>{{itemData.Product.displayPrice}}</h5>
      </div>
      <div class="itemQty">
          <p style="margin:0;padding:0;"> {{itemData.qty}} </p>
      </div>
      <div class="deleteItemPart">
          <b-button v-if="activeItem" @click.prevent="deleteItem(itemData.id)">delete</b-button>
          <b-button v-if="ongoingItem" @click.prevent="confirmDelivery(itemData.id)">Confirm</b-button>
      </div>
  </div>
</template>

<script>
export default {
  name: 'CartItems',
  props: {
    itemData: {
      type: Object
    },
    activeItem: {
      type: Boolean
    },
    ongoingItem: {
      type: Boolean
    }
  },
  methods: {
    confirmDelivery (id) {
      this.$store.dispatch('confirmDelivery', {
        id: id
      })
    },
    deleteItem (id) {
      this.$store.dispatch('deleteItem', {
        id: id
      })
    }
  }
}
</script>

<style scoped>
.deleteItemPart {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 15%;
    height: 100%;
}
.itemQty {
  width: 20%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 2em;
}
.itemInfo {
  padding-top: 2%;
  text-align: left;
  width: 40%;
}
.cartItemContent {
    height: 100%;
    width: 90%;
    display: flex;
}
.itemPic {
    height: 100%;
    width: 15%;
}
.itemImg {
    width: 100%;
    height: 100%;
    object-fit: contain;
}
</style>
