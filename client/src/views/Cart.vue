<template>
  <div>
    <navbar-user/>
    <div style="margin-top:70px">
      <h2>My Cart</h2>
      <div v-if="dataCart.length > 0">
        <table class="table" >
      <tbody v-for="data in dataCart" :key="data.id">
            <tr >
              <td><img :src="data.image_url" alt="" style="max-height:150px"></td>
              <td>{{data.name}}</td>
              <td>
                <form @submit.prevent="editCart(data.Cart.ProductId, data.Cart.total)">
                  <div class="d-flex">
                    <div class="form-group">
                      <input @change="buttonEdit(data.Cart.ProductId)" type="number" class="form-control" style="max-width:70px" v-model="data.Cart.total" :max="data.stock" min="0">
                    </div>
                    <div v-if="statusButton && activeId == data.Cart.ProductId">
                      <button type="submit" class="btn btn-light" style="margin-left:30px;" title="edit quantity"><i class="far fa-edit"></i></button>
                    </div>
                  </div>
                </form></td>
              <td>{{priceFixed(data.price * data.Cart.total)}}</td>
              <td><button type="button" class="btn btn-dark" title="remove from cart" @click="deleteCart(data.Cart.ProductId)"><i class="far fa-trash-alt"></i></button></td>
            </tr>
      </tbody>
    </table>
      <hr>
      <div class="d-flex justify-content-between">
        <div></div>
        <div></div>
        <div></div>
      <div> Subtotal</div>
      <div></div>
      <div> {{priceFixed(total)}}</div>
      <div></div>
      </div>
      <hr>
    <div class="container" v-if="!statusButton">
    <button type="button" class="btn btn-success btn-lg btn-block" title="chekout!" @click="checkOut()"><i class="fas fa-shopping-basket"></i> Check Out!</button>
    </div>
      </div>

      <div v-else>
        <h1>..Your Cart Still Empty..</h1>
        <img src="../assets/BPmy.gif" alt="">
      </div>
    

    </div>
  </div>
</template>

<script>
import NavbarUser from '../components/NavbarUser.vue'
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
name: 'Cart',
  components: {
    NavbarUser
  },
  data(){
    return{
      dataCart:null,
      statusButton:false,
      activeId:null,
      total:null,
      name:null,
      phone_number:null,
      address:null,
      email:null,
      receipt:null
    }
  },
  methods:{
    getCart(){
      axios({
        url:`http://localhost:3000/products-user`,
        method: "GET",
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then(res => {
        this.dataCart = res.data.Products
        let subTot = 0
        this.dataCart.forEach(cart => {
          subTot += cart.Cart.total * cart.price
        });
        this.total = subTot
        console.log(res.data.Products)
      })
      .catch(err => {
        console.log(err.response)
        if(err.response.status == 401){
          this.$router.push('/user')
        }
      })
    },
     priceFixed(money){
      let result = 'Rp. '
      result += (money).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
      return result
    },
    deleteCart(id) {
      Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        axios({
        url:`http://localhost:3000/products/${id}`,
        method:"DELETE",
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then(res => {
        console.log(res, "berhasil delete")
        this.getCart()
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      })
      .catch(err => {
        console.log(err.response)
      })}
    })
      
    },
    buttonEdit(id){
      this.statusButton = true
      this.activeId = id
    },
    editCart(id, total) {
      axios({
        url:`http://localhost:3000/products/${id}`,
        method:"PUT",
        headers: {
          token: localStorage.getItem("token")
        },
        data:{
          total:total
        }
      })
      .then(res => {
        console.log("berhasil update", res)
        this.getCart()
        this.statusButton = false
        Swal.fire({
        icon: 'success',
        title: 'Quantity product updated',
        showConfirmButton: false,
        timer: 1500
      })
      })
      .catch(err => {
        console.log(err.response)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data.msg
        })
        total = 0
      })
    },
    checkOut(){
      let receipt = `
      Name: ${this.name}<br>
      Address: ${this.address}<br>
      Phone number: ${this.phone_number}<br>
      Email: ${this.email}<br><hr>`
      if(this.dataCart.length > 0){
        this.getReceipt()
        this.receipt = this.getReceipt()
        receipt += this.receipt
      } else {
        receipt += "..Your cart is empty.."
      }
       Swal.fire({
        title: 'Checkout Receipt',
        html: receipt,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, checkout!',
        width: 800
      })
      .then(res => {
        if(res.value) {
          axios({
            url:`http://localhost:3000/products`,
            method:'PATCH',
            headers: {
              token: localStorage.getItem("token")
            }
          })
          .then(res => {
            console.log(res.data, "checkout cuy")
            this.sendEmail()
            this.getCart()
          })
          .catch(err => {
            console.log(err.response)
          })
        }
      })
    },
    getReceipt(){
      let receipt = ''
      receipt += `<table style="width:100%">
                      <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                      </tr>`
        this.dataCart.forEach(el => {
          receipt += `<tr><td>${el.name}</td>
          <td>${el.Cart.total} pcs</td>
          <td>${this.priceFixed(el.Cart.total*el.price)}</td></tr>`
          })
           receipt += `</table><hr> Subtotal : ${this.priceFixed(this.total)}`
          return receipt
    },
    userLogin(){
      this.name = localStorage.getItem("name")
      this.address = localStorage.getItem("address")
      this.phone_number = localStorage.getItem("phone_number")
      this.email = localStorage.getItem("email")
    },
    sendEmail(){
      axios({
        method:"POST",
        url: "http://localhost:3000/send-email",
        headers: {
              token: localStorage.getItem("token")
        },
        data: {
          email: 'fadhilahrayafi@gmail.com',
          inputText: `Hello ${this.name}<br>
          We are fron Skin-Type want to inform you about your transaction in our shop<br>
          Here is a detail about your order: <br>
          Name: ${this.name}<br>
          Address: ${this.address}<br>
          Phone number: ${this.phone_number}<br>
          Email: ${this.email}<br><hr>
          ${this.receipt}<hr><br>
          Please complete the transaction by paying to<br>
          <img src="../assets/visa.webp" alt="" style="max-height:10px; margin-left:2px">
          <img src="../assets/Master-Card-Blue-icon.png" alt="" style="max-height:10px; margin-left:2px"><br>
          Thank You for your purchase!`
        }

      })
    }
  },
  mounted(){
    this.getCart()
    this.userLogin()
  }
}
</script>

<style>
</style>