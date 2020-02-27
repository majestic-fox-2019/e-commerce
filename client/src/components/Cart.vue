<template>
  <div>
    <div class="container">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Amount</th>
            <th scope="col">Price</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr class="" v-for="(product,idx) in products" :key="idx">
            <th scope="row">{{idx+1}}</th>
            <td>
            <img :src="product.Product.image_url ? product.Product.image_url : '@/../public/images/no-image.jpg'">
            </td>
            <td>{{product.Product.name}}</td>
            <td>{{product.amount}}</td>
            <td>{{convertIDR(product.Product.price * product.amount)}}</td>
            <td>
              <div>
                <button class="abtn" @click="cartAction(product.ProductId,product.amount,'minus')">-</button>
                <input @keypress="check($event)"  v-model="product.amount" @change="cartAction(product.ProductId,product.amount,'set')">
                <button class="abtn" @click="cartAction(product.ProductId,product.amount,'plus')" >+</button>
              </div>
              <button class="btn btn-danger" @click="removeProduct(product.ProductId)">Remove</button>
            </td>
          </tr>
          <tr class="frow">
            <td colspan="3">Total:</td>
            <td>{{amount}}</td>
            <td>{{convertIDR(price)}}</td>
            <td>
              <button class="btn btn-success" @click="payment">Pay</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2"

export default {
  data() {
    return {
      products: null,
      amount: 0,
      price: 0,
    }
  },
  created() {
    this.load()
    this.$store.dispatch('cart')
  },
  methods: {
    check(event) {
      if(event.keyCode < 48 || event.keyCode > 57) {
        this.load()
      }
    },
    load() {
       this.$axios({
        url: '/cart',
        method: 'get',
        headers: {token: localStorage.getItem('token')},
      })
      .then(products=>{
        this.amount = 0
        this.price = 0
        for(let i = 0; i < products.data.length; i++) {
          this.amount += products.data[i].amount
          this.price += products.data[i].Product.price * products.data[i].amount
        }
        this.products = products.data
      })
      .catch(error=>{
        if(error.response.data.error == "invalid token") {
          this.$router.push({name: 'main'})
        }
      })
    },
    removeProduct(id) {
      Swal.fire({
        title: `Are you sure want to remove this item from your cart?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.value) {  
          this.$axios({
          url: `/cart`,
          method: 'delete',
          headers: {token: localStorage.getItem('token')},
          data: {
            ProductId: id
          }
        })
          .then(deleted=>{
            this.$swal.success('product removed from your cart')
            this.$store.dispatch('cart')
            this.load()
            console.log(deleted)
          })
          .catch(error=>{
            console.log(error)
          })
        }
      })
    },
    convertIDR(num) {
      return this.$idr.convert(num)
    },
    cartAction(id,amount,action) {
      if(action == "minus" && amount == 1 || amount == 0) {
        this.removeProduct(id)
      }else {
        this.$axios({
          url: `/cart`,
          method: 'patch',
          headers: {token: localStorage.getItem('token')},
          data: {
            ProductId: id,
            amount,
            action
          }
        })
          .then(product=>{
            this.load()
            this.$store.dispatch('cart')
            console.log(product)
          })
          .catch(error=>{
            this.$swal.error(error.response.data.error)
            console.log(error.response)
          })
      }
    },
    payment() {
      Swal.fire({
        title: `Are you sure want to proceed payment?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.value) {
          this.$axios({
            url: `/cart/payment`,
            method: 'delete',
            headers: {token: localStorage.getItem('token')},
          })
            .then(product=>{
              this.$swal.success('Thank You')
              this.load()
              console.log(product.data.stock)
            })
            .catch(error=>{
              this.$swal.error(error.response.data.error[0])
            })
        }
      })
    }
  }
}
</script>

<style scoped>
.container {
  margin-top: 20px;
}
img {
  height: 100px;
  width: 100px;
}
.abtn {
  background-color: #b9b6b6;
  border-radius: 2px;
  padding: 2px;
  font-size: 15px;
  margin: 2px;
  width: 22px;
}
.abtn:hover {
  background-color: rgb(85, 219, 73);
}
th, td {
  text-align: center;
  vertical-align: inherit;
}
.btn-danger {
  margin-top: 5px;
  font-size: 13px;
  padding: 3px;
}
.frow {
  background-color: beige;
}
input {
  height: 25px;
  width: 25px;
  border-radius: 2px;
  padding: 2px;
  background-color: rgb(183, 197, 197);
}
</style>