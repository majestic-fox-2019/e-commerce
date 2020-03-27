<template>
  <div>
    <div class="card-deck ">
      <div class="isi" v-for="(data, idx) in showData" :key="idx">
        <div class="card">
          <img
            class="card-img-top"
            :src="data.image_url"
            alt="Card image cap"
            style="width:100%; height:200px;"
          />
          <div class="card-body">
            <h5 class="card-title">{{ data.name }}</h5>
            <p class="card-text">Price: {{ data.price }}</p>
            <p class="card-text">Stock: {{ data.stock }}</p>
            <button
              class="btn btn-outline-primary"
              v-show="data.stock != 0"
              @click="addToCart(data)"
            >
              <i class="fas fa-cart-plus">add to cart</i>
            </button>
            <button class="btn btn-outline-danger" v-show="data.stock == 0">
              <i class="fas fa-times"> Out of stock</i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "cardProduct",
  data() {
    return {
      totalProduct: null
    };
  },
  props: ["category"],
  created() {
    this.$store.dispatch("showData");
    this.$store.dispatch("showCart");
  },
  computed: {
    showData() {
      let array = this.$store.state.dataProducts;
      let result = [];
      if (this.category) {
        for (let i = 0; i < array.length; i++) {
          if (this.category == array[i].Category.name) {
            result.push(array[i]);
          }
        }
        return result;
      }
      return array;
    },
    showCart() {
      return this.$store.state.dataCarts;
    }
  },
  methods: {
    addToCart(data) {
      if (localStorage.token) {
        if (this.checkProduct(data)) {
          this.totalProduct += 1;
          this.updateProduct(data);
        } else {
          this.addProduct(data);
        }
      } else {
        this.$router.push("/login");
      }
    },
    addProduct(data) {
      this.$axios({
        method: "post",
        url: "/cart",
        headers: { token: localStorage.token },
        data: { total: 1, ProductId: data.id }
      })
        .then(() => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500
          });
          this.$store.dispatch("showCart");
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!"
          });
        });
    },
    checkProduct(data) {
      for (let i = 0; i < this.showCart.length; i++) {
        if (this.showCart[i].id == data.id) {
          this.totalProduct = this.showCart[i].Cart.total;
          return true;
        }
      }
      return false;
    },
    updateProduct(data) {
      this.$axios({
        method: "put",
        url: "/cart",
        headers: { token: localStorage.token },
        data: { total: this.totalProduct, ProductId: data.id }
      })
        .then(() => {
          this.totalProduct = null;
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500
          });
          this.$store.dispatch("showCart");
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!"
          });
        });
    }
  }
};
</script>

<style scoped>
.isi {
  margin: 20px;
  width: 250px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.card-deck {
  margin-top: 20px;
  width: 90%;
  margin-left: 70px;
  margin-right: 0px;
}
</style>
