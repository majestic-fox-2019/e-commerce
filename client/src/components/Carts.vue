<template>
<div>
  <Navbar></Navbar>
<div class="container pt-3">
<b-list-group class="d-flex justify-content-start" v-if="showCart">
  <b-list-group-item v-for="cart in allCart" :key="cart.id"
  class="col-12 d-flex justify-content-between align-items-center">
    <div class="col-6 d-flex justify-content-start">
      <div class="">
        <img :src="`${cart.Product.image_url}`" class="img"/>
      </div>
      <div class="text-left">
        <h4 class="">{{cart.Product.name}}</h4>
        <h5>{{formatPrice(cart.Product.price)}}</h5>
      </div>
    </div>
    <div class="col-2 d-flex justify-content-between align-items-center">
      <div class="p-1 m-1">
        <b-button variant="outline-danger" class="mb-2" size="sm"
          @click.prevent="deleteCart(cart)">
          <b-icon-trash class="h3 m-0 p-0"></b-icon-trash>
        </b-button>
      </div>
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <b-button variant="outline-info" class="mb-2" size="sm"
          @click.prevent="decrementQty(cart)">
            <b-icon-dash class="h3 m-0 p-0"></b-icon-dash>
          </b-button>
        </div>
        <div>
          <b-card class="p-0 m-0">{{cart.quantity}}</b-card>
        </div>
        <div>
          <b-button variant="outline-info" class="mb-2" size="sm"
          @click.prevent="incrementQty(cart)">
            <b-icon-plus class="h3 m-0 p-0"></b-icon-plus>
          </b-button>
        </div>
      </div>
    </div>
    <b-card class="col-3">
      <div> {{formatPrice(cart.quantity * cart.Product.price)}} </div>
    </b-card>
  </b-list-group-item>
    <b-card class="d-flex justify-content-end align-items-center align-content-end">
      <div>Total Belanja</div>
      <div class="h3">{{formatPrice(total)}}</div>
      <b-button @click.prevent="checkout(allCart)"><div class="h3">Checkout</div></b-button>
    </b-card>
</b-list-group>
</div>
</div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'Carts',
  components: {
    Navbar,
  },
  data() {
    return {
      // carts: this.$store.state.carts,
      total: null,
      showCart: true,
    };
  },
  methods: {
    formatPrice(value) {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
    },
    incrementQty(cart) {
      const data = { quantity: cart.quantity + 1 };
      this.$axios
        .patch(`/carts/${cart.id}`, data, {
          headers: {
            token: localStorage.getItem('token'),
          },
        })
        .then(() => {
          this.$store.dispatch('getAllCarts');
        })
        .catch((err) => {
          console.log('masuk err');
          console.log(err);
        });
    },
    decrementQty(cart) {
      const data = { quantity: cart.quantity - 1 };
      this.$axios
        .patch(`/carts/${cart.id}`, data, {
          headers: {
            token: localStorage.getItem('token'),
          },
        })
        .then(() => {
          this.$store.dispatch('getAllCarts');
        })
        .catch((err) => {
          console.log('masuk err');
          console.log(err);
        });
    },
    deleteCart(cart) {
      this.$Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      })
        .then((result) => {
          if (result.value) {
            this.$axios
              .delete(`/carts/${cart.id}`, {
                headers: {
                  token: localStorage.getItem('token'),
                },
              })
              .then(() => {
                this.$store.dispatch('getAllCarts');
                this.$Swal.fire(
                  'Deleted!',
                  'Product has been deleted.',
                  'success',
                );
              })
              .catch((err) => {
                this.$Swal.fire(
                  'Deleted!',
                  `${err}.`,
                  'error',
                );
              });
          }
        });
    },
    checkout(allCart) {
      console.log(allCart);
      this.$axios
        .post('/carts/checkout', allCart, {
          headers: {
            token: localStorage.getItem('token'),
          },
        })
        .then(() => {
          console.log('masuk then');
          this.$Swal.fire(
            'Checkout Success',
            'Youre transaction Successfull.',
            'success',
          );
          // this.$store.state.allCarts = null;
          // this.allCart = null;
          this.showCart = false;
        })
        // .then(() => {
        //   // eslint-disable-next-line no-unused-expressions
        //   this.allCart;
        // })
        .catch((err) => {
          this.$Swal.fire(
            'Transaction Failed!',
            `${err}.`,
            'error',
          );
        });
    },
  },
  computed: {
    allCart() {
      return this.$store.state.allCarts;
    },
  },
  beforeCreate() {
    this.$store.dispatch('getAllCarts');
  },
  updated() {
    this.$store.dispatch('getAllCarts');
  },
  watch: {
    allCart() {
      let total = 0;
      this.allCart.forEach((el) => {
        total += el.quantity * el.Product.price;
      });
      this.total = total;
    },
  },
};
</script>

<style scoped>
.img{
  height: 20vh;
}
</style>
