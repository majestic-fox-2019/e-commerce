<template>
<b-container class="bv-example-row mt-5">
  <div class="row">
    <br>
  </div>
  <div class="row">
    <h1 class="ml-2">Your Cart</h1>
  </div>
  <b-row>
    <b-col cols="6">
      <b-card v-for="el in cartData" :key="el.id" no-body class="overflow-hidden my-3" style="max-width: 540px; max-height:220px">
        <b-row no-gutters>
          <b-col md="6">
            <b-img thumbnail fluid :src="el.Product.imageurl" alt="Image 1"></b-img>
          </b-col>
          <b-col md="6">
            <b-card-body :title="el.Product.name">
              <b-card-text>
                <p>{{formatter(el.Product.price)}}</p>
                <div class="d-flex justify-content-around align-items-center">
                   <a @click="lessQty(el)"><b-icon icon="dash" variant="dark" class="h2 mb-2 mt-2"></b-icon></a>
                <p class="price">Qty : {{el.quantity}}</p>
                   <a @click="addQty(el)" ><b-icon icon="plus" variant="dark" class="h2 mb-2 mt-2"></b-icon></a>
                </div>
                <div class="d-flex">
                <a @click="deletecart(el.ProductId)" class="ml-auto">
                <b-icon icon="trash-fill" variant="danger" class="h2 mb-2 mt-2"></b-icon>
                </a>
                </div>
              </b-card-text>
          </b-card-body>
          </b-col>
        </b-row>
      </b-card>
    </b-col>
    <b-col cols="6">
      <b-list-group class="total my-3">
        <b-list-group-item><h1>Order Summary</h1></b-list-group-item>
        <b-list-group-item class="d-flex justify-content-between">
          <p>Total items:</p>
          <p>{{cartlength}}</p>
        </b-list-group-item>
        <b-list-group-item>discount</b-list-group-item>
        <b-list-group-item>Voucher Code</b-list-group-item>
         <b-list-group-item class="d-flex justify-content-between">
          <p>Total Price:</p>
          <p>{{formatter(totalprice)}}</p>
        </b-list-group-item>
        <b-list-group-item>
          <b-button @click="checkOut" block variant="primary">BUY</b-button>
        </b-list-group-item>
      </b-list-group>
    </b-col>
  </b-row>
</b-container>
</template>

<script>
export default {
  data () {
    return {
      cartData: null
    }
  },
  computed: {
    cartlength () {
      if (this.cartData == null) {
        return 0
      } else {
        return this.cartData.length
      }
    },
    totalprice () {
      if (this.cartData == null) {
        return 0
      } else {
        let total = 0
        this.cartData.forEach(el => {
          total += el.Product.price * el.quantity
        })
        return total
      }
    }
  },
  methods: {
    loadCart () {
      this.$axios({
        url: 'cart',
        methdod: 'GET',
        headers: { token: localStorage.getItem('token') }
      })
        .then(result => {
          this.cartData = result.data
          this.items = result.data
        })
    },
    formatter (value) {
      const format = `Rp. ${new Intl.NumberFormat().format(value)}`
      return format
    },
    deletecart (id) {
      this.$axios({
        url: `cart/${id}`,
        method: 'DELETE',
        headers: { token: localStorage.getItem('token') }
      })
        .then(result => {
          this.loadCart()
        })
    },
    addQty (el) {
      const data = {
        ProductId: el.ProductId,
        quantity: el.quantity + 1
      }
      this.$axios({
        url: `cart/${el.id}`,
        method: 'PUT',
        headers: { token: localStorage.getItem('token') },
        data
      })
        .then(result => {
          this.loadCart()
        })
    },
    lessQty (el) {
      const data = {
        ProductId: el.ProductId,
        quantity: el.quantity - 1
      }
      if (data.quantity <= 0) {
        this.deletecart(el.id)
      } else {
        this.$axios({
          url: `cart/${el.id}`,
          method: 'PUT',
          headers: { token: localStorage.getItem('token') },
          data
        })
          .then(result => {
            this.loadCart()
          })
      }
    },
    checkOut () {
      this.$axios({
        url: 'cart',
        method: 'PUT',
        headers: { token: localStorage.getItem('token') },
        data: this.cartData
      })
        .then(result => {
          this.loadCart()
        })
    }
  },
  created () {
    this.loadCart()
  }

}
</script>

<style scoped>
img {
  width: auto;
  height: 220px;
  object-fit: cover;
}
.cart-body{
  font-size: 10px;
}
.price{
  color: rgb(228, 109, 11);
  font-weight: 700;
}
.b-icon.bi {
  border: solid 1px rgba(0, 0, 0, 0.397);
  border-radius: 100px
}
.total {
  text-align: left;
}

</style>
