<template>
  <main class="page-content">
    <div class="container-fluid">
      <h2>Products</h2>
      <hr>
      <table-component
        name="transaction"
        :items="getTransactions" 
        :fields="fieldTransactions" 
        :per_page="perPageTransactions"
        :filterIncludedFields="filterOnTransactions"
      ></table-component>
    </div>
  </main>
</template>

<script>
import axios from 'axios'
import TableComponent from '@/components/Tables/Tables'
import { url } from '@/mixins/mixins'

export default {
  name: 'Product',
  mixins: [url],
  components: {
    'table-component' : TableComponent
  },
  data(){
    return {
      totalRowsTransactions: 1,
      perPageTransactions: 5,
      filterOnTransactions: [],
      fieldTransactions: [
        'no',
        {key: 'code_transaction', label: 'Transaction', sortable: true, filterByFormatted: true},
        {key: 'name', label: 'Name', sortable: true, filterByFormatted: true},
        {key: 'address', label: 'Address', sortable: true, filterByFormatted: true},
        {key: 'products', label: 'Products', sortable: true, filterByFormatted: true},
        {key: 'createdAt', label: 'Date', sortable: true, filterByFormatted: true}
      ],
    }
  },
  created(){
    this.getAllTransactions()
  },
  computed: {
    getTransactions(){
      return this.$store.state.transactions_dashboard
    }
  },
  methods: {
    getAllTransactions(){
      this.$store.dispatch('getTransactionsDashboard')
    }
  }
}
</script>

<style scoped>

</style>