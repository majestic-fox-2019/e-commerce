<template>
  <div>
    <v-container>
      <v-toolbar dense>
        <v-toolbar-title>Transaction History</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn text>
          Ongoing Transaction
        </v-btn>

        <v-btn text>
          Confirmed Transaction
        </v-btn>
      </v-toolbar>
      <div class="mb-3" v-for="(trans, i) in activeTransaction" :key="i">
        <TransactionCard :transaction="trans" />
      </div>
    </v-container>
  </div>
</template>

<script>
import TransactionCard from '@/components/TransactionCard'

export default {
  name: 'TransactionPage',
  data() {
    return {}
  },
  components: {
    TransactionCard
  },
  computed: {
    activeTransaction() {
      return this.$store.state.activeTransaction
    }
  },
  mounted() {
    this.$store.dispatch('FETCH_ACTIVE_TRANSACTION')
  }
}
</script>

<style lang="css" scoped></style>
