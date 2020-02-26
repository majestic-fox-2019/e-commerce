<template>
  <div id="body-table-cart">
    <div id="cart-table">
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Nama Barang</th>
            <th scope="col">Image</th>
            <th scope="col">Harga</th>
            <th scope="col">Qty</th>
            <th scope="col">Jumlah Harga</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cart in carts" :key="cart.id">
            <td>{{cart.Product.name}}</td>
            <td>
              <img :src="cart.Product.image_url" />
            </td>
            <td>{{idr(cart.Product.price)}}</td>
            <td>{{cart.qty}}</td>
            <td>{{idr(jumlahHarga(cart.qty,cart.Product.price))}}</td>
            <td>
              <div class="btn-group" role="group" aria-label="Basic example">
                <button
                  type="button"
                  class="btn btn-secondary"
                  @click="kuranginQty(cart.id, -1,cart.qty)"
                >
                  <i class="far fa-minus-square"></i>
                </button>
                <button
                  type="button"
                  class="btn btn-secondary"
                  @click="kuranginQty(cart.id, 1,cart.qty)"
                >
                  <i class="far fa-plus-square"></i>
                </button>
                <button type="button" class="btn btn-secondary" @click="deleteCart(cart.id)">
                  <i class="far fa-trash-alt"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- total pembayaran -->
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Total Pembarayan</th>
            <th scope="col">-</th>
            <th scope="col">-</th>

            <th scope="col">{{idr(totalPembayaran)}}</th>
          </tr>
        </thead>
      </table>

      <button type="button" class="btn btn-secondary btn-lg btn-block">Check Out</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import rupiah from "../helper/idr";
const server = "http://localhost:3000";
export default {
  data() {
    return {
      carts: [],
      totalPembayaran: 0
    };
  },
  mounted() {
    this.getAllCart();
  },
  watch: {
    carts() {
      this.totalPembayaran = 0;

      this.carts.forEach(cart => {
        this.totalPembayaran += cart.qty * cart.Product.price;
      });
    }
  },
  methods: {
    idr(value) {
      return rupiah(value);
    },
    getAllCart() {
      axios({
        method: "get",
        url: `${server}/cart`,
        headers: { token: localStorage.token }
      })
        .then(result => {
          this.carts = result.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    jumlahHarga(paramQty, paramsPrice) {
      let total = Number(paramQty) * Number(paramsPrice);

      return total;
    },
    kuranginQty(id, value, currentNum) {
      let numNow = Number(value) + Number(currentNum);
      if (numNow < 1) {
        this.getAllCart();
      } else {
        axios({
          method: "patch",
          url: `${server}/cart/${id}`,
          headers: { token: localStorage.token },
          data: {
            value
          }
        })
          .then(result => {
            this.getAllCart();
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    deleteCart(id) {
      Swal.fire({
        title: "Apakah anda yakin?",
        // text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#000",
        cancelButtonColor: "#000",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          Swal.fire("sudah di hapus");
          axios({
            method: "delete",
            url: `${server}/cart/${id}`,
            headers: { token: localStorage.token }
          })
            .then(result => {
              this.getAllCart();
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    }
  }
};
</script>

<style scoped>
#body-table-cart {
  align-items: center;
  text-align: center;
}
#cart-table {
  margin: 0 auto;
  width: 100em;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.table {
  margin-top: 2em;
}
.table img {
  width: 10em;
}
</style>