<template>
  <div>
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th>Product</th>
          <th>Picture</th>
          <th>Total Price</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <!-- <bodyTrans v-for="(one, i) in allTransactionMyS" :key="i" :bodyTrans="one"></bodyTrans> -->
        <body-belanja v-for="(one, i) in myHistory" :key="i" :detailHistoryBelanja="one"></body-belanja>
      </tbody>
    </table>
  </div>
</template>

<script>
import bodyBelanja from "./bodyBelanja.vue";
export default {
  name: "belanjahistory",
  components: {
    bodyBelanja
  },
  methods: {
    getMyHistory() {
      this.$store.dispatch("getMyHistory");
    }
  },
  computed: {
    myHistory() {
      if (this.$store.state.myBelanjaHistory) {
        return this.$store.state.myBelanjaHistory;
      } else {
        this.getMyHistory();
        return "loading..";
      }
    }
  }
};
</script>

<style>
</style>