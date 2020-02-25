<template>
  <div>
    <!-- <h1>Halo dari cart</h1> -->

    <div class="row p-3">
      <div class="col-8 mt-4">
        <cart-card
          v-for="(oneCart, i) in myCarts"
          :key="i"
          :cartDetail="oneCart"
          @updatedCart="getCart"
        ></cart-card>
      </div>
      <div class="col-4 mt-4">
        <b-card tag="article" style="max-width: 20rem;" class="mb-2">
          <b-card-text>
            <h4 class="divide">Ringkasan Belanja</h4>
          </b-card-text>
          <b-card-text>
            <div class="row">
              <div class="col-6">
                <p class="total">Total Harga</p>
              </div>
              <div class="col-6">
                <p class="hargaTot">{{totalNya}}</p>
              </div>
            </div>
          </b-card-text>

          <b-button class="w-100" variant="primary" @click="checkout">Checkout</b-button>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import CartCard from "../components/CartCard.vue";
export default {
  name: "Cart",
  data() {
    return {
      // totalPrice: 0
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
      this.$store.dispatch("checkout").then(() => {
        this.getCart();
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
    }
  },
  mounted() {
    this.getCart();
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