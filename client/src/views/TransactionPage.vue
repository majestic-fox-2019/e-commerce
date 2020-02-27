<template>
  <div>
    <v-container>
      <v-toolbar dense>
        <v-toolbar-title>Transaction History</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn text @click.prevent="active = true">
          Ongoing Transaction
        </v-btn>

        <v-btn text @click.prevent="active = false">
          Confirmed Transaction
        </v-btn>
      </v-toolbar>
      <div v-if="activeTransaction.length > 0 && active">
        <div class="mb-3" v-for="(trans, i) in activeTransaction" :key="i">
          <TransactionCard :transaction="trans" />
        </div>
      </div>
      <div v-else-if="confirmedTransaction.length > 0 && !active">
        <div class="mb-3" v-for="(trans, i) in confirmedTransaction" :key="i">
          <TransactionCard :transaction="trans" />
        </div>
      </div>
      <div v-else>
        <h2>You dont have any transaction</h2>
      </div>
    </v-container>
  </div>
</template>

<script>
import TransactionCard from '@/components/TransactionCard'

export default {
  name: 'TransactionPage',
  data() {
    return {
      active: true
    }
  },
  components: {
    TransactionCard
  },
  computed: {
    activeTransaction() {
      return this.$store.state.activeTransaction
    },
    confirmedTransaction() {
      return this.$store.state.confirmedTransaction
    }
  },
  mounted() {
    this.$store.dispatch('FETCH_ACTIVE_TRANSACTION')
    this.$store.dispatch('FETCH_CONFIRMED_TRANSACTION')
  }
}
</script>

<style lang="css" scoped></style>
