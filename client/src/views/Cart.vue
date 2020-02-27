<template>
<div>
  <div style="display: flex; justify-content: center;">
    <div style="margin-top: 30px" v-if="carts.length == 0">
      <h1>Add to cart some product</h1>
      <img src="https://cdn.dribbble.com/users/812639/screenshots/6486869/shooping_1-800x600.gif" style="width: 80%;">
    </div>
<table class="table" v-if="carts.length > 0">
  <thead class="thead-light">
    <tr>
      <th scope="col">No</th>
      <th scope="col">Image</th>
      <th scope="col">Name</th>
      <th scope="col">Price</th>
      <th scope="col">Amount</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(cart, idx) in carts" :key="idx">
      <th scope="row">{{idx + 1}}</th>
      <td><img :src="`${cart.image_url}`" style="width: 20vw; height: 15vw"></td>
      <td>{{cart.name}}</td>
      <td>{{totalPrice(cart.price, cart.Cart.amount)}}</td>
      <td>
        <form @submit.prevent="updateAmount(cart.id, cart.Cart.amount)">
          <input @change="updateButtonStatus(cart.id)"
          @keyup="updateButtonStatus(cart.id)" type="number" v-model="cart.Cart.amount"
        id="quantity" name="quantity" min="1" max="30">
        <div v-if="updateButton && cart.id == activeId">
        <hr>
        <button type="submit" class="btn btn-primary">
        Update</button>
        </div>
        </form>
      </td>
      <td><button @click="deleteCart(cart.id)" type="button" class="btn btn-primary">
        <i class="fas fa-trash"></i></button></td>
    </tr>
  </tbody>
  <tbody>
    <tr>
      <th></th>
      <td></td>
      <td></td>
      <td></td>
      <td>Subtotal</td>
      <td><h3>{{this.$formatterRupiah(total)}}</h3></td>
    </tr>
  </tbody>
</table>
  </div>
  <div @click="checkout" class="checkout" v-if="carts.length > 0">
  <hr>
  <div class="vld-parent">
  <loading :active.sync="isLoading" 
  :can-cancel="true" 
  :loader="'bars'" :color="'#1161EE'"></loading>
  </div>
<button>Checkout</button>
</div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: 'Cart',
  components: {
    Loading,
  },
  data() {
    return {
      isLoading: false,
      carts: [],
      updateButton: false,
      amount: null,
      activeId: null,
      total: null,
    };
  },
  methods: {
    updateButtonStatus(id) {
      this.updateButton = true;
      this.activeId = id;
    },
    updateAmount(id, amountChange) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      }).then((result) => {
        this.isLoading = true;
        if (result.value) {
          this.$axios.put(`/carts/${id}`, {
            amount: amountChange,
          }, { headers: { token: localStorage.token } })
            .then(() => {
              this.isLoading = false;
              this.updateButton = false;
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: `Succesfully updated amount to ${amountChange}`,
                showConfirmButton: false,
                timer: 1200,
              });
              this.listCart();
            })
            .catch((err) => {
              this.isLoading = false;
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: "Amount can't be empty",
                showConfirmButton: false,
                timer: 1200,
              });
              console.log(err.response);
              this.listCart();
            });
        } else {
          this.isLoading = false;
        }
      });
    },
    listCart() {
      this.isLoading = true;
      this.$axios.get('/carts', { headers: { token: localStorage.token } })
        .then((cart) => {
          this.isLoading = false;
          let harga = 0;
          cart.data.forEach((price) => {
            harga += (price.price * price.Cart.amount);
          });
          this.total = harga;
          this.carts = cart.data;
        })
        .catch((err) => {
          this.isLoading = false;
          console.log(err, 'masuk');
        });
    },
    totalPrice(price, amount) {
      return this.$formatterRupiah(price * amount);
    },
    deleteCart(id) {
      Swal.fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        this.isLoading = true;
        if (result.value) {
          this.$axios.delete(`/carts/${id}`, { headers: { token: localStorage.token } })
            .then((msg) => {
              this.isLoading = false;
              console.log(msg);
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: msg.data.message,
                showConfirmButton: false,
                timer: 1200,
              });
              this.listCart();
            })
            .catch((err) => {
              this.isLoading = false;
              console.log(err);
            });
        } else {
          this.isLoading = false;
        }
      });
    },
    checkout() {
      let tableCheckout = `Name: ${localStorage.name}
      <br>
      <br>
        <table style="width: 100%;">
          <tr>
            <th>Product</th>
            <th>Amount</th>
            <th>Price</th>
          </tr>`;
      this.carts.forEach((cart) => {
        tableCheckout += `<tr>
        <td>${cart.name}</td>
        <td>${cart.Cart.amount}</td>
        <td>${this.totalPrice(cart.price, cart.Cart.amount)}</td></tr>`;
      });
      tableCheckout += `
      </table>
      <hr>
      Subtotal = ${this.$formatterRupiah(this.total)}`;
      Swal.fire({
        title: 'Are you sure?',
        html: tableCheckout,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Checkout Now!',
      }).then((result) => {
        this.isLoading = true;
        if (result.value) {
          this.$axios.post('/transactions', {
            total: this.total,
          }, { headers: { token: localStorage.token } })
            .then((msg) => {
              this.isLoading = false;
              Swal.fire(
                'Success!',
                `${msg.data.message}`,
                'success',
              );
              this.listCart();
              this.$router.push({ name: 'Transactions' });
              this.$store.dispatch('listProducts');
            })
            .catch((err) => {
              this.isLoading = false;
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: err.response.data.message,
                showConfirmButton: false,
                timer: 1200,
              });
            });
        } else {
          this.isLoading = false;
        }
      });
    },
  },
  created() {
    this.listCart();
  },
};
</script>

<style scoped>
table {
  width: 80%;
}

.checkout {
  margin-bottom: 20px;
}
</style>
