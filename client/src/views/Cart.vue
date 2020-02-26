<template>
  <div>
    <!-- <h1>Halo dari cart</h1> -->

    <div class="row p-3">
      <div class="col-8 mt-4" v-if="myCarts.length > 0">
        <cart-card
          v-for="(oneCart, i) in myCarts"
          :key="i"
          :cartDetail="oneCart"
          @updatedCart="getCart"
        ></cart-card>
      </div>
      <div class="col-8 mt-4" v-if="myCarts.length == 0">
        <h1>Your Cart is empty..</h1>
      </div>
      <div class="col-4 mt-4">
        <b-card tag="article" style="max-width: 20rem;" class="mb-2">
          <b-card-text>
            <h4 class="divide">Ringkasan Belanja</h4>
          </b-card-text>
          <b-card-text>
            <div class="row">
              <div class="col-6">
                <p class="total">Total Belanja</p>
              </div>
              <div class="col-6">
                <p class="hargaTot">{{totalNya}}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <p class="total">Ongkos kirim</p>
              </div>
              <div class="col-6">
                <p class="hargaTot" v-text="ongkosKirim"></p>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <p class="total">Total</p>
              </div>
              <div class="col-6">
                <p class="hargaTot" v-text="totalBagus"></p>
              </div>
            </div>
          </b-card-text>
          <div v-if="myCarts.length > 0">
            <div class="row mx-auto">
              <el-form ref="form" label-width="120px" size="mini">
                <b-spinner v-if="loading" variant="danger" type="grow"></b-spinner>
                <el-form-item label="Kirim ke">
                  <el-select
                    @change="cekOngkir"
                    v-model="region"
                    placeholder="please select your zone"
                  >
                    <el-option label="Bandung" value="22"></el-option>
                    <el-option label="Bali" value="32"></el-option>
                    <el-option label="Yogyakarta" value="39"></el-option>
                    <el-option label="DKI Jakarta" value="151"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
            <b-button class="w-100" variant="primary" @click="checkout">Checkout</b-button>
          </div>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
import CartCard from "../components/CartCard.vue";
export default {
  name: "Cart",
  data() {
    return {
      // totalPrice: 0
      region: null,
      ongkir: 0,
      baseUrl: this.$store.state.baseUrl,
      loading: false
    };
  },
  components: {
    CartCard
  },
  methods: {
    getCart() {
      this.$store.dispatch("getMyCart");
    },
    checkout() {
      if (!this.region) {
        Swal.fire("Oops", "Please input where to send your product", "error");
      } else {
        this.$store.dispatch("checkout").then(() => {
          this.getCart();
        });
      }
    },
    cekOngkir() {
      // alert("change");
      this.loading = true;
      axios({
        method: "POST",
        url: `${this.baseUrl}/carts/ongkir/berapa`,
        data: {
          destination: this.region
        }
      })
        .then(({ data }) => {
          // console.log(data, "<< ini ongkirnya");
          this.ongkir = data;
          this.loading = false;
        })
        .catch(() => {
          // console.log(err, "<< ini error");
          Swal.fire("Oops", "Something is wrong", "error");
          this.loading = false;
        });
    }
  },
  computed: {
    myCarts() {
      if (this.$store.state.myCarts == null) {
        this.getCart();
        return "loading";
      } else {
        return this.$store.state.myCarts;
      }
    },
    totalBelanja() {
      let totalB = 0;
      if (this.$store.state.myCarts == null) {
        return "loading";
      } else {
        for (let j of this.myCarts) {
          totalB += j.totalPrice;
        }
      }
      totalB += this.ongkir;
      return totalB;
    },
    totalBagus() {
      let angka = this.totalBelanja;

      var rupiah = "";
      var angkarev = angka
        .toString()
        .split("")
        .reverse()
        .join("");
      for (var i = 0; i < angkarev.length; i++)
        if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + ".";
      return (
        "Rp. " +
        rupiah
          .split("", rupiah.length - 1)
          .reverse()
          .join("") +
        ",00"
      );
    },
    totalNya() {
      let total = 0;
      if (this.$store.state.myCarts == null) {
        return "loading";
      } else {
        for (let i of this.myCarts) {
          total += i.totalPrice;
        }
        // return total;
        let angka = total;

        var rupiah = "";
        var angkarev = angka
          .toString()
          .split("")
          .reverse()
          .join("");
        for (var i = 0; i < angkarev.length; i++)
          if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + ".";
        return (
          "Rp. " +
          rupiah
            .split("", rupiah.length - 1)
            .reverse()
            .join("") +
          ",00"
        );
      }
    },
    ongkosKirim() {
      let angka = this.ongkir;

      var rupiah = "";
      var angkarev = angka
        .toString()
        .split("")
        .reverse()
        .join("");
      for (var i = 0; i < angkarev.length; i++)
        if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + ".";
      return (
        "Rp. " +
        rupiah
          .split("", rupiah.length - 1)
          .reverse()
          .join("") +
        ",00"
      );
    }
  },
  mounted() {
    this.getCart();
    if (!localStorage.getItem("token")) {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.divide {
  text-align: left;
  font-weight: bold;
  font-size: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid lightgray;
}

.total {
  text-align: left;
  font-size: 18px;
}

.hargaTot {
  font-weight: bold;
  text-align: right;
}
</style>