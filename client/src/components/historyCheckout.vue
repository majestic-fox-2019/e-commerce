<template>
  <div class="container">
    <div class="card shopping-cart">
      <div class="card-header bg-dark text-light">
        <div class="row">
          <div class="col">
            <i class="fa fa-shopping-cart mr-2" aria-hidden="true"></i>
            My History
          </div>
        </div>
      </div>
      <div class="card-body" v-for="(cart, index) in $store.state.history" :key="index">
        <div class="row">
          <div class="col-12 col-sm-12 col-md-2 text-center">
            <img
              class="img-responsive"
              :src="cart.Product.image_url"
              alt="prewiew"
              width="120"
              height="80"
            />
          </div>
          <div class="col text-sm-center text-md-left">
            <h4 class="product-name"></h4>
            <h4>
              <small>{{cart.Product.name}}</small>
            </h4>
            <small>qty : {{cart.qty}}</small>
          </div>
          <div class="col">
            <div style="margin: 5px;">
              Price:
              <b>Rp.{{(cart.Product.price*cart.qty).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}}</b>
            </div>
          </div>
          <div v-if="cart.status === 'Process'" class="pull-right" style="margin: 10px">
            <button
              @click="goCompleted(cart.id), addTransaction(cart)"
              class="btn-konfirmasi"
            >item arrived</button>
          </div>
          <div v-if="cart.status === 'Completed'" class="pull-right" style="margin: 10px">
            <h4 class="btn-konfirmasi">Completed</h4>
          </div>
        </div>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  created() {
    this.findAllHistory();
  },
  methods: {
    findAllHistory() {
      axios({
        url: `https://shopee-azputra.herokuapp.com/carts/onProcess`,
        method: "GET",
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.$store.state.history = data;
        })
        .catch(({ response }) => {
          if (response.data.message === "Unauthorized Invalid Token") {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Please Login First",
              showConfirmButton: false,
              timer: 1500
            });
          } else {
            Swal.fire("Error!", response.data.message, "error");
          }
        });
    },
    goCompleted(id) {
      axios({
        url: `https://shopee-azputra.herokuapp.com/carts/complete/${id}`,
        method: "PUT",
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(() => {
          this.findAllHistory();
        })
        .catch(({ response }) => {
          if (response.data.message === "Unauthorized Invalid Token") {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Please Login First",
              showConfirmButton: false,
              timer: 1500
            });
          } else {
            Swal.fire("Error!", response.data.message, "error");
          }
        });
    },
    addTransaction(cart) {
      axios({
        url: `https://shopee-azputra.herokuapp.com/transactions`,
        method: "POST",
        data: {
          cart
        },
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(() => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Thank You For Buying",
            showConfirmButton: false,
            timer: 1500
          });
        })
        .catch(({ response }) => {
          if (response.data.message === "Unauthorized Invalid Token") {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Please Login First",
              showConfirmButton: false,
              timer: 1500
            });
          } else {
            Swal.fire("Error!", response.data.message, "error");
          }
        });
    }
  }
};
</script>

<style scoped>
.card-body {
  padding: 1rem !important;
}
.btn-konfirmasi {
  float: right;
  position: relative;
  top: -5px;
  display: block;
  padding: 10px 10px;
  border-radius: 3px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #fff;
  font-weight: bold;
  text-decoration: none;
  font-size: 15px;
  text-shadow: 0 -1px 1px rgba(0, 0, 0, 0.4);
  background: #ee4d2d;
  transition: background-position 0.2s ease-in;
  box-shadow: 0 3px 0 #e04b2dda;
  outline: none;
  height: 6.5vh;
}
.pull-right {
  display: flex;
  flex-direction: column-reverse;
}
.quantity {
  float: left;
  margin-right: 15px;
  background-color: #eee;
  position: relative;
  width: 80px;
  overflow: hidden;
}

.quantity input {
  margin: 0;
  text-align: center;
  width: 15px;
  height: 15px;
  padding: 0;
  float: right;
  color: #000;
  font-size: 20px;
  border: 0;
  outline: 0;
  background-color: #f6f6f6;
}

.quantity input.qty {
  position: relative;
  border: 0;
  width: 100%;
  height: 40px;
  padding: 10px 25px 10px 10px;
  text-align: center;
  font-weight: 400;
  font-size: 15px;
  border-radius: 0;
  background-clip: padding-box;
}

.quantity .minus,
.quantity .plus {
  line-height: 0;
  background-clip: padding-box;
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  border-radius: 0;
  color: #bbb;
  font-size: 20px;
  position: absolute;
  height: 50%;
  border: 0;
  right: 0;
  padding: 0;
  width: 25px;
  z-index: 3;
}

.quantity .minus:hover,
.quantity .plus:hover {
  background-color: #dad8da;
}

.quantity .minus {
  bottom: 0;
}
.shopping-cart {
  margin-top: 20px;
}
.card-footer {
  display: flex;
  justify-content: space-between;
}
.btn-remove {
  float: right;
  position: relative;
  display: block;
  padding: 10px 10px;
  border-radius: 99999em;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #fff;
  font-weight: bold;
  text-decoration: none;
  font-size: 15px;
  text-shadow: 0 -1px 1px rgba(0, 0, 0, 0.4);
  background: #f00000;
  transition: background-position 0.2s ease-in;
  box-shadow: 0 3px 0 #ff2a00b7;
  outline: none;
  height: 6.2vh;
}
</style>