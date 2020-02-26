<template>
  <div>
    <p class="text-h4 text-center">Pesananan Selesai</p>
    <q-separator />
    <div v-if="transactions.length !== 0">
      <!-- <pre>{{ transactions }}</pre> -->
      <q-intersection
        v-for="transaction in transactions"
        :key="transaction.id"
        transition="scale"
        class="full-width q-my-md"
      >
        <OrderCard :order="transaction" :status="'Pesanan selesai'" />
      </q-intersection>
    </div>
    <q-card
      class="col-12 col-sm-12 shadow-10 q-my-xl q-mx-auto q-py-md"
      style="width:80%;"
      v-else
    >
      <h4 class="text-center">Belanjaanmu masih kosong</h4>
      <q-btn
        class="flex text-center q-mx-auto items-center text-weight-bold text-h6"
        color="primary"
        @click="$router.push('/')"
        >Belanja Sekarang</q-btn
      >
    </q-card>
  </div>
</template>

<script>
import OrderCard from './components/OrderCard'
export default {
  name: 'OrderDone',
  components: {
    OrderCard
  },
  created() {
    this.getUserTransactions()
  },
  computed: {
    transactions() {
      return this.$store.state.transactionList
    }
  },
  methods: {
    getUserTransactions() {
      this.$store.dispatch('GET_TRANSACTION_LIST')
    }
  }
}
</script>

<style></style>
