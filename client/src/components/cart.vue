<template>
  <div>
    <div v-if="carts">
      <div class="allcart" v-if="carts.length !== 0">
        <div class="row">
          <div class="col-1"></div>
          <div class="col-10">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Image</th>
                  <th scope="col">Name</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(data,idx) in carts" :key="idx">
                  <td>
                    <img class="bild" :src="data.image_url" />
                  </td>
                  <td>{{data.name}}</td>
                  <td>{{data.Cart.quantity}}</td>
                  <td>{{getmoney(data.price)}}</td>
                  <td>
                    <i
                      @click="deleteCart(data.id,data.Cart.ProductId, data.Cart.UserId)"
                      class="fas fa-trash-alt but"
                    ></i>
                  </td>
                </tr>
              </tbody>
              <tbody>
                <td></td>
                <td></td>
                <td>
                  <h3>SUBTOTAL</h3>
                </td>
                <td>
                  <H3>{{getmoney(getTotal)}}</H3>
                </td>
                <td></td>
              </tbody>
            </table>
          </div>
          <div class="col-1"></div>
        </div>
        <div class="row">
          <div class="col-1"></div>
          <div class="col-10">
            <button @click="checkout" type="button" class="btn btn-primary btn-lg">Check Out</button>
          </div>
          <div class="col-1"></div>
        </div>
      </div>
      <div class="emptycart" v-if="carts.length === 0">
        <div class="jumbotron" style="padding:200px; height:90.5vh; margin-bottom:0">
          <h1>CART IS EMPTY</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      carts: null,
      sum: 0
    };
  },
  methods: {
    countTotal() {
      let total = 0;
      if (this.carts) {
        for (let i = 0; i < this.carts.length; i++) {
          total += Number(this.carts[i].price);
        }
        this.sum = total;
        console.log(total);
        console.log(this.carts);
      }
      return this.sum;
    },
    getmoney(money) {
      return this.$currencyMaker(money);
    },
    getAllData() {
      axios({
        method: "GET",
        url: `http://localhost:3000/carts`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(data => {
          this.carts = data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteCart(id, userid, productid) {
      this.$Swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        })
        .then(result => {
          if (result.value) {
            axios({
              method: "DELETE",
              url: `http://localhost:3000/carts/${id}`,
              data: {
                UserId: userid,
                ProductId: productid
              },
              headers: {
                token: localStorage.getItem("token")
              }
            })
              .then(res => {
                this.getAllData();
              })
              .catch(error => {
                console.log(error);
              });
            this.$Swal.fire(
              "Deleted!",
              "Your file has been deleted.",
              "success"
            );
          }
        });
    },
    checkout() {
      axios({
        method: "DELETE",
        url: "http://localhost:3000/carts",
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(response => {
          this.$Swal.fire("Good job!", "You clicked the button!", "success");
          this.$router.push({ name: "Home" });
        })
        .catch(error => {
          this.$Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${error.response.data.message}`
          });
        });
    }
  },
  computed: {
    getTotal() {
      return this.countTotal();
    }
  },
  created() {
    this.getAllData();
  }
};
</script>
<style scoped>
.bild {
  height: 80px;
}
.allcart {
  padding: 30px;
  height: 100vh;
}
.but {
  cursor: pointer;
}
</style>