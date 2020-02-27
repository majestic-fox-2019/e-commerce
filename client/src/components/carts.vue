<template>
  <div class="container">
    <div class="card shopping-cart">
      <div class="card-header bg-dark text-light">
        <div class="row">
          <div class="col">
            <i class="fa fa-shopping-cart mr-2" aria-hidden="true"></i>
            My Cart
          </div>
          <div class="col">
            <button @click="goHistory" class="btn-konfirmasi">History Shoping</button>
          </div>
        </div>
      </div>
      <div class="card-body" v-for="(cart, index) in $store.state.carts" :key="index">
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
          <div class="col-12 text-sm-center col-sm-12 text-md-left col-md-6">
            <h4 class="product-name">
              <strong>{{cart.Product.title}}</strong>
            </h4>
            <h4>
              <small>{{cart.Product.description}}</small>
            </h4>
          </div>
          <div class="col-12 col-sm-12 text-sm-center col-md-4 text-md-right row">
            <div class="col-3 col-sm-3 col-md-6 text-md-right" style="padding-top: 5px">
              <h6>
                <strong>
                  Rp. {{(cart.Product.price*cart.qty).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}}
                  <span
                    class="text-muted"
                  >x</span>
                </strong>
              </h6>
            </div>
            <div class="col-4 col-sm-4 col-md-4">
              <div class="quantity">
                <input
                  @click="plus(cart.Product.id, cart.qty, cart.id)"
                  type="button"
                  value="+"
                  class="plus"
                />
                <input type="number" min="1" v-model="cart.qty" title="Qty" class="qty" disabled />
                <input
                  @click="min(cart.Product.id, cart.qty, cart.id)"
                  type="button"
                  value="-"
                  class="minus"
                />
              </div>
            </div>
            <div class="col-2 col-sm-2 col-md-2 text-right">
              <button @click="removeCart(cart.id)" class="btn-remove">
                <i class="fa fa-trash" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
        <hr />
      </div>
      <div class="card-footer">
        <div class="coupon col-md-5 col-sm-5 no-padding-left pull-left">
          <div class="row">
            <div class="col">
              <input type="text" class="form-control" placeholder="cupone code" />
            </div>
            <div class="col">
              <input type="submit" class="btn btn-dark" value="Use cupone" />
            </div>
          </div>
        </div>
        <div class="col">
          <div style="margin: 5px;margin-left: 35%;">
            Total price:
            <b>Rp.{{totalBelanja.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}}</b>
          </div>
        </div>
        <div class="pull-right" style="margin: 10px">
          <button @click="checkout" class="btn-checkout">Checkout</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      cadanganCart: [],
      totalBelanja: 0,
      hargaItem: 0
    };
  },
  created() {
    this.findAllCart();
  },
  methods: {
    findAllCart() {
      axios({
        url: `https://shopee-azputra.herokuapp.com/carts`,
        method: "GET",
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.totalBelanja = 0;
          this.hargaItem = 0;
          this.cadanganCart = data;
          this.$store.state.carts = data;
          this.cadanganCart.forEach(el => {
            this.hargaItem = el.qty * el.Product.price;
            this.totalBelanja += this.hargaItem;
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
    },
    removeCart(id) {
      this.$store.dispatch("removeCartUser", id);
    },
    min(productId, quantity, cartId) {
      axios({
        url: `https://shopee-azputra.herokuapp.com/carts/${cartId}`,
        method: "PUT",
        data: {
          productId,
          qty: (quantity -= 1)
        },
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.findAllCart();
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
            this.$router.push("/account");
          } else {
            Swal.fire("Error!", response.data.message, "error");
          }
        });
    },
    plus(productId, quantity, cartId) {
      axios({
        url: `https://shopee-azputra.herokuapp.com/carts/${cartId}`,
        method: "PUT",
        data: {
          productId,
          qty: (quantity += 1)
        },
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.findAllCart();
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
            this.$router.push("/account");
          } else {
            Swal.fire("Error!", response.data.message, "error");
          }
        });
    },
    checkout() {
      axios({
        url: `https://shopee-azputra.herokuapp.com/carts/checkout`,
        method: "PUT",
        data: {
          cartCheckout: this.$store.state.carts
        },
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Success Checkout Check History",
            showConfirmButton: false,
            timer: 1500
          });
          this.findAllCart();
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
            this.$router.push("/account");
          } else {
            Swal.fire("Error!", response.data.message, "error");
          }
        });
    },
    goHistory() {
      this.$router.push("history");
    }
  }
};
</script>

<style scoped>
.btn-konfirmasi {
  float: right;
  top: -5px;
  display: block;
  padding: 0 15px;
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
  height: 3.5vh;
}
.btn-checkout {
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