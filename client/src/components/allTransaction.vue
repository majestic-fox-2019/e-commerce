<template>
  <div class="m-3">
    <h4 class="leftindong">Transaction of this shop:</h4>
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th>Product</th>
          <th>Picture</th>
          <th>Buyer</th>
          <th>Total Price</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <bodyTrans v-for="(one, i) in allTransactionMyS" :key="i" :bodyTrans="one"></bodyTrans>
      </tbody>
    </table>
    <div class="row mt-5">
      <div class="col-2 leftindong">
        <h5>Total Revenue:</h5>
      </div>
      <div class="col-10 leftindong">
        <h5>{{revenueComp}}</h5>
      </div>
    </div>
  </div>
</template>

<script>
import bodyTrans from "./bodyTransaction";
export default {
  name: "transactions",
  components: {
    bodyTrans
  },
  methods: {
    getAllTransactionsMyShop() {
      this.$store.dispatch("getAllTransactionsMyShop");
    }
  },
  mounted() {
    this.getAllTransactionsMyShop();
  },
  computed: {
    allTransactionMyS() {
      return this.$store.state.allTransactionMyShop;
    },
    totalRevenue() {
      let allrev = 0;
      for (let i of this.allTransactionMyS) {
        allrev += i.totalPrice;
      }
      return allrev;
    },
    revenueComp() {
      let angka = this.totalRevenue;
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
};
</script>

<style scoped>
.leftindong {
  text-align: left;
}
</style>