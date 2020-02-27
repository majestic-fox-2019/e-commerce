<template>
  <div>
    <div class="vld-parent">
    <loading :active.sync="isLoading" 
  :can-cancel="true" 
  :is-full-page="fullPage" :loader="'bars'" :color="'#1161EE'"></loading>
  </div>
  <div style="display: flex; justify-content: center;">
    <div style="margin-top: 30px" v-if="transactions.length == 0">
      <h1>Make some transaction</h1>
      <img src="https://cdn.dribbble.com/users/812639/screenshots/6486869/shooping_1-800x600.gif" style="width: 80%;">
    </div>
<table class="table" v-if="transactions.length > 0">
  <thead class="thead-light">
    <tr>
      <th scope="col">No</th>
      <th scope="col">Prouducts</th>
      <th scope="col">Date</th>
      <th scope="col">Status</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(transaction, idx) in transactions" :key="idx">
      <th scope="row">{{idx + 1}}</th>
      <td>
        <p v-for="(product, i) in transaction.products" :key="i">
        {{`- ${product}`}}
        </p>
      </td>
      <td>{{transaction.date}}</td>
      <td v-if="transaction.status === false">
        PENDING
      </td>
      <td v-if="transaction.status === true">
        DONE
      </td>
    </tr>
  </tbody>
</table>
  </div>
  <hr>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: 'Transaction',
  components: {
    Loading
  },
  data() {
    return {
      isLoading: false,
      transactions: [],
    };
  },
  methods: {
    listTransaction() {
    this.isLoading = true;
      this.$axios.get('/transactions', { headers: { token: localStorage.token } })
        .then((transaction) => {
          this.isLoading = false;
          this.transactions = transaction.data;
        })
        .catch((err) => {
          this.isLoading = true;
          console.log(err);
        });
    },
  },
  created() {
    this.listTransaction();
  },
};
</script>

<style scoped>
table {
  width: 80%;
  margin-top: 20px;
}

.checkout {
  margin-bottom: 20px;
}
</style>
