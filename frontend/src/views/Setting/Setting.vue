<template>
  <section>
    <div class="container mt-5 mb-5">
      <div class="setting">
        <h3 class="title-section">HISTORY TRANSAKSI</h3>
        <table-component
          name="transaction"
          :items="getTransactions" 
          :fields="fieldTransaction" 
          :per_page="perPageTransaction"
          :filterIncludedFields="filterOnTransaction"
          @setDeleteData="deleteTransaction"
        ></table-component>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import Table from '@/components/Tables/Tables.vue'
import { url } from '@/mixins/mixins'

export default {
  components:{
    'table-component': Table
  },
  mixins: [url],
  data(){
    return {
      totalRowsTransaction: 1,
      perPageTransaction: 5,
      filterOnTransaction: [],
      fieldTransaction: [
        'no',
        {key: 'code_transaction', label: 'Kode Transaksi', sortable: true, filterByFormatted: true},
        {key: 'products', label: 'Produk', sortable: true, filterByFormatted: true},
        {key: `total_price`, label: 'Total', sortable: true, filterByFormatted: true},
        {key: 'createdAt', label:'Created Date', sortable: true, filterByFormatted: true},
        {key: 'action', label:'Action'}
      ],
    }
  },
  created(){
    this.getAllTransaction()
  },
  computed: {
    getTransactions(){
      return this.$store.state.transactions
    }
  },
  methods: {
    getAllTransaction(){
      this.$store.dispatch('getTransaction')
    },
    deleteTransaction(data){
      const token = localStorage.getItem('token')
      this.$vToastify.prompt({
        title: "Delete",
        body: "Anda ingin hapus history ini?",
        answers: { Yes: true, No: false }
      })
      .then(value => {
        if(value){
          axios.delete(`${this.url}/transaction/${data.id}`, {
            headers: { Bearer : token }
          })
          .then(res => {
            this.$vToastify.notifSuccess('History berhasil dihapus', 'Yeay!')
            this.getAllTransaction()
          })
          .catch(err => {
            this.$vToastify.notifError(`${err.response.data.message}`, "Gagal!")
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>