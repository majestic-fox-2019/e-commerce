<template>
  <div class="table-users">
    <button
      @click="goMyProduct"
      class="text-white py-1 px-3 border-b-4 rounded create-product"
    >My Product</button>
    <button class="text-white py-1 px-3 border-b-4 rounded transaction">
      <i class="fas fa-money-bill-wave"></i> Transaction
    </button>
    <table cellspacing="0">
      <tr>
        <th>ID</th>
        <th width="100">Image</th>
        <th>Name</th>
        <th>Quantity</th>
        <th>Subtotal</th>
      </tr>

      <tr v-for="(transaction, index) in transactions" :key="index">
        <td>{{transaction.id}}</td>
        <td>
          <img :src="transaction.Product.image_url" alt />
        </td>
        <td>
          <p class="text-panjang">{{transaction.Product.name}}</p>
        </td>
        <td>
          <p class="text-panjang">{{transaction.qty}}</p>
        </td>
        <td>Rp. {{transaction.subTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}}</td>
      </tr>
    </table>
    <table cellspacing="0">
      <tr>
        <th
          style="text-align:end"
        >Total Harga Product Terjual : Rp. {{total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}}</th>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      transactions: [],
      total: 0
    };
  },
  methods: {
    goMyProduct() {
      this.$router.push("/seller");
    },
    getTransaction() {
      axios({
        url: "https://shopee-azputra.herokuapp.com/transactions",
        method: "GET",
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.transactions = data;
          data.forEach(el => {
            this.total += el.subTotal;
          });
        })
        .catch(({ response }) => {
          Swal.fire("Error!", response.data.message, "error");
        });
    }
  },
  created() {
    this.getTransaction();
  }
};
</script>

<style lang="scss" scoped>
$baseColor: #937039;
$borderRadius: 10px;
$imageBig: 100px;
$imageSmall: 60px;
$padding: 10px;

body {
  background-color: lighten($baseColor, 30%);
  * {
    box-sizing: border-box;
  }
}

.text-panjang {
  white-space: nowrap;
  width: 350px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.text-panjang:hover {
  overflow: visible;
}

.remove-btn {
  background-color: rgb(255, 71, 71);
  outline: none;
}

.create-product {
  background-color: #ee4d2d;
  outline: none;
  outline: none;
  position: absolute;
  margin-top: 2%;
  margin-left: -14%;
}
.transaction {
  background-color: #ee4d2d;
  outline: none;
  outline: none;
  position: absolute;
  margin-top: 6%;
  margin-left: -14%;
}

.edit-btn {
  background-color: rgb(0, 225, 255);
  outline: none;
}

.header {
  background-color: darken($baseColor, 5%);
  color: white;
  font-size: 1.5em;
  padding: 1rem;
  text-align: center;
  text-transform: uppercase;
}

img {
  border-radius: 50%;
  height: $imageSmall;
  width: $imageSmall;
}

.table-users {
  border-radius: $borderRadius;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.1);
  max-width: calc(100% - 2em);
  margin-left: 15%;
  margin-top: 7%;
  overflow: hidden;
  width: 80%;
}

table {
  width: 100%;

  td,
  th {
    color: darken($baseColor, 10%);
    padding: $padding;
    text-align: center;
  }

  td {
    text-align: center;
    vertical-align: middle;

    &:last-child {
      font-size: 0.95em;
      line-height: 1.4;
      text-align: left;
    }
  }

  th {
    background-color: lighten($baseColor, 50%);
    font-weight: 300;
  }

  tr {
    &:nth-child(2n) {
      background-color: white;
    }
    &:nth-child(2n + 1) {
      background-color: lighten($baseColor, 55%);
    }
  }
}

@media screen and (max-width: 700px) {
  table,
  tr,
  td {
    display: block;
  }

  td {
    &:first-child {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: $imageBig;
    }

    &:not(:first-child) {
      clear: both;
      margin-left: $imageBig;
      padding: 4px 20px 4px 90px;
      position: relative;
      text-align: left;

      &:before {
        color: lighten($baseColor, 30%);
        content: "";
        display: block;
        left: 0;
        position: absolute;
      }
    }
  }

  tr {
    padding: $padding 0;
    position: relative;
    &:first-child {
      display: none;
    }
  }
}

@media screen and (max-width: 500px) {
  .header {
    background-color: transparent;
    color: lighten($baseColor, 60%);
    font-size: 2em;
    font-weight: 700;
    padding: 0;
    text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
  }

  img {
    border: 3px solid;
    border-color: lighten($baseColor, 50%);
    height: $imageBig;
    margin: 0.5rem 0;
    width: $imageBig;
  }

  td {
    &:first-child {
      background-color: lighten($baseColor, 45%);
      border-bottom: 1px solid lighten($baseColor, 30%);
      border-radius: $borderRadius $borderRadius 0 0;
      position: relative;
      top: 0;
      transform: translateY(0);
      width: 100%;
    }

    &:not(:first-child) {
      margin: 0;
      padding: 5px 1em;
      width: 100%;

      &:before {
        font-size: 0.8em;
        padding-top: 0.3em;
        position: relative;
      }
    }

    &:last-child {
      padding-bottom: 1rem !important;
    }
  }

  tr {
    background-color: white !important;
    border: 1px solid lighten($baseColor, 20%);
    border-radius: $borderRadius;
    box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
    margin: 0.5rem 0;
    padding: 0;
  }

  .table-users {
    border: none;
    box-shadow: none;
    overflow: visible;
  }
}
</style>