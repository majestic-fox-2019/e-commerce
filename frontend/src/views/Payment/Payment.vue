<template>
  <section>
    <div class="container mt-5 mb-5">
      <div v-if="isBusy">
        <div class="text-center loading-page">
          <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner"></b-spinner>
        </div>
      </div>
      <div v-else class="payment">
        <div class="desc-payment mb-5">
          <div class="image-payment">
            <img src="@/assets/images/shopbag.png" alt="">
          </div>
          <div class="content-payment">
            <p>
              Terima kasih anda telah membeli produk kami. Silahkan anda melakukan pembayaran via 
              transfer bank yang sudah kami sediakan. Anda bisa melakukan pembayaran transfer 
              melalui atm, m-banking ataupun e-banking.
            </p>
          </div>
        </div>
        <h4 class="no-transaksi">NO : {{ getTransaction.code_transaction }}</h4>
        <div class="detail-pembelian mb-5">
          <div class="pembayaran">
            <div class="total-transfer">
              <h5>Total Transfer</h5>
              <h3>{{ toIDRprice(getTransaction.total_price) }}</h3>
            </div>
          </div> 
          <div class="detail-belanja">
            <ul>
              <li>Kode Transaksi : {{ getTransaction.code_transaction }}</li>
              <li>Nama Pembeli : {{ getTransaction.name }}</li>
              <li>Alamat : {{ getTransaction.address }}</li>
              <li>Produk : {{ getTransaction.products }}</li>
              <li>Tanggal Beli : {{ getTransaction.createdAt | formatDate }}</li>
            </ul>
          </div>
        </div>
        <div class="detail-atm">
          <div class="atm">
            <img src="@/assets/images/bank-bca.jpg">
            <p class="an-nama">An. Muhammad Anova Nurfaqih</p>
            <p class="rek">5980103058</p>
          </div>
          <div class="atm">
            <img src="@/assets/images/bank-bri.jpg">
            <p class="an-nama">An. Muhammad Anova Nurfaqih</p>
            <p class="rek">6757623456</p>
          </div>
          <div class="atm">
            <img src="@/assets/images/bank-bni.jpg">
            <p class="an-nama">An. Muhammad Anova Nurfaqih</p>
            <p class="rek">6234560342</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ['id'],
  created(){
    this.getAllTransaction()
  },
  computed: {
    getTransaction(){
      let transactions = this.$store.state.transactions
      let invoice = transactions.find(el => {
        return el.code_transaction = this.id
      })
      return invoice
    },
    isBusy(){
      return this.$store.state.isBusy
    }

  },
  methods: {
    getAllTransaction(){
      this.$store.dispatch('getTransaction')
    },
    toIDRprice(price){
      let resultPrice = ''
      let strPrice = String(price)
      for(let j = 0; j < strPrice.length; j++){
        if((strPrice.length - j) % 3 === 0 && j !== 0){
          resultPrice += '.' + strPrice[j]
        }else{
          resultPrice += strPrice[j]
        }
      }
      return `Rp. ${resultPrice}`
    }
  }
}
</script>

<style lang="scss" scoped>

</style>