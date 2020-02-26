<template>
  <div>
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
export default {
  name: 'Transaction',
  data() {
    return {
      transactions: [],
    };
  },
  methods: {
    listTransaction() {
      this.$axios.get('/transactions', { headers: { token: localStorage.token } })
        .then((transaction) => {
          this.transactions = transaction.data;
        })
        .catch((err) => {
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
